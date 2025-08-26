import { useState } from "react";
import { Activity, Stethoscope } from "lucide-react"; // Example icons
import Icon1 from '../assets/question/Icon1.svg'
import Icon2 from '../assets/question/Icon2.svg'

const riskOptions = [
    { id: 1, label: "I Know my Risk", subLabel: "(Book Appointment)", icon: Icon1 },
    { id: 2, label: "I want to know my risk", subLabel: "(Produce Risk Meter)", icon: Icon2 },
];

export default function RiskOptionsStep({ selected, setSelected }) {
    return (
        <div className="flex gap-12 flex-col items-center  max-h-[350px] overflow-y-auto pt-6  h-[350px]">
            <h2 className="text-[#1475A1] text-3xl" style={{ fontFamily: "Sofia Pro" , fontWeight: 400 }}>Know Your Risk (KYR) for HIV</h2>
            <div className="flex gap-6 justify-center ">
                {riskOptions.map((opt) => (
                    <label
                        key={opt.id}
                        className={`flex flex-col shadow-lg items-center justify-between p-4 w-48 h-48 border rounded-2xl cursor-pointer transition 
            ${selected === opt.id ? "border-blue-500 " : "border-gray-300"}
            hover:border-blue-400`}
                        onClick={() => setSelected(opt.id)}
                    >
                        {/* Top: Icon */}
                        <img
                            src={opt.icon}
                            alt={opt.label}
                            className="w-16 h-16 text-blue-600"
                        />

                        {/* Middle: Label */}
                        <div className="flex justify-center items-center flex-col">
                            <p className="mt-2  text-sm  text-center">{opt.label} </p>
                            <span className="text-gray-400 text-[10px] ">{opt.subLabel}</span>

                        </div>
                        {/* Bottom: Radio */}
                        <input
                            type="radio"
                            name="risk"
                            checked={selected === opt.id}
                            onChange={() => setSelected(opt.id)}
                            className="mt-2"
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}
