import React from 'react';
import { MapPin } from 'lucide-react';

import WhatsappIcon from '../../assets/Static/WhatsApp.png'
import FacebookIcon from '../../assets/Static/Facebook.png'
import InstagramIcon1 from "../../assets/Static/Instagram1.png"

const NavigatorCard = ({ VnImage, VnName, VnState, VnMobile }) => (
    <div
        className="
    bg-[#DAF3FF]
    rounded-3xl
    flex flex-col items-center
    px-2 py-4 sm:p-4 md:p-5
    w-full max-w-[180px]
    sm:max-w-[220px]
    md:max-w-[220px]
    shadow-md mx-auto
    transition-all
    "
        style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
    >
        <div className='h-[6rem]  md:h-[8rem]'>
            <div className="mb-4 sm:mb-5 flex justify-center ">
                <img src={VnImage} alt="" className="w-16 sm:w-20 md:w-24 object-cover rounded-full" />
            </div>
        </div>
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-black text-center ">
            {VnName}
        </div>
        <div className="flex items-start mt-1 text-xs sm:text-sm w-full  justify-center  ">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 text-[#FF5593]" />
            <div className="max-w-[110px] sm:max-w-[150px]  text-start  ">
                {VnState}
                {/* Karnataka, Kerala, Tamil Nadu, Puducherry */}
            </div>
        </div>
        <div className="mt-2 text-black font-bold text-sm sm:text-base">
            {VnMobile}
        </div>
        <div className="flex gap-2 mt-3 w-full items-center justify-center">
            <img src={InstagramIcon1} alt="" className="w-5 sm:w-6" />
            <img src={WhatsappIcon} alt="" className="w-6 sm:w-7" />
            <img src={FacebookIcon} alt="" className="w-5 sm:w-6" />
        </div>
    </div>
);

export default NavigatorCard;
