import React from "react";
import NotificationsIcon from "../../assets/Dashboard/Notifications.svg";
import HealthWealthIcon from "../../assets/Dashboard/Health & Wellness.svg";
import TestingCentersIcon from "../../assets/Dashboard/Testing Centers.svg";
import TestingCentersVector from "../../assets/Dashboard/VectorTestCenter.svg";
import ConnectTeamIcon from "../../assets/Dashboard/Connect with our Team.svg";
import BookAppointmentIcon from "../../assets/Dashboard/Book an Appointment.svg";
import chatbot from "../../assets/chatbot.png";
import { Mic, SearchIcon } from "lucide-react";
import { Link } from "react-router";


// const RightNavButton = ({ label, icon, isActive, onClick }) => {
//     return (
//         <button
//             style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
//             onClick={onClick}
//             className={`flex items-center gap-2 bg-white border  border-gray-200 pl-2 py-2.5 text-sm rounded-4xl font-medium transition-all duration-200 cursor-pointer w-[10rem]
//         ${isActive
//                     ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white shadow-md/20"
//                     : "hover:bg-blue-100 text-black"
//                 }
//         `}
//         >
//             <img src={icon} alt="Icon" className="w-8 h-8" />
//             <div className="text-start max-w-[90px] break-words whitespace-normal">
//                 {label}
//             </div>
//         </button>
//     );
// };
// const RightNavButton = ({ label, icon, isActive, onClick, to, Activeicon }) => {
//     const baseClasses = `flex items-center gap-2 bg-white border border-gray-200 pl-2 py-2.5 text-sm rounded-4xl font-medium transition-all duration-200 cursor-pointer w-[10rem]
//         ${isActive
//             ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white shadow-md/20"
//             : "hover:border hover:border-[#323FF7]  text-black"
//         }`;

//     const content = (
//         <>
//             <div className={` ${isActive ? "w-8 h-8 bg-white rounded-full p-1 flex items-center " : "w-8 h-8"} `}>
//                 <img src={`${isActive ? Activeicon : icon}`} alt="Icon" className="w-8 h-8" />
//             </div>
//             <div className="text-start max-w-[90px] break-words whitespace-normal">
//                 {label}
//             </div>
//         </>
//     );

//     // 👉 Conditional rendering logic
//     return to ? (
//         <Link
//             to={to}
//             style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
//             className={baseClasses}
//         >
//             {content}
//         </Link>
//     ) : (
//         <button
//             style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
//             onClick={onClick}
//             className={baseClasses}

//         >
//             {content}
//         </button>
//     );
// };
const RightNavButton = ({ label, icon, isActive, onClick, to, Activeicon, hasNotification }) => {
    const baseClasses = `flex items-center gap-2 bg-white border border-gray-200 pl-2 py-2.5 text-sm rounded-4xl font-medium transition-all duration-200 cursor-pointer w-[10rem]
        ${isActive
            ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white shadow-md/20"
            : "hover:border hover:border-[#323FF7]  text-black"
        }`;

    const content = (
        <>
            <div className={`relative ${isActive ? "w-8 h-8 bg-white rounded-full p-1 flex items-center " : "w-8 h-8"}`}>
                {/* Icon */}
                <img src={`${isActive ? Activeicon : icon}`} alt="Icon"  className="w-8 h-8" />
                {/* Notification Dot */}
                {hasNotification && (
                    <span className="absolute -top-1 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
            </div>
            <div className="text-start max-w-[90px] break-words whitespace-normal">
                {label}
            </div>
        </>
    );

    
    return to ? (
        <Link
            to={to}
            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
            className={baseClasses}
        >
            {content}
        </Link>
    ) : (
        <button
            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
            onClick={onClick}
            className={baseClasses }
        >
            {content}
        </button>
    );
};

const RightTab = ({ active, setActive }) => {
    const rightNavItems = [
    { label: "Notifications", ActiveIcon:NotificationsIcon, icon: NotificationsIcon, hasNotification: true }, // show dot
    { label: "Book an Appointment", icon: BookAppointmentIcon, to: "/bookappointment" },
    { label: "PrEP Consultation", icon: ConnectTeamIcon, to: "/prepconsultation" },
    { label: "Health & Wellness", icon: HealthWealthIcon, to: "/blog" },
    { label: "Testing Centers", ActiveIcon: TestingCentersVector, icon: TestingCentersIcon },
];

    return (
        <div
            // className="flex flex-col justify-between  gap-3 bg-white min-h-full p-6 "
            className="flex flex-col justify-between items-end  gap-3 bg-white min-h-full p-6 pt-0 pr-0 "
            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
        >
            {/* Navigation */}
            <div className="flex flex-col gap-3">
                {rightNavItems.map((item) => (
                    <RightNavButton
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        Activeicon={item.ActiveIcon}
                        isActive={active === item.label}
                        onClick={() => setActive(item.label)}
                        to={item.to}
                        hasNotification={item.hasNotification}
                    />
                ))}

            </div>
            <div className=" relative gap-4 rounded-full  cursor-pointer bg-[#F3F3F3] shadow-lg mx-auto ml-9 ">

                <img src={chatbot} alt="Ask" className="w-14 h-14 rounded-full border absolute top-[-26%] right-[92%]  " />
                <div className="flex items-center  ">
                    < SearchIcon color='#838383' className='w-4 h-4 ml-4 mr-2' />
                    <input
                        type="text"
                        placeholder="Ask a question"
                        className=" text-gray-900  outline-none text-xs  w-22"
                    />
                    <button className="bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                        <Mic />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RightTab;

