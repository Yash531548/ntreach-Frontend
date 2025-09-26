import React, { useState } from "react";
import Arrow from "../../assets/Dashboard/objects.svg";
// import Needle from "../../assets/Dashboard/Vector.png";
import Needle from '../../assets/Dashboard/Vector.png'
import Base from "../../assets/Dashboard/base.png";


const RiskMeter = () => {
    // risk percentage state (later update from backend)
    const [riskPercent, setRiskPercent] = useState(55); // Example default: 40%

    // map 0–100 → -90 to +90 degrees
    const angle = (riskPercent / 100) * 180 - 90;

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
                        // strokeDasharray="50 200"
                        strokeDasharray="51 200"
                        strokeDashoffset="-200"
                    />

                    {/* Arrow pointer */}

                    {/* <g transform="translate(100,100)">
                        <g transform={`rotate(${angle})`}>
                            <image href={Needle} width="17" height="70" x="-10" y="-70" />
                        </g>
                        <image href={Base} width="25" height="25" x="-10" y="-20" />
                    </g> */}
                </svg>
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
