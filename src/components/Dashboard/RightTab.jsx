import React from "react";
import NotificationsIcon from "../../assets/Dashboard/Notifications.svg";
import HealthWealthIcon from "../../assets/Dashboard/Health & Wellness.svg";
import TestingCentersIcon from "../../assets/Dashboard/Testing Centers.svg";
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
const RightNavButton = ({ label, icon, isActive, onClick, to }) => {
    const baseClasses = `flex items-center gap-2 bg-white border border-gray-200 pl-2 py-2.5 text-sm rounded-4xl font-medium transition-all duration-200 cursor-pointer w-[10rem]
        ${isActive
            ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white shadow-md/20"
            : "hover:bg-blue-100 text-black"
        }`;

    const content = (
        <>
            <img src={icon} alt="Icon" className="w-8 h-8" />
            <div className="text-start max-w-[90px] break-words whitespace-normal">
                {label}
            </div>
        </>
    );

    // 👉 Conditional rendering logic
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
            className={baseClasses}
        >
            {content}
        </button>
    );
};

const RightTab = ({ active, setActive }) => {
    // const rightNavItems = [
    //     { label: "Notifications", icon: NotificationsIcon },
    //     { label: "Book an Appointment", icon: BookAppointmentIcon },
    //     { label: "PrEP Consultation", icon: ConnectTeamIcon },
    //     { label: "Health & Wealth", icon: HealthWealthIcon },
    //     { label: "Testing Centers", icon: TestingCentersIcon },
    // ];
    const rightNavItems = [
        { label: "Notifications", icon: NotificationsIcon }, // uses state
        { label: "Book an Appointment", icon: BookAppointmentIcon, to: "/bookAppointment" }, // navigates
        { label: "PrEP Consultation", icon: ConnectTeamIcon, to: "/prepConsultation" }, // navigates
        { label: "Health & Wealth", icon: HealthWealthIcon, to: "/healthWealth" }, // navigates
        { label: "Testing Centers", icon: TestingCentersIcon }, // uses state
    ];
    return (
        <div
            className="flex flex-col justify-between  gap-3 bg-white min-h-full p-6"
            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
        >
            {/* Navigation */}
            <div className="flex flex-col gap-3">
                {rightNavItems.map((item) => (
                    <RightNavButton
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        isActive={active === item.label}
                        onClick={() => setActive(item.label)}
                        to={item.to}
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

