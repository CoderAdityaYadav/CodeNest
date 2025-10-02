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
    Shield,
    Building2,
    BarChart3,
    Target,
    Calendar,
    UserCheck,
    Zap,
    AlertCircle,
    Layers,
    GraduationCap,
    FileText,
    Sparkles,
    Loader2,
} from "lucide-react";
import { useGetSectionStatsById } from "../hooks/section.hooks";
import { useAuthUser } from "../hooks/auth.hooks";
import {
    usePostStudentReport,
    usePostCoordinatorReport,
} from "../hooks/report.hooks";
import Loading from "../components/Loading.jsx";
import toast from "react-hot-toast";

export default function SectionPage() {
    const { sectionId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    // Get section data
    const {
        data: sectionResponse,
        isLoading: sectionLoading,
        error: sectionError,
    } = useGetSectionStatsById(sectionId);

    // Get user data
    const {
        data: userResponse,
        isLoading: userLoading,
        error: userError,
    } = useAuthUser();

    // Report generation hooks
    const studentReportMutation = usePostStudentReport();
    const coordinatorReportMutation = usePostCoordinatorReport();

    const user = userResponse?.data;
    const sectionData = sectionResponse?.data;
    const isLoading = sectionLoading || userLoading;

    // Check if user is authenticated
    const isAuthenticated = user && !userError;

    // Handler functions for report generation
    const handleGenerateStudentReport = async () => {
        try {
            await studentReportMutation.mutateAsync();
        } catch (error) {
            console.error("Student report generation failed:", error);
        }
    };

    const handleGenerateCoordinatorReport = async () => {
        try {
            await coordinatorReportMutation.mutateAsync();
        } catch (error) {
            console.error("Coordinator report generation failed:", error);
        }
    };

    // Determine if user can generate reports
    const canGenerateReport =
        user && (user.role === "student" || user.role === "coordinator");
    const isGeneratingReport =
        studentReportMutation.isPending || coordinatorReportMutation.isPending;

    if (isLoading) {
        return (
            <Loading
                context="section"
                duration={3000}
                showProgress={true}
                customMessage="Loading section analytics..."
            />
        );
    }

    if (sectionError || !sectionData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Section Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {sectionError?.message ||
                            "Unable to load section information"}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const { sectionInfo, counts, stats } = sectionData;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Header */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-b border-white/20 dark:border-slate-700/50 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-3 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl transition-all duration-200 backdrop-blur-sm">
                                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur opacity-20"></div>
                                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        <GraduationCap className="h-8 w-8" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                        {sectionInfo.sectionName}
                                    </h1>
                                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Coordinator:{" "}
                                        {sectionInfo.coordinatorName}
                                    </p>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4 mt-1">
                                        <div className="flex items-center gap-1">
                                            <Layers className="h-4 w-4" />
                                            Branch: {sectionInfo.branchName}
                                        </div>
                                        <span className="text-gray-400">•</span>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {counts.totalStudents} students
                                        </div>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-green-600 dark:text-green-400">
                                            {counts.activePercentage}% active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - AI Report Button and Tab Navigation */}
                        <div className="flex items-center gap-4">
                            {/* AI Report Generation Button */}
                            {canGenerateReport && (
                                <div className="flex items-center gap-2">
                                    {user.role === "student" && (
                                        <button
                                            onClick={
                                                handleGenerateStudentReport
                                            }
                                            disabled={isGeneratingReport}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:hover:shadow-lg">
                                            {studentReportMutation.isPending ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span className="hidden sm:inline">
                                                        Generating Report...
                                                    </span>
                                                    <span className="sm:hidden">
                                                        Generating...
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="h-4 w-4" />
                                                    <span className="hidden sm:inline">
                                                        Generate AI Report
                                                    </span>
                                                    <span className="sm:hidden">
                                                        AI Report
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    )}

                                    {user.role === "coordinator" && (
                                        <button
                                            onClick={
                                                handleGenerateCoordinatorReport
                                            }
                                            disabled={isGeneratingReport}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:hover:shadow-lg">
                                            {coordinatorReportMutation.isPending ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span className="hidden sm:inline">
                                                        Generating Section
                                                        Report...
                                                    </span>
                                                    <span className="sm:hidden">
                                                        Generating...
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <FileText className="h-4 w-4" />
                                                    <span className="hidden sm:inline">
                                                        Generate Section Report
                                                    </span>
                                                    <span className="sm:hidden">
                                                        Section Report
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Tab Navigation */}
                            <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-700/60 rounded-xl p-1 backdrop-blur-sm">
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
                                <button
                                    onClick={() => setActiveTab("analytics")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        activeTab === "analytics"
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-600/50"
                                    }`}>
                                    Analytics
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Report Generation Info Card - Show when generating */}
                {isGeneratingReport && (
                    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                <Loader2 className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                    {user.role === "student"
                                        ? "Generating Your Performance Report"
                                        : "Generating Section Report"}
                                </h3>
                                <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                                    Our AI is analyzing the data and creating a
                                    comprehensive report. This may take a few
                                    moments...
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                                    <Sparkles className="h-3 w-3" />
                                    <span>
                                        The report will be available in your
                                        profile section once completed
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="mt-4">
                            <div className="bg-blue-200 dark:bg-blue-800 rounded-full h-2 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Total Students */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Section Students
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {counts.totalStudents}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                        {counts.activePercentage}% active
                                    </span>
                                    <div className="flex-1 bg-green-100 dark:bg-green-900/30 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${counts.activePercentage}%`,
                                            }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Average Score */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Section Average
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {stats.average.avgScore.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                                        <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                    Total Score:{" "}
                                    {stats.total.avgScore.toLocaleString()}
                                </div>
                            </div>

                            {/* Total Problems Solved */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Problems Solved
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {stats.total.leetcode.easy +
                                                stats.total.leetcode.medium +
                                                stats.total.leetcode.hard +
                                                stats.total.gfg}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                        <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                    LeetCode + GFG combined
                                </div>
                            </div>

                            {/* GitHub Projects */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            GitHub Projects
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {stats.total.github}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-gray-100 dark:bg-gray-900/30 rounded-xl">
                                        <Github className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                    Avg: {stats.average.github} per student
                                </div>
                            </div>
                        </div>

                        {/* Section Information Card */}
                        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Building2 className="h-6 w-6 text-blue-500" />
                                Section Hierarchy
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Building2 className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                        College
                                    </h4>
                                    <p className="text-sm text-blue-600 dark:text-blue-400">
                                        ID: {sectionInfo.collegeId}
                                    </p>
                                </div>

                                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <BookOpen className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                        {sectionInfo.branchName}
                                    </h4>
                                    <p className="text-sm text-purple-600 dark:text-purple-400">
                                        Branch
                                    </p>
                                </div>

                                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <GraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                        {sectionInfo.sectionName}
                                    </h4>
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                        Current Section
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Top Performers */}
                        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Award className="h-6 w-6 text-yellow-500" />
                                Top Section Performers
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {stats.topStudents.map((student, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
                                        {/* Rank */}
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                                                index === 0
                                                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                                                    : index === 1
                                                    ? "bg-gradient-to-br from-gray-400 to-gray-600"
                                                    : "bg-gradient-to-br from-orange-400 to-orange-600"
                                            }`}>
                                            {index + 1}
                                        </div>

                                        {/* Student Info */}
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                                                {student.name}
                                            </h4>
                                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                                                Score:{" "}
                                                {student.score.toLocaleString()}
                                            </p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded">
                                                    LC: @
                                                    {student.handles.leetcode}
                                                </span>
                                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 rounded">
                                                    GH: @
                                                    {student.handles.github}
                                                </span>
                                                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                                                    GFG: @{student.handles.gfg}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "students" && (
                    <div className="space-y-8">
                        {/* Students Table */}
                        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Users className="h-6 w-6 text-blue-500" />
                                    {sectionInfo.sectionName} Students (
                                    {counts.totalStudents})
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                        <UserCheck className="h-4 w-4" />
                                        {counts.activeStudents} active
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Activity className="h-4 w-4" />
                                        {counts.activePercentage}% participation
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Students Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                Rank
                                            </th>
                                            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                Student Name
                                            </th>
                                            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                Score
                                            </th>
                                            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                LeetCode
                                            </th>
                                            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                GitHub
                                            </th>
                                            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                GFG
                                            </th>
                                            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                Status
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
                                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
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
                                                        <div className="font-semibold text-gray-900 dark:text-white text-lg">
                                                            {student.name}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                                                            {student.score.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Code className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                            <span className="text-orange-600 dark:text-orange-400 font-medium">
                                                                @
                                                                {
                                                                    student
                                                                        .handles
                                                                        .leetcode
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Github className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                                                                @
                                                                {
                                                                    student
                                                                        .handles
                                                                        .github
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                            <span className="text-green-600 dark:text-green-400 font-medium">
                                                                @
                                                                {
                                                                    student
                                                                        .handles
                                                                        .gfg
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                                            Active
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

                {activeTab === "analytics" && (
                    <div className="space-y-8">
                        {/* Detailed Platform Analytics */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* LeetCode Analytics */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Code className="h-6 w-6 text-orange-500" />
                                    LeetCode Performance
                                </h3>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                                {stats.total.leetcode.easy}
                                            </div>
                                            <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                                                Easy Problems
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Avg:{" "}
                                                {stats.average.leetcode.easy}
                                            </div>
                                        </div>

                                        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                                                {stats.total.leetcode.medium}
                                            </div>
                                            <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                                                Medium Problems
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Avg:{" "}
                                                {stats.average.leetcode.medium}
                                            </div>
                                        </div>

                                        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                                                {stats.total.leetcode.hard}
                                            </div>
                                            <div className="text-sm text-red-600 dark:text-red-400 font-medium">
                                                Hard Problems
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Avg:{" "}
                                                {stats.average.leetcode.hard}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-orange-700 dark:text-orange-300">
                                                Total LeetCode
                                            </span>
                                            <span className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                                                {stats.total.leetcode.easy +
                                                    stats.total.leetcode
                                                        .medium +
                                                    stats.total.leetcode.hard}
                                            </span>
                                        </div>
                                        <div className="text-sm text-orange-600 dark:text-orange-400">
                                            Section average per student:{" "}
                                            {Math.round(
                                                (stats.total.leetcode.easy +
                                                    stats.total.leetcode
                                                        .medium +
                                                    stats.total.leetcode.hard) /
                                                    counts.totalStudents
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other Platforms Analytics */}
                            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <BarChart3 className="h-6 w-6 text-blue-500" />
                                    Other Platforms
                                </h3>

                                <div className="space-y-6">
                                    {/* GeeksforGeeks */}
                                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                                                <h4 className="font-semibold text-green-700 dark:text-green-300">
                                                    GeeksforGeeks
                                                </h4>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                                    {stats.total.gfg}
                                                </div>
                                                <div className="text-sm text-green-600 dark:text-green-400">
                                                    Total Problems
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-green-600 dark:text-green-400">
                                            Average per student:{" "}
                                            {stats.average.gfg} problems
                                        </div>
                                    </div>

                                    {/* GitHub */}
                                    <div className="p-6 bg-gray-50 dark:bg-gray-900/20 rounded-xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Github className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                                <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                                                    GitHub
                                                </h4>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                                    {stats.total.github}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    Total Repositories
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Average per student:{" "}
                                            {stats.average.github} repos
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Performance Summary */}
                        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Target className="h-6 w-6 text-purple-500" />
                                Section Performance Summary
                            </h3>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {counts.activePercentage}%
                                    </div>
                                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                        Active Students
                                    </div>
                                </div>

                                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                        {Math.round(stats.average.avgScore)}
                                    </div>
                                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                                        Avg Score
                                    </div>
                                </div>

                                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                        {Math.round(
                                            (stats.total.leetcode.easy +
                                                stats.total.leetcode.medium +
                                                stats.total.leetcode.hard +
                                                stats.total.gfg) /
                                                counts.totalStudents
                                        )}
                                    </div>
                                    <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                                        Avg Problems
                                    </div>
                                </div>

                                <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl">
                                    <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                                        {stats.average.github}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Avg Repos
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
