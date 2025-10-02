import { useMutation,useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getBranchStatsById,getBranchDetailsById, joinBranch,postBranch } from "../api/branch.api";

export const useJoinBranch = () => {
    return useMutation({
        mutationFn: async (branchData) => await joinBranch(branchData),
        onError: (error) => {
            toast.error(
                error.message ||
                    "Not able to join Branch at present. Try again Later"
            );
        },
        onSuccess: (data) => {
            toast.success(data.message || "Branch joined successfully");
        },
    });
};
export const usePostBranch = () => {
    return useMutation({
        mutationFn: async (branchData) => await postBranch(branchData),
        onError: (error) => {
            toast.error(
                error.message ||
                    "Not able to create Branch at present. Try again Later"
            );
        },
        onSuccess: (data) => {
            toast.success(data.message || "Branch created successfully");
        },
    });
}

export const useGetBranchDetailsById = (branchId) => {
    return useQuery({
        queryKey: ["branchDetails", branchId],
        queryFn: () => getBranchDetailsById(branchId),
        enabled: !!branchId,
        staleTime: 1000 * 60 * 10,
        onError: (error) => {
            toast.error(error.message || "Failed to load Branch Information");
        },
    });
}

export const useGetBranchStatsById = (branchId) => {
    return useQuery({
        queryKey: ["branchStats", branchId],
        queryFn: () => getBranchStatsById(branchId),
        enabled: !!branchId,
        staleTime: 1000 * 60 * 10,
        onError: (error) => {
            toast.error(error.message || "Failed to load Branch Stats");
        },
    });
};