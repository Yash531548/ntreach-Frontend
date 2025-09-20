import React, { useEffect, useState } from 'react'
import ChatBot from '../ChatBot'
import GetTested from '../../assets/Dashboard/GetTested.png'
import { useNavigate } from 'react-router'
import { ChevronDown } from 'lucide-react'
import { fetchStates } from '../../Api/getState'
import { fetchDistrictsApi } from '../../Api/fetchDistrictsApi'
import { fetchTestingCentersApi } from '../../Api/fetchTestingCentersApi'

const ScheduleAppointment = () => {
    const navigate = useNavigate()
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(''); // selected state id
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districtLoading, setDistrictLoading] = useState(false);
    const [centers, setCenters] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState('');
    const [centerLoading, setCenterLoading] = useState(false);
    const handleSubmit = () => {
        const uniqueId = "NETREACH/HR/SELF/7464"
        navigate('/appointmentconfirmed', { state: { uniqueId } })
    }
    // Fetch states once on mount
    useEffect(() => {
        async function getState() {
            try {
                const data = await fetchStates();
                setStates(data)
            } catch (error) {
                console.error("error");
            }
        }
        getState();
    }, [])
    // // Fetch districts whenever selectedState changes
    useEffect(() => {
        if (!selectedState) {
            setDistricts([]);
            setSelectedDistrict('');
            return;
        }
        async function loadDistricts() {
            setDistrictLoading(true);
            try {
                const data = await fetchDistrictsApi(selectedState);
                setDistricts(data);
            } catch (error) {
                console.error("Failed to fetch districts", error);
                setDistricts([]);
            }
            setDistrictLoading(false);
        }
        loadDistricts()
    }, [selectedState]);
    // Fetch testing centers on selectedDistrict change
    useEffect(() => {
        if (!selectedState && !selectedDistrict) {
            setCenters([]);
            setSelectedCenter('');
            return;
        }

        // Find the matching state object's code
        const stateObj = states.find(s => String(s.id) === String(selectedState));
        const state_code = stateObj ? stateObj.state_code : '';
        console.log("state_code",state_code)
        console.log("selected district",selectedDistrict)
        if (!state_code) {
            setCenters([]);
            setSelectedCenter('');
            return;
        }
        const fetchCenters = async () => {
            setCenterLoading(true);
            try {
                const data = await fetchTestingCentersApi({
                    district_id: selectedDistrict,
                    state_code: state_code,
                });
                console.log("data",data)
                setCenters(data.length > 0 ? data : []);
                setSelectedCenter('');
            } catch (error) {
                setCenters([]);
                setSelectedCenter('');
            }
            setCenterLoading(false);
        }
        fetchCenters();
    }, [selectedDistrict])
    return (
        <div
            className="
        container w-full min-h-[calc(100vh-64px-60px)] flex items-center justify-center
        px-4 sm:px-4
        lg:px-10
        xl:px-0  
      "
            style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
        >
            <main
                className="
          container max-w-[1050px] min-h-[calc(100vh-64px-100px)] flex justify-between
          lg:max-w-[850px] lg:justify-center
          xl:max-w-[1050px]
          gap-8
        "
            >
                <div className="
          container w-[400px] max-w-[500px] xl:w-[500px] min-h-[calc(100vh-64px-100px)] flex flex-col gap-8 pt-2 mt-8
        ">
                    <div>
                        <h1 className='text-3xl lg:text-4xl xl:text-[2.625rem] text-black whitespace-nowrap xl:mt-6'>
                            Schedule Appointment
                        </h1>
                    </div>
                    <div className="container rounded-4xl w-full max-w-md min-h-[55vh] shadow-sm p-6 bg-white flex flex-col gap-4">
                        {/* State */}
                        <div className="relative">
                            <label htmlFor="State" className='text-[#11688F] text-lg'>State</label>
                            <select

                                className="w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 text-[#A9A9A9] outline-none text-sm"
                                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                id='State'
                                name="state"
                                value={selectedState}
                                onChange={e => setSelectedState(e.target.value)}
                            >
                                <option >Select State</option>
                                {states.map(state => (
                                    <option key={state.id} value={state.id}>{state.state_name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-3/4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                        {/* District */}
                        <div className="relative">
                            <label htmlFor="District" className='text-[#11688F] text-lg'>District</label>
                            <select

                                className="w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 text-[#A9A9A9] outline-none text-sm"
                                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                id='District'
                                value={selectedDistrict}
                                onChange={e => setSelectedDistrict(e.target.value)}
                                disabled={!selectedState || districtLoading}
                            >
                                <option >Select District</option>
                                {

                                    districts.map(district => (
                                        <option value={district.id} key={district.id} >{district.district_name}</option>
                                    ))
                                }
                            </select>
                            <ChevronDown className="absolute right-2 top-3/4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                        {/* Testing Centre */}
                        <div className="relative">
                            <label htmlFor="Testing centre" className='text-[#11688F] text-lg'>Testing Centre</label>
                            <select
                                
                                className="w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 text-[#A9A9A9] outline-none text-sm"
                                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                id='Testing centre'
                                value={selectedCenter}
                                onChange={(e) => setSelectedCenter(e.target.value)}
                                disabled={!selectedDistrict || centerLoading}

                            >
                                <option >Select Center</option>
                                {centerLoading ? <option disabled>Loading center...</option> : null}
                                {centers.length === 0 && !centerLoading && <option disabled>No testing center available here</option>}
                                {centers.map(center => (
                                    <option value={center.id} key={center.id}>{center.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="cursor-pointer absolute right-2 top-3/4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                        {/* Appointment Date */}
                        <div>
                            <label htmlFor="Appointment Date" className='text-[#11688F] text-lg '>Appointment Date</label>
                            <input
                                type="date"
                                className="w-full bg-[#F4F4F4] border border-[#92C2D7] rounded-full pl-4 pr-3 py-0.5 text-[#A9A9A9] outline-none text-sm mt-1"
                                id='Appointment Date'
                                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                            />
                        </div>
                        {/* Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full cursor-pointer py-2 mt-4 rounded-full text-white font-medium bg-gradient-to-b from-[#323FF7] to-[#33AEE5] shadow-lg"
                        >
                            Generate Receipt
                        </button>
                    </div>
                </div>
                <div className='container max-w-[500px] w-[400px]  xl:w-[500px]  flex justify-center items-center'>
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14015.545715902042!2d77.06889685!3d28.4956846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193f7e6f7e57%3A0xab1dd7c234b63b8c!2sDLF%20CyberPark!5e0!3m2!1sen!2sin!4v1693212345678"
                        width="100%"
                        height="500"
                        style={{ border: 0, borderRadius: "20px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className='lg:h-[480px] lg:w-[500px]'
                    ></iframe>
                </div>
                <div className="hidden lg:block xl:block">
                    <ChatBot />
                </div>
            </main>
        </div>
    )
}

export default ScheduleAppointment
