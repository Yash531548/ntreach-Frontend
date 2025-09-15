// import React, { useState } from "react";
// import logoBac from "../assets/logo-bac.png";
// import SpeakerIcon from "../assets/SpeakerIcon.png";
// import { Menu, Search } from "lucide-react"; // icons
// import { NavLink } from "react-router";
// import MobileMenu from "./MobileMenu";

// const Header = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     return (
//         <>
//             <header className="bg-white container max-w-[1300px] mx-auto px-8 sm:px-6 lg:px-12 flex items-center justify-between py-4 ">
//                 {/* Logo */}
//                 <div className="flex items-center space-x-2">
//                     < NavLink to={'/'}>
//                         <img src={logoBac} alt="NETREACH Logo" className="h-10 w-auto " />
//                     </NavLink>
//                 </div>

//                 {/* Desktop Navigation */}
//                 {/* <nav className="hidden lg:block ml-[5%]" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
//                     <ul className="flex text-black font-[400] text-xs gap-6">
//                         <li className="hover:text-blue-600 cursor-pointer">Home</li>
//                         <li className="hover:text-blue-600 cursor-pointer">About us</li>
//                         <li className="hover:text-blue-600 cursor-pointer">FAQs</li>
//                         <li className="hover:text-blue-600 cursor-pointer">Team</li>
//                         <li className="hover:text-blue-600 cursor-pointer">Know your Risk</li>
//                         <li className="hover:text-blue-600 cursor-pointer">Blog</li>
//                         <li className="hover:text-blue-600 cursor-pointer">Contact us</li>
//                     </ul>
//                 </nav> */}
//                 <nav className="hidden lg:block ml-[5%]" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
//                     <ul className="flex text-black font-[400] text-xs gap-6">
//                         <li>
//                             <NavLink
//                                 to="/"
//                                 className={({ isActive }) =>
//                                     isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
//                                 }
//                             >
//                                 Home
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/about"
//                                 className={({ isActive }) =>
//                                     isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
//                                 }
//                             >
//                                 About us
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/faqs"
//                                 className={({ isActive }) =>
//                                     isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
//                                 }
//                             >
//                                 FAQs
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/team"
//                                 className={({ isActive }) =>
//                                     isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
//                                 }
//                             >
//                                 Team
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/risk"
//                                 className={({ isActive }) =>
//                                     isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
//                                 }
//                             >
//                                 Know your Risk
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/blog"
//                                 className={({ isActive }) =>
//                                     isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
//                                 }
//                             >
//                                 Blog
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/contact"
//                                 className={({ isActive }) =>
//                                     isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
//                                 }
//                             >
//                                 Contact us
//                             </NavLink>
//                         </li>
//                     </ul>
//                 </nav>


//                 {/* Desktop Right Section */}
//                 <div className="hidden lg:flex items-center space-x-3">
//                     {/* Language Selector */}
//                     <div className="flex flex-col items-center h-full relative">
//                         <select className="border border-gray-300 text-gray-700 rounded-full px-5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400">
//                             <option>Language</option>
//                             <option>English</option>
//                             <option>French</option>
//                             <option>Spanish</option>
//                         </select>
//                         <span className="text-xs text-gray-500 mt-1 absolute top-full whitespace-nowrap">
//                             Powered by{" "}
//                             <span className="font-bold text-xs" style={{ fontFamily: "Product Sans, Arial, sans-serif" }}>
//                                 <span style={{ color: "#4285F4" }}>G</span>
//                                 <span style={{ color: "#EA4335" }}>o</span>
//                                 <span style={{ color: "#FBBC05" }}>o</span>
//                                 <span style={{ color: "#4285F4" }}>g</span>
//                                 <span style={{ color: "#34A853" }}>l</span>
//                                 <span style={{ color: "#EA4335" }}>e</span>
//                             </span>
//                             <span className="font-semibold text-xs"> Translate</span>
//                         </span>
//                     </div>

