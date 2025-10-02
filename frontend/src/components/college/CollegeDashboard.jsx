import React, { useMemo } from "react";
import {
    Users,
    TrendingUp,
    Code,
    Github,
    Trophy,
    Target,
    Award,
    Star,
    Activity,
    BarChart3,
    Zap,
    Crown,
    Medal,
    Building2,
    GraduationCap,
} from "lucide-react";

export default function CollegeDashboard({ college, stats }) {
    // Calculate total problems solved
    const totalProblems = useMemo(() => {
        if (!stats?.stats?.total?.leetcode) return 0;
        const { easy, medium, hard } = stats.stats.total.leetcode;
        return easy + medium + hard + (stats.stats.total.gfg || 0);
    }, [stats]);

    // Get difficulty color classes
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "easy":
                return "text-emerald-700 bg-emerald-100/80 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
            case "medium":
                return "text-orange-700 bg-orange-100/80 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800";
            case "hard":
                return "text-red-700 bg-red-100/80 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800";
            default:
                return "text-purple-700 bg-purple-100/80 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800";
        }
    };

    if (!stats) {
        return (
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                <div className="text-center py-12">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        No Data Available
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Statistical information is not available for this
                        college yet.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: "Total Students",
                        value: stats.counts?.totalStudents || 0,
                        icon: Users,
                        gradient: "from-blue-600 to-cyan-600",
                        bgGradient:
                            "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                        iconBg: "from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50",
                        suffix: "",
                    },
                    {
                        title: "Active Students",
                        value: stats.counts?.activeStudents || 0,
                        icon: Activity,
                        gradient: "from-emerald-600 to-green-600",
                        bgGradient:
                            "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
                        iconBg: "from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50",
                        suffix: `(${stats.counts?.activePercentage || 0}%)`,
                    },
                    {
                        title: "Total Problems",
                        value: totalProblems,
                        icon: Code,
                        gradient: "from-purple-600 to-pink-600",
                        bgGradient:
                            "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
                        iconBg: "from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50",
                        suffix: "",
                    },
                    {
                        title: "Average Score",
                        value: Math.round(stats.stats?.average?.avgScore || 0),
                        icon: Target,
                        gradient: "from-orange-600 to-red-600",
                        bgGradient:
                            "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
                        iconBg: "from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50",
                        suffix: " pts",
                    },
                ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`relative overflow-hidden backdrop-blur-xl bg-gradient-to-br ${stat.bgGradient} p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        {stat.title}
                                    </p>
                                    <p
                                        className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                        {stat.value.toLocaleString()}
                                        {stat.suffix}
                                    </p>
                                </div>
                                <div
                                    className={`relative p-4 bg-gradient-to-br ${stat.iconBg} rounded-2xl shadow-lg`}>
                                    <IconComponent
                                        className={`h-8 w-8 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                                    />
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                        </div>
                    );
                })}
            </div>

            {/* Platform Statistics */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* LeetCode Stats */}
                <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Code className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                LeetCode Performance
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Problem solving statistics
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Total Problems */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                            <span className="font-medium text-gray-900 dark:text-white">
                                Total Solved
                            </span>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {(stats.stats?.total?.leetcode?.easy || 0) +
                                    (stats.stats?.total?.leetcode?.medium ||
                                        0) +
                                    (stats.stats?.total?.leetcode?.hard || 0)}
                            </span>
                        </div>

                        {/* Difficulty Breakdown */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    label: "Easy",
                                    value:
                                        stats.stats?.total?.leetcode?.easy || 0,
                                    difficulty: "easy",
                                },
                                {
                                    label: "Medium",
                                    value:
                                        stats.stats?.total?.leetcode?.medium ||
                                        0,
                                    difficulty: "medium",
                                },
                                {
                                    label: "Hard",
                                    value:
                                        stats.stats?.total?.leetcode?.hard || 0,
                                    difficulty: "hard",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg ${getDifficultyColor(
                                        item.difficulty
                                    )}`}>
                                    <div className="text-center">
                                        <div className="font-bold text-lg">
                                            {item.value}
                                        </div>
                                        <div className="text-xs font-medium">
                                            {item.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Average Stats */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                                Average per Student
                            </h4>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="text-center">
                                    <div className="font-bold text-emerald-600">
                                        {stats.stats?.average?.leetcode?.easy ||
                                            0}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        Easy
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-orange-600">
                                        {stats.stats?.average?.leetcode
                                            ?.medium || 0}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        Medium
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-red-600">
                                        {stats.stats?.average?.leetcode?.hard ||
                                            0}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        Hard
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Platforms */}
                <div className="space-y-6">
                    {/* GeeksforGeeks */}
                    <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                <BarChart3 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">
                                    GeeksforGeeks
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Coding practice
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    {stats.stats?.total?.gfg || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Problems
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {stats.stats?.average?.gfg || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Avg per Student
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GitHub */}
                    <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                                <Github className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">
                                    GitHub
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Code repositories
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.stats?.total?.github || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Repositories
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {stats.stats?.average?.github || 0}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Avg per Student
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Students */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Top Performers
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Leading students in your institution
                        </p>
                    </div>
                </div>

                {stats.stats?.topStudents?.length > 0 ? (
                    <div className="space-y-4">
                        {stats.stats.topStudents.map((student, index) => {
                            const getRankIcon = (rank) => {
                                switch (rank) {
                                    case 0:
                                        return Crown;
                                    case 1:
                                        return Medal;
                                    case 2:
                                        return Award;
                                    default:
                                        return Star;
                                }
                            };

                            const getRankColor = (rank) => {
                                switch (rank) {
                                    case 0:
                                        return "from-yellow-400 to-yellow-600 text-white";
                                    case 1:
                                        return "from-gray-300 to-gray-500 text-white";
                                    case 2:
                                        return "from-orange-400 to-orange-600 text-white";
                                    default:
                                        return "from-blue-500 to-blue-600 text-white";
                                }
                            };

                            const RankIcon = getRankIcon(index);

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:shadow-lg transition-all duration-300">
                                    {/* Rank Badge */}
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${getRankColor(
                                            index
                                        )} rounded-full flex items-center justify-center shadow-lg`}>
                                        <RankIcon className="h-6 w-6" />
                                    </div>

                                    {/* Student Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white text-lg">
                                                    {student.name}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Rank #{index + 1} •{" "}
                                                    {student.score.toLocaleString()}{" "}
                                                    points
                                                </p>
                                            </div>
                                        </div>

                                        {/* Platform Handles */}
                                        <div className="flex items-center gap-4 mt-2">
                                            {student.handles?.leetcode && (
                                                <div className="flex items-center gap-1 text-xs">
                                                    <Code className="h-3 w-3 text-orange-600" />
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {
                                                            student.handles
                                                                .leetcode
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                            {student.handles?.github && (
                                                <div className="flex items-center gap-1 text-xs">
                                                    <Github className="h-3 w-3 text-gray-700" />
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {student.handles.github}
                                                    </span>
                                                </div>
                                            )}
                                            {student.handles?.gfg && (
                                                <div className="flex items-center gap-1 text-xs">
                                                    <BarChart3 className="h-3 w-3 text-green-600" />
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {student.handles.gfg}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                            No student data available yet.
                        </p>
                    </div>
                )}
            </div>

            {/* Branches Overview */}
            {Object.keys(stats.branches || {}).length > 0 && (
                <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Branches Overview
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Department-wise performance
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {Object.entries(stats.branches).map(
                            ([branchId, branch]) => (
                                <div
                                    key={branchId}
                                    className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {branch.branchName}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                HOD: {branch.hodName}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-indigo-600">
                                                {branch.stats?.total
                                                    ?.activeStudents || 0}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Active Students
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                                            <div className="font-bold text-blue-600">
                                                {Math.round(
                                                    branch.stats?.average
                                                        ?.avgScore || 0
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                Avg Score
                                            </div>
                                        </div>
                                        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                                            <div className="font-bold text-green-600">
                                                {branch.stats?.average?.gfg ||
                                                    0}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                Avg GFG
                                            </div>
                                        </div>
                                        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                                            <div className="font-bold text-orange-600">
                                                {(branch.stats?.average
                                                    ?.leetcode?.easy || 0) +
                                                    (branch.stats?.average
                                                        ?.leetcode?.medium ||
                                                        0) +
                                                    (branch.stats?.average
                                                        ?.leetcode?.hard || 0)}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                Avg LC
                                            </div>
                                        </div>
                                        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                                            <div className="font-bold text-gray-600">
                                                {branch.stats?.average
                                                    ?.github || 0}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                Avg Repos
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
