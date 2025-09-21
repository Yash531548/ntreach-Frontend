import React, { useEffect, useState } from 'react'
import { fetchAnnouncementsApi } from '../../Api/fetchAnnouncementsApi';

const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        async function getAnnouncements() {
            setLoading(true);
            try {
                const data = await fetchAnnouncementsApi(); // Fetches from your announcement API
                setAnnouncements(data);
            } catch (error) {
                setAnnouncements([]);
            }
            setLoading(false);
        }
        getAnnouncements();
    }, []);
    function formatTimeRangeUI(startHours, endHours) {
        const to12Hour = h => {
            const hour12 = h % 12 || 12;
            return hour12;
        };

        const getSuffix = h => (h < 12 ? 'am' : 'pm');

        const startSuffix = getSuffix(startHours);
        const endSuffix = getSuffix(endHours);

        if (startSuffix === endSuffix) {
            // Same suffix for start and end (e.g. 4–5pm)
            return `${to12Hour(startHours)}–${to12Hour(endHours)}${startSuffix}`;
        } else {
            // Different suffixes (e.g. 11am–1pm)
            return `${to12Hour(startHours)}${startSuffix}–${to12Hour(endHours)}${endSuffix}`;
        }
    }

    function formatDateTime({ start_date, end_date }) {
        const start = new Date(start_date);
        const end = new Date(end_date);

        const pad = n => n.toString().padStart(2, '0');
        const dateStr = `${pad(start.getDate())}/${pad(start.getMonth() + 1)}/${start.getFullYear().toString().slice(2)}`;

        const timeStr = `(${formatTimeRangeUI(start.getHours(), end.getHours())})`;

        return { dateStr, timeStr };
    }


    return (
        <div className='rounded-2xl w-full md:w-[60%] max-h-[30vh] overflow-x-auto overflow-y-auto border border-gray-300 border-l-0 shadow-sm pt-3 p-4'>
            <p className='text-lg ' style={{ fontFamily: "Sofia Pro", fontWeight: 600 }}>Announcements</p>
            {
                loading ? (
                    <div className="text-[#0078D4] px-4 py-7">Loading announcements...</div>
                ) : (
                    announcements.length === 0 ? (
                        <div className="text-[#A9A9A9] px-4 py-7">No announcements found.</div>
                    ) : (
                        announcements.map(item => {
                            const { dateStr, timeStr } = formatDateTime(item);
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0"
                                >
                                    {/* Date + Time section */}
                                    <div
                                        style={{ fontFamily: "Sofia Pro", fontWeight: 500 }}
                                        className="flex flex-col items-center bg-[#FAFAFA] px-3 py-1 rounded-xl text-[10px] font-medium min-w-[80px]"
                                    >
                                        <div className="bg-gradient-to-r from-[#323FF7] to-[#33AEE5] bg-clip-text text-transparent text-center">
                                            <span>{dateStr}</span>
                                            <br />
                                            <span>{timeStr}</span>
                                        </div>
                                    </div>
                                    {/* Announcement Message */}
                                    <p className="text-black text-xs" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                        {item.title}
                                    </p>
                                </div>
                            );
                        })
                    )
                )
            }
            {/* {mockNotifications.map((notification, index) => (
                <div
                    key={notification.id}
                    className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0 "
                >
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
                    
                    <p className="text-black text-xs " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>{notification.title}</p>
                </div>
            ))} */}
        </div>
    )
}

export default Announcement