//                     {/* Search Box */}
//                     <div className="flex justify-center rounded-full items-center border border-gray-300">
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             className="border-none w-28 px-3 py-1 text-xs outline-none"
//                         />
//                         <span className="text-gray-400 pr-2">
//                             <img src={SpeakerIcon} alt="speaker" />
//                         </span>
//                     </div>

//                     {/* Login Button */}
//                     <button className=" bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white px-6 py-1 rounded-full font-medium  transition drop-shadow-lg hover:shadow-lg/20" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>

//                         <NavLink to={'/login'}>Login</NavLink>
//                     </button>
//                 </div>

//                 {/* Mobile Right Section */}
//                 <div className="flex lg:hidden items-center space-x-2 ">
//                     <Search size={17} className="text-gray-600" />
//                     <Menu size={26} className="text-gray-600 cursor-pointer" onClick={() => setIsMenuOpen(true)} />
//                 </div>
//             </header>

//             {/* Mobile Menu Component */}
//             <div className="lg:hidden">
//                 <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
//             </div>
//         </>
//     );
// };

// export default Header;
import React, { useState } from "react";
import logoBac from "../assets/logo-bac.png";
import SpeakerIcon from "../assets/SpeakerIcon.png";
import { Menu, Search } from "lucide-react"; // icons
import { NavLink } from "react-router";
import MobileMenu from "./MobileMenu";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-white container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between py-4 ">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    < NavLink to={'/'}>
                        <img src={logoBac} alt="NETREACH Logo" className="h-10 xl:h-[49px] w-auto " />
                    </NavLink>
                </div>

                {/* Desktop Navigation */}
                {/* <nav className="hidden lg:block ml-[5%]" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                    <ul className="flex text-black font-[400] text-xs gap-6">
                        <li className="hover:text-blue-600 cursor-pointer">Home</li>
                        <li className="hover:text-blue-600 cursor-pointer">About us</li>
                        <li className="hover:text-blue-600 cursor-pointer">FAQs</li>
                        <li className="hover:text-blue-600 cursor-pointer">Team</li>
                        <li className="hover:text-blue-600 cursor-pointer">Know your Risk</li>
                        <li className="hover:text-blue-600 cursor-pointer">Blog</li>
                        <li className="hover:text-blue-600 cursor-pointer">Contact us</li>
                    </ul>
                </nav> */}
                <nav className="hidden lg:block ml-[3%] xl:ml-[5%]  " style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                    <ul className="flex text-black font-[400] text-xs  lg:text-[11px] xl:text-[13px] gap-4 xl:gap-6">
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
                                About us
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
                                Contact us
                            </NavLink>
                        </li>
                    </ul>
                </nav>


                {/* Desktop Right Section */}
                <div className="hidden lg:flex items-center space-x-2 lg:space-x-3 ">
                    {/* Language Selector */}
                    <div className="flex flex-col items-center h-full relative">
                        <select className="border border-gray-300 text-gray-700 rounded-full lg:px-2 xl:px-5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Language</option>
                            <option>English</option>
                            <option>French</option>
                            <option>Spanish</option>
                        </select>
                        <span className="text-xs text-gray-500 mt-1 absolute top-full whitespace-nowrap">
                            Powered by{" "}
                            <span className="font-bold text-xs" style={{ fontFamily: "Product Sans, Arial, sans-serif" }}>
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

                    {/* Search Box */}
                    <div className=" flex justify-center px-2   rounded-full items-center border border-gray-300">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-none w-15 xl:w-22 px-1 py-1 text-xs outline-none"
                        />
                        <span className=" ">
                            <img src={SpeakerIcon} alt="speaker"   />
                        </span>
                    </div>

                    {/* Login Button */}
                    <button className=" bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white px-3 xl:px-6 py-[5px] rounded-full  transition drop-shadow-lg hover:shadow-lg/20 text-[13px] " style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>

                        <NavLink to={'/login'}>Login</NavLink>
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