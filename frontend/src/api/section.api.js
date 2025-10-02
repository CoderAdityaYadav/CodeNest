import { axiosInstance } from "../lib/axios";

export async function postSection(sectionData) {
    try {
        const res = await axiosInstance.post("/sections",sectionData);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function joinSection(sectionData) {
    try {
        const res = await axiosInstance.post("/sections/join", sectionData);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function getSectionDetailsById(sectionId) {
    try {
        const res = await axiosInstance.get(`/sections/${sectionId}/details`);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function getSectionStatsById(sectionId) {
    try {
        const res = await axiosInstance.get(`sections/${sectionId}/stats`);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}