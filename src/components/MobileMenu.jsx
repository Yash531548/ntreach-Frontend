
import React from "react";
import { X } from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../Context/AuthContext";

const MobileMenu = ({ isOpen, onClose }) => {
    const { isAuthenticated, logout } = useAuth();
    const navItems = [
        { name: "Home", path: "/" },
        { name: "About us", path: "/about" },
        { name: "FAQs", path: "/faqs" },
        { name: "Team", path: "/team" },
        { name: "Know your Risk", path: "/risk" },
        { name: "Blog", path: "/blog" },
        { name: "Contact us", path: "/contact" },
    ];

    return (
        <>
            {/* Background Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-25 cursor-pointer lg:hidden z-40"
                    onClick={onClose}
                />
            )}

            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Icon */}
                <div className="flex justify-end p-4">
                    <X
                        size={24}
                        className="text-gray-600 cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                {/* Menu Content */}
                <div className="flex flex-col p-4 space-y-4">
                    {/* <div className="border-b pb-4">
                        <button className="w-[106px] h-[35px] border border-[#566AFF] bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full font-medium hover:opacity-90 transition cursor-pointer">
                            Login
                        </button>
                    </div> */}
                    <div className="border-b pb-4">
                        <div
                            onClick={onClose} // auto-close menu after click
                            className="block w-[106px] h-[35px] border border-[#566AFF] bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full font-medium hover:opacity-90 transition text-center leading-[35px]"
                        >
                            {isAuthenticated ? (<NavLink to={'/dashboard'}>Dashboard</NavLink>):(<NavLink to={'/login'}>Login</NavLink>)}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex flex-col gap-4 text-black font-[500] text-sm pt-4">
                        {navItems.map((item, idx) => (
                            <li key={idx}>
                                <NavLink
                                    to={item.path}
                                    onClick={onClose} // ✅ close menu on click
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block border-b border-blue-500 pb-2 text-[#1475A1] font-semibold"
                                            : "block border-b border-gray-300 pb-2 hover:text-[#1475A1]"
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Language Selector */}
                    <div className="border-t pt-4 pb-4 mt-[8rem]">
                        <select className="border border-gray-300 text-gray-700 rounded-full px-5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Language</option>
                            <option>English</option>
                            <option>French</option>
                            <option>Spanish</option>
                        </select>
                        <span className="text-xs text-gray-500 mt-1 block">
                            Powered by{" "}
                            <span
                                className="font-bold text-xs"
                                style={{ fontFamily: "Product Sans, Arial, sans-serif" }}
                            >
                                <span style={{ color: "#4285F4" }}>G</span>
                                <span style={{ color: "#EA4335" }}>o</span>
                                <span style={{ color: "#FBBC05" }}>o</span>
                                <span style={{ color: "#4285F4" }}>g</span>
                                <span style={{ color: "#34A853" }}>l</span>
                                <span style={{ color: "#EA4335" }}>e</span>
                            </span>
                            <span className="font-semibold text-xs"> Translate</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
