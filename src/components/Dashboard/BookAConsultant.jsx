import { ArrowRight } from 'lucide-react'
import React from 'react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
const BookAConsultant = ({ setSubView, setSelectedView }) => {
    return (
        <div className='rounded-r-4xl w-full md:border md:border-gray-300 md:border-l-0 md:shadow-sm pt-5 md:px-4 xl:pt-8 xl:px-10'>
            <div className='flex flex-col md:flex-row  gap-4 md:justify-between md:items-center'>
                <div className='flex items-center justify-between'>
                    <p className='text-[#0063B9]  text-[25px] md:text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Book a Teleconsultation</p>
                    <div className='relative md:hidden' onClick={() => setSelectedView("Notifications")}>
                        <img src={NotificationMobileIcon} alt="Notification icon" className='lg:hidden  ' />
                        <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                </div>
                <p
                    onClick={() => { setSubView('Past Consultation') }}
                    className='text-[13px] xl:text-sm text-[#323FF7] underline cursor-pointer'>View past Consultation</p>
            </div>
            <div className='w-full rounded-2xl shadow-sm md:h-[53%] mt-[2rem] mb-[1rem] px-3 py-4 md:pt-3 md:p-8 ' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl text-sm mt-6">
                    {/* Row 1 */}

                    <div className="flex flex-col" >
                        <label className="text-[#11688F] mb-2">Type of Consultation*</label>
                        <select defaultValue={'Select Type of Consultation'} className=" w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9] " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                            <option disabled >Select Type of Consultation</option>
                            <option>Online</option>
                            <option>Offline</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[#11688F] mb-2">Select Service*</label>
                        <select defaultValue={'Select Service'} style={{ fontFamily: "Sofia Pro", fontWeight: 300 }} className="w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9]">
                            <option disabled >Select Service</option>
                            <option>General Checkup</option>
                            <option>Specialist</option>
                        </select>
                    </div>

                    {/* Row 2 */}
                    <div className='flex gap-4 md:block'>

                        <div className="flex flex-col w-1/2 md:w-full ">
                            <label className="text-[#11688F] mb-2">Select Date*</label>
                            <input type='date' style={{ fontFamily: "Sofia Pro", fontWeight: 300 }} className="w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-1 pl-4 py-0.5 outline-none text-[#A9A9A9]" />
                        </div>

                        <div className="flex flex-col w-1/2 md:w-full md:mt-6">
                            <label className="text-[#11688F] mb-2">Select Language*</label>
                            <select defaultValue={'Select Language'} style={{ fontFamily: "Sofia Pro", fontWeight: 300 }} className="w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9]">
                                <option disabled>Select Language</option>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex flex-col">
                        <label className="text-[#11688F] mb-2">Select Time*</label>
                        <select defaultValue={'Select Time'} style={{ fontFamily: "Sofia Pro", fontWeight: 300 }} className="w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9]">
                            <option disabled >Select Time</option>
                            <option>10:00 AM</option>
                            <option>12:00 PM</option>
                        </select>

                    </div>
                </div>

            </div>
            <div className='mt-[1.7rem]'>
                <button
                    onClick={() => {
                        setSelectedView("Home");
                        setSubView('Appointment Detail')
                    }}
                    style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                    className="text-sm relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                                bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                                text-white rounded-full cursor-pointer gap-8"
                >
                    Book consultation
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg  ">
                        <ArrowRight width={17} />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default BookAConsultant