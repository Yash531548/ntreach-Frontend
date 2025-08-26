
import React, { useState } from 'react'
import WHO from '../assets/login/WHO.jpg'
import Who from '../assets/login/Who.png'
import { useNavigate } from 'react-router';


const Login = () => {
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
        // ✅ redirect to dashboard
        navigate("/Dashboard");
    };

    return (
        // <div className="container w-full mt-2 min-h-[calc(100vh-64px-60px)] flex items-center justify-center">
        //     <main className="container max-w-[1200px] shadow-sm min-h-[calc(100vh-64px-120px)] rounded-4xl border border-gray-200 flex">

        //         {/* LEFT SIDE - FORMS */}
        //         <div className="w-1/2 p-12 pl-16">
        //             {step === 1 && (
        //                 <>
        //                     <div className="text-[#1475A1] text-5xl" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
        //                         <h1>Login with</h1>
        //                         <h1 className='mt-2'>Mobile Number</h1>
        //                     </div>
        //                     <div className="flex flex-col items-start mt-18 gap-5" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
        //                         <input
        //                             type="text"
        //                             value={phoneNumber}
        //                             onChange={(e) => setPhoneNumber(e.target.value)}
        //                             placeholder="Enter mobile number"
        //                             className="outline-none bg-gray-100 px-6 rounded-[30px] w-[80%] py-3"
        //                         />
        //                         <button
        //                             onClick={handlePhoneSubmit}
        //                             className="w-[30%] ml-[5px] py-1.5 bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-2xl text-sm cursor-pointer hover:shadow-lg/30"
        //                         >
        //                             Send Login Code
        //                         </button>
        //                     </div>
        //                 </>
        //             )}

        //             {step === 2 && (
        //                 <>
        //                     <div className="text-[#1475A1] text-5xl" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
        //                         <h1>Login with</h1>
        //                         <h1 className='mt-2'>Mobile Number</h1>
        //                     </div>
        //                     <div className="flex flex-col items-start mt-18 gap-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
        //                         <input
        //                             type="text"
        //                             value={phoneNumber}
        //                             disabled
        //                             placeholder="Enter mobile number"
        //                             className="outline-none bg-gray-100 px-6 rounded-[30px] w-[80%] py-3"
        //                         />
        //                         <input
        //                             type="text"
        //                             value={otp}
        //                             onChange={(e) => setOtp(e.target.value)}
        //                             placeholder="Enter OTP"
        //                             className="outline-none bg-gray-100 px-6 rounded-[30px] w-[80%] py-3"
        //                         />
        //                         <div className="w-[80%] flex justify-end">
        //                             <button className="cursor-pointer text-[#5B5B5B] underline text-sm ">
        //                                 Resend Login Code
        //                             </button>
        //                         </div>
        //                         <button
        //                             onClick={handleOtpSubmit}
        //                             className="w-[25%] ml-[5px] py-1.5 bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-2xl text-sm cursor-pointer hover:shadow-lg/30"
        //                         >
        //                             Next
        //                         </button>
        //                     </div>
        //                 </>
        //             )}

        //             {step === 3 && (
        //                 <>
        //                     <div className="text-[#1475A1] text-5xl" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
        //                         <h1>Complete Your</h1>
        //                         <h1 className='mt-2'>Profile</h1>
        //                     </div>

        //                     <div className="flex flex-col items-start mt-6 gap-3" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
        //                         {/* Row 1: Name */}
        //                         <input
        //                             type="text"
        //                             value={profile.name}
        //                             onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        //                             placeholder="Name*"
        //                             className="outline-none bg-gray-100 px-6 rounded-[30px] w-[80%] py-3"
        //                         />

        //                         {/* Row 2: Age + Gender */}
        //                         <div className="flex gap-4 w-[80%]">
        //                             <input
        //                                 type="number"
        //                                 value={profile.age}
        //                                 onChange={(e) => setProfile({ ...profile, age: e.target.value })}
        //                                 placeholder="Age"
        //                                 className="outline-none bg-gray-100 px-6 rounded-[30px] w-1/2 py-3"
        //                             />
        //                             <input
        //                                 type="text"
        //                                 value={profile.gender}
        //                                 onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
        //                                 placeholder="Gender*"
        //                                 className="outline-none bg-gray-100 px-6 rounded-[30px] w-1/2 py-3"
        //                             />
        //                         </div>

        //                         {/* Row 3: State + District */}
        //                         <div className="flex gap-4 w-[80%]">
        //                             <select
        //                                 value={profile.state || ""}
        //                                 onChange={(e) => setProfile({ ...profile, state: e.target.value })}
        //                                 className="outline-none bg-gray-100 px-6 rounded-[30px] w-1/2 py-3 text-gray-500"
        //                             >
        //                                 <option value="">State</option>
        //                                 <option value="Delhi">Delhi</option>
        //                                 <option value="Maharashtra">Maharashtra</option>
        //                                 <option value="Karnataka">Karnataka</option>
        //                             </select>

        //                             <input
        //                                 type="text"
        //                                 value={profile.district || ""}
        //                                 onChange={(e) => setProfile({ ...profile, district: e.target.value })}
        //                                 placeholder="District"
        //                                 className="outline-none bg-gray-100 px-6 rounded-[30px] w-1/2 py-3"
        //                             />
        //                         </div>

        //                         {/* Row 4: Email */}
        //                         <input
        //                             type="email"
        //                             value={profile.email || ""}
        //                             onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        //                             placeholder="Email ID"
        //                             className="outline-none bg-gray-100 px-6 rounded-[30px] w-[80%] py-3"
        //                         />

        //                         {/* Row 5: Preferred Language */}
        //                         <input
        //                             type="text"
        //                             value={profile.language || ""}
        //                             onChange={(e) => setProfile({ ...profile, language: e.target.value })}
        //                             placeholder="Preferred language"
        //                             className="outline-none bg-gray-100 px-6 rounded-[30px] w-[80%] py-3"
        //                         />

        //                         {/* Submit */}

        //                         <button
        //                             onClick={handleProfileSubmit}
        //                             className="w-[25%] ml-[4px] mt-2 py-1.5 bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-2xl text-sm cursor-pointer hover:shadow-lg/30 "
        //                         >

        //                                 Login

        //                         </button>
        //                     </div>
        //                 </>
        //             )}
        //         </div>

        //         {/* RIGHT SIDE - IMAGE */}
        //         <div className="w-1/2 flex items-center justify-center">
        //             <img src={WHO} alt="world health organisation" className="rounded-[40px] w-[65%]" />
        //         </div>
        //     </main>
        // </div>
        <div className="  w-full mt-2 md:min-h-[calc(100vh-64px-60px)]  2xl:min-h-[calc(100vh-64px-60px)] flex items-center justify-center  max-w-[1300px] mx-auto px-5 sm:px-6 lg:px-12 ">
            <main className="w-full 

            md:min-h-[calc(100vh-64px-120px)] 
                   flex flex-col md:flex-row 
                   md:shadow-sm md:rounded-4xl md:border md:border-gray-200  ">

                {/* LEFT SIDE - FORMS */}
                <div className="w-full md:w-1/2 md:p-12 md:pl-16 py-6">
                    {step === 1 && (
                        <>
                            <div className="text-[#1475A1] text-3xl  md:text-3xl lg:text-4xl xl:text-[40px] 2xl:text-5xl" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                                <h1>Login with</h1>
                                <h1 className='mt-2'>Mobile Number</h1>
                            </div>
                            <div className="flex flex-col items-start mt-6 md:mt-18 gap-5" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter mobile number"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3 "
                                />
                                <button
                                    onClick={handlePhoneSubmit}
                                    className="w-[60%] md:w-[60%] lg:w-[40%] xl:w-[35%] py-2   bg-gradient-to-b from-[#323FF7] via-[#323FF7] to-[#33AEE5] 
                         text-white rounded-4xl text-sm md:text-[16px]  cursor-pointer hover:shadow-lg/30"
                                >
                                    Send Login Code
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="text-[#1475A1] text-3xl  md:text-3xl lg:text-4xl xl:text-[40px] 2xl:text-5xl" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                                <h1>Login with</h1>
                                <h1 className='mt-2'>Mobile Number</h1>
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
                                    placeholder="Enter OTP"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3"
                                />
                                <div className="w-full lg:w-[80%] flex justify-between ">
                                    <button
                                    onClick={handleOtpSubmit}
                                    className="w-[50%] lg:w-[25%] ml-[5px] py-1.5 bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-3xl text-md  cursor-pointer hover:shadow-lg/30"
                                >
                                    Next
                                </button>
                                    <button className="cursor-pointer text-[#5B5B5B] underline text-sm  md:text-[16px]">
                                        Resend Login Code
                                    </button>
                                </div>
                                
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="text-[#1475A1] text-3xl  md:text-3xl lg:text-4xl xl:text-[40px] 2xl:text-5xl  md:whitespace-normal " style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                                <h1>Complete Your</h1>
                                <h1 className=' md:mt-2 md:mr-0'>Profile</h1>
                            </div>

                            <div className="flex flex-col items-start mt-6 gap-3" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                {/* Row 1: Name */}
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    placeholder="Name*"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3"
                                />

                                {/* Row 2: Age + Gender */}
                                <div className="flex gap-4 w-full lg:w-[80%]">
                                    <input
                                        type="number"
                                        value={profile.age}
                                        onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                        placeholder="Age"
                                        className="outline-none bg-gray-100 px-6 rounded-[30px] w-1/2 py-3"
                                    />
                                    <input
                                        type="text"
                                        value={profile.gender}
                                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                        placeholder="Gender*"
                                        className="outline-none bg-gray-100 px-6 rounded-[30px] w-1/2 py-3"
                                    />
                                </div>

                                {/* Row 3: State + District */}
                                <div className="flex gap-4 w-full lg:w-[80%]">
                                    <select
                                        value={profile.state || ""}
                                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                                        className="outline-none bg-gray-100 px-6 rounded-[30px] w-1/2 py-3 text-gray-500"
                                    >
                                        <option value="">State</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Karnataka">Karnataka</option>
                                    </select>

                                    <input
                                        type="text"
                                        value={profile.district || ""}
                                        onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                                        placeholder="District"
                                        className="outline-none bg-gray-100 px-6 rounded-[30px] w-1/2 py-3"
                                    />
                                </div>

                                {/* Row 4: Email */}
                                <input
                                    type="email"
                                    value={profile.email || ""}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    placeholder="Email ID"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3"
                                />

                                {/* Row 5: Preferred Language */}
                                <input
                                    type="text"
                                    value={profile.language || ""}
                                    onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                                    placeholder="Preferred language"
                                    className="outline-none bg-gray-100 px-6 rounded-[30px] w-full lg:w-[80%] py-3 "
                                />

                                {/* Submit */}

                                <button
                                    onClick={handleProfileSubmit}
                                    className="w-[50%] lg:w-[25%] ml-[4px] mt-2 py-1.5 bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-4xl text-md  cursor-pointer hover:shadow-lg/30 "
                                >
                                    Login
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* RIGHT SIDE - IMAGE */}
                <div className="hidden md:flex w-1/2 items-center justify-center">
                    <img src={Who} alt="world health organisation" className="rounded-[40px] w-[70%] md:w-[90%] lg:w-[75%] xl:w-[65%] 2xl:w-[70%]" />
                </div>
            </main>
        </div>
    );
};

export default Login;
