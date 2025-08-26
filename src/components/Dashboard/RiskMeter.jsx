import React, { useState } from "react";
import Arrow from "../../assets/Dashboard/objects.svg";

const RiskMeter = () => {
    // risk percentage state (later update from backend)
    const [riskPercent, setRiskPercent] = useState(55); // Example default: 40%

    // map 0–100 → -90 to +90 degrees
    const angle = (riskPercent / 100) * 180 - 90;

    return (
        <div className="rounded-2xl w-[40%] h-[27vh] border border-gray-300 border-l-0 shadow-sm pt-3 p-4 flex flex-col">
            <p
                className="text-lg mb-5"
                style={{ fontFamily: "Sofia Pro", fontWeight: 600 }}
            >
                My Risk Meter
            </p>

            <div className="flex-1 flex items-center justify-center flex-col ">
                <svg
                    viewBox="0 0 200 110"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Background arc with risk levels */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#E82D48"
                        strokeWidth="40"
                        strokeDasharray="50 200"
                    />
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#EDA635"
                        strokeWidth="40"
                        strokeDasharray="50 200"
                        strokeDashoffset="-50"
                    />
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#EFD933"
                        strokeWidth="40"
                        strokeDasharray="50 200"
                        strokeDashoffset="-100"
                    />
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#8CE249"
                        strokeWidth="40"
                        strokeDasharray="50 200"
                        strokeDashoffset="-150"
                    />
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#3FD14A"
                        strokeWidth="40"
                        strokeDasharray="50 200"
                        strokeDashoffset="-200"
                    />

                    {/* Arrow pointer */}
                    <g transform="translate(100,100)">
                        <g transform={`rotate(${angle})`}>
                            <image href={Arrow} width="44" height="120" x="-22" y="-100" />
                        </g>
                            
                    </g>
                </svg>
                <p className="text-[#E82D48]" style={{fontFamily:"Sofia Pro", fontWeight:700}}>High/ <span className="text-[#3FD14A]">Low</span></p>
            </div>
        </div>
    );
};

export default RiskMeter;
