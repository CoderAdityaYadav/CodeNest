import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
    ArrowLeft,
    User,
    Mail,
    Calendar,
    Award,
    Code,
    Copy,
    Check,
    Edit3,
    Building2,
    Users,
    BookOpen,
    Trophy,
    Github,
    ExternalLink,
    Shield,
    Crown,
    UserCheck,
    MapPin,
    Phone,
    Globe,
    Settings,
    FileText,
    BarChart3,
    Clock,
    TrendingUp,
    AlertCircle,
    Download,
    Eye,
    Menu,
    X,
    ChevronRight,
    Star,
} from "lucide-react";
import { useAuthUser } from "../hooks/auth.hooks";
import { useGetJoinCodeUser } from "../hooks/user.hooks";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { useGetUserReport } from "../hooks/report.hooks";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [copiedCode, setCopiedCode] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // Get user data
    const {
        data: userResponse,
        isLoading: userLoading,
        error: userError,
    } = useAuthUser();
    const user = userResponse?.data;

    // Get join code data
    const {
        data: joinCodeResponse,
        isLoading: joinCodeLoading,
        error: joinCodeError,
    } = useGetJoinCodeUser(user?.collegeId);
    const joinCodeData = joinCodeResponse?.data;

    // Get user report data
    const {
        data: reportResponse,
        isLoading: reportLoading,
        error: reportError,
        refetch: refetchReport,
    } = useGetUserReport();
    const reportData = reportResponse?.data;

    const isLoading = userLoading || joinCodeLoading;

    // Copy join code to clipboard
    const handleCopyJoinCode = async () => {
        if (!joinCodeData?.joinCode) return;
        try {
            await navigator.clipboard.writeText(joinCodeData.joinCode);
            setCopiedCode(true);
            toast.success("Join code copied!");
            setTimeout(() => setCopiedCode(false), 2000);
        } catch (error) {
            toast.error("Failed to copy");
        }
    };

    // Copy text to clipboard
    const handleCopyText = async (text, successMessage = "Copied!") => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(successMessage);
        } catch (error) {
            toast.error("Failed to copy");
        }
    };

    // Open report modal
    const handleViewReport = (report) => {
        setSelectedReport(report);
        setShowReportModal(true);
    };

    // Get role badge configuration
    const getRoleBadge = (role) => {
        switch (role?.toLowerCase()) {
            case "hod":
                return {
                    icon: Crown,
                    label: "Head of Department",
                    gradient: "from-purple-500 to-indigo-600",
                    bg: "bg-purple-500",
                    text: "text-white",
                };
            case "coordinator":
                return {
                    icon: Shield,
                    label: "Coordinator",
                    gradient: "from-blue-500 to-cyan-600",
                    bg: "bg-blue-500",
                    text: "text-white",
                };
            case "student":
                return {
                    icon: UserCheck,
                    label: "Student",
                    gradient: "from-green-500 to-emerald-600",
                    bg: "bg-green-500",
                    text: "text-white",
                };
            case "recruiter":
                return {
                    icon: BarChart3,
                    label: "Recruiter",
                    gradient: "from-yellow-500 to-orange-600",
                    bg: "bg-yellow-500",
                    text: "text-white",
                };
            default:
                return {
                    icon: User,
                    label: "Manager",
                    gradient: "from-gray-500 to-gray-600",
                    bg: "bg-gray-500",
                    text: "text-white",
                };
        }
    };

    if (isLoading) {
        return (
            <Loading
                context="profile"
                duration={2000}
                showProgress={true}
                customMessage="Loading profile data..."
            />
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Please Login
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        You need to login to view your profile
                    </p>
                </div>
            </div>
        );
    }

    const roleBadge = getRoleBadge(user.role);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Mobile-Optimized Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-40">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    <div className="text-center flex-1 mx-4">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            My Profile
                        </h1>
                    </div>

                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Main Content - Mobile First */}
            <div className="px-4 py-6 space-y-6">
                {/* Profile Header Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Profile Cover/Background */}
                    <div
                        className={`h-32 bg-gradient-to-r ${roleBadge.gradient} relative`}>
                        <div className="absolute top-4 right-4">
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                                <Edit3 className="h-4 w-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="px-6 pb-6 -mt-16 relative">
                        {/* Avatar */}
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full p-1 shadow-lg">
                                    <div
                                        className={`w-full h-full bg-gradient-to-r ${roleBadge.gradient} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                                        {user.name?.charAt(0)?.toUpperCase() ||
                                            "U"}
                                    </div>
                                </div>
                                <button className="absolute bottom-0 right-0 p-1.5 bg-blue-500 text-white rounded-full shadow-lg">
                                    <Edit3 className="h-3 w-3" />
                                </button>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {user.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                {user.email}
                            </p>

                            {/* Role Badge */}
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-1.5 ${roleBadge.bg} ${roleBadge.text} rounded-full text-sm font-medium`}>
                                <roleBadge.icon className="h-4 w-4" />
                                {roleBadge.label}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {user.score?.toLocaleString() || 0}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Total Score
                                </div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Member Since
                                </div>
                            </div>
                        </div>

                        {/* Join Code Section */}
                        {joinCodeData && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        {joinCodeData.name} Join Code
                                    </span>
                                    <button
                                        onClick={handleCopyJoinCode}
                                        className="p-1.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors">
                                        {copiedCode ? (
                                            <Check className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        )}
                                    </button>
                                </div>
                                <div className="text-lg font-bold text-blue-900 dark:text-blue-100 font-mono">
                                    {joinCodeData.joinCode}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Coding Statistics */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Coding Stats
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {/* LeetCode */}
                        <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <Code className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        LeetCode
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        E:
                                        {user.stats?.leetcode?.easySolved ||
                                            0}{" "}
                                        M:
                                        {user.stats?.leetcode?.mediumSolved ||
                                            0}{" "}
                                        H:
                                        {user.stats?.leetcode?.hardSolved || 0}
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                {(user.stats?.leetcode?.easySolved || 0) +
                                    (user.stats?.leetcode?.mediumSolved || 0) +
                                    (user.stats?.leetcode?.hardSolved || 0)}
                            </div>
                        </div>

                        {/* GitHub */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                                    <Github className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        GitHub
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {user.stats?.github?.contributions || 0}{" "}
                                        contributions
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                                {user.stats?.github?.repos || 0}
                            </div>
                        </div>

                        {/* GeeksforGeeks */}
                        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <BookOpen className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        GeeksforGeeks
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Score:{" "}
                                        {user.stats?.gfg?.codingScore || 0}
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                {user.stats?.gfg?.solved || 0}
                            </div>
                        </div>
                    </div>
                </div>

                {/* College Information */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Building2 className="h-5 w-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            College Info
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {user.collegeId && (
                            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <Building2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        College Member
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {user.collegeId}
                                    </div>
                                </div>
                            </div>
                        )}

                        {user.branchId && (
                            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <BookOpen className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        Branch Member
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {user.branchId}
                                    </div>
                                </div>
                            </div>
                        )}

                        {user.sectionId && (
                            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <Users className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        Section Member
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {user.sectionId}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!user.collegeId &&
                            !user.branchId &&
                            !user.sectionId && (
                                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm mb-2">
                                        Not associated with any college
                                    </p>
                                    <button
                                        onClick={() => navigate("/colleges")}
                                        className="text-blue-500 text-sm font-medium hover:underline">
                                        Browse Colleges
                                    </button>
                                </div>
                            )}
                    </div>
                </div>

                {/* Reports Section */}
                {reportData && reportData.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    My Reports
                                </h3>
                            </div>
                            <button
                                onClick={() => refetchReport()}
                                className="text-blue-500 text-sm font-medium">
                                Refresh
                            </button>
                        </div>

                        {reportLoading ? (
                            <div className="flex justify-center py-6">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {reportData.map((report, index) => (
                                    <div
                                        key={report._id || index}
                                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                                                {user.role === "student"
                                                    ? "Performance Report"
                                                    : user.role ===
                                                      "coordinator"
                                                    ? "Section Report"
                                                    : user.role === "recruiter"
                                                    ? "College Report"
                                                    : "Report"}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                {new Date(
                                                    report.createdAt ||
                                                        report.last_updated
                                                ).toLocaleDateString()}
                                                {user.role === "student" &&
                                                    report.report?.data
                                                        ?.readiness_score && (
                                                        <span className="ml-2">
                                                            • Score:{" "}
                                                            {
                                                                report.report
                                                                    .data
                                                                    .readiness_score
                                                            }
                                                        </span>
                                                    )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleViewReport(report)
                                            }
                                            className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors ml-3">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Account Details */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <User className="h-5 w-5 text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Account Details
                        </h3>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                                        Email
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <Edit3 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                                        Member Since
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Award className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                                        User ID
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 font-mono truncate">
                                        {user._id}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    handleCopyText(user._id, "User ID copied!")
                                }
                                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex-shrink-0">
                                <Copy className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Modal - Mobile Optimized */}
            {/* Enhanced Report Modal with improved markdown styling */}
            {showReportModal && selectedReport && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white dark:bg-slate-800 w-full sm:max-w-5xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
                        {/* Enhanced Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {user.role === "student"
                                            ? "Performance Report"
                                            : user.role === "coordinator"
                                            ? "Section Report"
                                            : user.role === "recruiter"
                                            ? "College Report"
                                            : "Report"}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Generated on{" "}
                                        {new Date(
                                            selectedReport.createdAt ||
                                                selectedReport.last_updated
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        handleCopyText(
                                            selectedReport.report?.markdown ||
                                                selectedReport.reportMarkdown,
                                            "Report content copied!"
                                        )
                                    }
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    title="Copy Report">
                                    <Copy className="h-4 w-4 text-gray-500" />
                                </button>

                                <button
                                    onClick={() => setShowReportModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Enhanced Content Area */}
                        <div
                            className="overflow-y-auto"
                            style={{ maxHeight: "calc(90vh - 100px)" }}>
                            <div className="p-6">
                                {/* Report Content - Wrapped in styled div instead of using className */}
                                {selectedReport.report?.markdown ||
                                selectedReport.reportMarkdown ? (
                                    <div
                                        className="prose prose-slate dark:prose-invert max-w-none
                                      prose-headings:font-bold prose-headings:tracking-tight
                                      prose-h1:text-2xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-3 prose-h1:mb-6
                                      prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-blue-600 dark:prose-h2:text-blue-400
                                      prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-purple-600 dark:prose-h3:text-purple-400
                                      prose-p:leading-relaxed prose-p:mb-4
                                      prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                                      prose-ul:space-y-2 prose-ol:space-y-2
                                      prose-li:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300
                                      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20
                                      prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:my-4 prose-blockquote:rounded-r-lg
                                      prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                                      prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium
                                      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-700
                                      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                      prose-table:border-collapse prose-table:w-full prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700
                                      prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-700 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
                                      prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:px-4 prose-td:py-2
                                      prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-8">
                                        <ReactMarkdown
                                            components={{
                                                // Custom components for better styling
                                                h1: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <h1
                                                        className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-6"
                                                        {...props}>
                                                        <Trophy className="h-6 w-6 text-yellow-500" />
                                                        {children}
                                                    </h1>
                                                ),
                                                h2: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <h2
                                                        className="flex items-center gap-2 text-xl font-semibold text-blue-600 dark:text-blue-400 mt-8 mb-4"
                                                        {...props}>
                                                        <Star className="h-5 w-5" />
                                                        {children}
                                                    </h2>
                                                ),
                                                h3: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <h3
                                                        className="text-lg font-medium text-purple-600 dark:text-purple-400 mt-6 mb-3"
                                                        {...props}>
                                                        {children}
                                                    </h3>
                                                ),
                                                blockquote: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <blockquote
                                                        className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 my-4 rounded-r-lg italic"
                                                        {...props}>
                                                        <div className="flex items-start gap-2">
                                                            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                            <div>
                                                                {children}
                                                            </div>
                                                        </div>
                                                    </blockquote>
                                                ),
                                                ul: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <ul
                                                        className="space-y-2 my-4 list-disc list-inside"
                                                        {...props}>
                                                        {children}
                                                    </ul>
                                                ),
                                                ol: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <ol
                                                        className="space-y-2 my-4 list-decimal list-inside"
                                                        {...props}>
                                                        {children}
                                                    </ol>
                                                ),
                                                li: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <li
                                                        className="leading-relaxed text-gray-700 dark:text-gray-300"
                                                        {...props}>
                                                        {children}
                                                    </li>
                                                ),
                                                code: ({
                                                    inline,
                                                    children,
                                                    ...props
                                                }) =>
                                                    inline ? (
                                                        <code
                                                            className="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-medium"
                                                            {...props}>
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto border border-gray-700 my-4">
                                                            <code {...props}>
                                                                {children}
                                                            </code>
                                                        </pre>
                                                    ),
                                                table: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <div className="overflow-x-auto my-4">
                                                        <table
                                                            className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                                                            {...props}>
                                                            {children}
                                                        </table>
                                                    </div>
                                                ),
                                                th: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <th
                                                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white"
                                                        {...props}>
                                                        {children}
                                                    </th>
                                                ),
                                                td: ({
                                                    children,
                                                    ...props
                                                }) => (
                                                    <td
                                                        className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300"
                                                        {...props}>
                                                        {children}
                                                    </td>
                                                ),
                                            }}>
                                            {selectedReport.report?.markdown ||
                                                selectedReport.reportMarkdown}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <AlertCircle className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                            No Content Available
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                            This report doesn't contain any
                                            viewable content at the moment.
                                            Please try refreshing or contact
                                            support if this persists.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
