import { getJoinCodeUser } from "../api/user.api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetJoinCodeUser = (collegeId) => {
    return useQuery({
        queryKey: ["joinCode", collegeId],
        queryFn: getJoinCodeUser,
        staleTime: 1000 * 60 * 10, // 10 min cache
        enabled: !!collegeId, // ❌ no college → no fetch
        onError: (error) => {
            toast.error(error.message || "Failed to load Join Code");
        },
    });
};
