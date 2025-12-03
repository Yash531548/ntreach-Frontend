import React, { useEffect, useState } from 'react'
import ChatBot from '../ChatBot'
import GetTested from '../../assets/Dashboard/GetTested.png'
import { useLocation, useNavigate } from 'react-router'
import { useVn } from '../../Context/VnContext'
import { useUserProfile } from '../../Context/UserProfileContext'
import { ChevronDown } from 'lucide-react'
import { fetchStates } from '../../Api/getState'
import { fetchPrepStates } from '../../Api/prepState'
import { fetchDistrictsApi } from '../../Api/fetchDistrictsApi'
import { fetchTestingCentersApi } from '../../Api/fetchTestingCentersApi'
import { bookAppointment } from '../../Api/bookAppointment'
import DynamicMap from './DynamicMap'

const ScheduleAppointment = () => {
    const location = useLocation();
    const incomingServices = location.state?.selectedServices || [];
    const name = location.state?.name || '';
    // console.log("incomingservice",incomingServices);
    const navigate = useNavigate()
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(''); // selected state id
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [districtLoading, setDistrictLoading] = useState(false);
    const [centers, setCenters] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState('');
    const [centerLoading, setCenterLoading] = useState(false);

    const [appointmentDate, setAppointmentDate] = useState('')
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const { vnData, loading } = useVn()
    const { userProfile, refetchUserProfile } = useUserProfile()

    // If vnData is loaded and has a state_list, filter it. Otherwise, show all
    const displayedStates = !loading && vnData?.state_list?.length
        ? states.filter(state => vnData.state_list.map(String).includes(String(state.state_code)))
        : states;
    const DUMMY_STATE_CENTERS = {
        "Gujarat": [
            { id: 101, name: "PrEPARED Nilesh - 8956924537", status: 1 },
        ],
        "Karnataka": [
            { id: 201, name: "PrEPARED Dil Faraz - 8956924539", status: 1 },
        ],
        "Maharashtra": [
            { id: 301, name: "PrEPARED Mayur - 8956924529", status: 1 },
            { id: 302, name: "The Humsafar Trust - 9892940966", status: 1 },
            { id: 303, name: "Dr. Safe Hands Center - 9013005151", status: 1 },
        ],
        "Madhya Pradesh": [
            { id: 401, name: "PrEPARED Narendra - 8956924536", status: 1 },
            { id: 402, name: "PrEPARED Avinash - 8956924543", status: 1 },
        ],
        "Delhi": [
            { id: 501, name: "PrEPARED Abhishek - 8956924530", status: 1 },
            { id: 502, name: "PrEPARED Prashant - 8956924540", status: 1 },
            { id: 503, name: "The Humsafar Trust - 011-46016699", status: 1 },
            { id: 504, name: "Dr. Safe Hands Center - 09013161616", status: 1 },
        ],
        "West Bengal": [
            { id: 601, name: "PrEPARED Aparna - 8956924542", status: 1 },
        ],
    };
    const STATE_CODE_TO_ABBREVIATION = {
        7: "DL",
        24: "GJ",
        27: "MH",
        19: "WB",
        23: "MP",
        29: "KA"
    };

    // Fetch states once on mount
    useEffect(() => {
        async function getState() {
            try {
                const data = incomingServices.includes(3) ? await fetchPrepStates() : await fetchStates();
                setStates(data)
            } catch (error) {
                console.error("error");
            }
        }
        getState();
    }, [])
    // // Fetch districts whenever selectedState changes
    // useEffect(() => {
    //     if (!selectedState) {
    //         setDistricts([]);
    //         setSelectedDistrict('');
    //         return;
    //     }
    //     async function loadDistricts() {
    //         setDistrictLoading(true);
    //         try {
    //             const data = await fetchDistrictsApi(selectedState);
    //             setDistricts(data);
    //         } catch (error) {
    //             console.error("Failed to fetch districts", error);
    //             setDistricts([]);
    //         }
    //         setDistrictLoading(false);
    //     }
    //     loadDistricts()
    // }, [selectedState]);
    // Fetch testing centers on selectedDistrict change
    // useEffect(() => {
    //     if (!selectedState && !selectedDistrict) {
    //         setCenters([]);
    //         setSelectedCenter('');
    //         return;
    //     }

    //     // Find the matching state object's code
    //     const stateObj = states.find(s => String(s.id) === String(selectedState));
    //     const state_code = stateObj ? stateObj.state_code : '';
    //     // console.log("state_code", state_code)
    //     // console.log("selected district", selectedDistrict)
    //     if (!state_code) {
    //         setCenters([]);
    //         setSelectedCenter('');
    //         return;
    //     }
    //     const fetchCenters = async () => {
    //         setCenterLoading(true);
    //         try {
    //             const data = await fetchTestingCentersApi({
    //                 district_id: selectedDistrict,
    //                 state_code: state_code,
    //             });
    //             // console.log("data", data)
    //             setCenters(data.length > 0 ? data : []);

    //             const activeCenters = Array.isArray(data)
    //                 ? data.filter(center => center.status === 1)
    //                 : [];

    //             setCenters(activeCenters);
    //             setSelectedCenter('');
    //         } catch (error) {
    //             setCenters([]);
    //             setSelectedCenter('');
    //         }
    //         setCenterLoading(false);
    //     }
    //     fetchCenters();
    // }, [selectedDistrict])
    // Convert the date from YYYY-MM-DD to DD-MM-YYYY before sending API:
    const formatDateForAPI = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    };
    // Handle booking submission
    const handleSubmit = async () => {
        if (!incomingServices.length) {
            alert('Please select at least one service.')
            return
        }
        // if (!selectedState || !selectedDistrict || !selectedCenter || !appointmentDate) {
        //     alert('Please complete all fields.')
        //     return
        // }
        if (!selectedState || !selectedCenter || !appointmentDate) {
            alert('Please complete all fields.')
            return
        }
        const stateObj = states.find(s => String(s.id) === String(selectedState));
        const state_code = stateObj ? stateObj.state_code : '';
        if (!state_code) {
            alert('Invalid state selected.');
            return;
        }
        setLoadingSubmit(true)

        let riskAssessmentId = userProfile?.risk_assessment?.risk_assessment_id;

        const data = {
            risk_assessment_id: Number(riskAssessmentId) || null,
            service: incomingServices,
            state: Number(state_code),
            // district: Number(selectedDistrict),
            testing_center: Number(selectedCenter),
            appointment_date: formatDateForAPI(appointmentDate),
            type: "Upcoming",
            // booking_type: !loading && vnData?.name ? 'OUTREACH' : 'SELF',
            booking_type: "SELF",
            booking_name: name,
        };
        // ✅ Conditionally add vn_id only if vnData is available
        if (vnData?.id) {
            data.vn_id = vnData.id;
        }

        console.log("data to send on book an appointment", data);
        try {
            // const response = await bookAppointment(data)
            const stateAbbreivation = STATE_CODE_TO_ABBREVIATION[data.state];
            const uniqueId = `NETREACH/${stateAbbreivation}/${data.booking_type}/9806`
            data.unique_id = uniqueId;
            // console.log("Generated Unique ID:", uniqueId);
            navigate('/appointmentconfirmed', { state: data })
            // if (response.data.status) {
            //     // const uniqueId = response.data.unique_id
            //     // navigate('/appointmentconfirmed', { state: response.data })
            // } else {
            //     alert('Failed to book appointment: ' + response.data.message)
            // }
        } catch (error) {
            console.error(error)
            alert(error?.response?.data?.errors?.toString() || error?.message || 'An error occurred while booking appointment.')
        }
        setLoadingSubmit(false)
        // const uniqueId = "NETREACH/HR/SELF/7464"
        // navigate('/appointmentconfirmed', { state: { uniqueId } })
    }
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

                                className={`w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 outline-none text-sm ${!selectedState && 'text-[#A9A9A9]'}`}
                                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                id='State'
                                name="state"
                                value={selectedState}
                                onChange={e => {
                                    const state = states.find((s) => s.id == e.target.value)
                                    setSelectedState(e.target.value)
                                    setSelectedName(state ? state.state_name : '')

                                    if (state) {
                                        // console.log("state prep",state);
                                        const dummyCenters = DUMMY_STATE_CENTERS[state.state_name] || [];
                                        // console.log("dummydata",dummyCenters)
                                        setCenters(dummyCenters);
                                        setSelectedCenter("");
                                    }
                                }}
                            >
                                <option >Select State</option>
                                {/* {displayedStates.map(state => ( */}
                                {states.map(state => (
                                    <option key={state.id} value={state.id}>{state.state_name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-3/4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                        {/* District */}
                        {/* <div className="relative">
                            <label htmlFor="District" className='text-[#11688F] text-lg'>District</label>
                            <select

                                className={`w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 outline-none text-sm ${!selectedDistrict && 'text-[#A9A9A9]'}`}
                                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                id='District'
                                value={selectedDistrict}
                                onChange={e => {
                                    const district = districts.find((d) => d.id == e.target.value)
                                    setSelectedDistrict(e.target.value)
                                    setSelectedName(district ? district.district_name : '')
                                }}
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
                        </div> */}
                        {/* Testing Centre */}
                        <div className="relative">
                            <label htmlFor="Testing centre" className='text-[#11688F] text-lg'>Testing Centre</label>
                            <select

                                className={`w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 outline-none text-sm ${!selectedCenter && 'text-[#A9A9A9]'}`}
                                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                id='Testing centre'
                                value={selectedCenter}
                                onChange={(e) => {
                                    const center = centers.find((c) => c.id == e.target.value)
                                    setSelectedCenter(e.target.value)
                                    setSelectedName(center ? center.name : '')
                                }}
                            // disabled={!selectedDistrict || centerLoading}

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
                                className={`w-full bg-[#F4F4F4] border border-[#92C2D7] rounded-full pl-4 pr-3 py-0.5  outline-none text-sm mt-1 ${!appointmentDate && 'text-[#A9A9A9]'}`}
                                id='Appointment Date'
                                style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                                min={new Date().toISOString().split("T")[0]}   // ✅ prevents past dates
                                // max={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]}
                                // Easier Version : Deal with Millisecond instead of setDate
                                max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                            />
                        </div>
                        {/* Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loadingSubmit}
                            className="w-full cursor-pointer py-2 mt-4 rounded-full text-white font-medium bg-gradient-to-b from-[#323FF7] to-[#33AEE5] shadow-lg"
                        >
                            {loadingSubmit ? "Booking..." : "Generate Receipt"}
                        </button>
                    </div>
                </div>
                <div className='container max-w-[500px] w-[400px] xl:w-[500px] flex flex-col justify-center'>
                    <DynamicMap selected={selectedName} />

                    {/* <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14015.545715902042!2d77.06889685!3d28.4956846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193f7e6f7e57%3A0xab1dd7c234b63b8c!2sDLF%20CyberPark!5e0!3m2!1sen!2sin!4v1693212345678"
                        width="100%"
                        height="500"
                        style={{ border: 0, borderRadius: "20px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className='lg:h-[480px] lg:w-[500px]'
                    ></iframe> */}
                </div>
                {/* <div className="hidden lg:block xl:block">
                    <ChatBot />
                </div> */}
            </main>
        </div>
    )
}

export default ScheduleAppointment
