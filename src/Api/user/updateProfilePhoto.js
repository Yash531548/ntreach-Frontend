import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

export const updateProfilePhoto = async (photoFile) => {
    const token = localStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('profile_photo', photoFile);

    return axios.post(
        `${BASE_URL}api/user/update_profile`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
    );
};
