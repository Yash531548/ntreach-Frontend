import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProfilePhoto = async () => {
    const token = localStorage.getItem('userToken');
    return axios.post(
        `${BASE_URL}api/user/get_profile_pic`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
