import { useMutation,useQuery } from "@tanstack/react-query";
import { joinSection, postSection,getSectionDetailsById,getSectionStatsById } from "../api/section.api";
import toast from "react-hot-toast";

export const usePostSection = () => {
    return useMutation({
        mutationFn: async (sectionData) => await postSection(sectionData),
        onError: (error) => {
            toast.error(
                error.message ||
                    "Not able to post Section at present. Try again Later"
            );
        },
        onSuccess: (data) => {
            toast.success(data.message || "Section created successfully");
        },
    });
}

export const useJoinSection = () => {
    return useMutation({
        mutationFn: async (sectionData) => await joinSection(sectionData),
        onError: (error) => {
            toast.error(
                error.message ||
                    "Not able to join Section at present. Try again Later"
            );
        },
        onSuccess: (data) => {
            toast.success(data.message || "Section joined successfully");
        },
    });
}

export const useGetSectionDetailsById = (sectionId) => {
    return useQuery({
        queryKey: ["sectionDetails", sectionId],
        queryFn: () => getSectionDetailsById(sectionId),
        enabled: !!sectionId,
        staleTime: 1000 * 60 * 10,
        onError: (error) => {
            toast.error(error.message || "Failed to load Section Information");
        },
    });
};

export const useGetSectionStatsById = (sectionId) => {
    return useQuery({
        queryKey: ["sectionStats", sectionId],
        queryFn: () => getSectionStatsById(sectionId),
        enabled: !!sectionId,
        staleTime: 1000 * 60 * 10,
        onError: (error) => {
            toast.error(error.message || "Failed to load Section Stats");
        },
    });
};