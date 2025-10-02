import { axiosInstance } from "../lib/axios";

export async function getUserReport() {
    try {
        const res = await axiosInstance.get("/report/userReport");
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function postStudentReport() {
    try {
        const res = await axiosInstance.post("/report/studentReport");
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function postCoordinatorReport() {
    try {
        const res = await axiosInstance.post("/report/coordinatorReport");
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

export async function postRecruiterReport(collegeId) {
    try {
        const res = await axiosInstance.post(
            `/report/recruiterReport/${collegeId}`
        );
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}