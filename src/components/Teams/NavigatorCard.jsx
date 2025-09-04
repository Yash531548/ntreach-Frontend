import React from 'react';
import { Locate, MapPin } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';
import Pooja1 from '../../assets/Static/Pooja1.png'
import WhatsappIcon from '../../assets/Static/WhatsApp.png'
import FacebookIcon from '../../assets/Static/Facebook.png'
import InstagramIcon1 from "../../assets/Static/Instagram1.png"
const NavigatorCard = () => (
    <div className="bg-[#DAF3FF] rounded-3xl flex flex-col items-center p-5 w-[220px] shadow-md mx-auto" style={{fontFamily:"Sofia Pro" , fontWeight:400}}>
        
        <div className='mb-5'>
            <img src={Pooja1} alt="" className='w-26 '/>
        </div>  
        <div className="text-2xl font-semibold text-black text-center">Pooja</div>
        <div className="flex items-center mt-1 text-sm   w-full justify-center">
            <MapPin className="w-6 h-6 mr-1 text-[#FF5593]" />
            <div className=' max-w-[160px] '>
                Delhi
            {/* Karnataka, Kerala, Tamil Nadu, Puducherry */}
            </div>

        </div>
        <div className="mt-2 text-black font-bold text-base">9177823428</div>
        <div className="flex gap-2 mt-3  w-full items-center justify-center ">
            <img src={InstagramIcon1} alt="" className='w-6 ' />
            <img src={WhatsappIcon} alt="" className='w-7.5' />
            <img src={FacebookIcon} alt="" className='w-6' />
        </div>
    </div>
);

export default NavigatorCard;
