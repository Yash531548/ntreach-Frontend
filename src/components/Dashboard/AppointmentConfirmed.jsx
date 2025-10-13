import { useState } from 'react';
import { useLocation } from 'react-router';
const BASE_URL = import.meta.env.VITE_API_URL;
import { useVn } from '../../Context/VnContext'
import ChatBot from '../ChatBot';
import Receipt from './Receipt';
import NavigatorCard from '../Teams/NavigatorCard';

const AppointmentConfirmed = () => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const appointmentData = location.state;
    console.log("appointment data", appointmentData)
    const handleClick = () => setShowModal(true);

    const { vnData, loading } = useVn()

    return (
        <>
            <div
                className="
          w-full
          min-h-[calc(100vh-64px-60px)]
          flex items-center justify-center
          px-4 sm:px-6 md:px-12
        "
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
            >
                <div
                    className="
            w-full
            sm:w-[85%]
            md:w-[60%]
            lg:w-[40%]
            h-auto
            flex flex-col items-center
            gap-6
            py-6
            sm:py-10
          "
                >
                    <h1 className="text-3xl lg:text-4xl xl:text-[2.625rem] text-black mb-2 md:mb-4">Thank You</h1>
                    <div>
                        <p className="text-lg md:text-xl">Your appointment is <span >CONFIRMED</span></p>
                        <p style={{ fontFamily: "Sofia Pro", fontWeight: 700 }} className="text-center mt-1">You Will Receive an SMS Shortly</p>
                    </div>
                    <div className='flex items-center justify-center flex-col bg-[#DAF3FF] min-h-[20vh] rounded-4xl text-center gap-2 py-3 sm:py-5 w-full sm:w-[90%] md:w-[80%] lg:w-full'>
                        <p className="mt-2 text-base md:text-xl ">
                            Your NETREACH Unique ID is:
                        </p>
                        <p className='text-xl md:text-2xl lg:text-2xl xl:text-3xl text-[#1475A1] break-all'>{appointmentData?.unique_id}</p>
                    </div>
                    <a
                        href={appointmentData.booking_slip_url}
                        target="_blank"
                        // onClick={() => handleClick()}
                        className="
              mt-4
              w-full
              sm:w-[70%]
              md:w-[55%]
              bg-gradient-to-b from-[#323FF7] to-[#33AEE5]
              text-white px-4 py-2 rounded-4xl cursor-pointer drop-shadow-xl
              text-base text-center md:text-lg
              hover:shadow-2xl/20 hover:drop-shadow-2xl
            "
                    >
                        Download Receipt
                    </a>

                    <div className="w-full mt-5">
                        {!loading && vnData?.name && (
                            <NavigatorCard
                                VnImage={vnData.profile_photo}
                                VnName={vnData.name}
                                VnState={vnData.state_list?.join(', ')}
                                VnMobile={vnData.mobile_number}
                                vnInstagram={vnData.instagram_url}
                                vnFacebook={vnData.facebook_url}
                                vnLinkedin={vnData.linkedin_url}
                            />
                        )}
                    </div>

                    {/* Only show on desktop/laptop */}
                    <div className="hidden lg:block w-full">
                        <ChatBot />
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-2 sm:px-4"
                    onClick={() => setShowModal(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-lg w-full max-w-lg min-h-[95%]">
                        <Receipt appointment={appointmentData} />
                    </div>
                </div>
            )}
        </>
    );
};

export default AppointmentConfirmed;
