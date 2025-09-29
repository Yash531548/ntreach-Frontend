import React from 'react'
import HomeIcon from '../../assets/Dashboard/Mobile/Home.svg'
import ActiveHome from '../../assets/Dashboard/Mobile/HomeActive.svg'
import Upcomming from '../../assets/Dashboard/Mobile/Upcomming.svg'
import UpcomingActive from '../../assets/Dashboard/Mobile/UpcomingActive.svg'
import Result from '../../assets/Dashboard/Mobile/Result.svg'
import ResultActive from '../../assets/Dashboard/Mobile/ResultActive.svg'
const UpperMenu = ({ selected, setSelectedView }) => {
    return (
        <div className="flex flex-row space-x-4 w-max py-1 px-0.5 text-[#979797] text-[0.8rem]">
            <div className={` min-w-[40px]  px-2  text-center rounded-full whitespace-nowrap shadow-[0px_0px_6.99px_-4.7px_rgba(0,_0,_0,_0.47)] flex justify-center items-center gap-2 p-0  my-0 h-8 border  ${selected === 'Home' ? "border-[#3241F7] text-black":"border-none" }`} onClick={() => setSelectedView("Home")}>
                    <img src={selected === 'Home' ? ActiveHome : HomeIcon} alt="" />
                    Home
                {/* <div className='flex justify-center items-center gap-3 border-2'>
                </div> */}
            </div>
            <div className={` min-w-[40px]  px-2  text-center rounded-full whitespace-nowrap shadow-[0px_0px_6.99px_-4.7px_rgba(0,_0,_0,_0.47)] flex justify-center items-center gap-2 p-0  my-0 h-8 border  ${selected === 'Upcoming Appointments' ? "border-[#3241F7] text-black":"border-none" }`} onClick={() => setSelectedView("Upcoming Appointments")}>
                    <img src={selected === 'Upcoming Appointments' ? UpcomingActive : Upcomming} alt="" />
                    Upcoming Appointments
                
            </div>
            <div className={` min-w-[40px]  px-2  text-center rounded-full whitespace-nowrap shadow-[0px_0px_6.99px_-4.7px_rgba(0,_0,_0,_0.47)] flex justify-center items-center gap-2 p-0  my-0 h-8 border  ${selected === 'My Results/Past Data' ? "border-[#3241F7] text-black":"border-none" }`} onClick={() => setSelectedView("My Results/Past Data")}>
                    <img src={selected === 'My Results/Past Data' ? ResultActive : Result} alt="" />
                    My Result/Past data
            </div>
            <div className={` min-w-[40px]  px-2  text-center rounded-full whitespace-nowrap shadow-[0px_0px_6.99px_-4.7px_rgba(0,_0,_0,_0.47)] flex justify-center items-center gap-2 p-0  my-0 h-8 border  ${selected === 'userProfile' ? "border-[#3241F7] text-black":"border-none" }`} onClick={() => setSelectedView("userProfile")}>
                    <img src={selected === 'userProfile' ? ResultActive : Result} alt="" />
                    View Your Profile
            </div>
        </div>
    )
}

export default UpperMenu