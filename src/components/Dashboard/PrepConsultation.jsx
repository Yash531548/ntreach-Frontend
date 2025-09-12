import React, { useState } from 'react'
import ChatBot from '../ChatBot';
import stopAid from '../../assets/Dashboard/stopAid.png'
import { NavLink } from 'react-router';
const PrepConsultation = () => {
    const [UserName, setUserName] = useState("");
    return (
        <div className=' container w-full md:min-h-[calc(100vh-64px-60px)] flex items-center justify-center
        px-4 sm:px-4
        lg:px-10
        xl:px-0
        xl:ml-[30px]
        2xl:ml-0
        ' 
        style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>

            {/* <main className='container max-w-[1050px]  min-h-[calc(100vh-64px-100px)]  flex justify-between '> */}
            <main className='container max-w-[1050px] md:min-h-[calc(100vh-64px-100px)] flex justify-between
          lg:max-w-[850px] lg:justify-center
          xl:max-w-[1050px]
          xl:w-[1050px] '>
                <div className='container max-w-[500px]  md:min-h-[calc(100vh-64px-100px)]  flex flex-col gap-8 pt-2  '>
                    <div className='mt-10'>
                        <h1 className='text-3xl lg:text-4xl xl:text-[2.625rem] text-black whitespace-nowrap'> Share Your Information</h1>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="Name" className='text-[#11688F] text-lg'>Provide Your Name</label>
                            <input type="text" name="Name" id="Name" placeholder='Enter Your Name' value={UserName} onChange={(e) => setUserName(e.target.value)} className='outline-none text-sm bg-[#F4F4F4] rounded-4xl py-1 px-4' />
                        </div>
                        <div>
                            {/* Select service required */}
                            <h2 className="text-[#11688F] text-lg mb-3">Select services required</h2>
                            <div className="flex flex-col gap-2">
                                {[
                                    "Pre-Exposure Prophylaxis (PrEP)",
                                    ,
                                ].map((service, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center justify-between bg-[#DAF3FF] rounded-full pl-4 pr-1.5 py-1 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* <input
                                                type="checkbox"
                                                className="w-4 h-4 text-[#1475A1]  border-[#323FF7]  rounded focus:ring-0"
                                            />
                                            <span className="text-black text-sm" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>{service}</span> */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="hidden peer" />
                                                <span className="w-4 h-4 border-1 border-[#323FF7] rounded peer-checked:bg-gradient-to-b from-[#323FF7] to-[#33AEE5]  peer-checked:border-[#1475A1]"></span>
                                                <span className="text-black text-sm" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>{service}</span>
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white text-sm italic"
                                        >
                                            i
                                        </button>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6">
                                <NavLink to={'/ScheduleAppointment'}>

                                    <button className="cursor-pointer w-[150px] py-2 rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5]  text-white font-medium shadow-md/20">
                                        Let&apos;s Go
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container max-w-[500px]  min-h-[calc(100vh-64px-100px)]  hidden md:flex justify-center items-center  '>
                    <img src={stopAid} alt="getTested Image" className='w-[68%]  lg:w-[48%]' />
                </div>
                <div className='hidden md:block'>
                    <ChatBot />
                </div>
            </main>
        </div>
    )
}

export default PrepConsultation