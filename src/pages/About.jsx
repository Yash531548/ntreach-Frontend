import React from 'react'
import AboutBGImage from '../assets/Static/About.png'
import VectorAbout from '../assets/Static/VectorAbout.png'
import HandshakeAbout from '../assets/Static/HandshakeAbout.png'
import GovernmentAbout from '../assets/Static/GovernmentAbout.png'
import NetworkAbout from '../assets/Static/NetworkAbout.png'
const About = () => {
    return (
        <div style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
            <div className='container   flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 mx-auto ' >
                {/* Section 1 */}
                <main className='container  max-w-[1200px] flex flex-col md:flex-row mx-auto lg:max-w-[850px] xl:max-w-[1110px] gap-10 md:gap-3 md:px-8 md:mt-8 '>
                    <section>
                        <header className='text-3xl lg:text-4xl xl:text-[2.625rem] '>
                            <h2 className="text-black mb-6 md:mb-2">
                                About Us
                            </h2>
                        </header>
                        <section className="relative max-w-xl  md:py-4 ">
                            {/* Background Image */}
                            <img
                                src={AboutBGImage}
                                alt="India Map"
                                className="absolute inset-0 w-full h-full object-contain  pointer-events-none select-none"

                            />

                            {/* Text Content */}
                            <div className="relative  space-y-4">
                                <h2 className="text-xl md:text-2xl font-medium">
                                    NETREACH is a single point destination for everything{' '}
                                    <span className="text-[#1475A1] ">related to Sexual Healthcare.</span>
                                </h2>
                                <p className="text-base font-light  text-black/90">
                                    The website offers a diverse array of resources and support from Booking an appointment, connecting with community counsellors to additional information to empower access to sexual health networks in India. The website is designed to help connect with sexual health care centres operating across every state and union territory of India.
                                </p>
                                <p className="font-semibold text-black text-base">
                                    NETREACH is spearheaded by The Humsafar Trust, India's Oldest LGBTQ+ Organisation,
                                    <span className="font-light text-black/90">
                                        &nbsp;and supported by the Global Fund to Fight AIDS, Tuberculosis and Malaria (GFATM) in partnership with India HIV/AIDS Alliance. It works under the aegis of National AIDS Control Organisation (NACO), Ministry of Health and Family Welfare (MoHFW), Government of India.
                                    </span>
                                </p>
                            </div>
                        </section>
                    </section>
                    <article className=' flex justify-center items-center' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                        <div className='relative z-1 md:max-h-[320px] xl:max-h-[350px]  md:max-w-[380px] xl:max-w-[390px] shadow-[0px_0px_45px_-1px_rgba(0,0,0,0.15)] ' style={{borderRadius:"30px"}}>
                            <main className=" w-full text-black bg-[#DAF3FF] flex flex-col justify-center items-center gap-2  h-full  py-12 px-4 lg:px-12 " style={{borderRadius:"30px"}} >
                                {/* Gradient border/glow */}

                                {/* Content */}
                                <img src={VectorAbout} alt="IndiaMap.png" className="w-18 h-18" />
                                <p className="text-xl md:text-2xl font-medium">Connecting India</p>
                                <p className="text-center text-lg font-light">
                                    Building bridges to sexual healthcare across every state and union territory
                                </p>
                            </main>
                            <div className="absolute inset-0 -m-[0.2rem]  bg-[linear-gradient(111.19deg,#323FF7_3.01%,#33AEE5_97.71%)] " style={{ zIndex: -1 , borderRadius:"34px"}}></div>
                        </div>


                    </article>
                </main>
            </div>
            {/* Section 2  */}
            <main className='w-full bg-[#1475A1] container  mx-auto flex items-center text-white mt-10'>
                <div className="w-full bg-[#1475A1] py-10">
                    <div className="container mx-auto px-4 lg:max-w-[850px] xl:max-w-[1100px]">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-x md:divide-y-0 divide-white/60 text-white text-center">
                            {/* Column 1 */}
                            <div className="flex flex-col items-center px-6 pb-6 md:pb-0">
                                {/* Replace below with your own SVG/Lucide/Asset */}
                                <div className="mb-4 bg-white rounded-full p-2">
                                    {/* <YourIconComponent className="w-12 h-12" /> */}
                                    <img src={NetworkAbout} alt="Network icon" className="mx-auto w-8" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Nationwide Network</h3>
                                <p className="text-base font-extralight">
                                    NETREACH connects you with sexual health care centres operating across every state and union territory of India, offering diverse resources from appointment booking to community counselling.
                                </p>
                            </div>

                            {/* Column 2 */}
                            <div className="flex flex-col items-center px-6 py-6 md:py-0">
                                <div className="mb-4 bg-white rounded-full p-2">
                                    <img src={HandshakeAbout} alt="Partnership icon" className="mx-auto w-8" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Trusted Partnership</h3>
                                <p className="text-base font-extralight">
                                    spearheaded by The Humsafar Trust, India's Oldest LGBTQ+ Organisation, and supported by the Global Fund to Fight AIDS, Tuberculosis and Malaria (GFATM) in partnership with India
                                    HIV/AIDS Alliance.
                                </p>
                            </div>

                            {/* Column 3 */}
                            <div className="flex flex-col items-center px-6 pt-6 md:pt-0">
                                <div className="mb-4 bg-white rounded-full p-2">
                                    <img src={GovernmentAbout} alt="Support icon" className="mx-auto w-8" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Government Support</h3>
                                <p className=" text-base font-extralight ">
                                    Operating under the aegis of the  National AIDS Control Organisation (NACO), Ministry of Health and Family Welfare (MoHFW), Government of India.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <div className='container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9  ' >
                {/* Section 3 */}
                <main className='container max-w-[1200px] flex flex-col items-center mx-auto lg:max-w-[850px] xl:max-w-[1100px] gap-8 md:px-8 md:mt-8  '>
                    <header className='text-3xl lg:text-4xl xl:text-[2.625rem] '>
                        <h2 className="text-[#323FF7] font-semibold">
                            Our Mission
                        </h2>
                    </header>
                    <div className='space-y-4 text-center lg:w-[70%] text-base'>
                        <p className='font-light'>At NETREACH, our mission aligns seamlessly with the global efforts of UNAIDS and government agencies to eradicate AIDS as a public health threat by 2030. By leveraging virtual communication tools and AI, we empower individuals to seamlessly navigate a comprehensive network of sexual health facilities and resources.</p>
                        <p className='text-[#1475A1] font-medium lg:w-[93%] mx-auto'>Ensuring everyone has access to knowledge and support needed to make informed decisions about their sexual health.</p>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default About
