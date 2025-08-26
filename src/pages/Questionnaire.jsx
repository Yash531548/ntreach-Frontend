import { steps } from "../libs/StepConfig";
import { useState } from "react";
import tell1 from "../assets/question/tell1.png";
import chatbot from "../assets/chatbot.png";
import { ArrowLeft, ArrowRight, Mic, SearchIcon } from "lucide-react";
import step1 from "../assets/question/step1.png";
import step2 from "../assets/question/step2.png";
import step3 from "../assets/question/step3.png";
import step4 from "../assets/question/step4.png";
import step5 from "../assets/question/step5.png";
import RiskOptionsStep from "../components/RiskOptionsStep";
import ChatBot from "../components/ChatBot";


export default function Questionnaire() {
    const stepImages = [step1, step2, step3, step4, step5];
    // 👇 Add custom styles for each image (same index as stepImages)
    const stepImageClasses = [
        "w-[300px] h-[359px] object-contain ",  // step1
        "w-[230px] h-[230px]  rounded-lg mx-auto object-contain",          // step2
        "w-[250px] h-[250px]  rounded-lg mx-auto object-contain ",                         // step3
        "w-[230px] h-[230px]  rounded-lg ml-14 object-contain  ",                      // step4
        "w-[230px] h-[230px]  rounded-lg ml-12 object-contain "                       // step5
    ];
    const [currentStep, setCurrentStep] = useState(0); // index of steps array
    const [selectedRisk, setSelectedRisk] = useState(null);
    const step = steps[currentStep];

    return (
        // <div className="container max-w-[1200px] lg:w-[1000px]  mx-auto mt-6 min-h-[calc(100vh-64px-60px)] px-4">
        //     <div className="flex flex-col lg:flex-row gap-6">
        //         <div className="rounded-[2rem] shadow-lg min-h-[500px] grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8 pr-8 w-full">

        //             {/* Left Section (Heading + Image) */}
        //             <div className="lg:col-span-4 flex flex-col items-center lg:items-start justify-start gap-10 bg-[#FCFCFC] h-full rounded-t-[2rem] lg:rounded-l-[2rem] lg:rounded-tr-none p-6">
        //                 <h2
        //                     className="text-3xl lg:text-4xl leading-tight text-[#1475A1] font-normal text-center lg:text-left"
        //                     style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
        //                 >
        //                     Tell us about <br /> Yourself
        //                 </h2>
        //                 <img
        //                     src={stepImages[currentStep]}
        //                     alt={step.title}
        //                     className={`${stepImageClasses[currentStep]} w-[200px] lg:w-[250px] xl:w-[300px]`}
        //                 />
        //             </div>

        //             {/* Right Content */}
        //             <div className="lg:col-span-8 pt-4 px-4 lg:px-8 pb-8" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
        //                 <p className="text-sm text-[#3285EC] font-medium mb-2">
        //                     Step {currentStep + 1}
        //                 </p>

        //                 {/* Progress Bar */}
        //                 <div className="mb-6">
        //                     <div className="flex gap-2">
        //                         {steps.map((s, index) => (
        //                             <div
        //                                 key={s.id}
        //                                 className={`h-[5px] flex-1 rounded ${index <= currentStep
        //                                     ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5]"
        //                                     : "bg-gray-200"
        //                                     }`}
        //                             />
        //                         ))}
        //                     </div>
        //                 </div>

        //                 {/* Questions */}
        //                 <div className="space-y-6 max-h-[350px] overflow-y-auto pr-1 sm:pr-2">
        //                     {currentStep === 1 ? (
        //                         <RiskOptionsStep selected={selectedRisk} setSelected={setSelectedRisk} />
        //                     ) : (
        //                         step.questions.map((q) => (
        //                             <div key={q.id} className="text-sm">
        //                                 <p className="font-medium mb-2 text-[#11688F]">
        //                                     {q.id}. {q.label}
        //                                 </p>

        //                                 {/* Radio */}
        //                                 {q.type === "radio" && (
        //                                     <div className="flex flex-wrap gap-3">
        //                                         {q.options.map((opt) => (
        //                                             <label
        //                                                 key={opt}
        //                                                 className="flex items-center gap-2 border rounded-2xl px-2 border-[#A9A9A9] bg-[#F4F4F4] py-1 text-xs sm:text-sm"
        //                                             >
        //                                                 <input type="radio" name={`q${q.id}`} /> {opt}
        //                                             </label>
        //                                         ))}
        //                                     </div>
        //                                 )}

        //                                 {/* Text */}
        //                                 {q.type === "text" && (
        //                                     <input
        //                                         type="text"
        //                                         className="p-2 w-full border rounded-2xl text-xs sm:text-sm px-2 border-[#A9A9A9] bg-[#F4F4F4]"
        //                                     />
        //                                 )}

        //                                 {/* Select */}
        //                                 {q.type === "select" && (
        //                                     <select className="border outline-none min-w-[200px] sm:min-w-[300px] py-1 text-xs sm:text-sm rounded-full px-3 border-[#A9A9A9] bg-[#F4F4F4]">
        //                                         {q.options.map((opt) => (
        //                                             <option key={opt}>{opt}</option>
        //                                         ))}
        //                                     </select>
        //                                 )}

        //                                 {/* Checkbox */}
        //                                 {q.type === "checkbox" && (
        //                                     <div className="flex flex-col gap-3">
        //                                         {q.options.map((opt) => (
        //                                             <label
        //                                                 key={opt}
        //                                                 className="flex items-center gap-2 text-xs sm:text-sm border rounded-full px-2 border-[#A9A9A9] bg-[#F4F4F4] py-1"
        //                                             >
        //                                                 <input type="checkbox" name={`q${q.id}`} /> {opt}
        //                                             </label>
        //                                         ))}
        //                                     </div>
        //                                 )}
        //                             </div>
        //                         ))
        //                     )}
        //                 </div>

        //                 {/* Navigation */}
        //                 <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
        //                     {/* Book Appointment */}
        //                     <div className="flex flex-col text-sm">
        //                         {(currentStep >= 2 || selectedRisk === 1) ? (
        //                             <button
        //                                 className="flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
        // bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
        // text-white rounded-full cursor-pointer w-full sm:w-auto"
        //                             >
        //                                 Book Appointment
        //                                 <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg border ml-3">
        //                                     <ArrowRight width={17} />
        //                                 </span>
        //                             </button>
        //                         ) : (
        //                             <div className="h-0 sm:h-auto" />
        //                         )}
        //                     </div>

        //                     {/* Prev + Next */}
        //                     <div className="flex gap-3 flex-wrap">
        //                         {currentStep > 0 && (
        //                             <div
        //                                 onClick={() => setCurrentStep((s) => s - 1)}
        //                                 className="flex items-center text-sm shadow-xl hover:shadow-lg/30 pr-3 pt-1 pb-1 
        //            border border-[#566AFF] 
        //            bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
        //            text-white rounded-full cursor-pointer gap-3 pl-1 w-full sm:w-auto"
        //                                 style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
        //                             >
        //                                 <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg border">
        //                                     <ArrowLeft width={17} />
        //                                 </span>
        //                                 <button className="cursor-pointer">Previous</button>
        //                             </div>
        //                         )}

        //                         {currentStep < steps.length && (
        //                             <button
        //                                 onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))}
        //                                 className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
        //            bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
        //            text-white rounded-full cursor-pointer w-full sm:w-auto"
        //                             >
        //                                 Next
        //                                 <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg border ml-3">
        //                                     <ArrowRight width={17} />
        //                                 </span>
        //                             </button>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="container  xl:max-w-[900px] 2xl:max-w-[1200px]    mx-auto  mt-6 min-h-[calc(100vh-64px-60px)] " >
            {/* <div className="grid grid-cols-12 gap-6  border border-black "> */}
            <div className="relative">
                <div className="flex ">
                    <div className="rounded-[2rem] shadow-lg  min-h-[500px] grid grid-cols-12 gap-6 pt-8 p-0 pr-8 mr-4 w-[80%]">

                        {/* Left Section (Heading + Image) */}
                        <div className="col-span-4 flex flex-col items-start justify-start gap-16 bg-[#FCFCFC] h-full rounded-l-[2rem]  ">
                            <h2
                                className="text-4xl leading-tight text-[#1475A1] font-normal mx-auto"
                                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                            >
                                Tell us about <br /> Yourself
                            </h2>
                            {/* 👇 Dynamic class per step */}
                            <img
                                src={stepImages[currentStep]}
                                alt={step.title}
                                className={stepImageClasses[currentStep]}
                            />
                        </div>

                        {/* Right Content */}
                        <div className="col-span-8 pt-4 pl-8 pr-8 pb-8" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                            <p className="text-sm text-[#3285EC] font-medium mb-2">
                                Step {currentStep + 1}
                            </p>
                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    {steps.map((s, index) => (
                                        <div
                                            key={s.id}
                                            className={`h-[5px] flex-1 rounded ${index <= currentStep ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5]" : "bg-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Questions */}
                            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2  h-[350px]">
                                {currentStep === 1 ? (
                                    // 👉 Custom UI for Step 2
                                    <RiskOptionsStep selected={selectedRisk} setSelected={setSelectedRisk} />
                                ) : (
                                    step.questions.map((q, index) => (
                                        <div key={q.id} className="text-sm">
                                            <p className="font-medium mb-2 text-[#11688F]"> {q.id}. {q.label}</p>

                                            {/* Radio Type */}
                                            {q.type === "radio" && (
                                                <div className="flex gap-6 ">
                                                    {q.options.map((opt) => (
                                                        <label key={opt} className="flex items-center gap-2 border rounded-2xl px-1.5 border-[#A9A9A9] bg-[#F4F4F4] pr-2.5 whitespace-nowrap ">
                                                            <input type="radio" name={`q${q.id}`} /> {opt}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Text Type */}
                                            {q.type === "text" && (
                                                <input type="text" className=" p-2 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4]" />
                                            )}

                                            {/* Select Type */}
                                            {q.type === "select" && (
                                                <select className="border  outline-none min-w-[300px] py-1  text-[13px] rounded-full px-3 border-[#A9A9A9] bg-[#F4F4F4]">
                                                    {q.options.map((opt) => (
                                                        <option key={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            )}

                                            {/* ✅ Checkbox Type */}
                                            {q.type === "checkbox" && (
                                                <div className="flex flex-col gap-3 ">
                                                    {q.options.map((opt) => (
                                                        <label key={opt} className="flex items-center gap-2 text-[13px] border rounded-full px-1.5 border-[#A9A9A9] bg-[#F4F4F4] py-0.5">
                                                            <input type="checkbox" name={`q${q.id}`} /> {opt}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>


                            {/* Navigation */}
                            <div className="flex justify-between mt-6 w-full">
                                {/* Left Side (Book Appointment button or empty spacer) */}
                                <div className="flex flex-col text-sm ">
                                    {
                                        (currentStep >= 2 || selectedRisk === 1) ? (
                                            <button
                                                className="flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
        bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
        text-white rounded-full cursor-pointer "
                                            >
                                                Book Appointment
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg border ml-3">
                                                    <ArrowRight width={17} />
                                                </span>
                                            </button>
                                        ) : (
                                            // Empty spacer to keep alignment consistent
                                            <div className="w-[160px]" />
                                        )}
                                </div>

                                {/* Right Side (Prev + Next) */}
                                <div className="flex gap-4">
                                    {currentStep > 0 && (
                                        <div
                                            onClick={() => setCurrentStep((s) => s - 1)}
                                            className="flex flex-row justify-between items-center text-sm shadow-xl hover:shadow-lg/30 pr-3 pt-1 pb-1 
                   border border-[#566AFF] 
                   bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                   text-white rounded-full cursor-pointer gap-3 pl-1 "
                                            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                        >
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg border">
                                                <ArrowLeft width={17} />
                                            </span>
                                            <button className="cursor-pointer">Previous</button>
                                        </div>
                                    )}

                                    {currentStep < steps.length && (
                                        <button
                                            onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))}
                                            className=" relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                   bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                   text-white rounded-full cursor-pointer"
                                        >
                                            Next
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg border ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ✅ Floating Chat Widget */}

                    {/* <ChatBot /> */}
                </div>
                {/* ✅ Floating Chat Widget - always bottom right */}
                <div className="absolute bottom-0 right-[-40px] lg:right-0 lg:bottom-0  gap-4 rounded-full  cursor-pointer bg-gray-200 shadow-lg">
                    <img src={chatbot} alt="Ask" className="w-14 h-14 rounded-full border absolute top-[-26%] right-[92%]  " />
                    <div className="flex items-center  ">
                        < SearchIcon color='#838383' className='w-4 h-4 ml-4 mr-2' />
                        <input
                            type="text"
                            placeholder="Ask a question"
                            className=" text-gray-700 outline-none text-xs  w-22"
                        />
                        <button className="bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                            <Mic />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}