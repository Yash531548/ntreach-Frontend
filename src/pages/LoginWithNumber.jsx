import React, { useState } from 'react'
import Hand from '../assets/login/Hand.png'
import { useNavigate } from 'react-router';
import { useAuth } from '../Context/AuthContext';
const LoginWithNumber = () => {
    const { login } = useAuth();
    const [step, setStep] = useState(1); // track form step
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();  // ✅ initialize
    const handlePhoneSubmit = () => {
        console.log("Phone Number Submitted:", phoneNumber);
        // call API to send OTP here
        setStep(2);
    };

    const handleOtpSubmit = () => {
        console.log("OTP Submitted:", otp);
        // call API to verify OTP here
        const userData = { token: 'xyz' }; // replace with real data
        login(userData);
        navigate("/questionnaire");
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
                                <button
                                    onClick={handlePhoneSubmit}
                                    //             className="w-[35%] md:w-[35%] lg:w-[40%] xl:w-[22%] py-2   bg-gradient-to-b from-[#323FF7] via-[#323FF7] to-[#33AEE5] 
                                    //  text-white rounded-4xl text-sm md:text-[16px]  cursor-pointer hover:shadow-lg/30"
                                    className='w-[50%] md:w-[65%] lg:w-[45%] xl:w-[30%] py-2 md:py-1.5 ml-[6px]  border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] 
                         text-white rounded-4xl text-sm md:text-[13px]  cursor-pointer  shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] '
                                >
                                    Verify
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
                                    placeholder="Enter mobile number"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3"
                                />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter Code"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3"
                                />
                                <div className="w-full lg:w-[80%] flex justify-between ">
                                    <button
                                        onClick={handleOtpSubmit}
                                        // className="w-[35%] lg:w-[27%] ml-[5px] py-1.5 bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-3xl text-md  cursor-pointer hover:shadow-lg/30"
                                        className='w-[50%] md:w-[65%] lg:w-[45%] xl:w-[30%] py-2 md:py-1.5 ml-[6px]  border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] 
                         text-white rounded-4xl text-sm md:text-[13px]  cursor-pointer  shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] '
                                    >
                                        Verify
                                    </button>
                                    <button className="cursor-pointer text-[#5B5B5B] underline text-sm  md:text-[13px]">
                                        Resend Login Code
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