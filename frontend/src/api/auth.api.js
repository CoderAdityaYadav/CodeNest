import { axiosInstance } from "../lib/axios.js";

export async function me() {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function login(loginData) {
    try {
        const res = await axiosInstance.post("/auth/login", loginData);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function signup(signupData) {
    try {
        const res = await axiosInstance.post("/auth/signup", signupData);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function logout() {
    try {
        const res = await axiosInstance.post("/auth/logout");
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}