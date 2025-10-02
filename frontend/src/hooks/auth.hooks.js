import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login, signup, me, logout } from "../api/auth.api.js";

// Fetch the authenticated user
export const useAuthUser = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: me,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
};

// Login hook
export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (loginData) => await login(loginData),
        onError: (error) => {
            toast.error(error.message || "Login failed");
        },
        onSuccess: (data) => {
            toast.success(data.message || "Login successful");

            // ✅ Immediately update authUser cache so ProtectRoute sees logged-in user
            queryClient.setQueryData(["authUser"], data.user);
            // Optional: also refetch in case the API returns more info later
            // queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });
};

// Signup hook
export const useSignup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (signupData) => await signup(signupData),
        onError: (error) => {
            toast.error(error.message || "Signup failed");
        },
        onSuccess: (data) => {
            toast.success(data.message || "Signup successful");
            // ✅ Immediately update authUser cache
            queryClient.setQueryData(["authUser"], data.user);
            // queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });
};

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // Clear token first
            localStorage.removeItem("token");

            // Clear auth query completely
            queryClient.setQueryData(["authUser"], null);
            queryClient.removeQueries({ queryKey: ["authUser"] });

            // Invalidate all queries to ensure fresh data on next login
            queryClient.clear(); // More aggressive clearing
        },
        onError: () => {
            localStorage.removeItem("token");
            queryClient.setQueryData(["authUser"], null);
            queryClient.removeQueries({ queryKey: ["authUser"] });
        },
    });
}
