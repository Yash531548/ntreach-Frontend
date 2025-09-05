import React, { useState } from "react";
import { ArrowRight } from "lucide-react"; // still used for service button arrow
import { useNavigate } from "react-router";
import Arrowvector from "../assets/Vector.svg";

const ServiceButtons = ({ buttons }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    // Fallback to default buttons if none provided
    const buttonData = buttons || [
        { label: "Book an HIV Test", action: "/LoginWithNumber" },
        { label: "Start PrEP Consultation", action: "/LoginWithNumber" },
        { label: "Talk to our Counsellor", action: "/LoginWithNumber" },
    ];
    const handleClick = (button) => {
        setSelectedService(button);
        setChecked(false);
        setShowModal(true);
    };

    const handleProceed = () => {
        if (checked && selectedService) {
            setShowModal(false);
            navigate(selectedService.action);
        }
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
                        className="flex items-center justify-between shadow-xl hover:shadow-xl/20  
              pl-6 pr-2 py-[9px] border border-[#566AFF] cursor-pointer 
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
                            onClick={() => setChecked(!checked)}
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
                            disabled={!checked}
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
