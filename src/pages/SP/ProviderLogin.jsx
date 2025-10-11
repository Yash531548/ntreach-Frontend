import React, { useEffect, useState } from 'react'
import logoBac from '../../assets/logo-bac.png';
import Humsafar from '../../assets/humsafar-logo.png';
import { useNavigate } from 'react-router';
import { getServiceType } from '../../Api/getServiceType';

const ProviderLogin = () => {
    const [step, setStep] = useState(1); // 1: enter phone or OTP, 3: profile
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        clinicAddress: '',
        services: [],
    });
    const [dropdownOpen, setDropdownOpen] = useState()
    const [availableServices, setAvailableService] = useState([]) // store API services
    // const availableServices = [
    //     "HIV Consulting",
    //     "HIV Test",
    //     "Blood Test",
    //     "Counseling",
    //     "Vaccination",
    // ];
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
    // For Profile 
    const handleSelectService = (selectedId) => {
        const selectedService = availableServices.find((s) => s.service_type_id === selectedId);
        if (selectedService && !profile.services.some((s) => s.service_type_id === selectedId)) {
            setProfile((prev) => ({
                ...prev,
                services: [...prev.services, selectedService],
            }));
        }
        // Close dropdown after selection 
        setDropdownOpen(false);
    }
    const handleRemoveService = (id) => {
        setProfile((prev) => ({
            ...prev,
            services: prev.services.filter((s) => s.service_type_id !== id),
        }))
    }
    // For Login
    const sendOtp = () => {
        if (!phoneNumber) return alert('Enter  mobile number');
        // TODO: send OTP API call
        setStep(2);
    };

    const verifyOtp = () => {
        if (!otp) return alert('Enter login code');
        // TODO: verify OTP API call
        setStep(3);
    };
    const submitProfile = () => {
        console.log("service Provider Profile", profile);
        // TODO: submit profile API call
        alert('Profile submitted!');
        // Navigate to the provider dashboard after profile submission
        navigate('/provider/dashboard');
    };
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleButtonClick = () => {
        if (step === 1) {
            // send OTP
            if (!phoneNumber) return alert('Enter mobile number');
            sendOtp()
            // TODO: call sendOtp API
            setStep(2);
        } else if (step === 2) {
            // verify OTP
            if (!otp) return alert('Enter login code');
            // TODO: call verifyOtp API
            verifyOtp()
            setStep(3);
        } else if (step === 3) {
            submitProfile()
        }
    };

    // API
    // Fetch services on mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServiceType()
                if (response.data.status === 'success') {
                    setAvailableService(response.data.data) // ✅ store services list
                    console.log(response.data.data)
                } else {
                    console.error('Error fetching services:', response.data.message)
                    alert(`Error fetching services: ${response.data.message}`)
                }
            } catch (error) {
                if (error.response?.data?.message) {
                    console.error('Error fetching services:', error.response.data.message)
                    alert(`Error fetching services: ${error.response.data.message}`)
                } else {
                    console.error('Error fetching services:', error.message)
                    alert(`Error fetching services: ${error.message}`)
                }
            }
        }
        if (step === 3) {
            fetchServices();
        }
    }, [step])

    return (
        <div className='flex justify-center h-[95vh] '>
            <div className='w-full  md:max-w-3xl mt-12 '>
                <div className={`w-full p-2 ${step === 3 ? "" : "md:max-w-xl"} mx-auto space-y-14 `}>
                    <header className='flex justify-between  items-center'>
                        <img src={logoBac} alt="NETREACH Logo" className="h-8  xl:h-[49px] w-auto " />
                        <img src={Humsafar} alt="Humsafar Logo" className="h-10 md:h-18 w-auto " />
                    </header>
                    <div className=' flex flex-col items-center space-y-6  '>
                        <h1 className="text-black text-2xl  md:text-3xl font-normal md:font-medium " style={{ fontFamily: "Sofia Pro" }}>{step === 3 ? "Complete you Profile" : "Login With Mobile Number"}</h1>
                        <div className={`w-full ${step === 3 ? "max-w-2xl" : "max-w-md"} p-2 space-y-4`}>
                            {step === 3 ? (<>
                                <div className="w-full max-w-3xl mx-auto space-y-4">
                                    {/* Name Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={profile.firstName}
                                            onChange={handleProfileChange}
                                            placeholder="Enter Front Name"
                                            className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400"
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={profile.lastName}
                                            onChange={handleProfileChange}
                                            placeholder="Enter Last Name"
                                            className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleProfileChange}
                                            placeholder="Email Address"
                                            className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400"
                                        />
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            placeholder="Enter Your Number"
                                            disabled
                                            className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Clinic Address */}
                                    <input
                                        type="text"
                                        name="clinicAddress"
                                        value={profile.clinicAddress}
                                        onChange={handleProfileChange}
                                        placeholder="Enter Clinic address"
                                        className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400"
                                    />

                                    {/* Services Dropdown */}
                                    <div className="relative">
                                        {/* <select  className="w-full bg-black text-white px-4 py-3 rounded-md appearance-none focus:outline-none cursor-pointer" onChange={handleSelectService}>
                                            <option value=''>Select Services</option>
                                            {availableServices.map((service) => (
                                                <option key={service.service_type_id} value={service.service_type_id}>{service.service_type}</option>
                                            ))}
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">▼</span> */}

                                        {/* {Custom Drop down} */}
                                        <button
                                            className="w-full bg-black text-white px-4 py-3 rounded-md flex justify-between items-center"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            {availableServices.length > 0 ? 'Select More Services' : 'Select Services'}
                                            {/* <span>▼</span> */}
                                            {/* ▼ arrow with rotation animation */}
                                            <span
                                                className={`inline-block transform transition-transform duration-300 ease-in-out ${dropdownOpen ? 'rotate-180' : 'rotate-0'
                                                    }`}
                                            >
                                                ▼
                                            </span>
                                        </button>
                                        {dropdownOpen && (
                                            <div className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg z-10">
                                                {availableServices.map((service) => (
                                                    <div
                                                        key={service.service_type_id}
                                                        onClick={() => handleSelectService(service.service_type_id)}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {service.service_type}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Selected Services */}
                                    {profile.services.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {profile.services.map((service) => (
                                                <span key={service.service_type_id} className="bg-black text-white px-4 py-1 rounded-full flex items-center space-x-2">
                                                    <span>{service.service_type}</span>
                                                    <button className="text-white text-sm cursor-pointer" onClick={() => handleRemoveService(service.service_type_id)}>✕</button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </>) : (
                                <>
                                    <input type="text" name='Phone' value={phoneNumber} onChange={(e) => step === 1 && setPhoneNumber(e.target.value)} disabled={step === 2} placeholder='Enter Mobile Number'
                                        className="outline-none bg-[#E9E9E9]  placeholder:text-[#AFAFAF] w-full py-3 px-3 rounded-md" />
                                    {step === 2 && (
                                        <input type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder='Enter Login Code'
                                            className="outline-none bg-[#E9E9E9]  placeholder:text-[#AFAFAF] w-full py-3 px-3 rounded-md" />
                                    )}
                                </>
                            )}
                        </div>
                        <button className='border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] rounded-md text-white w-full max-w-xs py-2 px-2 cursor-pointer' onClick={handleButtonClick}>
                            {step === 1 ? 'Send Login Code' : step === 2 ? "Login" : "Submit Profile"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProviderLogin