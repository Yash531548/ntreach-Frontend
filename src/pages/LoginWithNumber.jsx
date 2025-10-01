import React, { useEffect, useState } from 'react'
import Hand from '../assets/login/Hand.png'
import { useNavigate } from 'react-router';
import { useAuth } from '../Context/AuthContext';
import { sendOtp, verifyOtp } from '../Api/Authentication/auth';

const LoginWithNumber = () => {
    const { login } = useAuth();
    const [step, setStep] = useState(1); // track form step
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();  // ✅ initialize
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('')
            }, 3000// 3 second
            )
            return () => clearTimeout(timer); // cleanup on unmount / re-run 
        }
    }, [error])
    const handlePhoneSubmit = async () => {
        // console.log("Phone Number Submitted:", phoneNumber);
        if (!phoneNumber.trim()) {
            setError("Please enter your mobile number.");
            return;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            setError("Enter a valid 10-digit mobile number.");
            return;
        }
        // call API to send OTP here
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
            setError('OTP failed, try again later.');
            // setStep(2); // still move forward
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        console.log("OTP Submitted:", otp);
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        if (!/^\d{4}$/.test(otp)) {
            setError("Enter a valid 4-digit code.");
            return;
        }
        setLoading(true);
        setError("");
        // call API to verify OTP here
        try {
            const response = await verifyOtp(phoneNumber, otp);
            if (response.token && response.status) {
                console.log("response: token : ", response.token);
                const userData = { token: response.token }; // replace with real data
                login(userData);
                navigate('/questionnaire');
            } else {
                setError(response.message || "Invalid OTP or login failed");
            }

        } catch (error) {
            setError('Login failed, check OTP and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="  w-full mt-2 lg:min-h-[calc(100vh-64px-60px)]  2xl:min-h-[calc(100vh-64px-60px)] flex items-center justify-center  max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-12 ">
            <main className="w-full 
        
                    lg:min-h-[calc(100vh-64px-120px)] 
                        flex flex-col md:flex-row 
                        md:shadow-sm md:rounded-4xl   ">

                {/* LEFT SIDE - FORMS */}
                <div className="w-full md:w-1/2  md:px-7 md:py-12 lg:p-12 lg:pl-16 py-6">
                    {step === 1 && (
                        <>
                            <div className="text-black text-3xl lg:text-4xl xl:text-[2.625rem]" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                                <h1>Enter Mobile </h1>
                                <h1 className='mt-2'>Number</h1>
                            </div>
                            <div className="flex flex-col items-start mt-6 md:mt-18 gap-5" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter mobile number"
                                    // className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3 "
                                    className='outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3 placeholder:text-[#878787]'
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
                                    //             className="w-[35%] md:w-[35%] lg:w-[40%] xl:w-[22%] py-2   bg-gradient-to-b from-[#323FF7] via-[#323FF7] to-[#33AEE5] 
                                    //  text-white rounded-4xl text-sm md:text-[16px]  cursor-pointer hover:shadow-lg/30"
                                    className={`w-[50%] md:w-[65%] lg:w-[45%] xl:w-[30%] py-2 md:py-1.5 ml-[6px]  border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] 
                         text-white rounded-4xl text-sm md:text-[13px]  cursor-pointer  shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] ${loading ? "opacity-70 cursor-not-allowed" : ""} `}
                                >
                                    {loading ? "Sending OTP.." : "Verfiy"}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="text-3xl lg:text-4xl xl:text-[2.625rem] text-black" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                                <h1>Enter Login Code</h1>
                                {/* <h1 className='mt-2'>Mobile Number</h1> */}
                            </div>
                            <div className="flex flex-col items-start mt-6 md:mt-18  gap-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    disabled
                                    placeholder="Mobile number"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3"
                                />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter Code"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3"
                                />
                                {error && (
                                    <div className="mt-2 text-sm text-red-700 transition-opacity duration-500 ease-in-out">
                                        {error}
                                    </div>
                                )}
                                <div className="w-full lg:w-[80%] flex justify-between ">
                                    <button
                                        disabled={loading}
                                        onClick={handleOtpSubmit}
                                        // className="w-[35%] lg:w-[27%] ml-[5px] py-1.5 bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-3xl text-md  cursor-pointer hover:shadow-lg/30"
                                        className={`w-[50%] md:w-[65%] lg:w-[45%] xl:w-[30%] py-2 md:py-1.5 ml-[6px]  border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] 
                         text-white rounded-4xl text-sm md:text-[13px]  cursor-pointer  shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] ${loading ? "opacity-70 cursor-not-allowed": ""}`}
                                    >
                                        {loading ? "Sending OTP.." : "Verfiy"}
                                    </button>
                                    <button disabled={loading} onClick={handlePhoneSubmit} className={`cursor-pointer text-[#5B5B5B] underline text-sm  md:text-[13px] ${loading ? "cursor-not-allowed opacity-50" : ""} `}>
                                        {loading ? "Resending..." : "Resend Login Code"}
                                    </button>
                                </div>

                            </div>
                        </>
                    )}
                </div>

                {/* RIGHT SIDE - IMAGE */}
                <div className="hidden md:flex w-1/2 items-center justify-center">
                    <img src={Hand} alt="world health organisation" className="rounded-[40px] w-[70%] md:w-[90%] lg:w-[75%] xl:w-[65%] 2xl:w-[70%]" />
                </div>
            </main>
        </div>
    )
}

export default LoginWithNumber