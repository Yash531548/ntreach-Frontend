import { ArrowRight, CircleArrowLeft } from 'lucide-react'
import React from 'react'

const RescheduleAppointment = ({ setSubView ,setSelectedView}) => {
    return (
        <div className='rounded-r-4xl w-full border border-gray-300 border-l-0 shadow-sm pt-8 px-10'>
            <div className='flex  items-center gap-4'>
                {/* 👇 Add click handler */}
                <CircleArrowLeft className='text-gray-700 cursor-pointer'
                    onClick={() => setSubView(null)}
                />
                <p className='text-[#1475A1] text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Reschedule your Teleconsultation</p>
            </div>
            <div className='w-full rounded-4xl shadow-sm h-[53%] mt-[2rem] mb-[1rem] pt-3 p-8 ' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                <div className="grid grid-cols-2 gap-6 w-full max-w-3xl text-sm mt-6">
                    {/* Row 1 */}
                    <div className="flex flex-col" >
                        <label className="text-[#11688F] mb-2">Type of Consultation*</label>
                        <select className=" w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9] " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                            <option disabled selected>Select Type of Consultation</option>
                            <option>Online</option>
                            <option>Offline</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[#11688F] mb-2">Select Service*</label>
                        <select style={{ fontFamily: "Sofia Pro", fontWeight: 300 }} className="w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9]">
                            <option disabled selected>Select Service</option>
                            <option>General Checkup</option>
                            <option>Specialist</option>
                        </select>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col">
                        <label className="text-[#11688F] mb-2">Select Date*</label>
                        <select style={{ fontFamily: "Sofia Pro", fontWeight: 300 }} className="w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9]">
                            <option disabled selected>Select Date</option>
                            <option>2024-08-01</option>
                            <option>2024-08-02</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[#11688F] mb-2">Select Time*</label>
                        <select style={{ fontFamily: "Sofia Pro", fontWeight: 300 }} className="w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9]">
                            <option disabled selected>Select Time</option>
                            <option>10:00 AM</option>
                            <option>12:00 PM</option>
                        </select>
                    </div>

                    {/* Row 3 */}
                    <div className="flex flex-col">
                        <label className="text-[#11688F] mb-2">Select Language*</label>
                        <select style={{ fontFamily: "Sofia Pro", fontWeight: 300 }} className="w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9]">
                            <option disabled selected>Select Language</option>
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

            </div>
            <div className='mt-[1.7rem]'>
                <button
                    onClick={()=>{
                        setSelectedView("Home")
                        setSubView("Appointment Detail")
                    }}
                    style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                    className="text-sm relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                                    bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                                    text-white rounded-full cursor-pointer gap-3"
                >
                    Update Appointment
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg  ">
                        <ArrowRight width={17} />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default RescheduleAppointment