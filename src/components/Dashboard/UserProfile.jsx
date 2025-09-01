import { ArrowRight, CircleArrowLeft } from 'lucide-react'
import React from 'react'
import ManAvatar from "../../assets/Dashboard/ManAvatar.jpg";

const UserProfile = ({setSelectedView}) => {
    return (
        <div className='rounded-r-4xl w-full border border-gray-300 border-l-0 shadow-sm pt-5 px-5 xl:pt-8 xl:px-10'>
            <div className='flex  items-center gap-4'>
                {/* 👇 Add click handler */}
                <CircleArrowLeft className='text-gray-700 cursor-pointer'  
                    onClick={()=> setSelectedView('Home')}
                />
                <p className='text-[#0063B9] text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>My Profile</p>
            </div>
            <div className='w-full rounded-4xl shadow-sm h-[55%] mt-[2rem] mb-[1rem] pt-6 p-8'>
                <div className=' w-18 h-18 rounded-full'>
                    <img
                        src={ManAvatar}
                        alt="User Avatar"
                        className=" w-18 h-18 rounded-full border border-gray-200"
                    />
                </div>
                <div>
                    <div className="w-full max-w-3xl space-y-3 text-sm mt-6 " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                        {/* <!-- First Row --> */}
                        <div className="flex gap-4">
                            <input type="text" placeholder="First Name" className="flex-1 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none placeholder-[#A9A9A9] "  />
                            <input type="text" placeholder="Last Name" className="flex-1 border border-[#92C2D7] rounded-full bg-[#F4F4F4] px-4 py-0.5 outline-none placeholder-[#A9A9A9]" />
                        </div>

                        {/* <!-- Second Row --> */}
                        <div className="flex gap-4">
                            <input type="text" placeholder="Mobile No." className="flex-1 border border-[#92C2D7] rounded-full px-4 py-0.5 outline-none bg-[#F4F4F4] placeholder-[#A9A9A9]" />
                            <input type="email" placeholder="Email ID (optional)" className="flex-1 border border-[#92C2D7] rounded-full px-4 py-0.5 outline-none bg-[#F4F4F4] placeholder-[#A9A9A9]" />
                        </div>

                        {/* <!-- Third Row --> */}
                        <div className="flex gap-4">
                            <input type="text" placeholder="Blood Group" className="flex-1 border border-[#92C2D7] rounded-full px-4 py-0.5 outline-none bg-[#F4F4F4] placeholder-[#A9A9A9]" />
                            <select defaultValue={'Gender'} className="flex-1 bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9] ">
                                <option disabled >Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        {/* <!-- Fourth Row --> */}
                        <div className="flex gap-4 justify-between">
                            {/* Left side: State + District */}
                            <div className="flex w-[48%]  gap-5 xl:gap-5 ">
                                <select defaultValue={'State'} className="w-[50%] xl:flex-1 bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-1 xl:px-4 py-0.5 outline-none text-[#A9A9A9]">
                                    <option disabled >State</option>
                                    <option>Delhi</option>
                                    <option>Maharashtra</option>
                                    <option>Karnataka</option>
                                </select>
                                <select defaultValue={'District'} className=" w-1/2 xl:flex-1 bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-1 py-0.5 outline-none text-[#A9A9A9]">
                                    <option disabled  >District</option>
                                    <option>District 1</option>
                                    <option>District 2</option>
                                </select>
                            </div>

                            {/* Right side: Preferred Language */}
                            <select defaultValue={'Preferred language'} className="flex-1 border border-[#92C2D7] bg-[#F4F4F4] text-[#A9A9A9] rounded-full px-4 py-0.5 outline-none">
                                <option disabled >Preferred language</option>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* <!-- Fourth Row --> */}



                    </div>


                </div>
            </div>
            <div className='mt-[1.7rem]'>
                <button
                    style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                    className="text-sm relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                                   bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                                   text-white rounded-full cursor-pointer gap-8"
                >
                    Update Profile
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg  ml-3">
                        <ArrowRight width={17} />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default UserProfile