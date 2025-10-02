import { axiosInstance } from "../lib/axios";

export async function getColleges() {
    try {
        const res = await axiosInstance.get("/colleges");
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function getCollegeDetailsById(collegeId) {
    try {
        const res = await axiosInstance.get(`/colleges/${collegeId}/details`)
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function getCollegeStatsById(collegeId) {
    try {
        const res = await axiosInstance.get(`/colleges/${collegeId}/stats`);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function postCollege(collegeData) {
    try {
        const res = await axiosInstance.post("/colleges", collegeData);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function joinCollege(collegeData) {
    try {
        const res = await axiosInstance.post("/colleges/join", collegeData);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}