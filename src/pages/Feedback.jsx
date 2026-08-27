import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getVns } from "../Api/getVns";
import { saveFeedbackDetails } from "../Api/saveFeedbackDetails";
import { createFeedbackVisit, updateFeedbackVisit } from "../Api/feedbackVisit";
import { useUserProfile } from "../Context/UserProfileContext";
import { useVn } from "../Context/VnContext";

const questions = [
  {
    id: "q1",
    question: "How easy was it to book your appointment online?",
    options: [
      "Very easy",
      "Somewhat easy",
      "Somewhat difficult",
      "Very difficult",
    ],
  },
  {
    id: "q2",
    question:
      "Did you feel that your privacy and confidentiality were respected during your interaction with the counsellor?",
    options: ["Yes, completely", "Somewhat", "No"],
  },
  {
    id: "q3",
    question:
      "How supportive, respectful, and non-judgmental was the counsellor who spoke to you?",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    id: "q4",
    question:
      "Did the counsellor explain you the process and next steps clearly?",
    options: [
      "Yes, very clearly",
      "Somewhat clearly",
      "No, not clearly",
      "Not applicable / Did not receive results yet",
    ],
  },
  {
    id: "q5",
    question:
      "How likely are you to recommend NETREACH to a friend or partner who needs a test?",
    options: [
      "Extremely likely",
      "Likely",
      "Neutral",
      "Unlikely",
      "Extremely unlikely",
    ],
  },
  {
    id: "q6",
    question:
      "What is one thing we could do to make your experience better or more comfortable?",
    type: "textarea",
  },
];

// Get and cache IP and location details for the feedback submission.
const getUserLocation = async () => {
  const cached = localStorage.getItem("feedbackIpInfo");

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      localStorage.removeItem("feedbackIpInfo");
    }
  }

  // IP lookup and GPS location are independent, so fetch them in parallel.
  const [ipResult, positionResult] = await Promise.allSettled([
    axios.get("https://api.ipify.org?format=json"),

    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      });
    }),
  ]);

  const ip =
    ipResult.status === "fulfilled" ? ipResult.value.data.ip || "" : "";

  const latitude =
    positionResult.status === "fulfilled"
      ? positionResult.value.coords.latitude
      : null;

  const longitude =
    positionResult.status === "fulfilled"
      ? positionResult.value.coords.longitude
      : null;

  let locationData = {};

  // Convert GPS coordinates into readable address information.
  if (latitude !== null && longitude !== null) {
    try {
      const { data } = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "json",
            lat: latitude,
            lon: longitude,
          },
        },
      );

      locationData = data.address || {};
    } catch (error) {
      console.warn("Reverse geocoding failed:", error);
    }
  }

  const ipInfo = {
    ip,
    latitude,
    longitude,
    country: locationData.country || "",
    state:
      locationData.state ||
      locationData["ISO3166-2-lvl4"]?.replace("IN-", "") ||
      "",
    city: locationData.city || locationData.town || locationData.village || "",
    // district: locationData.city_district || locationData.county || "",
    // pincode: locationData.postcode || "",
  };

  // Cache the result so location APIs are not called on every submission.
  localStorage.setItem("feedbackIpInfo", JSON.stringify(ipInfo));

  return ipInfo;
};

// Create timestamp in IST.
const getISTTimestamp = () => {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const getPart = (type) => parts.find((part) => part.type === type)?.value;

  return `${getPart("year")}-${getPart("month")}-${getPart(
    "day",
  )}T${getPart("hour")}:${getPart("minute")}:${getPart(
    "second",
  )}.${String(now.getMilliseconds()).padStart(3, "0")}+05:30`;
};

