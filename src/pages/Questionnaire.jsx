import { useFooter } from "../Context/FooterContext.jsx";
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
import { useNavigate } from "react-router";

export default function Questionnaire() {
    const navigate = useNavigate();
    const stepImages = [step1, step2, step3, step4, step5];
    const stepImageClasses = [
        "w-[300px] h-[359px] object-contain ", // step1
        "w-[230px] h-[230px]  rounded-lg mx-auto object-contain", // step2
        "w-[250px] h-[250px]  rounded-lg mx-auto object-contain ", // step3
        "w-[230px] h-[230px]  rounded-lg ml-14 object-contain  ", // step4
        "w-[230px] h-[230px]  rounded-lg ml-12 object-contain ", // step5
    ];
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedRisk, setSelectedRisk] = useState(null);
    const step = steps[currentStep];
    const handleGetResult = (e)=>{
        console.log("GET RESULT")
        navigate('/assessmentresult')
    }
    return (
        <div className="container relative w-full  lg:w-[95%] xl:max-w-[1000px] 2xl:max-w-[1250px] mx-auto mt-6 mb-6 px-6 sm:px-6">

            <div className="relative">
                {/* ------------------ MOBILE + TABLET HEADER ------------------ */}
                <div className="block lg:hidden text-center mb-4">
                    <h2
                        className="text-[28px] md:text-3xl text-black font-normal"
                        style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                    >
                        Tell Us About Yourself
                    </h2>
                    <p className="text-sm text-[#3285EC] font-medium mb-2 text-left pt-6 ">
                        Step {currentStep + 1}
                    </p>
                    {/* Progress bar */}
                    <div className="flex  gap-2 mt-2 ">

                        {steps.map((s, index) => (
                            <div
                                key={s.id}
                                className={`h-[5px] flex-1 rounded ${index <= currentStep
                                    ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5]"
                                    : "bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex">
                    {/* ------------------ LAPTOP VIEW (with image + shadow + scroll) ------------------ */}
                    <div className="hidden lg:grid grid-cols-12 gap-6 rounded-[2rem] shadow-[0px_0px_13.6px_-2px_#0000000F] pt-8 p-0 pr-8 lg:pr-2 xl:pr-8 mr-4 lg:w-[78%] xl:w-[80%]">
                        {/* Left Section */}
                        <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start justify-start gap-16 bg-[#FCFCFC] h-full rounded-l-[2rem]">
                            <h2
                                className="text-4xl leading-tight text-black font-normal mx-auto lg:text-center "
                                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                            >
                                Tell us about <br /> Yourself
                            </h2>
                            <img
                                src={stepImages[currentStep]}
                                alt={step.title}
                                className={stepImageClasses[currentStep]}
                            />
                        </div>

                        {/* Right Section */}
                        <div
                            className="lg:col-span-7 xl:col-span-8 pt-4 xl:pl-8 xl:pr-8 pb-8"
                            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                        >
                            <p className="text-sm text-[#3285EC] font-medium mb-2">
                                Step {currentStep + 1}
                            </p>
                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex gap-4">
                                    {steps.map((s, index) => (
                                        <div
                                            key={s.id}
                                            className={`h-[5px] flex-1 rounded ${index <= currentStep
                                                ? "bg-gradient-to-b from-[#323FF7] to-[#33AEE5]"
                                                : "bg-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Questions (scrollable) */}
                            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 h-[350px]">
                                {currentStep === 1 ? (
                                    <RiskOptionsStep
                                        selected={selectedRisk}
                                        setSelected={setSelectedRisk}
                                    />
                                ) : (
                                    step.questions.map((q) => (
                                        <div key={q.id} className="text-sm">
                                            <p className="font-medium mb-2 text-[#11688F]">
                                                {q.id}. {q.label}
                                            </p>

                                            {/* Radio */}
                                            {q.type === "radio" && (
                                                <div className="flex gap-6 lg:flex-wrap lg:gap-3 xl:flex-nowrap">
                                                    {q.options.map((opt) => (
                                                        <label
                                                            key={opt}
                                                            className="flex items-center gap-2 border rounded-2xl px-1.5 border-[#A9A9A9] bg-[#F4F4F4] pr-2.5  xl:whitespace-nowrap"
                                                        >
                                                            <input type="radio" name={`q${q.id}`} /> {opt}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Text */}
                                            {q.type === "text" && (
                                                <input
                                                    type="text"
                                                    className="p-2 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4]"
                                                />
                                            )}

                                            {/* Select */}
                                            {q.type === "select" && (
                                                <select className="border outline-none lg:min-w-[250px] xl:min-w-[300px]  py-1 text-[13px] rounded-full px-3 border-[#A9A9A9] bg-[#F4F4F4]">
                                                    {q.options.map((opt) => (
                                                        <option key={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            )}

                                            {/* Checkbox */}
                                            {q.type === "checkbox" && (
                                                <div className="flex flex-col gap-3">
                                                    {q.options.map((opt) => (
                                                        <label
                                                            key={opt}
                                                            className="flex items-center gap-2 text-[13px] border rounded-full px-1.5 border-[#A9A9A9] bg-[#F4F4F4] py-0.5"
                                                        >
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
                                {/* Left Side */}
                                <div className="flex flex-col text-sm ">
                                    {currentStep >= 2 || selectedRisk === 1 ? (
                                        <button
                                            className="flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer"
                                        >
                                            Book Appointment
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    ) : (
                                        <div className="w-[160px]" />
                                    )}
                                </div>

                                {/* Right Side */}
                                <div className="flex lg:gap-2 xl:gap-4">
                                    {currentStep > 0 && (
                                        <div
                                            onClick={() => setCurrentStep((s) => s - 1)}
                                            className="flex flex-row justify-between items-center text-sm shadow-xl hover:shadow-lg/30 pr-3 pt-1 pb-1 
                          border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer gap-3 pl-1 "
                                            style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                        >
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ">
                                                <ArrowLeft width={17} />
                                            </span>
                                            <button className="cursor-pointer">Previous</button>
                                        </div>
                                    )}
                                    {currentStep < steps.length  && currentStep < 4 ? (
                                        <button
                                            onClick={() =>
                                                setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
                                            }
                                            className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
               bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer"
                                        >
                                            Next
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleGetResult}
                                            className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
               bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer"
                                        >
                                            Get Result
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    )}

                                    {/* 
                                    {currentStep < steps.length && (
                                        <button
                                            onClick={() =>
                                                setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
                                            }
                                            className=" relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer"
                                        >
                                            Next
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------------------ MOBILE + TABLET (No image, auto height) ------------------ */}
                    <div className="block lg:hidden w-full bg-white shadow-md rounded-2xl p-4 mt-4 ">
                        <div className="space-y-3 h-auto overflow-visible">
                            {currentStep === 1 ? (
                                <RiskOptionsStep
                                    selected={selectedRisk}
                                    setSelected={setSelectedRisk}
                                />
                            ) : (
                                step.questions.map((q) => (
                                    <div key={q.id} className="text-[16px] md:text-sm">
                                        <p className="font-medium mb-2 text-[#11688F]">
                                            {q.id}. {q.label}
                                        </p>
                                        {/* Same question rendering as above */}
                                        {/* Radio */}
                                        {q.type === "radio" && (
                                            <div className="flex flex-wrap gap-3 text-sm">
                                                {q.options.map((opt) => (
                                                    <label
                                                        key={opt}
                                                        className="flex items-center gap-2 border rounded-2xl px-1.5 border-[#A9A9A9] bg-[#F4F4F4] pr-2.5   md:whitespace-nowrap"
                                                    >
                                                        <input type="radio" name={`q${q.id}`} /> {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Text */}
                                        {q.type === "text" && (
                                            <input
                                                type="text"
                                                className="p-2 w-full border rounded-2xl text-[13px] px-1.5 border-[#A9A9A9] bg-[#F4F4F4]"
                                            />
                                        )}

                                        {/* Select */}
                                        {q.type === "select" && (
                                            <select className="border outline-none w-full  md:w-[250px] py-1 text-[13px] rounded-full px-3 border-[#A9A9A9] bg-[#F4F4F4]">
                                                {q.options.map((opt) => (
                                                    <option key={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        )}

                                        {/* Checkbox */}
                                        {q.type === "checkbox" && (
                                            <div className="flex flex-col gap-3">
                                                {q.options.map((opt) => (
                                                    <label
                                                        key={opt}
                                                        className="flex items-center gap-2 text-[13px] border rounded-full px-1.5 border-[#A9A9A9] bg-[#F4F4F4] py-0.5"
                                                    >
                                                        <input type="checkbox" name={`q${q.id}`} /> {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="flex justify-between flex-wrap-reverse md:flex-wrap mt-6 w-full gap-4 md:gap-0 ">
                            {/* Left Side */}
                            <div className="flex flex-col text-sm mx-auto w-[13.5rem]  md:mx-0">
                                {currentStep >= 2 || selectedRisk === 1 ? (
                                    <button
                                        className="flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer"
                                    >
                                        Book Appointment
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                            <ArrowRight width={17} />
                                        </span>
                                    </button>
                                ) : (
                                    <div className="w-[160px]" />
                                )}
                            </div>

                            {/* Right Side */}
                            <div className="flex gap-3 justify-between md:justify-end w-full md:w-[33%] ">
                                {currentStep > 0 ? (
                                    <div
                                        onClick={() => setCurrentStep((s) => s - 1)}
                                        className="flex flex-row justify-between items-center text-sm shadow-xl hover:shadow-lg/30 pr-3 pt-1 pb-1 
                          border border-[#566AFF] 
                          bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                          text-white rounded-full cursor-pointer gap-3 pl-1 "
                                        style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                    >
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ">
                                            <ArrowLeft width={17} />
                                        </span>
                                        <button className="cursor-pointer">Previous</button>
                                    </div>
                                ) : (
                                    <div className="w-[160px]" />
                                )}
                                 {currentStep < steps.length  && currentStep < 4 ? (
                                        <button
                                            onClick={() =>
                                                setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
                                            }
                                            className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
               bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer"
                                        >
                                            Next
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleGetResult}
                                            className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF]
               bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer"
                                        >
                                            Get Result
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg ml-3">
                                                <ArrowRight width={17} />
                                            </span>
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ------------------ FIXED NAV (Mobile + Tablet) ------------------ */}
                {/* <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-between items-center px-4 py-3 z-50">
                    {currentStep > 0 && (
                        <button
                            onClick={() => setCurrentStep((s) => s - 1)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white text-sm shadow"
                        >
                            <ArrowLeft width={17} /> Previous
                        </button>
                    )}
                    <button
                        onClick={() =>
                            setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
                        }
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white text-sm shadow"
                    >
                        Next <ArrowRight width={17} />
                    </button>
                </div> */}

                {/* ------------------ FIXED NAV (Mobile + Tablet) ------------------ */}
                {/* <div
                    className="lg:hidden fixed left-0 w-full bg-white shadow-lg flex justify-between items-center px-4 py-3 z-50 transition-all duration-700 ease-in-out"
                    style={{ bottom: mobileNavBottom }}
                >
                    {currentStep > 0 && (
                        <button
                            onClick={() => setCurrentStep((s) => s - 1)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white text-sm shadow"
                        >
                            <ArrowLeft width={17} /> Previous
                        </button>
                    )}
                    <button
                        onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white text-sm shadow"
                    >
                        Next <ArrowRight width={17} />
                    </button>
                </div> */}


                {/* ------------------ FLOATING CHAT WIDGET (Laptop only) ------------------ */}
                <div className="hidden lg:flex absolute bottom-0 right-0 lg:right-[-24px]  lg:bottom-10 2xl:right-3 2xl:bottom-6 gap-4 rounded-full cursor-pointer bg-gray-200 shadow-lg">
                    <img
                        src={chatbot}
                        alt="Ask"
                        className="w-14 h-14 rounded-full border absolute top-[-26%] right-[92%]"
                    />
                    <div className="flex items-center">
                        <SearchIcon color="#838383" className="w-4 h-4 ml-4 mr-2" />
                        <input
                            type="text"
                            placeholder="Ask a question"
                            className=" text-gray-700 outline-none text-xs w-22 "
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
