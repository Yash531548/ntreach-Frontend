import { ArrowRight, CircleArrowLeft } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import ManAvatar from "../../assets/Dashboard/ManAvatar.jpg";
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import { useAuth } from '../../Context/AuthContext';
import { updateUserProfile } from '../../Api/user/updateUserProfile';
import { fetchUserProfile } from '../../Api/user/fetchUserProfile';
import { fetchStates } from '../../Api/getState';
import { fetchDistrictsApi } from '../../Api/fetchDistrictsApi';
import { fetchProfilePhoto } from '../../Api/user/fetchProfilePhoto';
import { updateProfilePhoto } from '../../Api/user/updateProfilePhoto';
import { useProfile } from '../../Context/ProfileContext';
const initialProfile = {
    name: '',
    last_name: '',
    mobile: '',
    email: '',
    blood_group: '',
    gender: '',
    state: '',
    district: '',
    language: ''
};
const UserProfile = ({ setSelectedView }) => {
    const { user } = useAuth(); // 👈 This has current user's latest details
    // console.log("user details", user)
    // Profile context state with renaming to avoid conflict
    const { profile: profileContext, setProfile: setProfileContext } = useProfile();
    // Local form state
    const [profile, setProfile] = useState(initialProfile);
    const [avatarUrl, setAvatarUrl] = useState(ManAvatar);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [districtLoading, setDistrictLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Prefill form state with data from the logged-in user's context
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                setLoading(true);
                const { data } = await fetchUserProfile();
                console.log("User detail from api", data)
                if (data.status && data.user) {
                    // Update local form state
                    setProfile({
                        name: data.user.name || '',
                        last_name: data.user.last_name || '',
                        mobile: data.user.phone_number || '',
                        email: data.user.email || '',
                        blood_group: data.user.blood_group || '',
                        gender: data.user.gender || '',
                        state: data.user.state || '',
                        district: data.user.district || '',
                        language: data.user.language || ''
                    });
                    // Update global context profile state for shared info
                    setProfileContext(prev => ({
                        ...prev,
                        name: data.user.name || '',
                        last_name: data.user.last_name || '',
                        mobile: data.user.phone_number || '',
                    }));
                }
            } catch (error) {
                setMessage('Failed to load profile');
            }
            setLoading(false);
        };
        loadUserProfile();
    }, [setProfileContext]);


    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Submit profile updates (except photo)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            console.log("profile data", profile)
            const response = await updateUserProfile(profile);
            console.log("API response:", response);
            setMessage(response.data.message || 'Profile updated!');
        } catch (error) {
            // Log detailed error info for debugging
            if (error.response) {
                // Server responded with a status code outside 2xx
                console.error("API error response data:", error.response.data);
                setMessage(`Update failed: ${error.response.data.message || 'Server error'}`);
            } else if (error.request) {
                // Request made but no response received
                console.error("No response from API, request was:", error.request);
                setMessage('Update failed: No response from server.');
            } else {
                // Something else happened while setting up request
                console.error("Error setting up request:", error.message);
                setMessage('Update failed: Request error.');
            }
        }
        setLoading(false);
    };
    // Load states for selection dropdown
    useEffect(() => {
        async function getStates() {
            try {
                const data = await fetchStates();
                setStates(data);
            } catch (error) {
                console.error("Failed to fetch states:", error);
            }
        }
        getStates()
    }, [])
    // Fetch districts on State change
    useEffect(() => {
        if (!profile.state) {
            setDistricts([]);
            setProfile(prev => ({ ...prev, district: '' })); // reset district
            return;
        }
        const fetchDistricts = async () => {
            setDistrictLoading(true);
            try {
                const data = await fetchDistrictsApi(profile.state); // define and import fetchDistrictsApi
                setDistricts(data);
            } catch (error) {
                console.error("Failed to fetch districts", error);
                setDistricts([]);
            }
            setDistrictLoading(false);
        };
        fetchDistricts();
    }, [profile.state]);
    // console.log("district", districts)
    /// Load profile photo from API and update both local and context states
    const loadProfilePhoto = async () => {
        try {
            const { data } = await fetchProfilePhoto();
            if (data.status && data.profile_pic_url) {
                setAvatarUrl(data.profile_pic_url);
                setProfileContext(prev => ({
                    ...prev,
                    avatarUrl: data.profile_pic_url
                }));
            } else {
                setAvatarUrl(ManAvatar);
            }
        } catch {
            setAvatarUrl(ManAvatar);
        }
    };

    useEffect(() => {
        loadProfilePhoto();
    }, [setProfileContext]);

    const MAX_FILE_SIZE_MB = 2;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    // Handle file selection and upload
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > MAX_FILE_SIZE_BYTES) {
            setMessage(`Image size should be lower than ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            const response = await updateProfilePhoto(file);
            setMessage(response.data.message || 'Profile photo updated!');
            await loadProfilePhoto();
        } catch {
            setMessage('Upload failed');
        }
        setLoading(false);
    };
    // Trigger hidden file input on avatar click
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div className='md:rounded-r-4xl w-full md:border md:border-gray-300 md:border-l-0 md:shadow-sm pt-5 md:px-5 xl:pt-8 xl:px-10'>
            <div className='flex  items-center justify-between '>
                {/* 👇 Add click handler */}
                <div className='flex items-center gap-2 md:gap-4'>

                    <CircleArrowLeft className='text-gray-700 cursor-pointer'
                        onClick={() => setSelectedView('Home')}
                    />
                    <p className='text-[#0063B9]  text-[25px] md:text-[28px] xl:text-3xl' style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>My Profile</p>
                </div>
                <div className='relative' onClick={() => setSelectedView("Notifications")}>
                    <img src={NotificationMobileIcon} alt="Notification icon" className='lg:hidden  ' />
                    <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='w-full rounded-2xl shadow-sm md:h-[55%] mt-[2rem] mb-[1rem] py-6 px-6 md:pt-6 md:p-8'>
                    <div className='w-full flex justify-center md:block md:w-18 md:h-18 rounded-full ' onClick={triggerFileInput}>
                        <img
                            // src={ManAvatar}
                            src={avatarUrl}
                            alt="User Avatar"
                            className="w-22 h-22 md:w-18 md:h-18 rounded-full border border-gray-200"
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>

                        <div className="w-full max-w-3xl space-y-3 text-sm mt-6 " style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}>
                            {/* <!-- First Row --> */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <input type="text" placeholder="First Name" value={profile.name} name="name" onChange={handleChange} className="flex-1 border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none placeholder-[#A9A9A9] " />
                                <input type="text" placeholder="Last Name" name="last_name" value={profile.last_name} onChange={handleChange} className="flex-1 border border-[#92C2D7] rounded-full bg-[#F4F4F4] px-4 py-0.5 outline-none placeholder-[#A9A9A9]" />
                            </div>

                            {/* <!-- Second Row --> */}
                            <div className="flex gap-4 flex-col md:flex-row">
                                <input type="text" placeholder="Mobile No." name="mobile" readOnly value={profile.mobile} onChange={handleChange} className="flex-1 border border-[#92C2D7] rounded-full px-4 py-0.5 outline-none bg-[#F4F4F4] placeholder-[#A9A9A9]" />
                                <input type="email" placeholder="Email ID (optional)" name="email" value={profile.email} onChange={handleChange} className="flex-1 border border-[#92C2D7] rounded-full px-4 py-0.5 outline-none bg-[#F4F4F4] placeholder-[#A9A9A9]" />
                            </div>

                            {/* <!-- Third Row --> */}
                            <div className="flex md: gap-4">
                                <input type="text" placeholder="Blood Group" name="blood_group" value={profile.blood_group} onChange={handleChange} className="w-full md:flex-1 border border-[#92C2D7] rounded-full px-4 py-0.5 outline-none bg-[#F4F4F4] placeholder-[#A9A9A9]" />
                                <select name="gender" value={profile.gender} onChange={handleChange} className="w-full md:flex-1 bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 outline-none text-[#A9A9A9] ">
                                    <option >Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            {/* <!-- Fourth Row --> */}
                            <div className="flex flex-col md:flex-row gap-4 justify-between">
                                {/* Left side: State + District */}
                                <div className="flex lg:w-[48%]  xl:w-[48.5%] gap-4 md:gap-5 ">
                                    <select name="state" value={profile.state} onChange={handleChange} className="w-[50%] xl:flex-1 bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-1 xl:px-4 py-0.5 outline-none text-[#A9A9A9]">
                                        <option  > State</option>
                                        {states.map(state => (
                                            <option key={state.id} value={state.id}>
                                                {state.state_name}
                                            </option>
                                        ))}
                                    </select>
                                    <select name="district" value={profile.district} disabled={!profile.state || districtLoading} onChange={handleChange} className=" w-1/2 xl:flex-1 bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-1 py-0.5 outline-none text-[#A9A9A9]">
                                        <option  > District</option>

                                        {districts.map(district => (
                                            <option key={district.id} value={district.id}>{district.district_name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Right side: Preferred Language */}
                                <select name="language" value={profile.language} onChange={handleChange} className="flex-1 border border-[#92C2D7] bg-[#F4F4F4] text-[#A9A9A9] rounded-full px-4 py-0.5 outline-none">
                                    <option  > Preferred language</option>
                                    <option>English</option>
                                    <option>Hindi</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            {/* <!-- Fourth Row --> */}



                        </div>


                    </div>
                </div>
                <div className='mt-[1.7rem]'>
                    <button
                        type="submit" disabled={loading}

                        style={{ fontFamily: "Sofia Pro", fontWeight: 300 }}
                        className="text-sm relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                                   bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                                   text-white rounded-full cursor-pointer gap-8"
                    >
                        Update Profile
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg  ml-3">
                            <ArrowRight width={17} />
                        </span>
                    </button>
                    {message && <div className="mt-2 text-sm text-red-700">{message}</div>}
                </div>
            </form>
        </div>
    )
}

export default UserProfile