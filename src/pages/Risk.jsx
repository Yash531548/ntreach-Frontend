import React from 'react'
import ServiceButtons from '../components/ServiceButtons' // Adjust import path as needed
import RiskIcon from '../assets/Static/Risk.png'
const riskButtons = [
    { label: "HIV Testing", action: "/LoginWithNumber" },
    { label: "PrEP Consultation", action: "/LoginWithNumber" },
];

const Risk = () => {
    return (
        <div className='container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0'>
            <main
                className="container max-w-[1200px] flex  mx-auto lg:max-w-[850px] xl:max-w-[1100px] gap-18 md:px-8 md:mt-8 "
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }} >
                <div className=' flex flex-col gap-10  '>
                    <div className='text-3xl lg:text-4xl xl:text-[2.625rem] '>
                        <h2 className="text-black mb-6 md:mb-2">
                            Know Your Risk
                        </h2>
                        <h2 className='text-[#1475A1] font-medium '>Take a 2-minute Health Assessment</h2>
                    </div>
                    <div>
                        <ServiceButtons buttons={riskButtons} />
                    </div>
                    <div className='bg-[#DAF3FF]
                        rounded-3xl
                        px-7 py-8 md:py-6 md:px-6
                        w-full max-w-[380px]
                        sm:max-w-[420px]
                        md:max-w-[520px]
                        shadow-md 
                        transition-all'>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-[#1475A1] font-bold text-xl '>Did you know? </h3>
                            <p className='text-black '>Some infections have no symptoms, meaning that infected individuals may not experience any noticeable symptoms. This can lead to unknowingly spreading the infection to others.</p>
                        </div>
                    </div>
                </div>
                <div className='hidden md:block my-auto'>
                    <img src={RiskIcon} alt="Risk_icon" className='w-64 lg:w-[300px] xl:w-56' />
                </div>
            </main>
        </div>
    )
}

export default Risk
