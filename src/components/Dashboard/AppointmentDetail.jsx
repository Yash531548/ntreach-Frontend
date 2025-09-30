import { ArrowRight, CircleArrowLeft } from 'lucide-react'
import React from 'react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
const AppointmentDetail = ({ setSubView, setSelectedView, data }) => {
    const appointment = {
        appointmentType: data?.data?.type || '-',
        serviceType: data?.data?.service || '-',
        date: data?.data?.date || '-',
        time: data?.data?.time || '-',
        language: data?.data?.language || '-',
        joiningInfo: data?.meet_link || '-',
    };
    return (
        <div className='rounded-r-4xl w-full md:border md:border-gray-300 md:border-l-0 md:shadow-sm pt-5 md:px-5 xl:pt-8 xl:px-10'>
            <div className='flex justify-between items-center '>
                <div className='flex items-center gap-2 md:gap-4 justify-center'>
                    {/* 👇 Add click handler */}
                    <CircleArrowLeft className='text-gray-700 cursor-pointer '
                        onClick={() => setSubView(null)}
                    />
                    <p className='text-[#1475A1] text-[25px] md:text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Details</p>
                </div>
                <div className='relative' onClick={() => setSelectedView("Notifications")}>
                    <img src={NotificationMobileIcon} alt="Notification icon" className='lg:hidden  ' />
                    <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </div>
            <div className='w-full rounded-2xl shadow-sm xl:h-[32vh] mt-[2rem] mb-[1rem] pt-6 p-8' style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                {/* Responsive Grid Layout */}
                <div className="
      grid 
      grid-cols-1 
      md:grid-cols-3 
      gap-y-6  
      gap-x-5 
      xl:gap-x-10 
      text-sm
    ">
                    {/* Row 1: Appointment Type (full width mobile, col 1 desktop) */}
                    <div>
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Type</p>
                        <p className="mt-1">{appointment.appointmentType}</p>
                    </div>
                    {/* Row 1: Type of Service (full width mobile, col 2 desktop) */}
                    <div className='hidden md:block'>
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Type of Service</p>
                        <p className="mt-1">{appointment.serviceType}</p>
                    </div>
                    {/* Empty on mobile, col 3 desktop */}
                    <div className="hidden md:block"></div>

                    {/* Row 2 (Date & Time) - paired on mobile, spread desktop */}
                    <div className="flex flex-row gap-6 w-full md:flex-col md:gap-0">
                        <div className="flex-1">
                            <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Date</p>
                            <p className="mt-1">{appointment.date}</p>
                        </div>
                    </div>

                    <div className="flex-1 flex  gap-8 md:hidden">
                        <div>
                            <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Time</p>
                            <p className="mt-1">{appointment.time}</p>
                        </div>
                        <div className=''>
                            <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Type of Service</p>
                            <p className="mt-1">{appointment.serviceType}</p>
                        </div>
                    </div>
                    {/* Only visible desktop: Time in own col */}
                    <div className="hidden md:block">
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Appointment Time</p>
                        <p className="mt-1">{appointment.time}</p>
                    </div>
                    {/* Location always in own col */}
                    <div className='hidden md:block'>
                        <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Language</p>
                        <p className="mt-1">{appointment.language}</p>
                    </div>

                    {/* Row 3 (Joining Info + Location together on mobile, split desktop) */}
                    <div className="flex flex-row gap-13 w-full md:flex-col md:gap-0 col-span-1">
                        <div className="flex-1">
                            <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Joining Info</p>
                            <a href={appointment.joiningInfo} className="whitespace-nowrap mt-1">{appointment.joiningInfo}</a>
                        </div>
                        <div className="flex-1 md:hidden">
                            <p className="text-[#11688F] font-medium" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Location</p>
                            <p className="mt-1">{appointment.location}</p>
                        </div>
                    </div>
                    {/* Desktop: Join Info spans only one col */}
                    <div className="hidden md:block col-span-2"></div>
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