import { axiosInstance } from "../lib/axios";

export async function getJoinCodeUser() {
    try {
        const res = await axiosInstance.get("/users/join-code");
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}