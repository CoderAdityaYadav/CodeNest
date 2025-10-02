import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    AlertCircle,
    Building2,
    Plus,
    UserPlus,
    ShieldCheck,
    Crown,
    Users,
    X,
    Lock,
    BookOpen,
    PlusCircle,
    Menu,
    ChevronDown,
    Loader2, 
} from "lucide-react";
import {
    useGetCollegeDetailsById,
    useGetCollegeStatsById,
} from "../hooks/college.hooks";
import { useJoinCollege } from "../hooks/college.hooks";
import { useJoinBranch } from "../hooks/branch.hooks";
import { useJoinSection } from "../hooks/section.hooks";
import { usePostBranch } from "../hooks/branch.hooks";
import { usePostSection } from "../hooks/section.hooks";
import { usePostRecruiterReport } from "../hooks/report.hooks.js";
import toast from "react-hot-toast";
import Loading from "../components/Loading.jsx";
import { useAuthUser } from "../hooks/auth.hooks";
import CollegeSidebar from "../components/college/CollegeSidebar";
import CollegeDashboard from "../components/college/CollegeDashboard";
import CollegeLeaderboard from "../components/college/CollegeLeaderboard";

export default function CollegePage() {
    const { collegeId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showCreateBranchModal, setShowCreateBranchModal] = useState(false);
    const [showCreateSectionModal, setShowCreateSectionModal] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [branchName, setBranchName] = useState("");
    const [sectionName, setSectionName] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const [isCreatingBranch, setIsCreatingBranch] = useState(false);
    const [isCreatingSection, setIsCreatingSection] = useState(false);
    const generateRecruiterReportMutation = usePostRecruiterReport();

    // Auth user data - ALL HOOKS MUST BE CALLED FIRST
    const {
        data: user,
        error: authError,
        isError: isAuthError,
        isLoading: userLoading,
    } = useAuthUser();

    // Fetch college data
    const {
        data: collegeDetails,
        isLoading: detailsLoading,
        error: detailsError,
    } = useGetCollegeDetailsById(collegeId);

    const {
        data: collegeStats,
        isLoading: statsLoading,
        error: statsError,
    } = useGetCollegeStatsById(collegeId);

    // Join mutations
    const joinCollegeMutation = useJoinCollege();
    const joinBranchMutation = useJoinBranch();
    const joinSectionMutation = useJoinSection();

    // Create mutations
    const createBranchMutation = usePostBranch();
    const createSectionMutation = usePostSection();

    // DECLARE ALL VARIABLES AFTER HOOKS, BEFORE ANY EARLY RETURNS
    const isLoading = detailsLoading || statsLoading || userLoading;
    const error = detailsError || statsError;

    // Check if user is authenticated
    const isAuthenticated =
        user && !isAuthError && authError?.response?.status !== 401;

    // UPDATED: Check if user has any college association
    const hasCollegeAssociation = !!user?.data?.collegeId;

    // UPDATED: Check if user is part of this specific college
    const isUserPartOfThisCollege = user?.data?.collegeId === collegeId;

    // Check if user can create branch (HOD of this college without branch)
    const canCreateBranch =
        isAuthenticated &&
        isUserPartOfThisCollege &&
        user?.data?.role === "hod" &&
        !user?.data?.branchId;

    // Check if user can create section (Coordinator of this college without section)
    const canCreateSection =
        isAuthenticated &&
        isUserPartOfThisCollege &&
        user?.data?.role === "coordinator" &&
        !user?.data?.sectionId;

    // Get join option based on user role (CORRECTED LOGIC)
    const getJoinOption = useCallback(() => {
        if (!isAuthenticated) return null;
        if (hasCollegeAssociation) return null;

        switch (user?.data?.role?.toLowerCase()) {
            case "hod":
                return {
                    type: "college",
                    label: "Join College",
                    icon: Crown,
                    description: "Head of Department",
                    gradient: "from-purple-500 to-indigo-600",
                };
            case "coordinator":
                return {
                    type: "branch",
                    label: "Join Branch",
                    icon: ShieldCheck,
                    description: "Section Coordinator",
                    gradient: "from-blue-500 to-cyan-600",
                };
            case "student":
                return {
                    type: "section",
                    label: "Join Section",
                    icon: Users,
                    description: "Join a section",
                    gradient: "from-green-500 to-emerald-600",
                };
            default:
                return null;
        }
    }, [isAuthenticated, hasCollegeAssociation, user?.data?.role]);

    const joinOption = getJoinOption();

    // Handle AI Report Generation with Toast
    const handleGenerateReport = useCallback(async () => {
        // Show loading toast
        const loadingToastId = toast.loading("Generating AI report...", {
            duration: 0, // Don't auto dismiss
            style: {
                background: "#f59e0b",
                color: "#ffffff",
            },
        });

        try {
            await generateRecruiterReportMutation.mutateAsync(collegeId);
            // Success toast
            toast.success("AI report generated successfully!", {
                id: loadingToastId, // Replace loading toast
                duration: 4000,
            });
        } catch (error) {
            // Error toast
            toast.error(
                error?.response?.data?.message ||
                    "Failed to generate report. Please try again.",
                {
                    id: loadingToastId, // Replace loading toast
                    duration: 4000,
                }
            );
        }
    }, [collegeId, generateRecruiterReportMutation]);

    // Handle join action
    const handleJoin = useCallback(async () => {
        if (!joinCode.trim()) {
            toast.error("Please enter a join code");
            return;
        }

        if (!joinOption) {
            toast.error("Invalid user role");
            return;
        }

        setIsJoining(true);

        try {
            const joinData = {
                joinCode: joinCode.trim(),
                collegeId: collegeId,
            };

            switch (joinOption.type) {
                case "college":
                    await joinCollegeMutation.mutateAsync(joinData);
                    toast.success("Successfully joined college!");
                    break;
                case "branch":
                    await joinBranchMutation.mutateAsync(joinData);
                    toast.success("Successfully joined branch!");
                    break;
                case "section":
                    await joinSectionMutation.mutateAsync(joinData);
                    toast.success("Successfully joined section!");
                    break;
                default:
                    throw new Error("Invalid join type");
            }

            setShowJoinModal(false);
            setJoinCode("");
            window.location.reload();
        } catch (error) {
            console.error("Join error:", error);
            toast.error(
                error?.response?.data?.message ||
                    "Failed to join. Please try again."
            );
        } finally {
            setIsJoining(false);
        }
    }, [
        joinCode,
        collegeId,
        joinOption,
        joinCollegeMutation,
        joinBranchMutation,
        joinSectionMutation,
    ]);

    // Handle create branch
    const handleCreateBranch = useCallback(async () => {
        if (!branchName.trim()) {
            toast.error("Please enter a branch name");
            return;
        }

        setIsCreatingBranch(true);

        try {
            const branchData = {
                name: branchName.trim(),
            };

            await createBranchMutation.mutateAsync(branchData);
            setShowCreateBranchModal(false);
            setBranchName("");
            window.location.reload();
        } catch (error) {
            console.error("Create branch error:", error);
        } finally {
            setIsCreatingBranch(false);
        }
    }, [branchName, createBranchMutation]);

    // Handle create section
    const handleCreateSection = useCallback(async () => {
        if (!sectionName.trim()) {
            toast.error("Please enter a section name");
            return;
        }

        setIsCreatingSection(true);

        try {
            const sectionData = {
                name: sectionName.trim(),
            };

            await createSectionMutation.mutateAsync(sectionData);
            setShowCreateSectionModal(false);
            setSectionName("");
            window.location.reload();
        } catch (error) {
            console.error("Create section error:", error);
        } finally {
            setIsCreatingSection(false);
        }
    }, [sectionName, createSectionMutation]);

    // NOW SAFE TO USE EARLY RETURNS - ALL VARIABLES ARE DECLARED
    if (isLoading) {
        return (
            <Loading
                context="dashboard"
                duration={3000}
                showProgress={true}
                customMessage="Loading college analytics..."
            />
        );
    }

    if (error || !collegeDetails?.data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
                <div className="text-center max-w-sm mx-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                        College Not Found
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                        {error?.message || "Unable to load college information"}
                    </p>
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <button
                            onClick={() => navigate("/colleges")}
                            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                            Back to Colleges
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const college = collegeDetails.data;
    const stats = collegeStats?.data;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Mobile-First Responsive Header */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-b border-white/20 dark:border-slate-700/50 shadow-xl sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6">
                    {/* Mobile Header Layout */}
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                        {/* Left Section - Back Button + College Info */}
                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-1 min-w-0">
                            <button
                                onClick={() => navigate("/colleges")}
                                className="p-2 sm:p-3 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-lg sm:rounded-xl transition-all duration-200 backdrop-blur-sm flex-shrink-0">
                                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
                            </button>

                            {/* College Info - Responsive */}
                            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl blur opacity-20"></div>
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-sm sm:text-lg lg:text-2xl shadow-lg">
                                        {college.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
                                        {college.name}
                                    </h1>
                                    <p className="text-sm sm:text-base lg:text-lg font-medium text-blue-600 dark:text-blue-400 truncate">
                                        {college.location.city},{" "}
                                        {college.location.state}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 sm:gap-2 mt-1">
                                        <Building2 className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                        <span className="text-gray-400">•</span>
                                        <span className="truncate">
                                            {stats?.counts?.totalStudents || 0}{" "}
                                            students
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Action Buttons (Desktop) + Mobile Menu */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            {/* Desktop Action Buttons - Hidden on Mobile */}
                            <div className="hidden lg:flex items-center gap-3">
                                {/* Case 1: User not logged in */}
                                {!isAuthenticated && (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full border border-gray-200 dark:border-gray-600">
                                        <Lock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Login to Join
                                        </span>
                                    </div>
                                )}

                                {/* Case 2: User is member of THIS college - UPDATED with Create Buttons */}
                                {isAuthenticated && isUserPartOfThisCollege && (
                                    <div className="flex items-center gap-3">
                                        {/* Create Branch Button for HOD */}
                                        {canCreateBranch && (
                                            <button
                                                onClick={() =>
                                                    setShowCreateBranchModal(
                                                        true
                                                    )
                                                }
                                                className="group px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                                                <PlusCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm">
                                                    Create Branch
                                                </span>
                                            </button>
                                        )}

                                        {/* Create Section Button for Coordinator */}
                                        {canCreateSection && (
                                            <button
                                                onClick={() =>
                                                    setShowCreateSectionModal(
                                                        true
                                                    )
                                                }
                                                className="group px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                                                <PlusCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm">
                                                    Create Section
                                                </span>
                                            </button>
                                        )}

                                        {/* User Status Badge */}
                                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-800">
                                            <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                                {user?.data?.role === "hod"
                                                    ? "HOD"
                                                    : user?.data?.role ===
                                                      "coordinator"
                                                    ? "Coordinator"
                                                    : user?.data?.role ===
                                                      "student"
                                                    ? "Student"
                                                    : "Manager"}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Case 3: User has joined DIFFERENT college */}
                                {isAuthenticated &&
                                    hasCollegeAssociation &&
                                    !isUserPartOfThisCollege && (
                                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-full border border-orange-200 dark:border-orange-800">
                                            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                                Different College
                                            </span>
                                        </div>
                                    )}

                                {/* Case 4: User can join (logged in, no college, valid role) */}
                                {isAuthenticated &&
                                    !hasCollegeAssociation &&
                                    joinOption && (
                                        <button
                                            onClick={() =>
                                                setShowJoinModal(true)
                                            }
                                            className="group px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                                            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm">
                                                {joinOption.label}
                                            </span>
                                        </button>
                                    )}

                                {/* Updated Generate AI Report Button for Recruiters */}
                                {isAuthenticated &&
                                    user?.data?.role === "recruiter" && (
                                        <button
                                            onClick={handleGenerateReport}
                                            disabled={
                                                generateRecruiterReportMutation.isLoading
                                            }
                                            className="group px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-yellow-500 disabled:hover:to-orange-500 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                                            {generateRecruiterReportMutation.isLoading ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Generating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Generate Report</span>
                                                </>
                                            )}
                                        </button>
                                    )}

                                {/* Case 5: User logged in, no college, but invalid role */}
                                {isAuthenticated &&
                                    !hasCollegeAssociation &&
                                    !joinOption && (
                                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-full border border-red-200 dark:border-red-800">
                                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                            <span className="text-sm font-medium text-red-700 dark:text-red-300">
                                                Invalid Role:{" "}
                                                {user?.data?.role || "Unknown"}
                                            </span>
                                        </div>
                                    )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setShowMobileMenu(true)}
                                className="lg:hidden p-2 sm:p-3 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-lg sm:rounded-xl transition-all duration-200 backdrop-blur-sm">
                                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Member status details for current college members - Mobile Optimized */}
                    {isAuthenticated && isUserPartOfThisCollege && (
                        <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
                            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                <span>
                                    Score:{" "}
                                    {user?.data?.score?.toLocaleString() || 0}
                                </span>
                            </div>
                            {user?.data?.branchId && (
                                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                                    <span>Branch Member</span>
                                </div>
                            )}
                            {user?.data?.sectionId && (
                                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                                    <span>Section Member</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Action Menu Overlay */}
            {showMobileMenu && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
                    <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300">
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Actions
                            </h3>
                            <button
                                onClick={() => setShowMobileMenu(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Mobile Menu Content */}
                        <div className="p-4 space-y-4">
                            {/* Case 1: User not logged in */}
                            {!isAuthenticated && (
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600">
                                    <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Login to Join
                                    </span>
                                </div>
                            )}

                            {/* Case 2: User is member of THIS college */}
                            {isAuthenticated && isUserPartOfThisCollege && (
                                <div className="space-y-3">
                                    {/* User Status Badge */}
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                        <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                            {user?.data?.role === "hod"
                                                ? "HOD"
                                                : user?.data?.role ===
                                                  "coordinator"
                                                ? "Coordinator"
                                                : user?.data?.role === "student"
                                                ? "Student"
                                                : "Manager"}
                                        </span>
                                    </div>

                                    {/* Create Branch Button for HOD */}
                                    {canCreateBranch && (
                                        <button
                                            onClick={() => {
                                                setShowCreateBranchModal(true);
                                                setShowMobileMenu(false);
                                            }}
                                            className="w-full group p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
                                            <PlusCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                            <span>Create Branch</span>
                                        </button>
                                    )}

                                    {/* Create Section Button for Coordinator */}
                                    {canCreateSection && (
                                        <button
                                            onClick={() => {
                                                setShowCreateSectionModal(true);
                                                setShowMobileMenu(false);
                                            }}
                                            className="w-full group p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
                                            <PlusCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                            <span>Create Section</span>
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Case 3: User has joined DIFFERENT college */}
                            {isAuthenticated &&
                                hasCollegeAssociation &&
                                !isUserPartOfThisCollege && (
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-800">
                                        <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                        <div>
                                            <span className="text-sm font-medium text-orange-700 dark:text-orange-300 block">
                                                Different College
                                            </span>
                                            <span className="text-xs text-orange-600 dark:text-orange-400">
                                                You're already part of another
                                                college
                                            </span>
                                        </div>
                                    </div>
                                )}

                            {/* Case 4: User can join */}
                            {isAuthenticated &&
                                !hasCollegeAssociation &&
                                joinOption && (
                                    <button
                                        onClick={() => {
                                            setShowJoinModal(true);
                                            setShowMobileMenu(false);
                                        }}
                                        className="w-full group p-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
                                        <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                        <div className="text-left">
                                            <span className="block">
                                                {joinOption.label}
                                            </span>
                                            <span className="text-xs opacity-90">
                                                {joinOption.description}
                                            </span>
                                        </div>
                                    </button>
                                )}

                            {/* Updated Mobile Recruiter Report Button */}
                            {isAuthenticated &&
                                user?.data?.role === "recruiter" && (
                                    <button
                                        onClick={() => {
                                            handleGenerateReport();
                                            setShowMobileMenu(false);
                                        }}
                                        disabled={
                                            generateRecruiterReportMutation.isLoading
                                        }
                                        className="w-full p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-yellow-500 disabled:hover:to-orange-500 transition-all duration-200 flex items-center justify-center gap-3">
                                        {generateRecruiterReportMutation.isLoading ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>
                                                    Generating AI Report...
                                                </span>
                                            </>
                                        ) : (
                                            <span>Generate AI Report</span>
                                        )}
                                    </button>
                                )}

                            {/* Case 5: Invalid role */}
                            {isAuthenticated &&
                                !hasCollegeAssociation &&
                                !joinOption && (
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border border-red-200 dark:border-red-800">
                                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                        <div>
                                            <span className="text-sm font-medium text-red-700 dark:text-red-300 block">
                                                Invalid Role
                                            </span>
                                            <span className="text-xs text-red-600 dark:text-red-400">
                                                {user?.data?.role || "Unknown"}{" "}
                                                cannot join colleges
                                            </span>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}

            {/* Rest of the modals remain the same... */}
            {/* Mobile-Optimized Join Modal */}
            {showJoinModal && joinOption && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                Join {college.name}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowJoinModal(false);
                                    setJoinCode("");
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div className="text-center">
                                <div
                                    className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${joinOption.gradient} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                                    <joinOption.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    {joinOption.label}
                                </h4>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    {joinOption.description}
                                </p>
                                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                                    Your role:{" "}
                                    <span className="font-semibold capitalize">
                                        {user?.data?.role}
                                    </span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {user?.data?.role === "hod" &&
                                        "You'll join as Head of Department"}
                                    {user?.data?.role === "coordinator" &&
                                        "You'll join a specific branch"}
                                    {user?.data?.role === "student" &&
                                        "You'll join a specific section"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {joinOption.type === "college"
                                        ? "College Join Code"
                                        : joinOption.type === "branch"
                                        ? "Branch Join Code"
                                        : "Section Join Code"}
                                </label>
                                <input
                                    type="text"
                                    value={joinCode}
                                    onChange={(e) =>
                                        setJoinCode(e.target.value)
                                    }
                                    placeholder={`Enter ${joinOption.type} join code...`}
                                    className="w-full px-3 py-3 sm:px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowJoinModal(false);
                                        setJoinCode("");
                                    }}
                                    className="flex-1 px-3 py-3 sm:px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleJoin}
                                    disabled={!joinCode.trim() || isJoining}
                                    className="flex-1 px-3 py-3 sm:px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                                    {isJoining ? "Joining..." : "Join Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile-Optimized Create Branch Modal */}
            {showCreateBranchModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                Create New Branch
                            </h3>
                            <button
                                onClick={() => {
                                    setShowCreateBranchModal(false);
                                    setBranchName("");
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                    <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    Create Branch
                                </h4>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    As HOD, you can create a new branch for{" "}
                                    {college.name}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Branch Name
                                </label>
                                <input
                                    type="text"
                                    value={branchName}
                                    onChange={(e) =>
                                        setBranchName(e.target.value)
                                    }
                                    placeholder="Enter branch name (e.g., Computer Science)"
                                    className="w-full px-3 py-3 sm:px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowCreateBranchModal(false);
                                        setBranchName("");
                                    }}
                                    className="flex-1 px-3 py-3 sm:px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateBranch}
                                    disabled={
                                        !branchName.trim() || isCreatingBranch
                                    }
                                    className="flex-1 px-3 py-3 sm:px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm sm:text-base font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                                    {isCreatingBranch
                                        ? "Creating..."
                                        : "Create Branch"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile-Optimized Create Section Modal */}
            {showCreateSectionModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                Create New Section
                            </h3>
                            <button
                                onClick={() => {
                                    setShowCreateSectionModal(false);
                                    setSectionName("");
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                    <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    Create Section
                                </h4>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    As Coordinator, you can create a new section
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Section Name
                                </label>
                                <input
                                    type="text"
                                    value={sectionName}
                                    onChange={(e) =>
                                        setSectionName(e.target.value)
                                    }
                                    placeholder="Enter section name (e.g., CSE A, CSE B)"
                                    className="w-full px-3 py-3 sm:px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowCreateSectionModal(false);
                                        setSectionName("");
                                    }}
                                    className="flex-1 px-3 py-3 sm:px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateSection}
                                    disabled={
                                        !sectionName.trim() || isCreatingSection
                                    }
                                    className="flex-1 px-3 py-3 sm:px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm sm:text-base font-medium rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                                    {isCreatingSection
                                        ? "Creating..."
                                        : "Create Section"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile-First Main Content */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                {/* Mobile: Stacked Layout, Desktop: Side-by-side */}
                <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Sidebar - Mobile: Full width card, Desktop: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 lg:bg-transparent lg:border-0 lg:backdrop-blur-0">
                            <CollegeSidebar
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                college={college}
                                stats={stats}
                                user={isAuthenticated ? user?.data : null}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === "dashboard" && (
                            <CollegeDashboard
                                college={college}
                                stats={stats}
                                user={isAuthenticated ? user?.data : null}
                            />
                        )}
                        {activeTab === "leaderboard" && (
                            <CollegeLeaderboard
                                college={college}
                                collegeId={collegeId}
                                user={isAuthenticated ? user?.data : null}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
