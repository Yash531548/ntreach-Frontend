import { ArrowRight, CircleArrowLeft } from 'lucide-react'
import React from 'react'

const AppointmentDetail = ({ setSubView, setSelectedView }) => {
    const appointment = {
        appointmentType: "Audio Teleconsultation",
        serviceType: "HIV Test",
        date: "24/01/25",
        time: "10:00 AM",
        location: "Online",
        joiningInfo: "Team Link",
    };
    return (
        <div className='rounded-r-4xl w-full border border-gray-300 border-l-0 shadow-sm pt-5 px-5 xl:pt-8 xl:px-10'>
            <div className='flex  items-center gap-4'>
                {/* 👇 Add click handler */}
                <CircleArrowLeft className='text-gray-700 cursor-pointer '
                    onClick={() => setSubView(null)}
                />
                <p className='text-[#1475A1] text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Details</p>
            </div>
            <div className='w-full rounded-4xl shadow-sm  xl:h-[32vh] mt-[2rem] mb-[1rem] pt-6 p-8' style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                {/* Grid Layout */}
                <div className="grid grid-cols-3 gap-y-6 gap-x-5 xl:gap-x-10 text-sm">
                    {/* Row 1 */}
                    <div>
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Type</p>
                        <p className="mt-1 ">{appointment.appointmentType}</p>
                    </div>
                    <div>
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Type of Service</p>
                        <p className="mt-1">{appointment.serviceType}</p>
                    </div>
                    <div /> {/* Empty cell to keep 3-column structure */}

                    {/* Row 2 */}
                    <div>
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Date</p>
                        <p className="mt-1">{appointment.date}</p>
                    </div>
                    <div>
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Time</p>
                        <p className="mt-1">{appointment.time}</p>
                    </div>
                    <div>
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Location</p>
                        <p className="mt-1">{appointment.location}</p>
                    </div>

                    {/* Row 3 (Joining Info full width across all 3 cols) */}
                    <div className="col-span-3">
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Joining Info</p>
                        <p className="mt-1">{appointment.joiningInfo}</p>
                    </div>
                </div>
            </div>
            <div className='mt-[1.7rem]'>
                <button
                    onClick={() => {
                        setSelectedView("Upcoming Appointments")
                        setSubView("Reschedule")
                    }}
                    style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                    className="text-sm relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                                bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                                text-white rounded-full cursor-pointer gap-3 "
                >
                    Reschedule Appointment
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg  ">
                        <ArrowRight width={17} />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default AppointmentDetail