import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    cityLeaderboard,
    indiaLeaderboard,
    stateLeaderboard,
} from "../api/leaderboard.api";

export const useIndiaLeaderboard = () => {
    return useQuery({
        queryKey: ["indiaLeaderboard"],
        queryFn: indiaLeaderboard, // This is correct
        staleTime: 1000 * 60 * 5,
        onError: (error) => {
            toast.error(error.message || "Failed to load Indian Leaderboard");
        },
    });
};

export const useStateLeaderboard = (refId) => {
    return useQuery({
        queryKey: ["stateLeaderboard", refId],
        queryFn: () => stateLeaderboard(refId), // Fix: Wrap in arrow function
        enabled: !!refId,
        staleTime: 1000 * 60 * 5,
        onError: (error) => {
            toast.error(error.message || "Failed to load State Leaderboard");
        },
    });
};

export const useCityLeaderboard = (refId) => {
    return useQuery({
        queryKey: ["cityLeaderboard", refId],
        queryFn: () => cityLeaderboard(refId), // Fix: Wrap in arrow function
        enabled: !!refId,
        staleTime: 1000 * 60 * 5,
        onError: (error) => {
            toast.error(error.message || "Failed to load city Leaderboard");
        },
    });
};
