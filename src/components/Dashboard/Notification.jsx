import React from 'react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import { CircleArrowLeft } from 'lucide-react';
const Notification = ({setSelectedView}) => {
    // const mockNotifications = [

    //     {
    //         id: 1,
    //         date: "24/01/25",
    //         time: "5-6pm",
    //         message: "Republic Day Special with Dance Event",
    //     },
    //     {
    //         id: 2,
    //         date: "24/01/25",
    //         time: "4-10pm",
    //         message: "“Gulabi Mela” Event",
    //     },
    //     {
    //         id: 3,
    //         date: "24/01/25",
    //         time: "5-6pm",
    //         message: "Republic Day Special with Dance Event",
    //     },
    //     {
    //         id: 4,
    //         date: "24/01/25",
    //         time: "5-6pm",
    //         message: "A New Service Provider Is Added",
    //     },
    //     {
    //         id: 5,
    //         date: "24/01/25",
    //         time: "5-6pm",
    //         message: "Tomorrow Is National Holiday",
    //     },
    // ];
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
        <div className='rounded-r-4xl w-full md:border md:border-gray-300 border-l-0 md:shadow-sm pt-5 md:px-5 xl:pt-8 xl:px-10'>
            <div className='flex  items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                    <CircleArrowLeft className='text-gray-700 cursor-pointer '
                        onClick={() => setSelectedView("Home")}
                    />
                    <p className='text-[#0063B9] text-[25px] md:text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Notifications</p>
                </div>
                <div className='relative' onClick={() => setActive("Notifications")}>
                    <img src={NotificationMobileIcon} alt="Notification icon" className='lg:hidden  ' />
                    <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </div>
            {/* if need to set fixed height add around h-[65vh] */}
            <div className="w-full max-h-[85vh] md:h-[50vh] overflow-y-auto overflow-x-auto rounded-2xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                {mockNotifications.map((notification, index) => (
                    <div
                        key={notification.id}
                        className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0"
                    >
                        {/* Left: Date + Time */}
                        {/* <div className="flex flex-col items-center bg-[#FAFAFA] px-3 py-1 rounded-2xl text-[#166DB6] text-xs font-medium min-w-[80px]">
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
                        <p className="text-black text-base ">{notification.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification