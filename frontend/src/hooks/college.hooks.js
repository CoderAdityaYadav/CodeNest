import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getCollegeDetailsById, getColleges,getCollegeStatsById, joinCollege, postCollege } from "../api/college.api";

export const useGetColleges = () => {
    return useQuery({
        queryKey: ["colleges"],
        queryFn: getColleges,
        staleTime: 1000 * 60 * 10,
        onError: (error) => {
            toast.error(error.message || "Failed to load colleges");
        }
    })
}
export const useGetCollegeDetailsById = (collegeId) => {
    return useQuery({
        queryKey: ["collegeDetails", collegeId],
        queryFn:()=> getCollegeDetailsById(collegeId),
        enabled: !!collegeId,
        staleTime: 1000 * 60 * 10,
        onError: (error) => {
            toast.error(error.message || "Failed to load College Information");
        },
    });
}

export const useGetCollegeStatsById = (collegeId) => {
    return useQuery({
        queryKey: ["collegeStats", collegeId],
        queryFn:()=> getCollegeStatsById(collegeId),
        enabled: !!collegeId,
        staleTime: 1000 * 60 * 10,
        onError: (error) => {
            toast.error(error.message || "Failed to load College Information");
        },
    });
}

export const usePostCollege=()=>{
    return useMutation({
        mutationFn: async (collegeData) => await postCollege(collegeData),
        onError: (error) => {
            toast.error(error.message || "College was not created.Try again Later");
        },
        onSuccess: (data) => {
            toast.success(data.message || "College was created successfully");
        },
    });
}

export const useJoinCollege = () => {
    return useMutation({
        mutationFn: async (collegeData) => await joinCollege(collegeData),
        onError: (error) => {
            toast.error(
                error.message || "Not able to join College at present. Try Later."
            );
        },
        onSuccess: (data) => {
            toast.success(data.message || "College was joined successfully");
        },
    });
}