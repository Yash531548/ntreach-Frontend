import React from 'react';
import { useLocation } from 'react-router';
import ChatBot from '../ChatBot';


const AppointmentConfirmed = () => {
    const location = useLocation();
    const appointmentData = location.state; // Passed from ScheduleAppointment

    return (
        <div className=' "container w-full min-h-[calc(100vh-64px-60px)] flex items-center justify-center  ' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
            <div className=" container w-[40%] h-[65vh] flex flex-col items-center   gap-8">
                <h1 className="text-5xl text-[#1475A1]  mb-4">Thank You</h1>
                <div>

                    <p className='text-xl'>Your appointment is CONFIRMED</p>
                    <p style={{ fontFamily: "Sofia Pro", fontWeight: 700 }} className='text-center'>You Will Receive an SMS Shortly</p>
                </div>
                <div className='container flex items-center justify-center flex-col bg-[#DAF3FF] min-h-[20vh] rounded-4xl text-center gap-3'>
                    <p className="mt-2 text-xl">
                        Your NETREACH Unique ID is:</p>
                    <p className='text-3xl text-[#1475A1]'> {appointmentData?.uniqueId}</p>
                </div>
                <button className="mt-4 w-[55%] bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white px-4 py-2 rounded-4xl cursor-pointer drop-shadow-xl hover:shadow-2xl/20 hover:drop-shadow-2xl">
                    Download Receipt
                </button>
                <ChatBot/>
            </div>
        </div>
    );
};

export default AppointmentConfirmed;
