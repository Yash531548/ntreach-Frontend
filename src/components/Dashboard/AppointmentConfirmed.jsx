import React, { useState } from 'react';
import { useLocation } from 'react-router';
import ChatBot from '../ChatBot';
import Receipt from './Receipt';

const AppointmentConfirmed = () => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const appointmentData = location.state;

    const handleClick = () => setShowModal(true);

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
                    <div className='flex items-center justify-center flex-col bg-[#DAF3FF] min-h-[20vh] rounded-4xl text-center gap-2 py-3 sm:py-5 w-full sm:w-[90%] md:w-[80%] lg:w-full xl:w-[80%]'>
                        <p className="mt-2 text-base md:text-xl ">
                            Your NETREACH Unique ID is:
                        </p>
                        <p className='text-xl md:text-2xl lg:text-2xl xl:text-3xl text-[#1475A1] break-all'>{appointmentData?.uniqueId}</p>
                    </div>
                    <button
                        onClick={() => handleClick()}
                        className="
              mt-4
              w-full
              sm:w-[70%]
              md:w-[55%]
              bg-gradient-to-b from-[#323FF7] to-[#33AEE5]
              text-white px-4 py-2 rounded-4xl cursor-pointer drop-shadow-xl
              text-base md:text-lg
              hover:shadow-2xl/20 hover:drop-shadow-2xl
            "
                    >
                        Download Receipt
                    </button>
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
                        <Receipt />
                    </div>
                </div>
            )}
        </>
    );
};

export default AppointmentConfirmed;
