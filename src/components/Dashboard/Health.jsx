import React from 'react'
import RiskMeter from './RiskMeter';

const Health = ({ setSubView }) => {
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
    const mockNotifications = [
        {
            id: 1,
            date: "24/01/25",
            time: "5–6pm",
            title: "Republic Day Special with Dance Event",
        },
        {
            id: 2,
            date: "24/01/25",
            time: "4–10pm",
            title: "“Gulabi Mela” Event",
        },
        {
            id: 3,
            date: "24/01/25",
            time: "5–6pm",
            title: "Republic Day Special with Dance Event",
        },
        {
            id: 4,
            date: "24/01/25",
            time: "5–6pm",
            title: "A New Service Provider Is Added",
        },
        {
            id: 5,
            date: "24/01/25",
            time: "5–6pm",
            title: "Tomorrow Is National Holiday",
        },
        // More mock notifications
        {
            id: 6,
            date: "25/01/25",
            time: "6–8pm",
            title: "Annual Cultural Fest Begins Today",
        },
        {
            id: 7,
            date: "25/01/25",
            time: "3–4pm",
            title: "System Maintenance Scheduled",
        },
        {
            id: 8,
            date: "26/01/25",
            time: "All Day",
            title: "Republic Day Parade – Don’t Miss It",
        },
        {
            id: 9,
            date: "27/01/25",
            time: "1–2pm",
            title: "New Health Checkup Camp Launched",
        },
        {
            id: 10,
            date: "27/01/25",
            time: "10–11am",
            title: "Important: Policy Update Notification",
        },
        {
            id: 11,
            date: "28/01/25",
            time: "9–10am",
            title: "Weekly Staff Meeting Reminder",
        },
        {
            id: 12,
            date: "28/01/25",
            time: "5–7pm",
            title: "Yoga & Wellness Workshop",
        },
        {
            id: 13,
            date: "29/01/25",
            time: "All Day",
            title: "Office Closed – Public Holiday",
        },
    ];
    return (
        <div className='rounded-r-4xl w-full border border-gray-300 border-l-0 shadow-sm pt-8 px-10'>
            <div className='flex  items-center justify-between gap-4'>
                <p className='text-[#0063B9] text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>My Health Dashboard</p>
            </div>
            <div className="w-full h-[30vh] overflow-y-auto overflow-x-auto rounded-2xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                <p className='text-lg' style={{ fontFamily: "Sofia Pro", fontWeight: 600 }}>Reminders</p>
                <table className="w-full text-left border-collapse">
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
            <div className='flex flex-row gap-3'>
                {/* <div className='rounded-2xl w-[40%] h-[27vh] border border-gray-300 border-l-0 shadow-sm pt-3 p-4'>
                    <p className='text-lg' style={{ fontFamily: "Sofia Pro", fontWeight: 600 }}>My Risk Meter</p>
                </div> */}
                < RiskMeter />
                <div className='rounded-2xl w-[60%] max-h-[30vh] overflow-x-auto overflow-y-auto border border-gray-300 border-l-0 shadow-sm pt-3 p-4'>
                    <p className='text-lg ' style={{ fontFamily: "Sofia Pro", fontWeight: 600 }}>Announcements</p>
                    {mockNotifications.map((notification, index) => (
                        <div
                            key={notification.id}
                            className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0 "
                        >
                            {/* Left: Date + Time */}
                            {/* <div style={{ fontFamily: "Sofia Pro", fontWeight: 500 }}className="flex flex-col items-center bg-[#FAFAFA] px-3 py-1 rounded-2xl text-[#166DB6] text-[10px] font-medium min-w-[80px]">
                                <span>{notification.date}</span>
                                <span >({notification.time})</span>
                            </div> */}
                            <div
                                style={{ fontFamily: "Sofia Pro", fontWeight: 500 }}
                                className="flex flex-col items-center bg-[#FAFAFA] px-3 py-1 rounded-xl text-[10px] font-medium min-w-[80px]"
                            >
                                <div className="bg-gradient-to-r from-[#323FF7] to-[#33AEE5] bg-clip-text text-transparent text-center">
                                    <span>{notification.date}</span>
                                    <br />
                                    <span>({notification.time})</span>
                                </div>
                            </div>
                            {/* Right: Message */}
                            {/* <p className="text-black text-base ">{notification.message}</p> */}
                            <p className="text-black text-xs " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>{notification.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Health