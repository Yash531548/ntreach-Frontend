
import React from "react";
import ManAvatar from "../../assets/Dashboard/ManAvatar.jpg";
import { ChevronRight } from "lucide-react";
import MyResultsIcon from "../../assets/Dashboard/My Results Icon.svg";
import HomeIcon from "../../assets/Dashboard/Home.svg";
import LogoutIcon from "../../assets/Dashboard/Logout.svg";
import UpcomingAppointmentIcon from "../../assets/Dashboard/Upcoming Appointments.svg";
import TeleconsultationIcon from "../../assets/Dashboard/Book a Teleconsultation.svg";
const NavButton = ({ label, icon, isActive, onClick }) => {
    return (
        <button
            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
            onClick={onClick}
            className={`flex items-center gap-3 px-1 py-1.5 text-sm rounded-4xl font-medium transition-all duration-200 cursor-pointer
        ${isActive
                    ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white shadow-md/20"
                    : " hover:bg-blue-100 text-gray-700"
                }
        `}
        >
            <img src={icon} alt="Icon" className="w-7 h-7 " />
            {label}
        </button>
    );
};

const Sidebar = ({ active, setActive }) => {
    const navItems = [
        { label: "Home", text: "Home", icon: HomeIcon },
        { label: "Upcoming Appointments", text: "Upcoming Appointments", icon: UpcomingAppointmentIcon },
        { label: "teleconsultation", text: "Book a Teleconsultation", icon: TeleconsultationIcon },
        { label: "My Results/Past Data", text: "My Results/Past Data", icon: MyResultsIcon },
    ];

    return (
        <div
            className="flex flex-col  bg-[#E9F8FF] rounded-l-4xl min-h-full"
            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
        >
            {/* User Info */}
            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-4">
                    <img
                        src={ManAvatar}
                        alt="User Avatar"
                        className="w-14 h-14 rounded-full"
                    />
                    <div>
                        <h2
                            className="text-sm text-black"
                            style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                        >
                            Saptarshi Mandal
                        </h2>
                        <p
                            className="text-black text-[12px]"
                            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                        >
                            +91 8976453264
                        </p>
                    </div>
                </div>

                {/* View Your Profile - conditional style */}
                {active === "userProfile" ? (
                    <button
                        onClick={() => setActive("userProfile")}
                        className="flex justify-between items-center bg-gradient-to-r from-[#323FF7] to-[#33AEE5] rounded-4xl py-2 px-3 text-sm text-white hover:opacity-90 transition cursor-pointer"
                    >
                        View Your Profile
                        <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={() => setActive("userProfile")}
                        className="flex justify-between items-center border-2 border-[#33AEE5] rounded-4xl py-2 px-3 text-sm text-[#0063B9]  transition cursor-pointer"
                    >
                        View Your Profile
                        <ChevronRight className="w-4 h-4 text-[#0063B9]" />
                    </button>
                )}

                {/* Horizontal Line */}
                <div className="h-[1px] bg-gray-300 mt-1 w-[80%] mx-auto rounded"></div>

            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2 pl-6 pr-6 ">
                {navItems.map((item) => (
                    <NavButton
                        key={item.label}
                        label={item.text}
                        icon={item.icon}
                        isActive={active === item.label}
                        onClick={() => setActive(item.label)}
                    />
                ))}
            </div>

            {/* Logout */}
            <div className="mt-29">
                <div className="h-[1px] bg-gray-300  w-[100%] mx-auto rounded"></div>
                <div className="p-6">
                    <button className="mt-auto  flex items-center gap-3 px-1 py-1.5 rounded-4xl  hover:bg-blue-100 transition  text-sm text-gray-700">
                        <img src={LogoutIcon} alt="Logout icon" className="w-7 h-7" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
