import { axiosInstance } from "../lib/axios";

export async function indiaLeaderboard() {
    try {
        const res = await axiosInstance.get("leaderboard/india/india");
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function stateLeaderboard(stateName) {
    try {
        const res = await axiosInstance.get(`leaderboard/state/${stateName}`);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function cityLeaderboard(cityName) {
    try {
        const res = await axiosInstance.get(`leaderboard/city/${cityName}`);
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}