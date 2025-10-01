import { CircleArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import { fetchPastConsultations } from '../../Api/fetchPastConsultations';

const getRandomDuration = () => {
    // Returns either 20 or 40 min (simulate field)
    const durations = ["20 min", "40 min"];
    return durations[Math.floor(Math.random() * durations.length)];
};
const getRecommendationText = () => "View Recommendations"; // Placeholder link text
const getServiceDisplay = type => {
    // Map service type for display, can be expanded
    switch (type) {
        case "general_checkup": return "General Checkup";
        case "hiv_test": return "HIV Test";
        case "sti_test": return "STI Test";
        default: return type.replace(/_/g, ' ');
    }
};
const formatDate = dateStr => {
    const date = new Date(dateStr);
    const pad = n => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear().toString().slice(2)}`;
};

const formatTime = timeStr => {
    // timeStr should be "HH:MM:SS"
    const [hour, minute] = timeStr.split(":");
    return `${hour}:${minute}`;
};
const PastConsultation = ({ setSubView }) => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);

    // const services = [
    //     {
    //         id: 1,
    //         date: "24/01/25",
    //         startTime: "09:00",
    //         serviceType: "HIV Test",
    //         duration: "20 min",
    //     },
    //     {
    //         id: 2,
    //         date: "24/01/25",
    //         startTime: "10:30",
    //         serviceType: "STI Test",
    //         duration: "40 min",
    //     },
    //     {
    //         id: 3,
    //         date: "25/01/25",
    //         startTime: "11:00",
    //         serviceType: "HIV Test",
    //         duration: "20 min",
    //     },
    //     {
    //         id: 4,
    //         date: "26/01/25",
    //         startTime: "14:00",
    //         serviceType: "STI Test",
    //         duration: "40 min",
    //     },
    //     {
    //         id: 5,
    //         date: "27/01/25",
    //         startTime: "15:30",
    //         serviceType: "HIV Test",
    //         duration: "20 min",
    //     },
    //     {
    //         id: 6,
    //         date: "28/01/25",
    //         startTime: "16:00",
    //         serviceType: "STI Test",
    //         duration: "40 min",
    //     },
    //     {
    //         id: 7,
    //         date: "29/01/25",
    //         startTime: "09:30",
    //         serviceType: "HIV Test",
    //         duration: "20 min",
    //     },
    //     {
    //         id: 8,
    //         date: "30/01/25",
    //         startTime: "11:15",
    //         serviceType: "STI Test",
    //         duration: "40 min",
    //     },
    //     {
    //         id: 9,
    //         date: "31/01/25",
    //         startTime: "13:00",
    //         serviceType: "HIV Test",
    //         duration: "20 min",
    //     },
    //     {
    //         id: 10,
    //         date: "01/02/25",
    //         startTime: "15:00",
    //         serviceType: "STI Test",
    //         duration: "40 min",
    //     },
    // ];

    useEffect(() => {
        async function getConsultation() {
            setLoading(true);
            try {
                const data = await fetchPastConsultations();
                // console.log("data",data)
                setConsultations(data)
            } catch (error) {
                setConsultations([])
            }
            setLoading(false)
        }
        getConsultation();
        // console.log({consultations})
    }, [])

    return (
        <div className='rounded-r-4xl w-full md:border md:border-gray-300 md:border-l-0 md:shadow-sm pt-5 md:px-5 xl:pt-8 xl:px-10'>
            <div className='flex  items-center gap-2 md:gap-4'>
                {/* 👇 Add click handler */}
                <CircleArrowLeft className='text-gray-700 cursor-pointer'
                    onClick={() => setSubView(null)}
                />
                <p className='text-black text-[25px] md:text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>My Past Consultation</p>
                <div className='relative' onClick={() => setSelectedView("Notifications")}>
                    <img src={NotificationMobileIcon} alt="Notification icon" className='lg:hidden  ' />
                    <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </div>
            <div className="w-full max-h-[60vh] md:max-h-[53vh] overflow-y-auto overflow-x-auto rounded-2xl shadow-sm mt-[2rem] mb-[1rem] pt-3 md:p-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                <table className="w-full text-left border-collapse">
                    {/* Table Header */}
                    <thead>
                        <tr className="text-[#626262] text-xs" >
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>Date</th>
                            <th className="py-3  xl:px-4 whitespace-nowrap " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>Start Time</th>
                            <th className="py-3  px-4 whitespace-nowrap " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>Type of Service</th>
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>Duration</th>
                            <th className="py-3 px-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>Recommendations</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-[#0078D4]">Loading consultations...</td>
                            </tr>
                        ) : (
                            consultations.length === 0 ?
                                (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-[#A9A9A9]">No consultations found.</td>
                                    </tr>
                                ) : (
                                    consultations.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={`text-xs text-left hover:bg-[#E9F8FF] hover:border-0 border-b border-b-[#DEDEDE] `}

                                        >
                                            <td className="py-3 px-4 rounded-l-full">{formatDate(item.date)}</td>
                                            <td className="py-3 px-4">{formatTime(item.time)}</td>
                                            <td className="py-3 px-4 text-center xl:text-left">{getServiceDisplay(item.service)}</td>
                                            {/* Filler for duration - random for now */}
                                            <td className="py-3 px-4">{getRandomDuration()}</td>
                                            {/* Placeholder for recommendations */}
                                            <td className="py-3 px-4 text-[#0078D4] cursor-pointer rounded-r-full">
                                                <button
                                                    onClick={() => { setSubView('Reschedule') }}
                                                    className="text-[#323FF7] underline cursor-pointer whitespace-nowrap">
                                                    {getRecommendationText()}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                        )
                        }
                        {/* {services.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`text-xs text-left hover:bg-[#E9F8FF] hover:border-0 border-b border-b-[#DEDEDE] `}

                            >
                                <td className="py-3 px-4 rounded-l-full">{item.date}</td>
                                <td className="py-3 px-4">{item.startTime}</td>
                                <td className="py-3 px-4 text-center xl:text-left">{item.serviceType}</td>
                                <td className="py-3 px-4">{item.duration}</td>
                                <td className="py-3 px-4 text-[#0078D4] cursor-pointer rounded-r-full">
                                    <button
                                        onClick={() => { setSubView('Reschedule') }}
                                        className="text-[#323FF7] underline cursor-pointer whitespace-nowrap">
                                        View Recommendations
                                    </button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PastConsultation