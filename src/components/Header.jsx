import React, { useState } from "react";
import { useNavigate } from "react-router";
import logoBac from "../assets/logo-bac.png";
import SpeakerIcon from "../assets/SpeakerIcon.png";
import { ChevronDown, Menu, Search } from "lucide-react"; // icons
import { NavLink } from "react-router";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../Context/AuthContext";
import LanguageSelector from './LanguageSelector'
import '../App.css'

const Header = () => {
    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    return (
        <>
            <header className="bg-white container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between py-4 " style={{ fontFamily: 'Sofia Pro' }}>
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    < NavLink to={'/'}>
                        <img src={logoBac} alt="NETREACH Logo" className="h-10 xl:h-[49px] w-auto " />
                    </NavLink>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block  xl:ml-[4vw] " style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                    <ul className="flex text-black  font-[400] text-xs  lg:text-[11px] xl:text-[13px]  gap-3 xl:gap-5">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "text-[#1475A1] " : "hover:text-[#1475A1] "
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "text-[#1475A1] " : "hover:text-[#1475A1]"
                                }
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/faqs"
                                className={({ isActive }) =>
                                    isActive ? "text-[#1475A1] " : "hover:text-[#1475A1]"
                                }
                            >
                                FAQs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/team"
                                className={({ isActive }) =>
                                    isActive ? "text-[#1475A1] " : "hover:text-[#1475A1]"
                                }
                            >
                                Team
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/risk"
                                className={({ isActive }) =>
                                    isActive ? "text-[#1475A1] " : "hover:text-[#1475A1]"
                                }
                            >
                                Know your Risk
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/blog"
                                className={({ isActive }) =>
                                    isActive ? "text-[#1475A1] " : "hover:text-[#1475A1]"
                                }
                            >
                                Blog
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive ? "text-[#1475A1] " : "hover:text-[#1475A1]"
                                }
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>


                {/* Desktop Right Section */}
                <div className="hidden lg:flex items-center space-x-2 lg:space-x-3 ">
                    {/* Language Selector */}
                    <div className="flex flex-col items-center h-full relative text-[0.688rem] xl:text-xs">
                        <LanguageSelector />
                        {/* <span className=" text-[#838383] mt-1 absolute top-full whitespace-nowrap">
                            Powered by{" "}
                            <span className="font-bold  " style={{ fontFamily: "Product Sans, Arial, sans-serif" }}>
                                <span style={{ color: "#4285F4" }}>G</span>
                                <span style={{ color: "#EA4335" }}>o</span>
                                <span style={{ color: "#FBBC05" }}>o</span>
                                <span style={{ color: "#4285F4" }}>g</span>
                                <span style={{ color: "#34A853" }}>l</span>
                                <span style={{ color: "#EA4335" }}>e</span>
                            </span>
                            <span className="font-semibold "> Translate</span>
                        </span> */}
                    </div>

                    {/* Search Box */}
                    <div className=" flex justify-center px-2   rounded-full items-center border border-[#0B1E2A] text-[0.688rem] xl:text-xs">
                        <input
                            placeholder="Search"
                            onKeyDown={(e) => (
                                e.key === "Enter" &&
                                navigate(`/search?q=${encodeURIComponent(e.target.value)}`)
                            )}
                            className="border-none w-15 xl:w-22 px-1 py-1  outline-none placeholder:text-[#838383]"
                        />
                        <span className=" ">
                            <img src={SpeakerIcon} alt="speaker" />
                        </span>
                    </div>

                    {/* Login Button */}

                    <button className="  bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white px-4 xl:px-6 py-1 xl:py-[0.313rem] rounded-full  transition drop-shadow-lg hover:shadow-lg/20 text-[0.688rem] xl:text-[0.813rem] " style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                        {isAuthenticated ? (<NavLink to={'/dashboard'}>Dashboard</NavLink>) : (<NavLink to={'/login'}>Login</NavLink>)}
                    </button>
                </div>

                {/* Mobile Right Section */}
                <div className="flex lg:hidden items-start  space-x-2 text-black">
                    <Search size={20} className="" />
                    <Menu size={28} className=" cursor-pointer -mt-0.5" onClick={() => setIsMenuOpen(true)} />
                </div>
            </header>

            {/* Mobile Menu Component */}
            <div className="lg:hidden">
                <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            </div>
        </>
    );
};

export default Header;