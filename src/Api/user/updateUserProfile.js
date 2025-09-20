import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
export const updateUserProfile = async (data) => {
    const token = localStorage.getItem('userToken');
    return axios.post(
        `${BASE_URL}api/user/update`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    );
};
