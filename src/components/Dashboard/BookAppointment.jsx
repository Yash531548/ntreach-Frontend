import React, { useEffect, useState } from 'react'
import GetTested from '../../assets/Dashboard/GetTested.png'
import ChatBot from '../ChatBot';
import { NavLink, useNavigate } from 'react-router';
import { fetchServiceTypes } from '../../Api/fetchServiceTypes';
import { useAuth } from '../../Context/AuthContext';

const BookAppointment = () => {
    const { user } = useAuth();
    const [UserName, setUserName] = useState("");
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState(new Set());
    const navigate = useNavigate();
    // Preserved service_type_ids in required order
    const filterOrder = [1, 2, 4, 6, 8, 7];
    // Names as per original static list for matching display (must map carefully)
    const serviceNamesMap = {
        1: "HIV Test",
        2: "STI Services",
        4: "PEP",
        6: "Counselling on Mental Health",
        8: "Referral to TI services",
        7: "ART Linkages"
    };

    // Auto-fill
    useEffect(() => {
      if (user) {
        setUserName(user.user?.name || "")
      }
    }, [user])

    useEffect(() => {
        async function getServices() {
            const allServices = await fetchServiceTypes();
            const filtered = filterOrder
                .map(id => allServices.find(s => s.service_type_id === id))
                .filter(Boolean); // remove any undefined if missing in api
            setServices(filtered);
        }
        getServices();
    }, []);

    const toggleService = (id) => {
        setSelectedServices(prev => {
            const copy = new Set(prev);
            if (copy.has(id)) {
                copy.delete(id);
            } else {
                copy.add(id);
            }
            return copy;
        });
    };
    const handleLetsGo = () => {
        // Convert Set to Array, or send as preferred
        console.log("selected service " , selectedServices)

        if (selectedServices.size === 0) {
            alert("Please select at least one service before continuing.");
            return;
        }

        navigate('/schedulesppointment', { state: { selectedServices: Array.from(selectedServices), name: UserName } });
    };

    return (
        // <div className=' "container w-full min-h-[calc(100vh-64px-60px)] flex items-center justify-center ' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
        <div className='  w-full min-h-[calc(100vh-64px-60px)] flex items-center justify-center mx-auto
        px-4 sm:px-4
        lg:px-10
        xl:px-0 
        2xl:ml-0
        ' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
            <main className='w-full min-h-[calc(100vh-64px-100px)] flex justify-between
            lg:max-w-[850px] 
            xl:max-w-[1050px] 
             '>
                <div className='container max-w-[500px]  min-h-[calc(100vh-64px-100px)]  flex flex-col gap-8 pt-2  '>
                    <div>
                        <h1 className='text-black text-3xl lg:text-4xl xl:text-[2.625rem] whitespace-nowrap'> Share Your Information</h1>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="Name" className='text-[#11688F] text-lg'>Provide Your Name</label>
                            <input type="text" name="Name" id="Name" placeholder='Enter Your Name' value={UserName} onChange={(e) => setUserName(e.target.value)} required className='outline-none text-sm bg-[#F4F4F4] rounded-4xl py-1 px-4' />
                        </div>
                        <div>
                            {/* Select service required */}
                            <h2 className="text-[#11688F] text-lg mb-3">Select services required</h2>
                            <div className="flex flex-col gap-2">
                                {services.length === 0 ? (
                                    <p>Loading services...</p>
                                ) : (
                                    services.map(service => (
                                        <label
                                            key={service.service_type_id}
                                            className="flex items-center justify-between bg-[#DAF3FF] rounded-full pl-4 pr-1.5 py-1 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="" checked={selectedServices.has(service.service_type_id)} onChange={() => toggleService(service.service_type_id)} />
                                                    <span className="text-black text-sm" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                                                        {serviceNamesMap[service.service_type_id]}
                                                    </span>
                                                </label>
                                            </div>
                                            <button
                                                type="button"
                                                className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white text-sm italic"
                                            >
                                                i
                                            </button>
                                        </label>
                                    ))
                                )}
                                {/* {[
                                    "HIV Test",
                                    "STI Services",
                                    "PEP",
                                    "Counselling on Mental Health",
                                    "Referral to TI services",
                                    "ART Linkages",
                                ].map((service, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center justify-between bg-[#DAF3FF] rounded-full pl-4 pr-1.5 py-1 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">

                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="" />
                                                
                                                <span className="text-black text-sm" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>{service}</span>
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white text-sm italic"
                                        >
                                            i
                                        </button>
                                    </label>
                                ))} */}
                            </div>

                            <div className="mt-6">
                                {/* <NavLink to={'/schedulesppointment'}> */}
                                    <button onClick={handleLetsGo} className="cursor-pointer w-[150px] py-2 rounded-full bg-gradient-to-b from-[#323FF7] to-[#33AEE5]  text-white font-light shadow-md/20">
                                        Let&apos;s Go
                                    </button>
                                {/* </NavLink> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' max-w-[500px]  min-h-[calc(100vh-64px-100px)]  md:flex justify-end    items-center hidden  '>
                    <img src={GetTested} alt="getTested Image" className='w-[90%] lg:w-[80%]  ' />
                </div>
                {/* <div className='hidden md:block'>
                    <ChatBot />
                </div> */}
            </main>
        </div>
    )
}

export default BookAppointment