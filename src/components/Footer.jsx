import React from 'react';
import alliance_india from '../assets/alliance_india.png';
import humsafar_logo from '../assets/humsafar_logo.png';
import humsafarlogo from '../assets/humsafar_logo.png';
import helpline from '../assets/helpline.png';
import help from '../assets/help.png'
import { SocialIcon } from 'react-social-icons';
import alliance_india1 from '../assets/alliance_india1.png';
const Footer = () => {
    return (
        <footer className="bg-[#DAF4FF] pb-[3rem] pt-[2.5rem] px-4  mt-[3rem] lg:mt-0">

            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-col gap-12 items-center justify-center text-sm">
                <div className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
                    {/* Logos */}
                    <div className="flex flex-row gap-5">
                        <img src={humsafarlogo} alt="humsafarLogo" width={85}/>
                        <img src={alliance_india1} alt="AllianceIndia" width={85}/>
                    </div>
                    <p className='text-lg'>Powered by The Humsafar Trust ❤️</p>
                    {/* Helpline */}
                    <div className="flex flex-row gap-3 text-xs items-center">
                        <img src={help} alt="helpLineNumber" className='w-18 h-12'/>
                        <p className='text-xs'>For AIDS Helpline <br />Phone no: <span className='underline'>1097</span></p>
                    </div>
                </div>

                <div className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
                    {/* Disclaimer */}
                    <div className=" flex-1/3">
                        <p className="pb-2 text-lg"><span style={{fontFamily:"Sofia Pro" , fontWeight:700}}>Disclaimer:</span></p>
                        <p className="text-xs" style={{fontFamily:"Sofia Pro", fontWeight:300}}>By proceeding further on the NETREACH Website, you agree to provide requested details such as personal information, location, etc. to help connect you with the service you are looking for. The data collected will be kept confidential.</p>
                    </div>
                    {/* Social Icons */}
                    <div className="flex-1 text-right flex flex-row justify-end gap-4 mt-6">
                        <SocialIcon url="https://facebook.com" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 35, width: 35 }} />
                        <SocialIcon url="https://youtube.com" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 35, width: 35 }} />
                        <SocialIcon url="https://instagram.com" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 35, width: 35 }} />
                        <SocialIcon url="https://x.com/" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 35, width: 35 }} />
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex lg:hidden flex-col gap-6 items-center px-4 text-xs text-center">

                {/* Logos Row */}
                <div className="flex flex-row  items-center justify-between  w-full h-[10vh]">
                    {/* <img src={humsafarlogo} alt="humsafarLogo" className="h-12 " /> */}
                    <img src={humsafar_logo} alt="humsafarLogo" className="h-12 " />
                    <p className='mt-6 text-sm'>Powered by The <br /> Humsafar Trust <br />❤️</p>
                    <img src={alliance_india1} alt="AllianceIndia" className="h-12 " />
                </div>

                {/* Disclaimer */}
                <div className='mt-4'>
                    <p className="pb-1 font-bold text-lg text-left">Disclaimer:</p>
                    <p className='text-left text-sm'>
                        By proceeding further on the NETREACH Website, you agree to provide requested details such as personal information, location, etc. to help connect you with the service you are looking for. The data collected will be kept confidential.
                    </p>
                </div>

                {/* Helpline */}
                <div className="flex flex-col  items-start justify-between w-full gap-5">
                    <div className="flex flex-row gap-3 items-center justify-center">
                        <img src={helpline} alt="helpLineNumber" className="h-10 object-contain" />
                        <p className='text-sm'>For AIDS Helpline <br />Phone no: <span className='underline'>1097</span></p>
                    </div>
                    {/* Social Icons */}
                    <div className="flex flex-row gap-3 ">
                        <SocialIcon url="https://facebook.com" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 40, width: 40 }} />
                        <SocialIcon url="https://youtube.com" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 40, width: 40 }} />
                        <SocialIcon url="https://instagram.com" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 40, width: 40 }} />
                        <SocialIcon url="https://x.com/" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 40, width: 40 }} />
                    </div>
                </div>

                

            </div>
        </footer>
    );
};

export default Footer;
