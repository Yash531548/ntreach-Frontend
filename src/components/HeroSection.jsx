// import React from 'react';
// import chatbot from '../assets/chatbot.png';
// import ServiceButtons from '../components/ServiceButtons';
// import indian_common_man2 from '../assets/indian_common_man2.png';
// import RotatingWords from './RotatingWords';
// import { Mic, SearchIcon } from 'lucide-react';

// const HeroSection = () => {
//     return (
//         <main className="flex flex-col md:flex-row items-center justify-center px-4 md:px-16 md:py-18 py-6 md:ml-[-5rem]  ">
//             {/* Left side - Desktop only */}

//             <div className="hidden lg:flex  justify-start h-[28.75rem]  w-[500px] sm:hidden">
//                 <img
//                     src={indian_common_man2}
//                     alt="Indian common man"
//                     className="rounded-3xl object-fit max-w-full h-auto "
//                 />
//             </div>

//             {/* Mobile heading + image */}
//             <div className="flex flex-row items-start md:hidden justify-between 
//                 min-w-[280px] max-w-[480px] w-full  px-1 ">
//                 {/* <h2 className="text-2xl mb-3 sm:ml-4">
//                     Book a free session <br /> with our counsellor
//                 </h2> */}
//                 <RotatingWords />
//                 <img
//                     src={indian_common_man2}
//                     alt="Profile"
//                     className="w-16 h-16 rounded-full mb-4  flex-shrink-0"
//                 />
//             </div>


//             {/* Right side */}
//             <div className="flex-1 flex flex-col gap-8 p-0 w-full max-w-md  ">

//                 {/* Desktop rotating words */}
//                 <div className="hidden md:block md:w-[490px]">
//                     <RotatingWords />
//                 </div>

//                 {/* Service buttons */}
//                 <div className='mt-4 '>
//                     <ServiceButtons />
//                 </div>

//                 {/* Chat with AI bot */}
//                 <div className="flex items-center gap-4 mt-4 ">
//                     <img src={chatbot} alt="Chatbot" className="rounded-full w-18 h-18" />
//                     <div className="flex flex-col">
//                         <span className="font-medium text-lg">Or chat with Malini Didi</span>
//                         <span className="text-xs text-gray-500 italic" style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}>
//                             Use the AI powered Chat bot
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex justify-center ">
//                     <div className="flex items-center justify-between  pl-4   bg-gray-200 rounded-full min-w-[300px] max-w-[600px] sm:min-w-[250px] sm:max-w-[500px] w-full">
//                         <div className="flex flex-row items-center flex-1 ">
//                             {/* <img src={Vector1} alt="search" className="w-4 h-4" /> */}
//                             < SearchIcon color='#838383'className='w-4 h-4'/>
//                             <input
//                                 type="text"
//                                 placeholder="Ask a question"
//                                 className="pl-4 text-gray-700 outline-none text-xs w-full  py-4"
//                             />
//                         </div>
//                         <button className="bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white w-12 h-12 flex items-center justify-center rounded-full shrink-0">
//                             {/* <img src={Vector} alt="searchIcon" className="w-5 h-5" /> */}
//                             {/* < SearchIcon color='#ffffff' className='w-5 h-5 '/> */}
//                             <Mic className='w-8 h-8'/>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default HeroSection;

import React from 'react';
import chatbot from '../assets/chatbot.png';
import ServiceButtons from '../components/ServiceButtons';
import indian_common_man2 from '../assets/indian_common_man2.png';
import RotatingWords from './RotatingWords';
import { Mic, SearchIcon } from 'lucide-react';
import RotatingWord from './RotatingWord.jsx';

const HeroSection = () => {
    return (
        <main className="flex flex-col md:flex-row items-center justify-center gap-1 px-4 md:gap-5 xl:gap-0  lg:px-14 lg:py-13 xl:px-16 xl:py-18 py-6 xl:ml-[-5rem]  ">
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

                {/* Chat with AI bot */}
                <div className="flex items-center gap-4 mt-4 ">
                    <img src={chatbot} alt="Chatbot" className="rounded-full w-18 h-18" />
                    <div className="flex flex-col">
                        <span className="font-medium text-lg">Or chat with Malini Didi</span>
                        <span className="text-xs text-gray-500 italic" style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}>
                            Use the AI powered Chat bot
                        </span>
                    </div>
                </div>

                <div className="flex justify-center p-0">
                    <div className="flex items-center justify-between  pl-4   bg-gray-200 rounded-full min-w-[300px] max-w-[600px] sm:min-w-[250px] sm:max-w-[500px] w-full">
                        <div className="flex flex-row items-center flex-1 ">
                            {/* <img src={Vector1} alt="search" className="w-4 h-4" /> */}
                            < SearchIcon color='#838383'className='w-4 h-4'/>
                            <input
                                type="text"
                                placeholder="Ask a question"
                                className="pl-4 text-gray-700 outline-none text-xs w-full  py-4"
                            />
                        </div>
                        <button className="bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                            {/* <img src={Vector} alt="searchIcon" className="w-5 h-5" /> */}
                            {/* < SearchIcon color='#ffffff' className='w-5 h-5 '/> */}
                            <Mic className='w-8 h-8'/>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HeroSection;