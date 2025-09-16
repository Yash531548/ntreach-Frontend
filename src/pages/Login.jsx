
import React, { useState } from 'react'
import WHO from '../assets/login/WHO.jpg'
import Who from '../assets/login/Who.png'
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';


const Login = () => {
    const { login } = useAuth();
    const [step, setStep] = useState(1); // track form step
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [profile, setProfile] = useState({
        name: "",
        age: "",
        gender: "",
        state: "",
        district: "",
        email: "",
        language: ""
    });
    const navigate = useNavigate();  // ✅ initialize
    const handlePhoneSubmit = () => {
        console.log("Phone Number Submitted:", phoneNumber);
        // call API to send OTP here
        setStep(2);
    };

    const handleOtpSubmit = () => {
        console.log("OTP Submitted:", otp);
        // call API to verify OTP here

        setStep(3);
    };

    const handleProfileSubmit = () => {
        console.log("Profile Data:", profile);
        // final API call to save profile
        const userData = { token: 'xyz', profile };
        login(userData);
        // ✅ redirect to dashboard
        navigate("/dashboard");
    };

    return (
        <div className="  w-full mt-2 lg:min-h-[calc(100vh-64px-60px)]  2xl:min-h-[calc(100vh-64px-60px)] flex items-center justify-center  max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-12 ">
            <main className="w-full 
            lg:min-h-[calc(100vh-64px-120px)] 
                   flex flex-col md:flex-row 
                   md:shadow-[0px_0px_13px_-5px_#00000026] md:rounded-4xl   ">
                {/* LEFT SIDE - FORMS */}
                <div className="w-full md:w-1/2 md:px-7 md:py-12 lg:p-12 lg:pl-16 py-6">
                    {step === 1 && (
                        <>
                            <div className="text-black text-[28px]  md:text-3xl lg:text-4xl xl:text-[40px] font-normal md:font-medium " style={{ fontFamily: "Sofia Pro" }}>
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
                                <button
                                    onClick={handlePhoneSubmit}
                                    //             className="w-[60%] md:w-[65%] lg:w-[45%] xl:w-[30%] py-2 md:py-1   bg-gradient-to-b from-[#323FF7] via-[#323FF7] to-[#33AEE5] 
                                    //  text-white rounded-4xl text-sm md:text-[14px]  cursor-pointer hover:shadow-lg/30"
                                    className="w-[50%] md:w-[65%] lg:w-[45%] xl:w-[30%] py-2 md:py-1.5 ml-[6px]  border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] 
                         text-white rounded-4xl text-sm md:text-[13px]  cursor-pointer  shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] "
                                >
                                    Send Login Code
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="text-black text-3xl  md:text-3xl lg:text-4xl xl:text-[40px] font-normal md:font-medium " style={{ fontFamily: "Sofia Pro" }}>
                                <h1>Login With </h1>
                                <h1 className='md:mt-2'>Mobile Number</h1>
                            </div>
                            <div className="flex flex-col items-start mt-6 md:mt-18  gap-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                <input
                                    type="text"
                                    // value={phoneNumber}
                                    value={91925}
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
                                <div className="w-full lg:w-[80%] flex justify-between mt-2 ">
                                    <button
                                        onClick={handleOtpSubmit}
                                        className="w-[35%] lg:w-[28%]  ml-[6px] py-1.5 border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)]  text-white rounded-3xl text-[13px]  cursor-pointer shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040]"
                                    >
                                        Next
                                    </button>
                                    <button className="cursor-pointer text-[#5B5B5B] underline text-sm  md:text-[13px]">
                                        Resend Login Code
                                    </button>
                                </div>

                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="text-black text-3xl  md:text-3xl lg:text-4xl xl:text-[40px]        lg:whitespace-normal " style={{ fontFamily: "Sofia Pro", fontWeight: 500 }}>
                                <h1 className='whitespace-nowrap'>Complete Your  <span className='lg:hidden'>Profile</span> </h1>
                                <h1 className='hidden lg:block md:mt-2 md:mr-0'>Profile</h1>
                            </div>

                            <div className="flex flex-col items-start mt-6 gap-3" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                {/* Row 1: Name */}
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    placeholder="Name*"
                                    className="outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full lg:w-[80%] py-3 placeholder:text-[#A9A9A9]"
                                />

                                {/* Row 2: Age + Gender */}
                                <div className="flex gap-4 w-full lg:w-[80%]">
                                    <input
                                        type="number"
                                        value={profile.age}
                                        onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                        placeholder="Age"
                                        className="outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-1/2 py-3 placeholder:text-[#A9A9A9]"
                                    />
                                    <input
                                        type="text"
                                        value={profile.gender}
                                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                        placeholder="Gender*"
                                        className="outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-1/2 py-3 placeholder:text-[#A9A9A9]"
                                    />
                                </div>

                                {/* Row 3: State + District */}
                                <div className="flex gap-4 w-full lg:w-[80%]">
                                    <div className='relative  w-1/2'>

                                        <select
                                            value={profile.state || ""}
                                            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                                            className="outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-full  py-3 text-[#A9A9A9] appearance-none "
                                        >
                                            <option value="">State</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Karnataka">Karnataka</option>
                                        </select>
                                        <ChevronDown className="absolute bottom-0 right-3 -translate-y-3 text-black pointer-events-none" width={15} />
                                    </div>
                                    <input
                                        type="text"
                                        value={profile.district || ""}
                                        onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                                        placeholder="District"
                                        className="outline-none bg-[#F4F4F4] px-6 rounded-[30px] w-1/2 py-3 placeholder:text-[#A9A9A9]"
                                    />
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

                                {/* Submit */}

                                <button
                                    onClick={handleProfileSubmit}
                                    className="w-[40%] lg:w-[26%] xl:w-[22%] ml-[4px] mt-2 py-[6px] bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-4xl text-[13px]  cursor-pointer  shadow-[0px_2px_5.6px_0px_#00000040] hover:shadow-[0px_2px_5.6px_5px_#00000040] "
                                >
                                    Login
                                </button>
                            </div>
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
