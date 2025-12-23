import { useFooter } from "../Context/FooterContext.jsx";
// import { steps } from "../libs/StepConfig";
import { useEffect, useRef, useState } from "react";
import tell1 from "../assets/question/tell1.png";
import chatbot from "../assets/chatbot.png";
import { ArrowLeft, ArrowRight, Mic, SearchIcon } from "lucide-react";
// import step1 from "../assets/question/step1.png";
import step1 from "../assets/question/Tellusaboutyourself.jpg";
// import step2 from "../assets/question/step2.png";
import step2 from "../assets/question/Tellusaboutyourself2.jpg";
// import step3 from "../assets/question/step3.png";
import step3 from "../assets/question/Tellusaboutyourself3.jpg";
import step4 from "../assets/question/step4.png";
import step5 from "../assets/question/step5.png";
import RiskOptionsStep from "../components/RiskOptionsStep";
import { useNavigate, useLocation } from "react-router";
import { fetchQuestionSteps } from "../Api/Questionnaire/getQuestions.js";
import { fetchStates } from "../Api/getState.js";
import { useAuth } from '../Context/AuthContext';
import { useProfile } from "../Context/ProfileContext.jsx";
import { useUserProfile } from '../Context/UserProfileContext'
import { useVn } from '../Context/VnContext'
import QuestionsSection from "../components/QuestionsSection.jsx";
import { selfRiskAssessmentMaster } from "../Api/selfRiskAssessmentMaster.js";
import { selfRiskAssessmentItem } from "../Api/selfRiskAssessmentItem.js";



