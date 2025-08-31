import { ArrowRight } from 'lucide-react'
import React from 'react'

const TestingCenters = () => {
    return (
        <div className='rounded-r-4xl w-full border border-gray-300 border-l-0 shadow-sm pt-8 px-10'>
            <div className='flex  items-center justify-between gap-4'>
                <p className='text-[#0063B9] text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Testing Centres</p>
            </div>

            <div className='w-full rounded-3xl shadow-sm h-[15%] mt-[2rem] pt-3 pb-3 text-sm flex items-center justify-center'>
                <div className='flex items-center gap-6'>
                    <select className="w-52 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-1 outline-none text-gray-500">
                        <option disabled selected>Select State</option>
                        <option>Maharashtra</option>
                        <option>Karnataka</option>
                        <option>Uttar Pradesh</option>
                        <option>Rajasthan</option>
                        <option>Delhi</option>
                    </select>

                    <select className="w-52 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-1 outline-none text-gray-500">
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
                        <span className="flex items-center justify-center w-6 h-6 ml-3 rounded-full bg-white text-black text-lg  ">
                            <ArrowRight width={17} />
                        </span>
                    </button>
                </div>
            </div>

            <div className='mt-[1.7rem] w-full rounded-3xl shadow-sm h-[60%] pt-3 pb-3 text-sm flex items-center justify-center'>
                <p style={{ fontFamily: "Sofia Pro", fontWeight: 400 , color:'#A9A9A9'} }>
                    Lists of results
                </p>
            </div>
        </div>
    )
}

export default TestingCenters