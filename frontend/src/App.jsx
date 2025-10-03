import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
    useParams,
} from "react-router-dom";
import { useAuthUser } from "./hooks/auth.hooks";
// import toast from "react-hot-toast";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CollegesPage from "./pages/CollegesPage";
import ProfilePage from "./pages/ProfilePage";
import StudentLeaderboardPage from "./pages/StudentLeaderboardPage";
import Loading from "./components/Loading";
import CollegePage from "./pages/CollegePage";
import BranchPage from "./pages/BranchPage";
import SectionPage from "./pages/SectionPage";
import CollegeLeaderboardPage from "./pages/CollegeLeaderboardPage";
// import CollegeLeaderBoardPage from "./components/college/CollegeLeaderboard";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // don't refetch on tab change
            refetchOnMount: false, // don't refetch every mount
            retry: false, // don't retry endlessly
            staleTime: 1000 * 60 * 5, // data stays "fresh" for 5 minutes
        },
    },
});

function AppRoutes() {
    const { data: user, isLoading } = useAuthUser();
    console.log(user);
    if (isLoading) return <Loading />;

    const ProtectRoute = ({ children }) => {
        // if(!user) toast.error("Login to access this page")
        return user ? children : <Navigate to="/login" replace />;
    };

    const RedirectIfAuth = ({ children }) => {
        return user ? <Navigate to="/home" replace /> : children;
    };

    function CollegeProtectedRoute({ children }) {
        const { collegeId } = useParams();
        console.log("Colleg id" + collegeId);

        if (!user) return <Navigate to="/login" replace />;

        // Check college match
        if (String(user.data.collegeId) !== collegeId) {
            // toast.error("You are not authorized to access this college");
            return <Navigate to="/home" replace />;
        }

        return children;
    }

    return (
        <Routes>
            {/* Public routes */}
            <Route
                path="/signup"
                element={
                    <RedirectIfAuth>
                        <SignupPage />
                    </RedirectIfAuth>
                }
            />
            <Route
                path="/login"
                element={
                    <RedirectIfAuth>
                        <LoginPage />
                    </RedirectIfAuth>
                }
            />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route
                path="/profile"
                element={
                    <ProtectRoute>
                        <ProfilePage />{" "}
                    </ProtectRoute>
                }
            />
            <Route
                path="/studentLeaderboard"
                element={<StudentLeaderboardPage />}
            />
            <Route
                path="/collegeLeaderboard"
                element={<CollegeLeaderboardPage />}
            />
            <Route path="/home" element={<HomePage />} />

            {/* Protected routes */}

            <Route
                path="/colleges/:collegeId"
                element={
                    <ProtectRoute>
                        <CollegePage />
                    </ProtectRoute>
                }
            />
            <Route
                path="/colleges/:collegeId/branches/:branchId"
                element={
                    <CollegeProtectedRoute>
                        <BranchPage />
                    </CollegeProtectedRoute>
                }
            />
            <Route
                path="/colleges/:collegeId/sections/:sectionId"
                element={
                    <CollegeProtectedRoute>
                        <SectionPage />
                    </CollegeProtectedRoute>
                }
            />

            {/* Default root */}
            <Route
                path="/"
                element={<Navigate to={user ? "/home" : "/home"} replace />}
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Toaster position="top-center" />
                <ConditionalNavbar />
                <AppRoutes />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

// ✅ Conditional Navbar Component
function ConditionalNavbar() {
    const location = useLocation();
    const hideOnRoutes = ["/login", "/signup"];

    if (hideOnRoutes.includes(location.pathname)) {
        return null; // Don't render navbar
    }

    return <Navbar />;
}

export default App;
