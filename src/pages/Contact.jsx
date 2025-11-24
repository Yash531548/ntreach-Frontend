import React from 'react'
import { SocialIcon } from 'react-social-icons';
import contact_us from '../assets/Static/contact_us.png'
import ChatBot from '../components/ChatBot';
const Contact = () => {
    return (
        <div className='container w-full  mx-auto flex items-center justify-center px-4  md:mb-8 sm:px-4
        lg:px-10 
        xl:px-0 mt-9
        2xl:ml-0 '>
            <main className='container max-w-[1200px] mx-auto  flex flex-col md:flex-row  lg:max-w-[850px]  
            xl:max-w-[1250px] gap-3 md:gap-12 xl:gap-38 md:mt-8' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                <div className='w-full md:w-[50%]  flex flex-col gap-8'>
                    <div>
                        <h2 className=' text-3xl lg:text-4xl xl:text-[2.625rem] mb-9 md:mb-0'>Contact Us</h2>
                        <p className='text-xl md:text-2xl '>For collaboration and official engagement </p>
                    </div>
                    <div className='text-xl md:text-2xl '>
                        <p>Email:<span className='text-[#1475A1]'> info.netreach@humsafar.org</span></p>
                    </div>
                    <div >
                        <p className='text-xl md:text-2xl mb-2'>Our Social Media</p>
                        <div className="flex flex-row gap-3 md:gap-2 ">
                            <SocialIcon url="https://www.facebook.com/NETREACHofficial/?_rdr" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 30, width: 30 }} />
                            <SocialIcon url="https://www.youtube.com/@netreachofficial" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 30, width: 30 }} />
                            <SocialIcon url="https://www.instagram.com/netreachofficial/" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 30, width: 30 }} />
                            <SocialIcon url="https://x.com/" target="_blank" fgColor="#ffffff" bgColor="#1475A1" style={{ height: 30, width: 30 }} />
                        </div>
                    </div>
                </div>
                <div className=' w-[85%] md:w-[30%]  mt-10 xl:mt-12' >
                    <img src={contact_us} alt="Contact Us" className=' lg:h-[350px] xl:h-[400px]' />
                </div>
                {/* <div className='relative  hidden lg:block'>
                    <div className='absolute -bottom-10 lg:bottom-0 -right-14 lg:-right-26 xl:right-0'>
                        <ChatBot />
                    </div>
                </div> */}
            </main>
        </div>
    )
}

export default Contact