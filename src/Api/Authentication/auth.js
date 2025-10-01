import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const sendOtp = async (mobile_number) => {
    try {
        const response = await axios.post(`${BASE_URL}api/user/send-otp`, { mobile_number });
        return response;// return full axios response
    } catch (error) {
        console.error("Send OTP API error:", error);
        throw error; // let caller handle error
    }
};

export const verifyOtp = async (mobile_number, otp) => {
    const { data } = await axios.post(`${BASE_URL}api/user/verify-otp`, { mobile_number, otp });
    return data; // includes {status, token, user, ...}
};
