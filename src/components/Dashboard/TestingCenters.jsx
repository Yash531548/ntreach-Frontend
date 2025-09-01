// import { ArrowRight } from 'lucide-react'
// import React from 'react'

// const TestingCenters = () => {
//     return (
//         <div className='rounded-r-4xl w-full border border-gray-300 border-l-0 shadow-sm pt-5 px-4 xl:pt-8 xl:px-10'>
//             <div className='flex  items-center justify-between gap-4'>
//                 <p className='text-[#0063B9] text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Testing Centres</p>
//             </div>

//             <div className='w-full rounded-3xl shadow-sm h-[15%] mt-[2rem] pt-3 pb-3 text-sm flex items-center justify-center'>
//                 <div className='flex items-center gap-6'>
//                     <select className="w-36 xl:w-52 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-1 outline-none text-gray-500">
//                         <option disabled selected>Select State</option>
//                         <option>Maharashtra</option>
//                         <option>Karnataka</option>
//                         <option>Uttar Pradesh</option>
//                         <option>Rajasthan</option>
//                         <option>Delhi</option>
//                     </select>

//                     <select className="w-36 xl:w-52 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-1 outline-none text-gray-500">
//                         <option disabled selected>Select District</option>
//                         <option>Pune</option>
//                         <option>Bangalore Urban</option>
//                         <option>Lucknow</option>
//                         <option>Jaipur</option>
//                         <option>South Delhi</option>
//                     </select>

//                     <button
//                         style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
//                         className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pl-3 py-0.5 border border-[#566AFF] 
//                  bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
//                  text-white rounded-full cursor-pointer gap-2"
//                     >
//                         Search
//                         <span className="flex items-center justify-center w-6 h-6 ml-3 rounded-full bg-white text-black text-lg  ">
//                             <ArrowRight width={17} />
//                         </span>
//                     </button>
//                 </div>
//             </div>

//             <div className='mt-[1.7rem] w-full rounded-3xl shadow-sm h-[60%] pt-3 pb-3 text-sm flex items-center justify-center'>
//                 <p style={{ fontFamily: "Sofia Pro", fontWeight: 400 , color:'#A9A9A9'} }>
//                     Lists of results
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default TestingCenters

import React from 'react';
import { ArrowRight } from 'lucide-react';

// Static test center data based on your image
const TEST_CENTERS = [
    "Ictc I G.m.c.latur, Government Medical College Near Rajasthan High School Latur Pin 413512",
    "Ictc Ii G.m.c. Latur, Government Medical College Near Rajasthan High School Latur Pin 413512",
    "Ictc Mimsr Latur, Mit College Visvnath Purm Ambajogai Road,Latur - 413512",
    "Ictc Nagar Parishad H. Latur, Nagar Parishad H.patel Chowk , Latur 413512",
    "Ictc R.h Devni, R.h Devni Taluka-Udgir Dist - Latur - 413519",
    "Ictc R.h. Renapur, R.h. Renapur Tahasil Near Taluka - Renapur Dist- Latur- 413527",
    "Ictc R.h.babalgaon, R.h.babalgaon Taluka-Latur Dist - Latur- 413512",
    "Ictc R.h.chakur, R.h.chakur Taluka-Chakur Dist - Latur - 413513",
    "Ictc Rh Ahmedpur, Rh Ahmedpur Taluka-Ahmedpur Dist- Latur - 413515",
    "Ictc Rh Ausa, Rh Ausa Taluka-Ausa Dist - Latur - 413520",
    "Ictc Rh Kasarshirshi, Rh Kasarshirshi Taluka-Nilanga Dist - Latur",
    "Ictc Rh Killari, Rh Killari Taluka-Ausa Dist - Latur - 413516",
    "Ictc Rh Murud, Rh Murud Taluka-Latur Dist - Latur- 413520",
    "Sdh Nilanga, Sdh Nilanga Taluka-Nilanga Dist- Latur- 413521",
    "Sdh Udgir, Sdh Udgir, Main Road Udgir Tq.udigir Dist. Latur 413517"
];

const TestingCenters = () => {
    return (
        <div className='rounded-r-4xl w-full border border-gray-300 border-l-0 shadow-sm pt-5 px-4 xl:pt-8 xl:px-10'>
            <div className='flex items-center justify-between gap-4'>
                <p className='text-[#0063B9] text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Testing Centres</p>
            </div>

            {/* Search Section - unchanged */}
            <div className='w-full rounded-3xl shadow-sm h-[15%] mt-[2rem] pt-3 pb-3 text-sm flex items-center justify-center'>
                <div className='flex items-center gap-6'>
                    <select className="w-36 xl:w-52 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-1 outline-none text-gray-500">
                        <option disabled selected>Select State</option>
                        <option>Maharashtra</option>
                        <option>Karnataka</option>
                        <option>Uttar Pradesh</option>
                        <option>Rajasthan</option>
                        <option>Delhi</option>
                    </select>
                    <select className="w-36 xl:w-52 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-1 outline-none text-gray-500">
                        <option disabled selected>Select District</option>
                        <option>Pune</option>
                        <option>Bangalore Urban</option>
                        <option>Lucknow</option>
                        <option>Jaipur</option>
                        <option>South Delhi</option>
                    </select>
                    <button
                        style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                        className="relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pl-3 py-0.5 border border-[#566AFF] 
                 bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                 text-white rounded-full cursor-pointer gap-2"
                    >
                        Search
                        <span className="flex items-center justify-center w-6 h-6 ml-3 rounded-full bg-white text-black text-lg">
                            <ArrowRight width={17} />
                        </span>
                    </button>
                </div>
            </div>

            {/* List of Results */}
            <div className="w-full max-h-[53vh] h-[45vh] overflow-y-auto rounded-4xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                <p className='mb-4 text-[#A9A9A9] text-[18px] xl:text-lg' style={{ fontWeight: 400 }}>
                    Lists of results
                </p>
                {/* List items */}
                <ul className="pl-3 pr-4 space-y-3 ">
                    {TEST_CENTERS.map((center, idx) => (
                        <li
                            key={center}
                            className="text-[#323232] text-sm hover:bg-[#E9F8FF] bg-[#F7F8FA] rounded-xl px-5 py-3 shadow flex items-center"
                            style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                        >
                            {center}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TestingCenters;
