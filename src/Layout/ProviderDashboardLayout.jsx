import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { LogOut, Menu, X } from "lucide-react";
import logoBac from "../assets/logo-bac.png"

const ProviderDashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);
    // 🔐 Logout handler
    const handleLogout = () => {
        // Clear any stored auth info


        // Redirect to login
        navigate("/provider/login");
    };
    return (
        <div className="flex h-screen bg-gray-50 ">
            {/* Sidebar for desktop */}
            <aside className="hidden md:flex md:flex-col md:w-60 bg-white shadow-md border-r border-gray-200 p-5 gap-12">
                <div className="space-y-8">
                    {/*  Logo Section */}
                    <div className="flex flex-col items-start space-y-2">
                        <img
                            src={logoBac}
                            alt="NETREACH Logo"
                            className="h-8 md:h-10 xl:h-12 w-auto object-contain"
                        />
                        <h2 className="text-sm text-gray-600 tracking-wide">Provider Dashboard</h2>
                    </div>
                    <nav className="flex flex-col space-y-3">
                        <NavLink
                            to="appointments"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium ${isActive
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            My Appointments
                        </NavLink>
                        <NavLink
                            to="slots"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium ${isActive
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            My Slots
                        </NavLink>
                    </nav>
                </div>
                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-start space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Sidebar for mobile (drawer) */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    onClick={closeSidebar}
                ></div>

                {/* Sidebar content */}
                <aside className="relative z-50 w-64 bg-white h-full shadow-xl p-5">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <img src={logoBac} alt="NETREACH Logo" className="h-8  xl:h-[49px] w-auto " />
                                <button onClick={closeSidebar}>
                                    <X className="w-6 h-6 text-gray-700" />
                                </button>
                            </div>
                            <h2 className="text-sm text-gray-600 tracking-wide">Provider Dashboard </h2>
                        </div>
                        <nav className="flex flex-col space-y-3">
                            <NavLink
                                to="appointments"
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? "bg-blue-100 text-blue-600 font-semibold"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                My Appointments
                            </NavLink>
                            <NavLink
                                to="slots"
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium ${isActive
                                        ? "bg-blue-100 text-blue-600 font-semibold"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                My Slots
                            </NavLink>
                        </nav>
                    </div>
                    <button
                        onClick={() => {
                            handleLogout();
                            closeSidebar();
                        }}
                        className="flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </aside>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                {/* Header (only visible on mobile) */}
                <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 md:hidden">
                    <button onClick={toggleSidebar}>
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>
                    <h1 className="text-lg font-semibold">Provider Dashboard</h1>
                    <div className="w-6" /> {/* spacing placeholder */}
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProviderDashboardLayout;
