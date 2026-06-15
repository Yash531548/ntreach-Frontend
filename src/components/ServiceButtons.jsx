import React, { useState } from "react";
import { ArrowRight } from "lucide-react"; // still used for service button arrow
import { useNavigate } from "react-router";
import Arrowvector from "../assets/Vector.svg";
import axios from 'axios'


const ServiceButtons = ({ buttons }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const [ipInfo, setIpInfo] = useState(null);


    // Fallback to default buttons if none provided
    const buttonData = buttons || [
        { label: "Book an HIV Test", action: "/questionnaire" },
        { label: "Start PrEP Consultation", action: "/prepconsultation" },
        { label: "Talk to our Counsellor", action: "/counsellorform" },
    ];
    const handleClick = (button) => {
        setSelectedService(button);
        setChecked(false);
        setShowModal(true);

        // Store the selected option in localStorage
        localStorage.setItem('userIntent', button.label);
    };

    const handleProceed = () => {
        if (checked && selectedService) {
            setShowModal(false);
            navigate(selectedService.action, {
                state: { ipInfo }
            });
        }
    };

    const fetchUserLocation = async () => {
        const cached = localStorage.getItem('ipInfo');

        if (cached) {
            const parsed = JSON.parse(cached);
            setIpInfo(parsed);
            return true;
        }

        setIsFetchingLocation(true);

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;

            // Get public IP
            const { data: ipData } = await axios.get(
                'https://api.ipify.org?format=json'
            );

            // Reverse geocode coordinates
            const { data: locationData } = await axios.get(
                'https://nominatim.openstreetmap.org/reverse',
                {
                    params: {
                        format: 'json',
                        lat: latitude,
                        lon: longitude
                    }
                }
            );

            const ipInfo = {
                ip: ipData.ip,
                latitude,
                longitude,
                country: locationData.address?.country || '',
                state:
                    locationData.address?.state ||
                    locationData.address?.['ISO3166-2-lvl4']?.replace('IN-', '') ||
                    '',
                city:
                    locationData.address?.city ||
                    locationData.address?.town ||
                    locationData.address?.village ||
                    '',
                district:
                    locationData.address?.city_district ||
                    locationData.address?.county ||
                    '',
                pincode: locationData.address?.postcode || ''
            };

            console.log('User Info:', ipInfo);

            localStorage.setItem('ipInfo', JSON.stringify(ipInfo));
            setIpInfo(ipInfo);

            return true;
        } catch (error) {
            console.error('Failed to fetch user location', error);
            return false;
        } finally {
            setIsFetchingLocation(false);
        }
    };

    const handleCheckboxClick = async () => {
        if (checked) return setChecked(false);
        await fetchUserLocation() && setChecked(true);
    };

    return (
        <div>
            {/* Service Buttons */}
            <div
                className="flex flex-col gap-4 text-xl"
                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
            >
                {/* {buttons.map((button, index) => ( */}
                {buttonData.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(button)}
                        className="flex items-center justify-between shadow-[0px_2px_14.6px_0px_#00000040] hover:shadow-[0px_2px_14.6px_5px_#00000040] 
              pl-6 pr-2 py-2 border border-[#566AFF] cursor-pointer 
              bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
              text-white rounded-full min-w-[300px] max-w-[600px] 
              sm:min-w-[250px] sm:max-w-[500px]"
                    >
                        {button.label}
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-lg shadow-sm">
                            <ArrowRight width={19} />
                        </span>
                    </button>
                ))}
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4"
                    onClick={() => setShowModal(false)}  // close modal when clicking outside
                >
                    <div onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal 
                        className="bg-white border border-[#2684AE] p-5 rounded-xl shadow-lg w-full max-w-sm">

                        {/* Checkbox + Text */}
                        <label
                            className="flex items-start gap-3 cursor-pointer text-left"
                            // onClick={() => setChecked(!checked)}
                            onClick={handleCheckboxClick}
                        >
                            <div
                                className={`w-6 h-6 flex items-center justify-center border-2 rounded-md mt-1
                ${checked ? "border-blue-600" : "border-gray-400"}`}
                            >
                                {checked && (
                                    <img src={Arrowvector} alt="check" className="w-4 h-4" />
                                )}
                            </div>

                            <div className="flex-1 text-[15px] leading-snug">
                                <p>Check this box to proceed.</p>
                                <p>Data will be kept confidential.</p>
                                <a href="#" className="text-blue-600 underline text-sm">
                                    Read More
                                </a>
                            </div>
                        </label>

                        {/* Proceed Button */}
                        <button
                            disabled={!checked || isFetchingLocation}
                            onClick={handleProceed}
                            className={`mt-6 w-full py-2 rounded-full text-white font-medium
              ${checked ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceButtons;
