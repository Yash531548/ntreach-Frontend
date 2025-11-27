
import React, { useState, useEffect } from 'react'
import WHO from '../assets/login/WHO.jpg'
import Who from '../assets/login/Who.png'
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useUserProfile } from '../Context/UserProfileContext'
import { useVn } from '../Context/VnContext'
import { sendOtp, verifyOtp } from '../Api/Authentication/auth';
import { updateUserProfile } from '../Api/user/updateUserProfile';

import { fetchStates } from '../Api/getState';
import { fetchDistrictsApi } from '../Api/fetchDistrictsApi';
import { selfRiskAssessmentMaster } from "../Api/selfRiskAssessmentMaster.js";
import { selfRiskAssessmentItem } from "../Api/selfRiskAssessmentItem.js";

const Login = () => {
    const { user, login } = useAuth();
    const { userProfile, refetchUserProfile } = useUserProfile()
    const { vnData } = useVn()
    const [step, setStep] = useState(1); // track form step
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState({
        name: "",
        age: "",
        gender: "",
        state: "",
        district: "",
        email: "",
        language: "",
        tested_hiv_before: ""
    });
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);

    const selectedStateId = React.useMemo(() => {
        return states.find(s => s.state_name === profile.state)?.id || "";
    }, [states, profile.state]);

    const navigate = useNavigate();  // ✅ initialize
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 3000); // 3 seconds

            return () => clearTimeout(timer); // cleanup on unmount / re-run
        }
    }, [error]);

    useEffect(() => {
        if (user) {
            // If user has complete profile, redirect to dashboard
            if (user.user?.name && user.user?.gender && user.user?.state && user.user?.language && user.user?.x) {
                navigate("/dashboard");
            } else {
                // Auto-fill profile form
                setProfile({
                    name: user.user?.name === "New User" ? "" : (user.user?.name || ""),
                    age: userProfile?.items?.find(item => item.question_id == 2)?.answer_id || "",
                    gender: userProfile?.items?.find(item => item.question_id == 3)?.answer_id || "",
                    state: user.user?.state || "",
                    district: user.user?.district || "",
                    email: user.user?.email || "",
                    language: user.user?.language || "",
                    tested_hiv_before: userProfile?.items?.find(item => item.question_id == 22)?.answer_id || ""
                });
                setStep(3); // Move to profile step
            }
        }
    }, [user, userProfile, navigate]);

    useEffect(() => {
        const loadStates = async () => {
            try {
                const data = await fetchStates(); // fetch from API
                setStates(data); // store in state
            } catch (err) {
                console.error("Failed to fetch states", err);
            }
        };

        loadStates();
    }, []);

    useEffect(() => {
        const loadDistricts = async () => {
            if (!profile.state) {
                setDistricts([]);
                return;
            }
            const stateId = states.find(s => s.state_name === profile.state)?.id;
            if (!stateId) return;

            try {
                const data = await fetchDistrictsApi(stateId);
                setDistricts(data);
            } catch (err) {
                console.error("Failed to fetch districts", err);
                setDistricts([]);
            }
        };
        loadDistricts();
    }, [profile.state, states]);

    const handlePhoneSubmit = async () => {
        if (!phoneNumber.trim()) {
            setError("Please enter your mobile number.");
            return;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            setError("Enter a valid 10-digit mobile number.");
            return;
        }
        // call API to send OTP here
        // setStep(2);
        setLoading(true);
        setError("");
        try {
            const response = await sendOtp(phoneNumber);
            console.log("Full Response:", response);
            // response.data will contain your backend payload
            if (response.data?.status === "success") {
                console.log("Phone Number Submitted:", phoneNumber);
                // ✅ Only set step if we are not already in step 2
                if (step !== 2) setStep(2);
            }
        } catch (err) {
            setError('Code failed, try again later.');
            // setStep(2); // still move forward
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        console.log("OTP Submitted:", otp);
        console.log("Phone Submitted:", phoneNumber);
        // ✅ validation before calling API
        if (!otp) {
            setError("Please enter the Code.");
            return;
        }
        if (!/^\d{4}$/.test(otp)) {
            setError("Enter a valid 4-digit code.");
            return;
        }
        // call API to verify OTP here
        setLoading(true);
        setError("");
        try {
            const response = await verifyOtp(phoneNumber, otp);
            if (response.status && response.token) {
                console.log("user detail", response.user);
                login({ token: response.token, user: response.user });
                await refetchUserProfile();
                setStep(3); // next: profile fill step
            } else {
                setError(response.message || 'Invalid Code or login failed.');
            }
        } catch (err) {
            setError('Login failed, check Code and try again.');
        } finally {
            setLoading(false);
        }
    };

const handleProfileSubmit = async (e) => {
  e.preventDefault();

  console.log("Profile Data:", profile);
  setLoading(true);
  setError("");

  try {
    // Step 1: Update user profile
    const response = await updateUserProfile({
      name: profile.name,
      email: profile.email,
      language: profile.language,
      state: profile.state,
      district: profile.district,
    });

    const data = response.data;
    if (data?.status !== "success") {
      setError(data?.message || "Profile update failed.");
      return;
    }

    // Step 2: Update auth context
    const token = localStorage.getItem("userToken");
    login({ token, user: data.user });

    // Step 3: If risk assessment not created, call master API
    let riskAssessmentId = userProfile?.risk_assessment?.risk_assessment_id;

    const selectedState = states.find(s => s.state_name === profile.state);
    const stateCode = selectedState ? Number(selectedState.state_code) : null;

    if (!riskAssessmentId) {
      const masterPayload = {
        state: stateCode,
        vn_id: vnData?.id || null,
        mobile_no: user.user?.phone_number,
        raw_answer_sheet: {
          "mobile-number": user.user?.phone_number,
          age: profile.age,
          gender: profile.gender,
          "have-you-ever-tested-for-hiv-before": profile.tested_hiv_before,
        },
      };

      const masterRes = await selfRiskAssessmentMaster(masterPayload);
      console.log("Master API Response:", masterRes?.data);

      riskAssessmentId = masterRes?.data?.data?.risk_assessment_id || null;
    }

    // Step 4: Prepare step item data
    const itemsToSubmit = [
      { question_id: 2, answer_id: profile.age },
      { question_id: 3, answer_id: profile.gender },
      { question_id: 5, answer_id: stateCode },
      { question_id: 22, answer_id: profile.tested_hiv_before },
    ];

    if (itemsToSubmit.length && riskAssessmentId) {
      const itemPayload = {
        risk_assessment_id: riskAssessmentId,
        items: [...(userProfile?.items || []), ...itemsToSubmit],
      };

      const itemRes = await selfRiskAssessmentItem(itemPayload);
      console.log("Item API Response:", itemRes?.data);
    }

    // Step 5: Refetch user profile to sync updates
    await refetchUserProfile();

    // Step 6: Redirect to dashboard
    navigate("/dashboard");

  } catch (error) {
    console.error("Profile update error:", error);
    setError("Something went wrong while updating profile.");
  } finally {
    setLoading(false);
  }
};

    return (
        <div className="  w-full mt-2 lg:min-h-[calc(100vh-64px-60px)]  2xl:min-h-[calc(100vh-64px-60px)] flex items-center justify-center  max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-12 ">
            <main className="w-full 
            lg:min-h-[calc(100vh-64px-120px)] 
                   flex flex-col md:flex-row 
                   md:shadow-[0px_0px_13px_-5px_#00000026] md:rounded-4xl   ">
                {/* LEFT SIDE - FORMS */}
                <div className="w-full md:w-1/2 md:px-7 md:py-12 lg:p-12 lg:pl-16 py-6" translate="no">
                    {step === 1 && (
                        <>
                            <div className="text-black text-[28px]  md:text-3xl lg:text-4xl xl:text-[40px] font-normal md:font-medium " style={{ fontFamily: "Sofia Pro" }} translate="yes">
                                <h1>Login With  </h1>
                                <h1 className='block md:mt-2'>Mobile Number</h1>
                            </div>
                            <div className="flex flex-col items-start mt-6 md:mt-18 gap-5" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter mobile number"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3 placeholder:text-[#878787]"
                                />
                                {/* Show error here */}
                                {error && (
                                    <div className="mt-2 text-sm text-red-700 transition-opacity duration-500 ease-in-out">
                                        {error}
                                    </div>
                                )}
                                <button
                                    disabled={loading}
                                    onClick={handlePhoneSubmit}
                                    //             className="w-[60%] md:w-[65%] lg:w-[45%] xl:w-[30%] py-2 md:py-1   bg-gradient-to-b from-[#323FF7] via-[#323FF7] to-[#33AEE5] 
                                    //  text-white rounded-4xl text-sm md:text-[14px]  cursor-pointer hover:shadow-lg/30"
                                    className={`w-[50%] md:w-[65%] lg:w-[45%] xl:w-[30%] py-2 md:py-1.5 ml-[6px]  border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] 
                            text-white rounded-4xl text-sm md:text-[13px]  cursor-pointer  shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] ${loading ? "opacity-70 cursor-not-allowed" : ""} `}
                                >
                                    {loading ? "Sending Code..." : "Send Login Code"}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="text-black text-3xl  md:text-3xl lg:text-4xl xl:text-[40px] font-normal md:font-medium " style={{ fontFamily: "Sofia Pro" }} translate="yes">
                                <h1>Login With </h1>
                                <h1 className='md:mt-2'>Mobile Number</h1>
                            </div>
                            <div className="flex flex-col items-start mt-6 md:mt-18  gap-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    // value={91925}
                                    disabled
                                    placeholder="Enter mobile number"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3 text-[16px] placeholder:text-[#878787] "
                                />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter login code"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3 placeholder:text-[#878787]"
                                />
                                {/* Error message */}
                                {error && (
                                    <div className="mt-2 text-sm text-red-700 transition-opacity duration-500 ease-in-out">
                                        {error}
                                    </div>
                                )}

                                <div className="w-full lg:w-[80%] flex justify-between mt-2 ">
                                    <button
                                        disabled={loading}
                                        onClick={handleOtpSubmit}
                                        className={`w-[35%] lg:w-[28%]  ml-[6px] py-1.5 border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)]  text-white rounded-3xl text-[13px]  cursor-pointer shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                                    >
                                        {loading ? "Verifying Code..." : "Next"}
                                    </button>
                                    <button onClick={handlePhoneSubmit} // ✅ reuse same function
                                        disabled={loading}
                                        className={`cursor-pointer text-[#5B5B5B] underline text-sm  md:text-[13px] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                        {loading ? "Resending..." : "Resend Login Code"}
                                    </button>
                                </div>

                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="text-black text-3xl  md:text-3xl lg:text-4xl xl:text-[40px]        lg:whitespace-normal " style={{ fontFamily: "Sofia Pro", fontWeight: 500 }} translate="yes">
                                <h1 className='whitespace-nowrap'>Complete Your  <span className='lg:hidden'>Profile</span> </h1>
                                <h1 className='hidden lg:block md:mt-2 md:mr-0'>Profile</h1>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="flex flex-col items-start mt-6 gap-3" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                {/* Row 1: Name */}
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    required
                                    placeholder="Name*"
                                    className="outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full lg:w-[80%] py-3 placeholder:text-[#A9A9A9]"
                                />

                                {/* Row 2: Age + Gender */}
                                <div className="flex gap-4 w-full lg:w-[80%]">
                                    <div className='relative w-1/2'>
                                        <select
                                            value={profile.age}
                                            onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                                            required
                                            className={`outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full py-3 appearance-none ${!profile.age && 'text-[#A9A9A9]'}`}
                                        >
                                            <option value="" disabled>Age*</option>
                                            <option value={2}>18-29</option>
                                            <option value={3}>30-39</option>
                                            <option value={4}>40-49</option>
                                            <option value={5}>50+</option>
                                        </select>
                                        <ChevronDown className="absolute bottom-0 right-3 -translate-y-3 text-black pointer-events-none" width={15} />
                                    </div>
                                    <div className='relative w-1/2'>
                                        <select
                                            value={profile.gender}
                                            onChange={(e) => setProfile({ ...profile, gender: Number(e.target.value) })}
                                            required
                                            className={`outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full py-3 appearance-none ${!profile.gender && 'text-[#A9A9A9]'}`}
                                        >
                                            <option value="" disabled>Gender*</option>
                                            <option value={6}>Male</option>
                                            <option value={7}>Female</option>
                                            <option value={8}>Transgender</option>
                                            <option value={81}>Other</option>
                                        </select>
                                        <ChevronDown className="absolute bottom-0 right-3 -translate-y-3 text-black pointer-events-none" width={15} />
                                    </div>
                                </div>

                                {/* Row 3: State + District */}
                                <div className="flex gap-4 w-full lg:w-[80%]">
                                    {/* State Dropdown */}
                                    <div className='relative w-1/2'>
                                        <select
                                            value={selectedStateId} // use ID here
                                            onChange={(e) => {
                                                const stateId = e.target.value;
                                                const stateName = states.find(s => s.id === parseInt(stateId))?.state_name || "";
                                                setProfile({ ...profile, state: stateName, district: "" }); // store name, not id
                                            }}
                                            required
                                            className={`outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full py-3 appearance-none ${!profile.state && 'text-[#A9A9A9]'}`}
                                            >
                                            <option value="">State*</option>
                                            {states.map((state) => (
                                                <option key={state.id} value={state.id}>
                                                {state.state_name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute bottom-0 right-3 -translate-y-3 text-black pointer-events-none" width={15} />
                                    </div>

                                    {/* District Dropdown */}
                                    <div className='relative w-1/2'>
                                        <select
                                        value={profile.district || ""}
                                        onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                                        className={`outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full py-3 appearance-none ${!profile.district && 'text-[#A9A9A9]'}`}
                                        >
                                        <option value="">District</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.district_name}>
                                            {district.district_name}
                                            </option>
                                        ))}
                                        </select>
                                        <ChevronDown className="absolute bottom-0 right-3 -translate-y-3 text-black pointer-events-none" width={15} />
                                    </div>
                                </div>

                                {/* Row 4: Email */}
                                <input
                                    type="email"
                                    value={profile.email || ""}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    placeholder="Email ID"
                                    className="outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full lg:w-[80%] py-3 placeholder:text-[#A9A9A9]"
                                />

                                {/* Row 5: Preferred Language */}
                                <input
                                    type="text"
                                    value={profile.language || ""}
                                    onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                                    placeholder="Preferred language"
                                    className="outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full lg:w-[80%] py-3 placeholder:text-[#A9A9A9]"
                                />

                                <div className='relative w-full lg:w-[80%]'>
                                    <select
                                        value={profile.tested_hiv_before}
                                        onChange={(e) => setProfile({ ...profile, tested_hiv_before: Number(e.target.value) })}
                                        required
                                        className={`outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full py-3 appearance-none ${!profile.tested_hiv_before && 'text-[#A9A9A9]'}`}
                                    >
                                        <option value="" disabled>Have you ever tested for HIV before?*</option>
                                        <option value="83">Yes</option>
                                        <option value="84">No</option>
                                    </select>
                                    <ChevronDown className="absolute bottom-0 right-3 -translate-y-3 text-black pointer-events-none" width={15} />
                                </div>

                                {/* Submit */}

                                <button
                                    className="w-[40%] lg:w-[26%] xl:w-[22%] ml-[4px] mt-2 py-[6px] bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-4xl text-[13px]  cursor-pointer  shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] "
                                >
                                    Login
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* RIGHT SIDE - IMAGE */}
                <div className="hidden md:flex w-1/2 items-center justify-center">
                    <img src={Who} alt="world health organisation" className="rounded-[40px] w-[70%] md:w-[90%] lg:w-[75%] xl:w-[65%] 2xl:w-[63%] my-3" />
                </div>
            </main>
        </div>
    );
};

export default Login;
