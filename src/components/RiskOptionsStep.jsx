// import { useState } from "react";
// import { Activity, Stethoscope } from "lucide-react"; // Example icons
// import Icon1 from '../assets/question/Icon1.svg'
// import Icon2 from '../assets/question/Icon2.svg'

// const riskOptions = [
//     { id: 1, label: "I Know my Risk", subLabel: "(Book Appointment)", icon: Icon1 },
//     { id: 2, label: "I want to know my risk", subLabel: "(Produce Risk Meter)", icon: Icon2 },
// ];

// export default function RiskOptionsStep({ selected, setSelected }) {
//     return (
//         <div className="flex gap-12 flex-col items-center  max-h-[350px] md:overflow-y-auto pt-6  h-[350px]">
//             <h2 className="text-[#1475A1] text-xl md:text-3xl" style={{ fontFamily: "Sofia Pro" , fontWeight: 400 }}>Know Your Risk (KYR) for HIV</h2>
//             <div className="flex flex-col md:flex-row gap-6 justify-center ">
//                 {riskOptions.map((opt) => (
//                     <label
//                         key={opt.id}
//                         className={`flex flex-col shadow-lg items-center justify-between p-4 w-48 h-48 border rounded-2xl cursor-pointer transition 
//             ${selected === opt.id ? "border-blue-500 " : "border-gray-300"}
//             hover:border-blue-400`}
//                         onClick={() => setSelected(opt.id)}
//                     >
//                         {/* Top: Icon */}
//                         <img
//                             src={opt.icon}
//                             alt={opt.label}
//                             className="w-16 h-16 text-blue-600"
//                         />

//                         {/* Middle: Label */}
//                         <div className="flex justify-center items-center flex-col">
//                             <p className="mt-2  text-sm  text-center">{opt.label} </p>
//                             <span className="text-gray-400 text-[10px] ">{opt.subLabel}</span>

//                         </div>
//                         {/* Bottom: Radio */}
//                         <input
//                             type="radio"
//                             name="risk"
//                             checked={selected === opt.id}
//                             onChange={() => setSelected(opt.id)}
//                             className="mt-2"
//                         />
//                     </label>
//                 ))}
//             </div>
//         </div>
//     );
// }

import Icon1 from '../assets/question/Icon1.svg';
import Icon2 from '../assets/question/Icon2.svg';

const riskOptions = [
    { id: 1, label: "I Know my Risk", subLabel: "(Book Appointment)", icon: Icon2 },
    { id: 2, label: "I want to know my risk", subLabel: "(Produce Risk Meter)", icon: Icon1 },
];

export default function RiskOptionsStep({ selected, setSelected }) {
    return (
        <div className="flex flex-col items-center w-full px-4 md:px-6 pt-6 overflow-y-auto">
            {/* Title */}
            <h2
                className="text-[#1475A1] text-lg sm:text-xl md:text-2xl xl:text-3xl text-center mb-6"
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
            >
                Know Your Risk (KYR) for HIV
            </h2>

            {/* Options */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full">
                {riskOptions.map((opt) => (
                    <label
                        key={opt.id}
                        className={`flex flex-col items-center justify-between p-4 sm:p-5 md:p-6 
              w-full max-w-[260px] h-auto sm:h-56 md:h-60 xl:w-48 xl:h-48 
              border rounded-2xl shadow-md cursor-pointer transition
              ${selected === opt.id ? "border-blue-500" : "border-gray-300"}
              hover:border-blue-400`}
                        onClick={() => setSelected(opt.id)}
                    >
                        {/* Icon */}
                        <img
                            src={opt.icon}
                            alt={opt.label}
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                        />

                        {/* Labels */}
                        <div className="flex flex-col items-center text-center">
                            <p className="mt-2 text-sm sm:text-sm">{opt.label}</p>
                            <span className="text-gray-400 text-[10px] sm:text-xs">
                                {opt.subLabel}
                            </span>
                        </div>

                        {/* Radio */}
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
