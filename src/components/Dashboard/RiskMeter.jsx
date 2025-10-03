import React, { useState } from "react";
import Arrow from "../../assets/Dashboard/objects.svg";
// import Needle from "../../assets/Dashboard/Vector.png";
import Needle from '../../assets/Dashboard/Vector.png'
import Base from "../../assets/Dashboard/base.png";


const RiskMeter = () => {
    // risk percentage state (later update from backend)
    const [riskPercent, setRiskPercent] = useState(localStorage.getItem('totalWeight') || 0); // Example default: 40%

    // map 0–100 → -90 to +90 degrees
    const angle = (riskPercent / 100) * 180 - 90;

    // Define color segments
    const segments = [
        { range: [0, 20], color: "#006400" }, // Dark Green
        { range: [21, 40], color: "#8CE249" }, // Light Green
        { range: [41, 60], color: "#EFD933" }, // Yellow
        { range: [61, 80], color: "#EDA635" }, // Orange
        { range: [81, 100], color: "#E82D48" }, // Red
    ];

    return (
        <div className="rounded-2xl w-full md:w-[40%]  border border-gray-300 border-l-0 shadow-sm pt-3 p-4 pb-0 flex flex-col">
            {/* <div className="rounded-2xl w-[40%] h-[27vh] border border-gray-300 border-l-0 shadow-sm pt-3 p-4 flex flex-col"> */}
            <p
                className="text-lg mb-5"
                style={{ fontFamily: "Sofia Pro", fontWeight: 600 }}
            >
                My Risk Meter
            </p>

            {/* <div className="flex-1 flex items-center justify-center flex-col "> */}
            <div className="relative w-full aspect-[2/1] flex items-center justify-center flex-col ">
                <svg viewBox="0 0 200 110" width="100%" height="100%">
                    {segments.map((seg, idx) => (
                        <path
                        key={idx}
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="40"
                        strokeDasharray="50 200"
                        strokeDashoffset={-50 * idx}
                        />
                    ))}
                </svg>

                {/* Needle */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center " style={{ transform: `rotate(${angle}deg)` }}>
                    <img src={Base} alt="baseicon" className="w-[35px] md:w-[30px] lg:w-[25px] xl:w-[34px] origin-bottom z-10 "  />
                    <img
                        src={Needle}
                        alt="Needleicon"
                        className="w-[30px] md:w-[23px] lg:w-[13px] xl:w-[20px]  absolute bottom-[15px] lg:bottom-[20px] xl:bottom-[25px] -left-[2px] md:left-0 lg:left-[3px]  origin-bottom -z-10"
                    />
                </div>

                <p className="text-[#E82D48]" style={{ fontFamily: "Sofia Pro", fontWeight: 700, paddingBottom: "5px" }}>High/ <span className="text-[#3FD14A]">Low</span></p>
            </div>
        </div>
    );
};

export default RiskMeter;
