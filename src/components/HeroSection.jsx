import React from 'react';
import chatbot from '../assets/chatbot.png';
import ServiceButtons from '../components/ServiceButtons';
import indian_common_man2 from '../assets/indian_common_man2.png';
import RotatingWords from './RotatingWords';
import { Mic, SearchIcon } from 'lucide-react';
import RotatingWord from './RotatingWord.jsx';
import tollFreeIcon from '../assets/tollFreeNumber.png'

const HeroSection = () => {
    return (
        <main className="flex flex-col md:flex-row items-start justify-center gap-1 px-4 md:gap-5 xl:gap-0  lg:px-14 lg:py-13 xl:px-16 xl:py-18 py-6 xl:ml-[-3.8rem]  ">
            {/* Left side - Desktop only */}

            <div className="hidden lg:flex  justify-start xl:h-[28.75rem]  lg:w-[45%] xl:w-[500px] sm:hidden">
                <img
                    src={indian_common_man2}
                    alt="Indian common man"
                    className="rounded-3xl object-fit max-w-full h-auto "
                />
            </div>

            {/* Mobile heading + image */}
            <div className="flex  flex-row items-start md:hidden justify-between 
                min-w-[280px] max-w-[480px] w-full  px-1 ">
                {/* <h2 className="text-2xl mb-3 sm:ml-4">
                    Book a free session <br /> with our counsellor
                </h2> */}
                {/* <RotatingWords /> */}
                <RotatingWord />
                <img
                    src={indian_common_man2}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mb-4  flex-shrink-0"
                />
            </div>


            {/* Right side */}
            <div className="flex-1 flex flex-col gap-4 xl:gap-8 p-3    min-w-[280px] max-w-[480px] w-full  px-1 xl:w-full xl:p-0  ">

                {/* Desktop rotating words */}
                <div className="hidden md:block md:w-[490px]">
                    {/* <RotatingWords /> */}
                    <RotatingWord />
                </div>

                {/* Service buttons */}
                <div className='mt-4 '>
                    <ServiceButtons />
                </div>

                <img src={tollFreeIcon} alt="" className=' w-full '/>
            </div>
        </main>
    );
};

export default HeroSection;