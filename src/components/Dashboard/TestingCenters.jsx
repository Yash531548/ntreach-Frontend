import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import { fetchStates } from '../../Api/getState';
import { fetchDistrictsApi } from '../../Api/fetchDistrictsApi';
import { fetchTestingCentersApi } from '../../Api/fetchTestingCentersApi';

// Static test center data based on your image
const TEST_CENTERS = [
    "Ictc I G.m.c.latur, Government Medical College Near Rajasthan High School Latur Pin 413512",
    "Ictc Ii G.m.c. Latur, Government Medical College Near Rajasthan High School Latur Pin 413512",
    "Ictc Mimsr Latur, Mit College Visvnath Purm Ambajogai Road,Latur - 413512",
    "Ictc Nagar Parishad H. Latur, Nagar Parishad H.patel Chowk , Latur 413512",
    "Ictc R.h Devni, R.h Devni Taluka-Udgir Dist - Latur - 413519",
    "Ictc R.h. Renapur, R.h. Renapur Tahasil Near Taluka - Renapur Dist- Latur- 413527",
    "Ictc R.h.babalgaon, R.h.babalgaon Taluka-Latur Dist - Latur- 413512",
    "Ictc R.h.chakur, R.h.chakur Taluka-Chakur Dist - Latur - 413513",
    "Ictc Rh Ahmedpur, Rh Ahmedpur Taluka-Ahmedpur Dist- Latur - 413515",
    "Ictc Rh Ausa, Rh Ausa Taluka-Ausa Dist - Latur - 413520",
    "Ictc Rh Kasarshirshi, Rh Kasarshirshi Taluka-Nilanga Dist - Latur",
    "Ictc Rh Killari, Rh Killari Taluka-Ausa Dist - Latur - 413516",
    "Ictc Rh Murud, Rh Murud Taluka-Latur Dist - Latur- 413520",
    "Sdh Nilanga, Sdh Nilanga Taluka-Nilanga Dist- Latur- 413521",
    "Sdh Udgir, Sdh Udgir, Main Road Udgir Tq.udigir Dist. Latur 413517"
];


const TestingCenters = ({ setActive }) => {
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districtLoading, setDistrictLoading] = useState(false);
    const [centers, setCenters] = useState([]);
    const [centerLoading, setCenterLoading] = useState(false);
    const [searched, setSearched] = useState(false); // Controls result visibility
    const [noResults, setNoResults] = useState(false);

    // Fetch states on mount
    useEffect(() => {
        async function getState() {
            try {
                const data = await fetchStates();
                setStates(data);
            } catch (error) {
                setStates([]);
            }
        }
        getState();
    }, []);

    // Fetch districts whenever selectedState changes
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
                setSelectedDistrict('');
            } catch (error) {
                setDistricts([]);
            }
            setDistrictLoading(false);
        }
        loadDistricts();
    }, [selectedState]);

    // Search button handler – fetch testing centers
    const handleSearch = async () => {
        setSearched(true);
        // Find matching state code
        const stateObj = states.find(s => String(s.id) === String(selectedState));
        const state_code = stateObj ? stateObj.state_code : '';
        if (!selectedState || !selectedDistrict || !state_code) {
            setCenters([]);
            setNoResults(true);
            return;
        }

        setCenterLoading(true);
        setNoResults(false);

        try {
            const data = await fetchTestingCentersApi({
                district_id: selectedDistrict,
                state_code: state_code,
            });
            setCenters(data.length > 0 ? data : []);
            setNoResults(data.length === 0);
        } catch (error) {
            setCenters([]);
            setNoResults(true);
        }
        setCenterLoading(false);
    };

    return (
        <div className='rounded-4xl lg:rounded-none lg:rounded-r-4xl w-full md:border md:border-gray-300 border-l-0 md:shadow-sm pt-5 md:px-4 xl:pt-8 xl:px-10'>
            <div className='flex items-center justify-between gap-4'>
                <p className='text-black  text-[25px] md:text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>Testing Centres</p>
                <div className='relative' onClick={() => setActive("Notifications")}>
                    <img src={NotificationMobileIcon} alt="Notification icon" className='lg:hidden  ' />
                    <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </div>

            {/* Filter Section */}
            <div className='w-full rounded-3xl shadow-sm md:h-[15%] mt-[2rem] pt-3 pb-3 px-6 text-sm md:flex  items-center justify-center'>
                <div className='flex items-center gap-6 flex-col md:flex-row py-4 md:py-0'>
                    <div className='md:flex md:gap-5 md:flex-row space-y-2 md:space-y-0 '>
                        {/* State dropdown */}
                        <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value) }} className="w-full md:w-36 xl:w-52 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-1 outline-none text-gray-500">
                            <option value={''}>Select State</option>
                            {states.map(state => (
                                <option key={state.id} value={state.id}>{state.state_name}</option>
                            ))}
                        </select>
                        {/* District dropdown */}
                        <select disabled={!selectedState || districtLoading} value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full md:w-36 xl:w-52 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-1 outline-none text-gray-500">
                            <option value={''}>Select District</option>
                            {districtLoading && (
                                <option disabled>Loading...</option>
                            )}
                            {districts.map(district => (
                                <option value={district.id} key={district.id}>{district.district_name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Search button */}
                    <button
                        style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                        className="w-full relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pl-3 py-0.5 border border-[#566AFF] 
                    bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                    text-white rounded-full cursor-pointer gap-2"
                        onClick={handleSearch}
                        disabled={!selectedState || !selectedDistrict || districtLoading || centerLoading}
                    >
                        {centerLoading ? "Searching..." : "Search"}
                        <span className="flex items-center justify-center w-6 h-6 ml-3 rounded-full bg-white text-black text-lg">
                            <ArrowRight width={17} />
                        </span>
                    </button>
                </div>
            </div>

            {/* Results Section */}
            <div className="w-full max-h-[53vh] h-[45vh] overflow-y-auto rounded-4xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4" style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                <p className='mb-4 text-[#A9A9A9] text-[18px] xl:text-lg' style={{ fontWeight: 400 }}>
                    Lists of results
                </p>
                {searched && noResults && (
                    <div className="bg-[#F7F8FA] border border-[#92C2D7] text-[#A9A9A9] rounded-xl px-5 py-3 mb-3 flex items-center">
                        No testing centers are available for the selected district. Please try another district or check back later.
                    </div>)}
                {/* List items */}
                <ul className="pl-3 pr-4 space-y-3 ">
                    {/* {TEST_CENTERS.map((center, idx) => (
                        <li
                            key={center}
                            className="text-[#323232] text-sm hover:bg-[#E9F8FF] bg-[#F7F8FA] rounded-xl px-5 py-3 shadow flex items-center"
                            style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                        >
                            {center}
                        </li>
                    ))} */}
                    {centers.map(center => (
                        <li
                            key={center.id}
                            className="text-[#323232] text-sm hover:bg-[#E9F8FF] bg-[#F7F8FA] rounded-xl px-5 py-3 shadow flex items-start flex-col"
                            style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
                        >
                            {/* {center.name} ,{' '} {center.address} */}
                            <div className="font-semibold">{center.name}</div>
                            <div className="text-gray-600">{center.address}</div>

                        </li>
                    ))}
                </ul>
                {!searched && (
                    <div className="text-[#A9A9A9] px-5 py-3">
                        Please select state and district, then click search to view available centers.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestingCenters;
