import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
// Hook for India-level college leaderboard
export const useIndiaCollegeLeaderboard = () => {
    return useQuery({
        queryKey: ["collegeLeaderboard", "india"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                "/college-leaderboard/india/india"
            );
            return data;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 2,
    });
};

// Hook for state-level college leaderboard
export const useStateCollegeLeaderboard = (state) => {
    return useQuery({
        queryKey: ["collegeLeaderboard", "state", state],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `/college-leaderboard/state/${encodeURIComponent(state)}`
            );
            return data;
        },
        enabled: Boolean(state),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 2,
    });
};

// Hook for city-level college leaderboard
export const useCityCollegeLeaderboard = (city) => {
    return useQuery({
        queryKey: ["collegeLeaderboard", "city", city],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `/college-leaderboard/city/${encodeURIComponent(city)}`
            );
            return data;
        },
        enabled: Boolean(city),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 2,
    });
};

// Hook for getting available references (cities/states)
export const useAvailableReferences = (level) => {
    return useQuery({
        queryKey: ["collegeLeaderboard", "references", level],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `/college-leaderboard/references/${level}`
            );
            return data;
        },
        enabled: Boolean(level) && ["city", "state"].includes(level),
        staleTime: 30 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
        retry: 2,
    });
};

// Hook for generating college leaderboards (admin only)
export const useGenerateCollegeLeaderboards = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await axiosInstance.post(
                "/college-leaderboard/generate"
            );
            return data;
        },
        onSuccess: () => {
            // Invalidate all college leaderboard queries
            queryClient.invalidateQueries(["collegeLeaderboard"]);
        },
    });
};
