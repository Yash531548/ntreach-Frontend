import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import logoBac from "../../assets/logo-bac.png";
import Humsafar from "../../assets/humsafar-logo.png";
import { getServiceType } from "../../Api/getServiceType";

const ProviderProfile = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [availableServices, setAvailableServices] = useState([]);

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        clinicAddress: "",
        services: [],
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectService = (selectedId) => {
        const selectedService = availableServices.find(
            (s) => s.service_type_id === selectedId
        );
        if (
            selectedService &&
            !profile.services.some((s) => s.service_type_id === selectedId)
        ) {
            setProfile((prev) => ({
                ...prev,
                services: [...prev.services, selectedService],
            }));
        }
        setDropdownOpen(false);
    };

    const handleRemoveService = (id) => {
        setProfile((prev) => ({
            ...prev,
            services: prev.services.filter((s) => s.service_type_id !== id),
        }));
    };

    const submitProfile = () => {
        console.log("Submitting provider profile:", profile);
        alert("Profile submitted successfully!");
        navigate("/provider/dashboard");
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServiceType();
                if (response.data.status === "success") {
                    setAvailableServices(response.data.data);
                } else {
                    alert(`Error fetching services: ${response.data.message}`);
                }
            } catch (error) {
                alert(`Error fetching services: ${error.message}`);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="flex justify-center h-[95vh]">
            <div className="w-full md:max-w-3xl mt-12">
                <div className="w-full p-2 mx-auto space-y-14">
                    <header className="flex justify-between items-center">
                        <img src={logoBac} alt="NETREACH Logo" className="h-8 xl:h-[49px] w-auto" />
                        <img src={Humsafar} alt="Humsafar Logo" className="h-10 md:h-18 w-auto" />
                    </header>

                    <div className="flex flex-col items-center space-y-6">
                        <h1 className="text-black text-2xl md:text-3xl font-medium">
                            Complete Your Profile
                        </h1>

                        <div className="w-full max-w-2xl space-y-4 p-2">
                            {/* Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={profile.firstName}
                                    onChange={handleProfileChange}
                                    placeholder="Enter First Name"
                                    className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={profile.lastName}
                                    onChange={handleProfileChange}
                                    placeholder="Enter Last Name"
                                    className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none"
                                />
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleProfileChange}
                                placeholder="Email Address"
                                className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none"
                            />

                            {/* Clinic Address */}
                            <input
                                type="text"
                                name="clinicAddress"
                                value={profile.clinicAddress}
                                onChange={handleProfileChange}
                                placeholder="Enter Clinic Address"
                                className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none"
                            />

                            {/* Services Dropdown */}
                            <div className="relative">
                                <button
                                    className="w-full bg-black text-white px-4 py-3 rounded-md flex justify-between items-center"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    Select Services
                                    <span
                                        className={`inline-block transform transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"
                                            }`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute w-full bg-white border rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg z-10">
                                        {availableServices.map((service) => (
                                            <div
                                                key={service.service_type_id}
                                                onClick={() =>
                                                    handleSelectService(service.service_type_id)
                                                }
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {service.service_type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Selected Services */}
                            {profile.services.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {profile.services.map((service) => (
                                        <span
                                            key={service.service_type_id}
                                            className="bg-black text-white px-4 py-1 rounded-full flex items-center space-x-2"
                                        >
                                            <span>{service.service_type}</span>
                                            <button
                                                onClick={() =>
                                                    handleRemoveService(service.service_type_id)
                                                }
                                                className="text-white text-sm cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={submitProfile}
                                className="border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] rounded-md text-white w-full py-2 cursor-pointer"
                            >
                                Submit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
