import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import './FAQs.css'

const faqs = [
    {
        question: "What is the difference between HIV and AIDS?",
        answer:
            "HIV stands for Human Immuno-deficiency Virus. The Virus gradually damages the immune system, i.e. the ability to fight infections/diseases. AIDS stands for Acquired Immune Deficiency Syndrome. It is the later stage of HIV infection and is sometimes referred to as 'late-stage HIV' or 'advanced HIV disease'. This condition is reached when a group of symptoms appear as the immune system becomes very weak. ART drugs are available that help you to lead a healthy life and prevents reaching AIDS stage.",
    },
    {
        question: "Is there a cure for HIV?",
        answer:
            "Random placeholder text: Currently, there is no cure for HIV, but it can be managed effectively with antiretroviral therapy. This allows individuals to live healthy, long lives.",
    },
    {
        question: "Is there a cure for HIV?",
        answer:
            "Random placeholder text: Currently, there is no cure for HIV, but it can be managed effectively with antiretroviral therapy. This allows individuals to live healthy, long lives.",
    },
    {
        question: "Is there a cure for HIV?",
        answer:
            "Random placeholder text: Currently, there is no cure for HIV, but it can be managed effectively with antiretroviral therapy. This allows individuals to live healthy, long lives.",
    },
    {
        question: "Is there a cure for HIV?",
        answer:
            "Random placeholder text: Currently, there is no cure for HIV, but it can be managed effectively with antiretroviral therapy. This allows individuals to live healthy, long lives.",
    },
];
const getResponsiveRadius = (isOpen) => {
  // Match Tailwind's breakpoints and radius tokens in px/rem as in CSS config
  if (window.innerWidth >= 1280) return isOpen ? "1.5rem" : "2rem"; // xl or desktop
  if (window.innerWidth >= 768) return isOpen ? "1.25rem" : "1.75rem"; // md/lg/tablet
  return isOpen ? "1rem" : "1.5rem"; // mobile
};
const FAQCard = ({ isOpen, onClick, question, answer }) => (
    
    <div className="relative w-full  " style={{
        background: 'linear-gradient(180deg, #323FF7 0%, #33AEE5 100%)',
        // borderRadius: isOpen ? '1.5rem' : '2rem',
        borderRadius: getResponsiveRadius(isOpen),
        padding: '1px', // Or the thickness you want
        transition: 'border-radius 0.3s'
    }}>
        {/* <div className="faq-gradient-border"> */}
        <div className="">
            <button
                className={`w-full block text-left bg-white transition-all duration-300
        ${isOpen ? "rounded-3xl md:rounded-[1.25rem] xl:rounded-[1.5rem]" : "rounded-4xl md:rounded-[1.75rem] xl:rounded-[2rem]"}
        px-5 md:px-7 py-4 md:py-3.5 shadow-[0_0px_10px_-1px_rgba(0,0,0,0.15)]`}
                onClick={onClick}
                type="button"
                style={{
                    borderRadius: getResponsiveRadius(isOpen),
                    transition: 'border-radius 0.3s',
                    background: '#fff'
                }}
            >
                <div className="flex items-center justify-between">
                    <span className="text-base  font-medium text-[#111517]  w-[80%]">
                        {question}
                    </span>
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#111517]" aria-label="Collapse" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-[#111517]" aria-label="Expand" />
                    )}
                </div>
                {isOpen && (
                    <div className=" pt-2.5 pb-2 md:pb-0 text-sm  text-[#111517] leading-relaxed" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                        <div className="h-[0.25px] bg-black  w-full mb-3"></div>
                        {answer}
                    </div>
                )}
            </button>
        </div>
    </div>
);

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(0); // First card open by default

    return (
        <div className="container w-full mx-auto flex items-center px-2 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0">
            <main
                className="container max-w-[1200px] flex flex-col mx-auto lg:max-w-[850px] xl:max-w-[1100px] gap-7 md:px-8 md:mt-8"
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
            >
                <div>
                    <h2 className="text-3xl lg:text-4xl xl:text-[40px]  md:mb-0">
                        FAQs
                    </h2>
                </div>
                <div className="flex flex-col gap-5 w-full md:max-w-[95%]  ">
                    {faqs.map((faq, idx) => (
                        <FAQCard
                            key={faq.question}
                            isOpen={openIndex === idx}
                            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FAQs;
