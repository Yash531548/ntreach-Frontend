import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";


const faqs = [
    {
        question: "What is the difference between HIV and AIDS?",
        answer:
            "HIV stands for Human Immuno-deficiency Virus. The Virus gradually damages the immune system, i.e. the ability to fight infections/diseases. AIDS stands for Acquired Immune Deficiency Syndrome. It is the later stage of HIV infection and is sometimes referred to as 'late-stage HIV' or 'advanced HIV disease'. This condition is reached when a group of symptoms appear as the immune system becomes very weak. ART drugs are available that help you to lead a healthy life and prevents reaching AIDS stage.",
    },
    {
        question: "Is there a cure for HIV?",
        answer:
            "No, however with effective treatment the virus can be kept in check and its effect on the body can be slowed down.Anti-Retroviral Treatment (ART) drugs are available which can prolong the life of an HIV positive person, thus enhancing the quality of life as well. Patients have to take lifelong treatment once initiated on ART. It is available free at all Government ART centres across India.",
    },
    {
        question: "How do I avoid getting HIV during Sex?",
        answer:
            "HIV is transmitted through semen, vaginal fluid, blood, and anal mucus. Unprotected sex is any kind of sex without a condom. Wearing a condom helps prevent passing bodily fluids to one another, thus reducing the risk of transmitting the infection (HIV and also STI infection.",
    },
    {
        question: "When can I go for my HIV Test?",
        answer:
            "The government hospitals typically work Monday to Saturdays. You can visit any Government ICTC (Integrated Counselling and Testing Centres) centre on any working day except Sundays & Public holidays.For Private Hospitals & Private Testing Labs, one needs to check with their date and timing. This information is sometimes available on the internet.",
    },
    {
        question: "What do I do if I get HIV?",
        answer:
            "Contact our Counsellor for further advice. Or connect with the nearest Government ICTC centre or ART centre. ART medicines slow down the effects of HIV in your body, which keeps you healthy and also lowers the chances of transmitting the virus to your partner. Taking ART medicines early and continuing with the treatment is important to protect the immune system. Treatment also involves taking care of your nutrition, emotional and mental health. All and ICTC and ART centre services include Counselling services which is a must for integrated HIV care and support.",
    },
    {
        question: "What is STI or STD",
        answer:
            "STD stands for sexually transmitted disease, whereas STI means sexually transmitted infection. Essentially, the difference is between a disease and an infection.Sexually transmitted disease first begins as a sexually transmitted infection. Infection occurs when the sexually transmitted bacteria or virus first enters the body and begins multiplying. Once the sexually transmitted bacteria or viruses have entered the body, the infection may progress into a disease. Disease occurs when this foreign presence officially disrupts the body’s normal functions and processes.",
    },
    {
        question: "How are STIs treated",
        answer:
            "Sexually transmitted infections (STIs) caused by bacteria are generally easier to treat. Viral infections can be managed but not always cured. Treatment varies and may include medication (antibiotics) and practicing safe sex to avoid spreading the infection to others.",
    },
    {
        question: "Can I get HIV from sharing needles, syringes, or other drug injection equipment (cookers etc.)?",
        answer:"Used needles, syringes, and other injection equipment may have someone else’s blood on them, and blood can carry HIV.Sharing needles also increases the risk of getting Hepatitis B and C, and other infections.",
    },
    {
        question: "How is it possible for an HIV positive mother to transmit the virus to child?",
        answer:"An HIV-infected mother can infect the child in her womb through her blood. The baby is more at risk if the mother has been recently infected or is in an advanced stage of AIDS.Transmission can also occur at the time of birth when the baby is passing through the mother’s genital tract. Transmission can also occur through breast milk.",
    },
    {
        question: "Can I get HIV by touch, kiss, hug or any other way?",
        answer:"HIV is found only in body fluids. One cannot get HIV by shaking someone’s hand, kissing or giving them a hug (or by using the same toilet or towel). While HIV is found in saliva, sharing cups or utensils has never been shown to transmit HIV. Insect bites also do not help in transmitting HIV. HIV does not replicate or survive well in insects. HIV is a fragile virus that does not live outside the human body.",
    },
    {
        question: "Can I stay healthy with HIV?",
        answer:"Yes, staying healthy with HIV is possible. HIV can be managed by starting antiretroviral treatment (ART) and staying with the course of medications, testing and regular visits to your doctor as a routine. Supplementing this with a healthy diet, exercise, management of one's mental wellbeing with the help of a counsellor.",
    },
    {
        question: "Is the COVID-19 vaccine safe for people living with HIV?",
        answer:"Yes, the COVID-19 vaccine is absolutely safe and effective. The vaccine's purpose is to keep the COVID-19 virus in check. The vaccine does not interfere with ART medicines nor create any complications for people living with HIV.",
    },
    {
        question: "What are PrEP and PEP",
        answer:"<p>PrEP* and PEP* are medicines that help prevent HIV. Each type is used in a different situation:</p> <p>PrEP stands for ‘Pre-exposure prophylaxis’. It is for people who don't already have HIV but are at a very high risk of getting it. PrEP is daily medicine that can reduce this risk. With PrEP, if you do get exposed to HIV, the medicine can stop HIV from taking hold and spreading throughout your body.</p><p>PEP stands for post-exposure prophylaxis. PEP is for people who have possibly been exposed to HIV. It is only for emergency situations. PEP must be started within 72 hours after a possible exposure to HIV.</p>        ",
    },
    {
        question: "What is PrEP",
        answer:"<p>PrEP (Pre-Exposure Prophylaxis) is a preventive medication for people who do not have HIV but are at high risk of contracting it. It involves taking a daily pill that significantly reduces the risk of HIV infection.**There is a condition** one has to be HIV negative to get on PrEP. Anyone with an HIV positive report has to get on ART to help keep the virus in check and with regular medication they with reach a U=U status. *CDC (the US Centre for Disease Control) states</p>        <p>1.PrEP reduces the risk of getting HIV from sex by about 99%.</p>        <p>2.PrEP reduces the risk of getting HIV from injection drug use by at least 74%.</p>",
    },
    {
        question: "Who should consider taking PrEP?",
        answer:"PrEP is recommended for individuals who are at high risk of HIV infection, such as those who have an HIV-positive partner, people with multiple sexual partners, or individuals who inject drugs and share needles.",
    },
    {
        question: "How effective is PrEP in preventing HIV?",
        answer:"When taken consistently as prescribed, PrEP reduces the risk of HIV infection by more than 99% through sexual transmission and around 75% for people who inject drugs.",
    },
    {
        question: "Can PrEP be accessed in India?",
        answer:"Yes, PrEP is available in India and The Humsafar Trust clinics and NETREACH project can be contacted to get access to health care centres for PrEP.*Remember PrEP is not available over the counter at Chemists and should only be taken after consulting a doctor",
    },
    {
        question: "Is PrEP covered under Indian health insurance?",
        answer:"Currently, most health insurance policies in India do not cover PrEP. However, some NGOs like The Humsafar Trust and other programs offer it at subsidised rates (subject to availability).",
    },
    {
        question: "Do I need a prescription for PrEP in India?",
        answer:"Yes, PrEP requires a prescription from a qualified healthcare provider in India.",
    },
    {
        question: "Are there any side effects of Prep?",
        answer:"PrEP is known to be fairly safe and you can consult your doctor if you are feeling any side effects.PrEP is always prescribed after running some vital tests, and hence it should be taken at the advice of a doctor.",
    },
    {
        question: "How long does it take for PrEP to become effective?",
        answer:" PrEP becomes fully effective after 7 days of daily use for anal sex and 21 days for vaginal sex.",
    },
    {
        question: "Can I stop using condoms if I’m on PrEP?",
        answer:"You are not safe from other STIs. PrEP is highly effective in preventing HIV, it does not protect against other sexually transmitted infections (STIs). It is advisable to continue using condoms to protect against STIs.Condom use is also important to help prevent HIV if PrEP is not taken as prescribed.",
    },
    {
        question: "Is PrEP safe for women ?",
        answer:"Yes, PrEP is safe for women, including those who are pregnant, breastfeeding( a doctors prescription and advice is important), provided they are at risk of HIV infection.",
    },
    {
        question: "What is PEP?",
        answer:"PEP (Post-Exposure Prophylaxis) is a treatment used to prevent HIV infection after potential exposure. It involves taking a combination of antiretroviral drugs for 28 days.",
    },
    {
        question: " Who should take PEP?",
        answer:"PEP is recommended for individuals who have had a recent potential exposure to HIV, such as through unprotected sex, needle-sharing, or accidental exposure to HIV-positive blood (for healthcare professionals and lab technicians)",
    },
    {
        question: "How soon should I start PEP after possible exposure?",
        answer:"PEP should be started within 72 hours (3 days) of potential HIV exposure for it to be effective. The sooner it is started, the better the chances of preventing HIV infection. After 72 hours the effect of PEP starts dropping.",
    },
    {
        question: "How effective is PEP?",
        answer:"When taken as prescribed, PEP can reduce the risk of HIV infection by over 80%. However, it is not 100% effective and should be used only in emergency situations.",
    },
    {
        question: "What does the PEP regimen involve?",
        answer:"The PEP regimen typically consists of a combination of three antiretroviral drugs taken daily for 28 days. Completing the full course is crucial for effectiveness.",
    },
    {
        question: "Is PEP available in India?",
        answer:"Yes, PEP is available in India at various hospitals, government clinics, and some private healthcare facilities.",
    },
    {
        question: "Can I take PEP more than once?",
        answer:"PEP can be used more than once if needed, but it is intended for emergency use. Repeated use may suggest the need for long-term preventive measures like PrEP.",
    },
    {
        question: "Does PEP have any side effects?",
        answer:"Common side effects of PEP may include fatigue, nausea, and headaches. These usually subside after a few days.",
    },
    {
        question: " How much does PEP cost in India?",
        answer:"The cost of PEP in India can varies some government hospitals may provide it for free.",
    },
    {
        question: " How does PEP work?",
        answer:"When PEP is taken, the HIV drugs get into the bloodstream and the genital and rectal tissues. If there is HIV in the body, the drugs can prevent HIV from replicating within the body's immune cells, and help to prevent a permanent infection from developing.",
    },
    
    {
        question: "What are the terms Viral Load and opportunistic infections?",
        answer:"Viral load refers to the amount of HIV virus that is detected in the body. The HIV virus spreads in the body through replication (increase by creating copies of the virus).Opportunistic infections (OIs) are easy to contract when the immune system is weak, which is the case with HIV when left untreated. The body is easily attacked by OIs caused by Bacteria, fungi and parasites.Keeping the Viral loads suppressed is the aim of HIV treatment procedures. Viral load can be detected by blood tests which indicate the rate at which the virus is developing. CD4 count can also be tested which shows the rate at which the infection is being combated.",
    },
    
    {
        question: "How would I know if I have HIV?",
        answer:
            "<p>HIV can be transmitted through: </p> <p>A.    Unprotected sex with an HIV infected person- You can get HIV if you have anal sex or vaginal sex with someone who has HIV without using protection (like condoms or medicine to treat or prevent HIV).</p> <p>B.   Transfusion of HIV infected blood or blood products</p><p>C.   Sharing of needles contaminated with HIV infected blood </p><p>D.   and from HIV infected mother to her baby – during pregnancy, during birth or after delivery through breast milk.</p>",
    },
    {
        question: "What is high risk behaviour?",
        answer:
            "<p>High-risk behaviours are defined as acts that increase the risk of disease. With regards to HIV and STIs it is the following that are considered to be of high-risk: </p> <p>A) an individual who indulges in unsafe sex practices that increases the risk of contracting the HIV virus and other STIs</p> <p>An individual who is unaware of safe sex practices and will eventually contract the HIV virus and other STIs</p><p>B) An individual who willingly continues practising unsafe sex practices and will contract HIV/has contracted HIV virus/ has devloped AIDS/has STIs/ has STIs along with either HIV or AIDS</p><p>C) An individual who is unaware of HIV intervention options</p><p>An individual who is not aware of their status or isn't aware that their partner falls in the high-risk category</p><p>D) An individual who is aware of the risks associated with their sexual behaviour and has to continue in the practice.</p><p>E) An individual who uses drugs using injections/shared needles and associated materials that will make them contract HIV and other infections.</p>",
    },
];
const getResponsiveRadius = (isOpen) => {
    // Match Tailwind's breakpoints and radius tokens in px/rem as in CSS config
    if (window.innerWidth >= 1280) return isOpen ? "1.2rem" : "1.3rem"; // xl or desktop
    if (window.innerWidth >= 768) return isOpen ? "1.25rem" : "1.75rem"; // md/lg/tablet
    return isOpen ? "1rem" : "1.5rem"; // mobile
};
const containsHTML = (text) => /<\/?[a-z][\s\S]*>/i.test(text);

const FAQCard = ({ isOpen, onClick, question, answer }) => (

    <div className="relative w-full  " style={{
        background: isOpen ? 'linear-gradient(180deg, #323FF7 0%, #33AEE5 100%)' : "white",
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
        px-5 md:px-7 py-4 md:py-3.5 shadow-[0px_0px_10.1px_-1px_#00000026]`}
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
                        {!containsHTML(answer) ? (
                            <p>{answer}</p>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: answer }} />
                        )}
                    </div>
                )}
            </button>
        </div>
    </div>
);

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(0); // First card open by default

    return (
        <div className="container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0">
            <main
                className="container max-w-[1200px] flex flex-col mx-auto lg:max-w-[850px] xl:max-w-[1100px] gap-7 md:px-8 md:mt-8"
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
            >
                <div>
                    <h2 className="text-3xl lg:text-4xl xl:text-[2.625rem] md:mb-0">
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