export default function Questionnaire() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { profile: profileContext } = useProfile();
    const { userProfile, refetchUserProfile } = useUserProfile()
    const { vnData } = useVn()
    const stepImages = [step1, step2, step3, step4, step5];
    const stepImageClasses = [
        // "w-[300px] h-[359px] object-contain ", // step1
        "w-[450px]  rounded-lg mx-auto object-contain ", // step1
        "w-[450px]   rounded-lg mx-auto object-contain", // step2
        "w-[450px]  rounded-lg mx-auto object-contain ", // step3
        "w-[230px] h-[230px]  rounded-lg ml-14 object-contain  ", // step4
        "w-[230px] h-[230px]  rounded-lg ml-12 object-contain ", // step5
    ];
    const [states, setStates] = useState([]);
    const [steps, setSteps] = useState([]);           // Array of arrays for each step's questions
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedRisk, setSelectedRisk] = useState(null);
    const [answers, setAnswers] = useState({});       // Answers keyed by question_id
    const scrollContainerRef = useRef(null);
    // Inside your Questionnaire component (after currentStep is declared)
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" }) // Internal scroll only!
        }
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
    }, [currentStep]);
    useEffect(() => {
        async function getStates() {
            try {
                const data = await fetchStates();
                setStates(data);
            } catch (error) {
                console.error("Failed to fetch states:", error);
            }
        }
        getStates()
    }, [])
    // console.log("state list", states)
    useEffect(() => {
        async function load() {
            // const steps = await fetchQuestionSteps();
            const groupedSteps = await fetchQuestionSteps();
            setSteps(groupedSteps);
            console.log("Get Question Api result", groupedSteps)
        }
        load();
    }, []);
    // Calculate offset for the current step
    const offset = steps
        .slice(0, currentStep)
        .reduce((acc, stepQuestions) => acc + stepQuestions.length, 0);
    // Render current step's questions
    const questions = steps[currentStep] || [];
    // console.log("Current step data:", steps[currentStep]);
    // On answer change
    const handleInputChange = (question, value) => {
        setAnswers(prev => ({
            ...prev,
            [question.question_id]: value,
        }));
    };

    // For checkbox (multi-answer)
    // const handleCheckboxChange = (question, value) => {
    //     setAnswers(prev => {
    //         const old = prev[question.question_id] || [];
    //         if (old.includes(value)) {
    //             // Remove
    //             return {
    //                 ...prev,
    //                 [question.question_id]: old.filter(v => v !== value)
    //             }
    //         }
    //         // Add
    //         return {
    //             ...prev,
    //             [question.question_id]: [...old, value]
    //         }
    //     });
    // };

    const handleCheckboxChange = (question, value) => {
    const NONE_OF_THE_ABOVE = {
        19: 70, // Q17
        20: 76, // Q18
    };

    setAnswers(prev => {
        const current = prev[question.question_id] || [];
        const isCurrentlyChecked = current.includes(value);
        const noneId = NONE_OF_THE_ABOVE[question.question_id];

        if (isCurrentlyChecked) {
            // Remove the just-unchecked value
            return {
                ...prev,
                [question.question_id]: current.filter(v => v !== value)
            };
        } else {
            if (value === noneId) {
                // If selecting "None of the Above", uncheck all others and keep only noneId
                return {
                    ...prev,
                    [question.question_id]: [noneId]
                };
            } else {
                // If selecting any other, remove "None of the Above" if present and add value
                return {
                    ...prev,
                    [question.question_id]: [
                        ...current.filter(v => v !== noneId),
                        value
                    ]
                };
            }
        }
    });
};



    // Only for Step 1 (currentStep === 0)
    useEffect(() => {
        if (user?.user?.phone_number) {
            // This ensures answers[1] is always filled if user is logged in
            setAnswers(prev => ({
                ...prev,
                1: user.user.phone_number
            }))
        }
    }, [user?.user?.phone_number])
    // Submit answers
    const handleGetResult = async () => {
        // Calculate total weight based on answers and steps data
        let totalWeight = 0;
        Object.entries(answers).forEach(([questionId, selected]) => {
            const question = steps.flat().find(q => q.question_id === Number(questionId));
            if (!question) return;

            if (Array.isArray(selected)) {
                // multiple selected answers (checkbox)
                selected.forEach(selectedId => {
                    const option = question.options.find(opt => opt.answer_id === selectedId);
                    if (option) {
                        totalWeight += option.weight || 0;
                    }
                });
            } else {
                // single selected answer
                const option = question.options.find(opt => opt.answer_id === selected);
                if (option) {
                    totalWeight += option.weight || 0;
                }
            }
        });
        // Example POST logic (replace URL with your POST endpoint)
        // payload including totalWeight if needed by backend
        const payload = {
            responses: Object.entries(answers).map(([qid, ans]) => ({
                question_id: Number(qid),
                answer: ans, // adapt if backend expects answer_id or value
            })),
            total_weight: totalWeight, // additional field
        };
        // Call API 
        // await submitAnswers(payload);
        console.log("Submitting answers:", payload); // Remove after testing

        // Save totalWeight
        localStorage.setItem('totalWeight', totalWeight);

        // setAnswers([]) // uncomment later 
        navigate(`/assessmentresult?totalWeight=${totalWeight}`)
    };


    const isStep1Complete = questions.every(q => {
        const ans = answers[q.question_id];
        if (q.answer_input_type === 'checkbox') {
            return Array.isArray(ans) && ans.length > 0;
        }
        return ans !== undefined && ans !== null && ans !== '';
    });

    // 
    const indiaStateMap = {
        "IN-AN": "Andaman and Nicobar Islands",
        "IN-AP": "Andhra Pradesh",
        "IN-AR": "Arunachal Pradesh",
        "IN-AS": "Assam",
        "IN-BR": "Bihar",
        "IN-CH": "Chandigarh",
        "IN-CT": "Chhattisgarh",
        "IN-DN": "Dadra and Nagar Haveli",
        "IN-DD": "Daman and Diu",
        "IN-DL": "Delhi",
        "IN-GA": "Goa",
        "IN-GJ": "Gujarat",
        "IN-HR": "Haryana",
        "IN-HP": "Himachal Pradesh",
        "IN-JK": "Jammu and Kashmir",
        "IN-JH": "Jharkhand",
        "IN-KA": "Karnataka",
        "IN-KL": "Kerala",
        "IN-LA": "Ladakh",
        "IN-LD": "Lakshadweep",
        "IN-MP": "Madhya Pradesh",
        "IN-MH": "Maharashtra",
        "IN-MN": "Manipur",
        "IN-ML": "Meghalaya",
        "IN-MZ": "Mizoram",
        "IN-NL": "Nagaland",
        "IN-OR": "Odisha",
        "IN-PY": "Puducherry",
        "IN-PB": "Punjab",
        "IN-RJ": "Rajasthan",
        "IN-SK": "Sikkim",
        "IN-TN": "Tamil Nadu",
        "IN-TG": "Telangana",
        "IN-TR": "Tripura",
        "IN-UP": "Uttar Pradesh",
        "IN-UT": "Uttarakhand",
        "IN-WB": "West Bengal"
    };

    // 
    const handleGeolocate = async () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // Reverse geocode to get location name
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await res.json();
                console.log(data)

                let stateName = data.address.state || data.address.city;
                const districtName = data.address.city_district;

                // Fallback using ISO code mapping if available
                if (!stateName && data.address["ISO3166-2-lvl4"]) {
                    const isoCode = data.address["ISO3166-2-lvl4"];
                    stateName = indiaStateMap[isoCode] || isoCode.replace("IN-", "");
                }
                console.log("User location:", stateName, districtName);

                // Autofill matching state/district if they exist in your dropdowns
                const matchedState = states.find(
                    (s) => s.state_name.toLowerCase() === stateName.toLowerCase()
                );

                if (matchedState) {
                    handleInputChange(
                        { question_id: 5, question: "State" },
                        matchedState.state_code
                    );
                }

                // If you have district questions too:
                // if (districtName) {
                //   handleInputChange(
                //     { question_id: /* district question id */, question: "District" },
                //     districtName
                //   );
                // }
            },
            (error) => {
                console.error(error);
                alert("Unable to retrieve your location");
            }
        );
    };

    // console.log(currentStep, isStep1Complete, selectedRisk)
    // console.log(answers)

