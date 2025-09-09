import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import CounsellarFormImage from "../assets/Static/CounsellarForm.png"

const CounsellarForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
            setIsSubmitted(true);

    };

    const fontStack = `"Sofia Pro", "Helvetica Neue", Helvetica, Arial, sans-serif`;

    return (
        <div
            className="container w-full min-h-[calc(100vh-64px-60px)] flex items-center justify-center mx-auto
                 px-4 sm:px-4 lg:px-10 xl:px-0"
            style={{ fontFamily: fontStack, fontWeight: 400 }}
        >
            <main
                className="max-w-[1050px] md:min-h-[calc(100vh-64px-100px)] flex justify-between
                   lg:max-w-[850px] lg:justify-center xl:max-w-[1050px] gap-8"
            >
                <div className="container w-full md:w-[400px] md:max-w-[500px] xl:w-[500px] md:min-h-[calc(100vh-64px-100px)]
                        xl:min-h-[calc(100vh-64px-100px)] flex flex-col gap-8 pt-2 mt-8 md:mb-3 xl:mb-0">
                    <div>
                        <h1 className="text-black text-[26px] lg:text-4xl xl:text-[40px] whitespace-nowrap xl:mt-6">
                            Contact Counsellor Form
                        </h1>
                    </div>
                    {!isSubmitted ? (
                        <form
                            onSubmit={handleSubmit}
                            className="container rounded-4xl w-full max-w-md min-h-[55vh] shadow-sm p-6 bg-white flex flex-col gap-4"
                            style={{ fontFamily: fontStack }}
                        >
                            <div className="relative">
                                <label htmlFor="Name" className="text-[#11688F] text-base">Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    id="Name"
                                    className="w-full appearance-none bg-[#F4F4F4] rounded-full px-4 py-0.5 pr-10 mt-1 text-[#7E7E7E] outline-none text-sm"
                                    style={{ fontFamily: fontStack, fontWeight: 300 }}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="Counsellor" className="text-[#11688F] text-base">Select Counsellor</label>
                                <select
                                    id="Counsellor"
                                    defaultValue="Select Counsellor"
                                    className="w-full appearance-none bg-[#F4F4F4] rounded-full px-4 py-0.5 pr-10 mt-1 text-[#A9A9A9] outline-none text-sm"
                                    style={{ fontFamily: fontStack, fontWeight: 300 }}
                                >
                                    <option disabled>Select Counsellor</option>
                                    <option>Pune</option>
                                    <option>Mumbai</option>
                                    <option>Bengaluru</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-3/4 -translate-y-[10px] text-gray-500 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <label htmlFor="Mobile" className="text-[#11688F] text-base">Mobile Number</label>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    id="Mobile"
                                    className="w-full appearance-none bg-[#F4F4F4] rounded-full px-4 py-0.5 pr-10 mt-1 text-[#7E7E7E] outline-none text-sm"
                                    style={{ fontFamily: fontStack, fontWeight: 300 }}
                                />
                            </div>
                            <div>
                                <label htmlFor="Message" className="text-[#11688F] text-base">Message/Query</label>
                                <textarea
                                    id="Message"
                                    name="Message"
                                    placeholder="Write your message here..."
                                    rows={4}
                                    className="w-full bg-[#F4F4F4] rounded-2xl pl-4 pr-3 py-2 text-[#A9A9A9] outline-none text-sm mt-1"
                                    style={{ fontFamily: fontStack, fontWeight: 300 }}
                                />
                            </div>
                            <button className="w-full cursor-pointer py-2 rounded-full text-white font-medium bg-gradient-to-b from-[#323FF7] to-[#33AEE5] shadow-lg">
                                Submit
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-col justify-center items-center min-h-[55vh] container rounded-4xl w-full max-w-md shadow-sm bg-white p-4 md:p-0">
                            <span className="text-black text-[22px] md:text-[25px] text-center font-normal">Form Is Submitted Successfully</span>
                            <span className="mt-4 text-black text-base text-center">We Will Reach Out to You Shortly</span>
                        </div>
                    )}
                </div>
                <div className="container md:flex justify-center items-center hidden ">
                    <img src={CounsellarFormImage} alt="CounsellarForm" className="w-full h-[330px] object-contain" />
                </div>
            </main>
        </div>
    );
}

export default CounsellarForm
