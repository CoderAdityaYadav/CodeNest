import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Users,
    Trophy,
    Code,
    BookOpen,
    Activity,
    TrendingUp,
    Award,
    Github,
    ExternalLink,
    Crown,
    Building2,
    BarChart3,
    Target,
    Calendar,
    UserCheck,
    Zap,
    AlertCircle,
    Menu,
    X,
} from "lucide-react";
import { useGetBranchStatsById } from "../hooks/branch.hooks";
import { useAuthUser } from "../hooks/auth.hooks";
import Loading from "../components/Loading.jsx";
import toast from "react-hot-toast";

export default function BranchPage() {
    const { branchId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Get branch data
    const {
        data: branchResponse,
        isLoading: branchLoading,
        error: branchError,
    } = useGetBranchStatsById(branchId);

    // Get user data
    const {
        data: userResponse,
        isLoading: userLoading,
        error: userError,
    } = useAuthUser();

    const user = userResponse?.data;
    const branchData = branchResponse?.data;
    const isLoading = branchLoading || userLoading;

    if (isLoading) {
        return (
            <Loading
                context="branch"
                duration={3000}
                showProgress={true}
                customMessage="Loading branch analytics..."
            />
        );
    }

    if (branchError || !branchData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
                <div className="text-center max-w-md mx-auto p-6 sm:p-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Branch Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
                        {branchError?.message ||
                            "Unable to load branch information"}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const { branchInfo, counts, stats } = branchData;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Mobile-Optimized Header */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-b border-white/20 dark:border-slate-700/50 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Mobile Header Layout */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 sm:p-3 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl transition-all duration-200 backdrop-blur-sm flex-shrink-0">
                                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
                            </button>

                            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl sm:rounded-2xl blur opacity-20"></div>
                                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-2xl shadow-lg">
                                        <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
                                        {branchInfo.branchName}
                                    </h1>
                                    <p className="text-sm sm:text-lg font-medium text-purple-600 dark:text-purple-400 flex items-center gap-2 truncate">
                                        <Crown className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                        HOD: {branchInfo.hodName}
                                    </p>
                                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                                        <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                        <span>
                                            {counts.totalStudents} students
                                        </span>
                                        <span className="text-gray-400 hidden sm:inline">
                                            •
                                        </span>
                                        <span className="text-green-600 dark:text-green-400 hidden sm:inline">
                                            {counts.activePercentage}% active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Tab Navigation */}
                        <div className="lg:hidden">
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="p-2 bg-white/60 dark:bg-slate-700/60 rounded-xl backdrop-blur-sm">
                                {mobileMenuOpen ? (
                                    <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                ) : (
                                    <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                )}
                            </button>
                        </div>

                        {/* Desktop Tab Navigation */}
                        <div className="hidden lg:flex items-center gap-2 bg-white/60 dark:bg-slate-700/60 rounded-xl p-1 backdrop-blur-sm">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    activeTab === "overview"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-600/50"
                                }`}>
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("students")}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    activeTab === "students"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-600/50"
                                }`}>
                                Students
                            </button>
                        </div>
                    </div>

                    {/* Mobile Tab Menu */}
                    {mobileMenuOpen && (
                        <div className="mt-4 lg:hidden">
                            <div className="flex gap-2 bg-white/60 dark:bg-slate-700/60 rounded-xl p-1 backdrop-blur-sm">
                                <button
                                    onClick={() => {
                                        setActiveTab("overview");
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                                        activeTab === "overview"
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-600/50"
                                    }`}>
                                    Overview
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab("students");
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                                        activeTab === "students"
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-600/50"
                                    }`}>
                                    Students
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {activeTab === "overview" && (
                    <div className="space-y-6 sm:space-y-8">
                        {/* Mobile-Optimized Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                            {/* Total Students */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="mb-3 sm:mb-0">
                                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Total Students
                                        </p>
                                        <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                            {counts.totalStudents}
                                        </p>
                                    </div>
                                    <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg sm:rounded-xl self-start sm:self-auto">
                                        <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <div className="mt-3 sm:mt-4 flex items-center gap-2">
                                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                        {counts.activePercentage}% active
                                    </span>
                                    <div className="flex-1 bg-green-100 dark:bg-green-900/30 rounded-full h-1.5 sm:h-2">
                                        <div
                                            className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${counts.activePercentage}%`,
                                            }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Average Score */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="mb-3 sm:mb-0">
                                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Average Score
                                        </p>
                                        <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                            {stats.average.avgScore.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg sm:rounded-xl self-start sm:self-auto">
                                        <Trophy className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Total LeetCode */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="mb-3 sm:mb-0">
                                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                            LeetCode Solved
                                        </p>
                                        <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                            {stats.total.leetcode.easy +
                                                stats.total.leetcode.medium +
                                                stats.total.leetcode.hard}
                                        </p>
                                    </div>
                                    <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg sm:rounded-xl self-start sm:self-auto">
                                        <Code className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                    Avg:{" "}
                                    {stats.average.leetcode.easy +
                                        stats.average.leetcode.medium +
                                        stats.average.leetcode.hard}{" "}
                                    per student
                                </div>
                            </div>

                            {/* Total GitHub Repos */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="mb-3 sm:mb-0">
                                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                            GitHub Repos
                                        </p>
                                        <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                            {stats.total.github}
                                        </p>
                                    </div>
                                    <div className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-900/30 rounded-lg sm:rounded-xl self-start sm:self-auto">
                                        <Github className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                    Avg: {stats.average.github} per student
                                </div>
                            </div>
                        </div>

                        {/* Mobile-Optimized Detailed Statistics */}
                        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                            {/* Coding Platform Breakdown */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 sm:p-8">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                                    Platform Statistics
                                </h3>

                                {/* LeetCode Stats */}
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-orange-700 dark:text-orange-300 text-sm sm:text-base">
                                                LeetCode Problems
                                            </h4>
                                            <span className="text-xs sm:text-sm text-orange-600 dark:text-orange-400">
                                                Total:{" "}
                                                {stats.total.leetcode.easy +
                                                    stats.total.leetcode
                                                        .medium +
                                                    stats.total.leetcode.hard}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                            <div className="text-center p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                <div className="text-sm sm:text-lg font-bold text-green-700 dark:text-green-300">
                                                    {stats.total.leetcode.easy}
                                                </div>
                                                <div className="text-xs text-green-600 dark:text-green-400">
                                                    Easy
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Avg:{" "}
                                                    {
                                                        stats.average.leetcode
                                                            .easy
                                                    }
                                                </div>
                                            </div>
                                            <div className="text-center p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                                <div className="text-sm sm:text-lg font-bold text-yellow-700 dark:text-yellow-300">
                                                    {
                                                        stats.total.leetcode
                                                            .medium
                                                    }
                                                </div>
                                                <div className="text-xs text-yellow-600 dark:text-yellow-400">
                                                    Medium
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Avg:{" "}
                                                    {
                                                        stats.average.leetcode
                                                            .medium
                                                    }
                                                </div>
                                            </div>
                                            <div className="text-center p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                                <div className="text-sm sm:text-lg font-bold text-red-700 dark:text-red-300">
                                                    {stats.total.leetcode.hard}
                                                </div>
                                                <div className="text-xs text-red-600 dark:text-red-400">
                                                    Hard
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Avg:{" "}
                                                    {
                                                        stats.average.leetcode
                                                            .hard
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* GeeksforGeeks Stats */}
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-green-700 dark:text-green-300 text-sm sm:text-base">
                                                GeeksforGeeks
                                            </h4>
                                            <div className="text-center">
                                                <div className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
                                                    {stats.total.gfg}
                                                </div>
                                                <div className="text-xs text-green-600 dark:text-green-400">
                                                    Total Problems
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Avg: {stats.average.gfg}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Students */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 sm:p-8">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                                    Top Performers
                                </h3>

                                <div className="space-y-3 sm:space-y-4">
                                    {stats.topStudents.map((student, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl">
                                            {/* Rank */}
                                            <div
                                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                                                    index === 0
                                                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                                                        : index === 1
                                                        ? "bg-gradient-to-br from-gray-400 to-gray-600"
                                                        : "bg-gradient-to-br from-orange-400 to-orange-600"
                                                }`}>
                                                {index + 1}
                                            </div>

                                            {/* Student Info */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                                                    {student.name}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                    Score:{" "}
                                                    {student.score.toLocaleString()}
                                                </p>
                                            </div>

                                            {/* Social Links - Mobile Optimized */}
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                {student.handles.leetcode && (
                                                    <div className="p-1.5 sm:p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                                        <Code className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 dark:text-orange-400" />
                                                    </div>
                                                )}
                                                {student.handles.github && (
                                                    <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-900/30 rounded-lg">
                                                        <Github className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                                                    </div>
                                                )}
                                                {student.handles.gfg && (
                                                    <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                        <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "students" && (
                    <div className="space-y-6 sm:space-y-8">
                        {/* Student List */}
                        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-4 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                                    Branch Students ({counts.totalStudents})
                                </h3>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    <UserCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                                    {counts.activeStudents} active students
                                </div>
                            </div>

                            {/* Mobile-Optimized Students Table */}
                            <div className="block sm:hidden space-y-3">
                                {stats.topStudents.map((student, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                                    index === 0
                                                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                                                        : index === 1
                                                        ? "bg-gradient-to-br from-gray-400 to-gray-600"
                                                        : "bg-gradient-to-br from-orange-400 to-orange-600"
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                                    {student.name}
                                                </h4>
                                                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                                    Score:{" "}
                                                    {student.score.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-xs">
                                            <div className="text-center p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                                <div className="text-orange-600 dark:text-orange-400 font-medium">
                                                    @{student.handles.leetcode}
                                                </div>
                                                <div className="text-gray-500">
                                                    LeetCode
                                                </div>
                                            </div>
                                            <div className="text-center p-2 bg-gray-100 dark:bg-gray-900/30 rounded-lg">
                                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                                    @{student.handles.github}
                                                </div>
                                                <div className="text-gray-500">
                                                    GitHub
                                                </div>
                                            </div>
                                            <div className="text-center p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                <div className="text-green-600 dark:text-green-400 font-medium">
                                                    @{student.handles.gfg}
                                                </div>
                                                <div className="text-gray-500">
                                                    GFG
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Students Table */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                                Rank
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                                Student
                                            </th>
                                            <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                                Score
                                            </th>
                                            <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                                LeetCode
                                            </th>
                                            <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                                GitHub
                                            </th>
                                            <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                                GFG
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.topStudents.map(
                                            (student, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                                                index === 0
                                                                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                                                                    : index ===
                                                                      1
                                                                    ? "bg-gradient-to-br from-gray-400 to-gray-600"
                                                                    : "bg-gradient-to-br from-orange-400 to-orange-600"
                                                            }`}>
                                                            {index + 1}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                            {student.name}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className="font-bold text-blue-600 dark:text-blue-400">
                                                            {student.score.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className="text-orange-600 dark:text-orange-400 font-medium">
                                                            @
                                                            {
                                                                student.handles
                                                                    .leetcode
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                                                            @
                                                            {
                                                                student.handles
                                                                    .github
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className="text-green-600 dark:text-green-400 font-medium">
                                                            @
                                                            {
                                                                student.handles
                                                                    .gfg
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