export default function Feedback() {
  const { userProfile } = useUserProfile();
  const { vnData } = useVn();

  const [vns, setVns] = useState([]);
  const [loadingVns, setLoadingVns] = useState(false);
  const [selectedVn, setSelectedVn] = useState(null);

  const [mobile, setMobile] = useState("");
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  // Stores the create API promise so submit can wait for it if needed.
  const visitPromiseRef = useRef(null);

  useEffect(() => {
    setMobile(userProfile?.user?.mobile || "");
  }, [userProfile]);

  // Load Virtual Navigators when the feedback page opens.
  useEffect(() => {
    if (vnData) {
      setVns([vnData]);
      setSelectedVn(vnData);
      return;
    }

    const fetchVns = async () => {
      setLoadingVns(true);

      try {
        const response = await getVns();

        let data = response.data.data;

        // Normalise the API response so the component always works with an array.
        if (!Array.isArray(data)) {
          data = data ? [data] : [];
        }

        setVns(data);
      } catch (error) {
        console.error("Failed to fetch VNs:", error);
        setVns([]);
      } finally {
        setLoadingVns(false);
      }
    };

    fetchVns();
  }, [vnData]);

  // Create one feedback visit when the page opens.
  useEffect(() => {
    visitPromiseRef.current = (async () => {
      try {
        const ipInfo = await getUserLocation();

        const payload = {
          url: window.location.href,
          ip: ipInfo.ip || "",
          openedAt: getISTTimestamp(),
          isSubmitted: false,
          submittedAt: null,
        };

        console.log("Create feedback visit payload:", payload);

        return await createFeedbackVisit(payload);
      } catch (error) {
        console.error("Failed to create feedback visit:", error);
        return null;
      }
    })();
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const ipInfo = await getUserLocation();
      const submittedAt = getISTTimestamp();

      const payload = {
        url: window.location.href,

        user: {
          ...(userProfile?.user || {}),
          mobile,
        },

        vn: selectedVn || null,

        feedback: {
          q1: answers.q1 || "",
          q2: answers.q2 || "",
          q3: answers.q3 || "",
          q4: answers.q4 || "",
          q5: answers.q5 || "",
          q6: answers.q6 || "",
        },

        location: {
          ip: ipInfo.ip || "",
          latitude: ipInfo.latitude ?? null,
          longitude: ipInfo.longitude ?? null,
          country: ipInfo.country || "",
          state: ipInfo.state || "",
          city: ipInfo.city || "",
          // district: ipInfo.district || "",
          // pincode: ipInfo.pincode || "",
        },

        submittedAt,
      };

      console.log("Feedback payload:", payload);

      // Submit only after the payload has been prepared successfully.
      await saveFeedbackDetails(payload);

      // Wait for the visit creation if it is still in progress.
      const response = await visitPromiseRef.current;

      const visitId =
        response?.id || response?.data?.id || response?.data?.data?.id;

      // Mark the same visit as submitted.
      if (visitId) {
        const updatePayload = {
          isSubmitted: true,
          submittedAt,
        };

        console.log("Update feedback visit payload:", updatePayload);

        await updateFeedbackVisit(visitId, updatePayload);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Unable to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedVns = vns
    .slice()
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          {isSubmitted ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h1 className="mt-6 text-2xl font-semibold text-gray-900">
                Thank You!
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
                Thank you for taking the time to share your feedback with us.
                Your response will help us improve the NETREACH experience.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-gray-900">
                Feedback Survey
              </h1>

              <div className="mt-2 text-xs text-gray-500">
                {new Date().toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                Thank you for visiting netreach.co.in. Your feedback helps us to
                improve our engagement with the community. This survey is
                completely voluntary, anonymous and confidential and takes a
                minute to complete.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                {/* Virtual Navigator selection */}
                <div className="hidden">
                  <label
                    htmlFor="vn"
                    className="text-sm font-medium text-gray-900"
                  >
                    Which Virtual Navigator did you interact with?
                  </label>

                  <select
                    id="vn"
                    value={selectedVn?.id || ""}
                    onChange={(e) => {
                      const vn = vns.find(
                        (vn) => String(vn.id) === String(e.target.value),
                      );

                      setSelectedVn(vn || null);
                    }}
                    required
                    disabled={loadingVns || !!vnData}
                    className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                  >
                    <option value="">
                      {loadingVns
                        ? "Loading Virtual Navigators..."
                        : "Select a Virtual Navigator"}
                    </option>

                    {sortedVns.map((vn) => (
                      <option key={vn.id} value={vn.id}>
                        {vn.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Feedback questions */}
                {questions.map((item, index) => (
                  <div key={item.id}>
                    <p className="text-sm font-medium leading-6 text-gray-900">
                      {index + 1}) {item.question}{" "}
                      {item.type !== "textarea" && (
                        <span className="text-red-500">*</span>
                      )}
                    </p>

                    {item.type === "textarea" ? (
                      <textarea
                        value={answers[item.id] || ""}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        rows={4}
                        placeholder="Short text response"
                        className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="mt-3 space-y-2">
                        {item.options.map((option) => (
                          <label
                            key={option}
                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 transition hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name={item.id}
                              value={option}
                              checked={answers[item.id] === option}
                              onChange={() => handleChange(item.id, option)}
                              required
                              className="h-4 w-4"
                            />

                            <span className="text-sm text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile number */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="text-sm font-medium text-gray-900"
                  >
                    Mobile <span className="text-gray-400">(Optional)</span>
                  </label>

                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      setMobile(value);
                    }}
                    // disabled={!!userProfile?.user?.mobile}
                    // required
                    pattern="[6-9][0-9]{9}"
                    inputMode="numeric"
                    placeholder="Enter your 10-digit mobile number"
                    className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                </div>

                {/* Privacy & Consent */}
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4"
                  />

                  <label
                    htmlFor="consent"
                    className="text-sm leading-6 text-gray-700"
                  >
                    We will use the information you provide to review and
                    respond to your feedback. Providing contact information is
                    optional unless follow-up is requested.
                  </label>
                </div>

                {/* Submit */}
                <div className="flex justify-end border-t border-gray-100 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || loadingVns}
                    className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
