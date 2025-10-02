import { axiosInstance } from "../lib/axios";

export async function postBranch(branchData) {
    try {
        const res = await axiosInstance.post("/branches", branchData);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function joinBranch(branchData) {
    try {
        const res = await axiosInstance.post("/branches/join", branchData);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function getBranchDetailsById(branchId) {
    try {
        const res = await axiosInstance.get(`/branches/${branchId}/details`);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function getBranchStatsById(branchId) {
    try {
        const res = await axiosInstance.get(`branches/${branchId}/stats`);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}
