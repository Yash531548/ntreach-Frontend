import axios from "axios"

export const submitCounsellorRequest = async ({ name, mobile_no, state_id, message }) => {
    try {
        const res =  await axios.post(`${import.meta.env.VITE_API_URL}api/meet-counsellor-req`,{
            name,
            mobile_no,
            state_id,
            message
        });
        return res.data;
    } catch (error) {
        return {
            status: false,
            message: error?.response?.data?.message || 'Something went wrong! Please try again.',
        };
    }
}