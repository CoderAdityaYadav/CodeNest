import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    postStudentReport,
    postCoordinatorReport,
    postRecruiterReport,
    getUserReport,
} from "../api/report.api";

export const useGetUserReport = () => {
    return useQuery({
        queryKey: ["userReport"],
        queryFn: getUserReport,
        staleTime: 1000 * 60 * 10,
        onError: (error) => {
            toast.error(error.message || "Failed to load User Report");
        },
    });
};

export const usePostStudentReport = () => {
    return useMutation({
        mutationFn: async () => await postStudentReport(),
        onError: (error) => {
            toast.error(
                error.message ||
                    "Not able to generate Student Report now. Try again Later"
            );
        },
        onSuccess: (data) => {
            toast.success(
                data.message ||
                    "Student Report created successfully.Check the report in the profile section."
            );
        },
    });
};

export const usePostCoordinatorReport = () => {
    return useMutation({
        mutationFn: async () => await postCoordinatorReport(),
        onError: (error) => {
            toast.error(
                error.message ||
                    "Not able to generate Coordinator report now. Try again Later"
            );
        },
        onSuccess: (data) => {
            toast.success(
                data.message ||
                    "Coordinator Report created successfully. Check the report in the profile section."
            );
        },
    });
};
export const usePostRecruiterReport = () => {
    return useMutation({
        mutationFn: async (collegeId) => await postRecruiterReport(collegeId),
        onError: (error) => {
            toast.error(
                error.message ||
                    "Not able to generate Recruiter Report now. Try again Later"
            );
        },
        onSuccess: (data) => {
            toast.success(
                data.message ||
                    "Recruiter Report created successfully.Check the report in the profile section."
            );
        },
    });
};
