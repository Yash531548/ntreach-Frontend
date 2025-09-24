import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchDistrictsApi = async (stateId) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}api/get_district`, {
        params: { state_id: stateId },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.data.status === 'success') {
        // Sort  in Alphabetical order
        return response.data.data.sort((a,b)=> a.district_name.localeCompare(b.district_name));
    }
    return [];
};
