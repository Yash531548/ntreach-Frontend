import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchUserProfile = async () => {
    const token = localStorage.getItem('userToken');
    return axios.get(`${BASE_URL}api/user/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
