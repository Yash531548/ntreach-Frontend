import React from 'react'
import RiskMeter from './RiskMeter';
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import Announcement from './Announcement';
const Health = ({ setSubView ,setActive }) => {
    const upcoming = [
        { id: 1, date: "24/01/25", type: "Test Centre Visit", time: "10:00 AM", location: "City Hospital" },
        { id: 2, date: "24/01/25", type: "Teleconsultation", time: "02:00 PM", location: "Online" },
        { id: 3, date: "25/01/25", type: "Follow-up", time: "09:30 AM", location: "Clinic A" },
        { id: 4, date: "26/01/25", type: "Test Centre Visit", time: "11:00 AM", location: "Health Centre B" },
        { id: 5, date: "27/01/25", type: "Teleconsultation", time: "01:00 PM", location: "Online" },
        { id: 6, date: "28/01/25", type: "Follow-up", time: "03:00 PM", location: "Clinic C" },
        { id: 7, date: "29/01/25", type: "Test Centre Visit", time: "08:45 AM", location: "Diagnostic Lab" },
        { id: 8, date: "30/01/25", type: "Teleconsultation", time: "12:15 PM", location: "Online" },
        { id: 9, date: "31/01/25", type: "Follow-up", time: "04:00 PM", location: "City Hospital" },
        { id: 10, date: "01/02/25", type: "Test Centre Visit", time: "10:30 AM", location: "Clinic D" },
    ];
    
    return (
        <div className='rounded-4xl lg:rounded-r-4xl w-full md:border md:border-gray-300 border-l-0 md:shadow-sm py-5 md:px-5 xl:pt-8 xl:px-10'>
            <div className='flex  items-center justify-between gap-4'>
                <p className='text-black text-[25px] md:text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>My Health Dashboard</p>
                <div className='relative' onClick={()=>setActive("Notifications")}>
                    <img src={NotificationMobileIcon} alt="Notification icon" className='lg:hidden  ' />
                    <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </div>
            <div className="w-full h-[30vh] overflow-y-auto overflow-x-auto rounded-2xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4 " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                <p className='text-lg' style={{ fontFamily: "Sofia Pro", fontWeight: 600 }}>Reminders</p>
                <table  className="w-full text-left border-collapse overflow-y-auto overflow-x-auto   ">
                    {/* Table Header */}
                    <thead>
                        <tr className="text-black text-xs" >
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Date</th>
                            <th className="py-3 px-4 whitespace-nowrap" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Upcoming Appointments</th>
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Time</th>
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Location</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {upcoming.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`text-xs text-left hover:bg-[#E9F8FF] hover:border-0 border-b border-b-[#DEDEDE]  `}
                            >
                                <td className="py-3 px-4 rounded-l-full">{item.date}</td>
                                <td className="py-3 px-4">{item.type}</td>
                                <td className="py-3 px-4">{item.time}</td>
                                <td className="py-3 px-4">{item.location}</td>
                                <td className="py-3 px-4 text-[#0078D4] cursor-pointer rounded-r-full">
                                    <button
                                        onClick={() => { setSubView('Appointment Detail') }}
                                        className="text-[#323FF7] hover:underline cursor-pointer whitespace-nowrap">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-col md:flex-row gap-3'>
                {/* <div className='rounded-2xl w-[40%] h-[27vh] border border-gray-300 border-l-0 shadow-sm pt-3 p-4'>
                    <p className='text-lg' style={{ fontFamily: "Sofia Pro", fontWeight: 600 }}>My Risk Meter</p>
                </div> */}
                < RiskMeter />
                <Announcement/>
            </div>
        </div>
    )
}

export default Health