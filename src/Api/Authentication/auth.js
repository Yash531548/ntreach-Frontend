import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const sendOtp = async (mobile_number) => {
    // Even if backend may return 500, still initiate request and move to next step
    await axios.post(`${BASE_URL}api/user/send-otp`, { mobile_number });
};

export const verifyOtp = async (mobile_number, otp) => {
    const { data } = await axios.post(`${BASE_URL}api/user/verify-otp`, { mobile_number, otp });
    return data; // includes {status, token, user, ...}
};