useEffect(() => {
  if (userProfile?.items?.length) {
    const newAnswers = {};

    userProfile.items.forEach(item => {
      if (item?.question_id != null) {
        newAnswers[item.question_id] = item.answer_id || "";
      }

      if ([11].includes(item?.question_id)) {
        newAnswers[item.question_id] = [item.answer_id] || [];
      }
    });

    setAnswers(prev => ({ ...prev, ...newAnswers }));
  }
}, [userProfile?.items]);

const handleNextClick = async () => {
  try {
    let riskId = userProfile?.risk_assessment?.risk_assessment_id;
    const ipInfo = JSON.parse(localStorage.getItem("ipInfo") || "{}");

    // Step 1: Create risk assessment if first step
    if (currentStep === 0 && !riskId) {
      const masterData = {
        state: answers[5],
        vn_id: vnData?.id || null,
        mobile_no: answers[1],
        raw_answer_sheet: {
          "mobile-number": answers[1],
          age: answers[2],
          gender: answers[3],
          "have-you-ever-tested-for-hiv-before": answers[22],
        },
        ip_info: ipInfo
      };
      const res = await selfRiskAssessmentMaster(masterData);
      console.log("Master API Response:", res?.data);
      riskId = res?.data?.data?.risk_assessment_id;
      if (!riskId) throw new Error("No risk_assessment_id found");
      localStorage.setItem("risk_assessment_id", riskId);
    }

    // Step 2: Define question mapping
    const stepItems = {
      0: [
        { question_id: 2, answer_id: answers[2] },
        { question_id: 3, answer_id: answers[3] },
        { question_id: 5, answer_id: answers[5] },
        { question_id: 22, answer_id: answers[22] },
      ],
      2: [
        { question_id: 6, answer_id: answers[6] },
        { question_id: 9, answer_id: answers[9] },
        { question_id: 10, answer_id: answers[10] },
        { question_id: 11, answer_id: answers[11] },
        { question_id: 12, answer_id: answers[12] },
      ],
      3: [
        { question_id: 13, answer_id: answers[13] },
        { question_id: 14, answer_id: answers[14] },
        { question_id: 15, answer_id: answers[15] },
        { question_id: 16, answer_id: answers[16] },
        { question_id: 17, answer_id: answers[17] },
        { question_id: 18, answer_id: answers[18] },
      ],
      4: [
        { question_id: 19, answer_id: answers[19] },
        { question_id: 20, answer_id: answers[20] },
      ],
    };

    // Step 3: Prepare items for current step
    const items = stepItems[currentStep];

    // Calculate totalWeight
    let totalWeight = 0;
    Object.entries(answers).forEach(([qid, value]) => {
      const question = steps.flat().find(q => q.question_id === Number(qid));
      if (!question) return;

      const arr = Array.isArray(value) ? value : [value];
      arr.forEach(val => {
        const option = question.options.find(o => o.answer_id === val);
        if (option) totalWeight += option.weight || 0;
      });
    });

    // Step 4: Save current step items
    if (items?.length) {
      const existingItems = userProfile?.items || [];

      // Remove old items for the current step
      const filteredOldItems = existingItems.filter(
        (item) => !items.some(stepItem => stepItem.question_id === item.question_id)
      );

      const cleanedOldItems = filteredOldItems.map(item => ({
        question_id: item.question_id,
        answer_id: item.answer_id
      }));

      const cleanedNewItems = items.map(item => ({
        question_id: item.question_id,
        answer_id: item.answer_id
      }));

      const itemRes = await selfRiskAssessmentItem({
        risk_assessment_id: riskId,
        items: [...cleanedOldItems, ...cleanedNewItems],
        risk_score: totalWeight,
      });
      console.log("Item API Response:", itemRes?.data);

      // Step 5: Refetch user profile to sync updates
      await refetchUserProfile();
    }

    // If LAST STEP → call handleGetResult()
    const lastStepIndex = 4;
    if (currentStep === lastStepIndex) {
      await handleGetResult();  // <-- THIS TRIGGERS navigate()
      return; // stop here
    }

    // Step 6: Move to next step
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  } catch (err) {
    console.error("Error in handleNextClick:", err);
    alert(err.message || "Something went wrong");
  }
};

    return (
        <div className="container relative w-full  lg:w-[95%] xl:max-w-[1300px] mx-auto mt-10 mb-6 px-6 sm:px-6">

            <div className="relative" translate="no">
                {/* ------------------ MOBILE + TABLET HEADER ------------------ */}
                <div className="block md:hidden text-center mb-4">
                    <h2
                        className="text-[28px] md:text-3xl text-black font-normal"
                        style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                    >
                        Tell Us About Yourself
                    </h2>
                    <p className="text-sm text-[#3285EC] font-medium mb-2 text-left pt-6  ">
                        Step {currentStep + 1}
                        {questions.length > 0 && (
                            <> (Q{offset + 1}–Q{offset + questions.length})</>
                        )}
                    </p>
                    {/* Progress bar */}
                    <div className="flex  gap-2 mt-2 ">
                        {/* {steps.map((stepGroup, index) => ( */}
                        {stepImages.map((stepGroup, index) => (
                            <div
                                key={index}
                                className={`h-[5px] flex-1 rounded ${index <= currentStep
                                    ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5]"
                                    : "bg-gray-200"
                                    }`}
                            />
                        ))}
                        {/* {steps.map((s, index) => (
                            <div
                                key={s.id}
                                className={`h-[5px] flex-1 rounded ${index <= currentStep
                                    ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5]"
                                    : "bg-gray-200"
                                    }`}
                            />
                        ))} */}
                    </div>
                </div>

                <div className="flex">
                    {/* ------------------ LAPTOP VIEW (with image + shadow + scroll) ------------------ */}
                    {/* <div className="hidden lg:grid grid-cols-12 gap-6 rounded-[2rem] shadow-[0px_0px_7.6px_-2px_#0000000F]  p-0 pr-8 lg:pr-2 xl:pr-8 mr-4 lg:w-[78%] xl:w-[80%]"> */}
                    <div className="flex lg:grid grid-cols-12 gap-6 md:rounded-[2rem] md:shadow-[0px_0px_7.6px_-2px_#0000000F] p-0 md:pr-8 lg:pr-2 xl:pr-8 md:mr-4 w-full lg:w-[78%] xl:w-[80%]">
                        {/* Left Section */}
                        <div className="hidden  lg:col-span-5 xl:col-span-4 md:flex flex-col items-start justify-start gap-16 bg-[#FCFCFC] h-full rounded-l-[2rem] pt-8" translate="yes">
                            <h2
                                className="text-4xl leading-tight text-black font-normal mx-auto lg:text-center "
                                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                            >
                                Tell us about <br /> Yourself
                            </h2>
                            <img
                                src={stepImages[currentStep]}
                                alt={currentStep}
                                className={stepImageClasses[currentStep]}
                            />
                        </div>

                        {/* Right Section */}
                        <div
                            className="lg:col-span-7 xl:col-span-8 md:pt-10 xl:pl-8 xl:pr-8 md:pb-8 w-full"
                            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                        >
                            <p className="hidden md:block text-sm text-[#3285EC] font-medium mb-2">
                                Step {currentStep + 1}
                                {questions.length > 0 && (
                                    <> (Q{offset + 1}–Q{offset + questions.length})</>
                                )}
                            </p>
                            {/* Progress Bar */}
                            <div className="hidden md:block mb-6">
                                <div className="flex gap-4">

                                    {stepImages.map((stepGroup, index) => (
                                        <div
                                            key={index}
                                            className={`h-[5px] flex-1 rounded ${index <= currentStep
                                                ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5]"
                                                : "bg-gray-200"
                                                }`}
                                        />
                                    ))}

                                </div>
                            </div>

                            {/* Questions (scrollable) */}
                            {!steps.length ? (
                                <div className="flex justify-center items-center py-10 text-6xl">
                                    {/* <ClipLoader color="#11688F" size={80} /> */}
                                    Loading Question....
                                </div>
                            ) : (
                                <div className="space-y-6 md:max-h-[350px] md:h-[350px] md:overflow-y-auto md:pr-2  md:pb-3" ref={scrollContainerRef} translate="yes">
                                    {currentStep === 1 ? (
                                        <RiskOptionsStep
                                            selected={selectedRisk}
                                            setSelected={setSelectedRisk}
                                        />
                                    ) : (
                                        // step.questions.map((q) => (
                                        // questions.map((q, index) => (
                                        //     <div key={index} className="text-sm">
                                        //         <p className="font-medium mb-2 text-[#11688F]">
                                        //             {/* {q.question_id}. {q.question} */}
                                        //             {offset + index + 1}. {q.question}
                                        //         </p>

                                        //         {/* Radio */}
                                        //         {q.answer_input_type === "radio" && (
                                        //             <div className="flex gap-6 lg:flex-wrap lg:gap-3 xl:flex-nowrap">
                                        //                 {/* {q.options.map((opt) => ( */}
                                        //                 {q.options.map((opt) => (
                                        //                     <label
                                        //                         key={opt.answer_id}
                                        //                         className="flex items-center gap-2 border rounded-2xl px-1.5 border-[#A9A9A9] bg-[#F4F4F4] pr-2.5  xl:whitespace-nowrap"
                                        //                     >
                                        //                         {/* <input type="radio" name={`q${q.id}`} /> {opt} */}
                                        //                         <input
                                        //                             type="radio"
                                        //                             name={`q${q.question_id}`}
                                        //                             value={opt.answer_id}
                                        //                             checked={answers[q.question_id] === opt.answer_id}
                                        //                             onChange={() => handleInputChange(q, opt.answer_id)}
                                        //                         /> {opt.answer}
                                        //                     </label>
                                        //                 ))}
                                        //             </div>
                                        //         )}

                                        //         {/* Text */}
                                        //         {q.answer_input_type === "text" && q.question_id === 1 ? (
                                        //             <input
                                        //                 type="text"
                                        //                 value={profileContext.mobile || ""}
                                        //                 readOnly
                                        //                 className="p-1 max-w-60 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4] outline-none"
                                        //             />
                                        //         ) : q.answer_input_type === "text" ? (
                                        //             <input
                                        //                 type="text"
                                        //                 value={answers[q.question_id] || ""}
                                        //                 onChange={e => handleInputChange(q, e.target.value)}
                                        //                 className="p-1 max-w-60 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4] outline-none"
                                        //             />
                                        //         ) : null}

                                        //         {/* Select */}
                                        //         {q.answer_input_type === "select" && (
                                        //             <select
                                        //                 value={answers[q.question_id] || ""}
                                        //                 onChange={e => handleInputChange(q, e.target.value)}
                                        //                 className="border outline-none lg:min-w-[250px] xl:min-w-[300px]  py-1 text-[13px] rounded-full px-3 border-[#A9A9A9] bg-[#F4F4F4]">
                                        //                 <option value="">Select</option>
                                        //                 {/* If this is the state question, render states from API */}
                                        //                 {q.question === "State" && states.length > 0 ?
                                        //                     states.map(state => (
                                        //                         <option key={state.id} value={state.id}>
                                        //                             {state.state_name}
                                        //                         </option>
                                        //                     ))
                                        //                     :
                                        //                     (
                                        //                         q.options.map(opt =>
                                        //                             <option key={opt.answer_id} value={opt.answer_id} >{opt.answer}</option>
                                        //                         )
                                        //                     )
                                        //                 }
                                        //                 {/* {q.options.map(opt =>
                                        //                 <option key={opt.answer_id} value={opt.answer_id}>{opt.answer}</option>
                                        //             )} */}
                                        //             </select>
                                        //         )}

                                        //         {/* Checkbox */}
                                        //         {q.answer_input_type === "checkbox" && (
                                        //             <div className="flex flex-col gap-3">
                                        //                 {q.options.map((opt) => (
                                        //                     <label
                                        //                         key={opt.answer_id}
                                        //                         className="flex items-center gap-2 text-[13px] border rounded-full px-1.5 border-[#A9A9A9] bg-[#F4F4F4] py-0.5"
                                        //                     >
                                        //                         <input
                                        //                             type="checkbox"
                                        //                             value={opt.answer_id}
                                        //                             checked={Array.isArray(answers[q.question_id]) && answers[q.question_id].includes(opt.answer_id)}
                                        //                             onChange={() => handleCheckboxChange(q, opt.answer_id)} /> {opt.answer}
                                        //                     </label>
                                        //                 ))}
                                        //             </div>
                                        //         )}
                                        //     </div>
                                        // ))
                                        <QuestionsSection
                                            questions={questions}
                                            answers={answers}
                                            handleInputChange={handleInputChange}
                                            handleCheckboxChange={handleCheckboxChange}
                                            handleGeolocate={handleGeolocate}
                                            user={user.user}
                                            profileContext={profileContext}
                                            states={states}
                                            offset={offset}
                                        />
                                    )}
                                </div>
                            )}


                            {/* Navigation */}
                            <div className="flex flex-col-reverse gap-3 md:gap-0 md:flex-row   justify-between mt-6 w-full">
                                {/* Left Side */}
                                <div className="flex flex-col text-sm ">
                                    {currentStep >= 2 || selectedRisk === 1 ? (
                                        <button
                                            onClick={handleGetResult}
                                            className="flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer"
                                        >
                                            Book Appointment
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    ) : (
                                        <div className="hidden md:w-[160px]" />
                                    )}
                                </div>

                                {/* Right Side */}
                                <div className="flex justify-between lg:gap-2 xl:gap-4">
                                    {currentStep > 0 ? (
                                        <div
                                            onClick={() => setCurrentStep((s) => s - 1)}
                                            className="flex flex-row justify-between items-center text-sm shadow-xl hover:shadow-lg/30 pr-3 pt-1 pb-1 
                          border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer gap-3 pl-1 "
                                            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                        >
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ">
                                                <ArrowLeft width={17} />
                                            </span>
                                            <button className="cursor-pointer">Previous</button>
                                        </div>
                                    ) : (
                                        <div className="w-[160px]"></div>
                                    )}
                                    {currentStep < steps.length && currentStep < 4 ? selectedRisk !== 1 && (
                                        <button
                                            disabled={currentStep === 0 && !isStep1Complete || selectedRisk === 1}
                                            onClick={handleNextClick}
                                            //                                 className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
                                            //    bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer"
                                            className={`relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
                                                    rounded-full cursor-pointer
                                                    ${currentStep === 0 && !isStep1Complete || selectedRisk === 1
                                                    ? 'bg-gray-400 cursor-not-allowed opacity-70' // Disabled styles
                                                    : 'bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white'
                                                }`}
                                        >
                                            Next
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleNextClick}
                                            className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
               bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer"
                                        >
                                            Get Result
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    )}

                                    {/* 
                                    {currentStep < steps.length && (
                                        <button
                                            onClick={() =>
                                                setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
                                            }
                                            className=" relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer"
                                        >
                                            Next
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------------------ MOBILE + TABLET (No image, auto height) ------------------ */}

                    {/* <div className="block lg:hidden w-full bg-white shadow-md rounded-2xl p-4 mt-4 " ref={scrollContainerRef}> */}
                    <div className="hidden w-full bg-white shadow-md rounded-2xl p-4 mt-4 " ref={scrollContainerRef}>
                        {!steps.length ? (
                            <div className="flex justify-center py-10 text-3xl">
                                {/* <ClipLoader color="#323FF7" size={50} /> */}
                                Loading Question...
                            </div>
                        ) : (
                            <div className=" space-y-3 h-auto overflow-visible">
                                {currentStep === 1 ? (
                                    <RiskOptionsStep
                                        selected={selectedRisk}
                                        setSelected={setSelectedRisk}
                                    />
                                ) : (
                                    // step.questions.map((q) => (
                                    questions.map((q, index) => (
                                        <div key={q.question_id} className="text-[16px] md:text-sm">
                                            <p className="font-medium mb-2 text-[#11688F]">
                                                {offset + index + 1}. {q.question}
                                            </p>
                                            {/* Same question rendering as above */}
                                            {/* Radio */}

                                            {q.answer_input_type === "radio" && (
                                                <div className="flex flex-wrap gap-3 text-sm">
                                                    {q.options.map((opt) => (
                                                        <label
                                                            key={opt.answer_id}
                                                            className="flex items-center gap-2 border rounded-2xl px-1.5 border-[#A9A9A9] bg-[#F4F4F4] pr-2.5   md:whitespace-nowrap"
                                                        >
                                                            <input type="radio" name={`q${q.question_id}`} /> {opt.answer}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Text */}
                                            {q.answer_input_type === "text" && q.question_id === 1 ? (
                                                <input
                                                    type="text"
                                                    value={profileContext.mobile || ""}
                                                    readOnly
                                                    className="p-2 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4]"
                                                />
                                            ) : q.answer_input_type === "text" ? (
                                                <input
                                                    type="text"
                                                    value={answers[q.question_id] || ""}
                                                    onChange={e => handleInputChange(q, e.target.value)}
                                                    className="p-2 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4]"
                                                />
                                            ) : null}

                                            {/* Select */}
                                            {q.answer_input_type === "select" && (
                                                <select
                                                    value={answers[q.question_id] || ""}
                                                    onChange={e => handleInputChange(q, e.target.value)}
                                                    className="border outline-none w-full  md:w-[250px] py-1 text-[13px] rounded-full px-3 border-[#A9A9A9] bg-[#F4F4F4]">
                                                    <option value="">Select</option>
                                                    {q.question === "State" && states.length > 0 ?
                                                        states.map(state => (
                                                            <option key={state.id} value={state.id}>
                                                                {state.state_name}
                                                            </option>
                                                        ))
                                                        :
                                                        (
                                                            q.options.map(opt =>
                                                                <option key={opt.answer_id} value={opt.answer_id} >{opt.answer}</option>
                                                            )
                                                        )
                                                    }
                                                    {/* {q.options.map(opt =>
                                                    <option key={opt.answer_id} value={opt.answer_id}>{opt.answer}</option>
                                                )} */}
                                                </select>
                                            )}

                                            {/* Checkbox */}
                                            {q.answer_input_type === "checkbox" && (
                                                <div className="flex flex-col gap-3">
                                                    {q.options.map((opt) => (
                                                        <label
                                                            key={opt.answer_id}
                                                            className="flex items-center gap-2 text-[13px] border rounded-full px-1.5 border-[#A9A9A9] bg-[#F4F4F4] py-0.5"
                                                        >
                                                            <input type="checkbox"
                                                                value={opt.answer_id}
                                                                checked={Array.isArray(answers[q.question_id]) && answers[q.question_id].includes(opt.answer_id)}
                                                                onChange={() => handleCheckboxChange(q, opt.answer_id)} /> {opt.answer}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                    // <QuestionsSection
                                    //     questions={questions}
                                    //     answers={answers}
                                    //     handleInputChange={handleInputChange}
                                    //     handleCheckboxChange={handleCheckboxChange}
                                    //     profileContext={profileContext}
                                    //     states={states}
                                    // />
                                )}
                            </div>
                        )}

                        <div className="flex justify-between flex-wrap-reverse md:flex-wrap mt-6 w-full gap-4 md:gap-0 ">
                            {/* Left Side */}
                            <div className="flex flex-col text-sm mx-auto w-[13.5rem]  md:mx-0">
                                {currentStep >= 2 || selectedRisk === 1 ? (
                                    <button
                                        onClick={handleGetResult}
                                        className="flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer"
                                    >
                                        Book Appointment
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                            <ArrowRight width={17} />
                                        </span>
                                    </button>
                                ) : (
                                    <div className="w-[160px]" />
                                )}
                            </div>

                            {/* Right Side */}
                            <div className="flex gap-3 justify-between md:justify-end w-full md:w-[33%] ">
                                {currentStep > 0 ? (
                                    <div
                                        onClick={() => setCurrentStep((s) => s - 1)}
                                        className="flex flex-row justify-between items-center text-sm shadow-xl hover:shadow-lg/30 pr-3 pt-1 pb-1 
                          border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer gap-3 pl-1 "
                                        style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                    >
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ">
                                            <ArrowLeft width={17} />
                                        </span>
                                        <button className="cursor-pointer">Previous</button>
                                    </div>
                                ) : (
                                    <div className="w-[160px]" />
                                )}
                                {currentStep < steps.length && currentStep < 4 ? selectedRisk !== 1 && (
                                    <button
                                        disabled={currentStep === 0 && !isStep1Complete}
                                        onClick={() =>
                                            setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
                                        }
                                        className={`relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
                text-white rounded-full cursor-pointer ${currentStep === 0 && !isStep1Complete
                                                ? 'bg-gray-400 cursor-not-allowed opacity-70 ' // Disabled styles
                                                : 'bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white'}`}
                                    >
                                        Next
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                            <ArrowRight width={17} />
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleGetResult}
                                        className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
               bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer"
                                    >
                                        Get Result
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                            <ArrowRight width={17} />
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* ------------------ FLOATING CHAT WIDGET (Laptop only) ------------------ */}
                {/* <div className="hidden lg:flex absolute bottom-0 right-0 lg:right-[-24px]  lg:bottom-10 2xl:right-3 2xl:bottom-6 gap-4 rounded-full cursor-pointer bg-gray-200 shadow-lg">
                    <img
                        src={chatbot}
                        alt="Ask"
                        className="w-14 h-14 rounded-full border absolute top-[-26%] right-[92%]"
                    />
                    <div className="flex items-center">
                        <SearchIcon color="#838383" className="w-4 h-4 ml-4 mr-2" />
                        <input
                            type="text"
                            placeholder="Ask a question"
                            className=" text-gray-700 outline-none text-xs w-22 "
                        />
                        <button className="bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                            <Mic />
                        </button>
                    </div>
                </div> */}
            </div>

        </div>
    );
}
