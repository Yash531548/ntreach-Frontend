import React from 'react'
import NavigatorCard from './Teams/NavigatorCard'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import MeterIcon from '../assets/Extra/Meter.png'
import BaseIcon from '../assets/Extra/Base.png'
import NeedleIcon from '../assets/Extra/Vector.png'
import { useNavigate } from 'react-router'
import { VnData } from '../libs/vnData'
import { useVn } from '../Context/VnContext'



const AssementResult = () => {
    const navigate = useNavigate();
    const { vnData, loading } = useVn()
    
        // If vnData is loaded and has a name, filter it. Otherwise, show all
        const displayedVns =
            !loading && vnData?.name
                ? VnData.filter(vn => vn.VnName === vnData.name)
                : VnData;

    const totalWeight = parseFloat(localStorage.getItem('totalWeight')) || 50
    // animated needle value
    const [riskValue, setRiskValue] = useState(0)

    useEffect(() => {
        // Trigger animation after mount
        const timer = setTimeout(() => setRiskValue(totalWeight), 200);
        return () => clearTimeout(timer);
        // setRiskValue(170)
    }, [totalWeight]);

    // map 0–100 → -90 to +90 degrees
    // const angle = (riskValue / 100) * 180 - 90;
    const ClampedRiskValue = Math.max(0, Math.min(riskValue, 100));
    const angle = (ClampedRiskValue / 100) * 180 - 90;

    return (
        <div className='container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0'>
            <main
                className="container max-w-[1200px] flex flex-col mx-auto lg:max-w-[850px] xl:max-w-[1100px]  md:px-8 md:mt-8"
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                <div className='flex w-full flex-col md:flex-row md:border-b-1 gap-10 md:gap-0 '>
                    <div className='flex-1 max-w-[501px] '>
                        <header className='px-3 xl:px-8 space-y-4'>
                            <h2 className=' ttext-3xl lg:text-4xl xl:text-[2.625rem]'>Assessment Complete</h2>
                            <p className='text-xl md:text-2xl text-center'>Your HIV Risk Is</p>
                        </header>
                        <div className='flex justify-center mt-6 xl:mt-9 border-b-1 md:border-0'>
                            <div className='relative'>
                                {/* Meter */}
                                <img src={MeterIcon} alt="Risk Meter" className=' w-full md:max-w-70 lg:max-w-80 xl:w-96' />

                                {/* Needle */}
                                <div
                                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center transition-transform duration-[1500ms] ease-out" style={{ transform: `rotate(${angle}deg)` }}
                                >
                                    <img src={BaseIcon} alt="baseicon" className="w-[40px] xl:w-[44px] origin-bottom " />
                                    <img
                                        src={NeedleIcon}
                                        alt="Needleicon"
                                        className="w-[11px] md:w-[9px] lg:w-[12px]  absolute bottom-[35px]  origin-bottom "
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className=' flex-1 '>
                        <div className='w-full  max-w-lg bg-[#DAF3FF] px-4 py-5 lg:px-5 lg:py-7 xl:px-8 xl:py-8 rounded-2xl'>
                            <header>
                                <p className='text-xl  lg:text-2xl font-normal'>No Worries, <br /> Help Is Right Around the Corner. </p>
                            </header>
                            <p className='font-semibold mt-3 text-lg mb-7 lg:mb-10'>Book an appointment to know your options</p>
                            <button
                                onClick={() =>
                                    navigate("/bookappointment")
                                }
                                className="relative flex items-center justify-between w-full max-w-[78%] px-2 pl-4 py-1 lg:py-1.5 xl:py-2 shadow-[0px_2px_14.6px_0px_#00000040] hover:shadow-[0px_2px_14.6px_5px_#00000040]   border border-[#566AFF]
               bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer font-normal"
                            >
                                Book an Appointment
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-lg ml-3">
                                    <ArrowRight width={18} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Virtual Navigator */}
                <div className='space-y-10 mt-14 xl:mt-18'>
                    <div>
                        <h2 className="text-3xl lg:text-4xl xl:text-[2.625rem] md:mb-0">
                            Or Chat with <span className='text-[#1475A1]'> our Virtual Navigators </span>
                        </h2>
                    </div>
                    <div
                        className="
            grid gap-6 w-full
            grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-3 
            xl:grid-cols-4
            justify-items-center
            mb-4 
            "
                    >
                        {/* Replace with dynamic mapping over your data */}
                        {/* {VnData.map((vn, i) => ( */}
                        {displayedVns.map((vn, i) => (
                            <NavigatorCard
                                key={i}
                                VnImage={vn.VnImage}
                                VnName={vn.VnName}
                                VnState={vn.VnState}
                                VnMobile={vn.VnMobile}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AssementResult