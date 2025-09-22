import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserProfile } from "../Api/user/fetchUserProfile";
import { fetchProfilePhoto } from "../Api/user/fetchProfilePhoto";

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        avatarUrl: '',    // profile picture URL
        name: '',         // user name
        mobile: ''        // mobile number
    });

    useEffect(() => {
        async function loadInitialProfile() {
            try {
                const { data } = await fetchUserProfile();
                let name = '', mobile = '';
                if (data.status && data.user) {
                    name = data.user.name ? `${data.user.name} ${data.user.last_name || ''}` : '';
                    mobile = data.user.phone_number || '';
                }
                const profilePicData = await fetchProfilePhoto();
                let avatarUrl = '';
                if (profilePicData.data.status && profilePicData.data.profile_pic_url) {
                    avatarUrl = profilePicData.data.profile_pic_url;
                }
                setProfile({
                    name,
                    mobile,
                    avatarUrl
                });
            } catch {
                setProfile({
                    name: '',
                    mobile: '',
                    avatarUrl: ''
                });
            }
        }

        loadInitialProfile();
    }, []);
    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};
