// api/fetchTestingCentersApi.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchTestingCentersApi = async (body) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.post(`${BASE_URL}api/testing_center`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data.status ? response.data.data : [];
};

