import React from "react";
import {
    BarChart3,
    Trophy,
    Users,
    Building2,
    Calendar,
    Star,
    TrendingUp,
    Code,
    Github,
    Target,
    Activity,
} from "lucide-react";

export default function CollegeSidebar({
    activeTab,
    onTabChange,
    college,
    stats,
}) {
    const sidebarItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: BarChart3,
            description: "Analytics & Overview",
            gradient: "from-blue-600 to-indigo-600",
            bgGradient:
                "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
        },
        {
            id: "leaderboard",
            label: "Leaderboard",
            icon: Trophy,
            description: "Student Rankings",
            gradient: "from-yellow-500 to-orange-600",
            bgGradient:
                "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
        },
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* Navigation Cards */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Navigation
                </h3>

                <div className="space-y-3">
                    {sidebarItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                                    isActive
                                        ? `bg-gradient-to-r ${item.bgGradient} border border-opacity-20 shadow-lg scale-105`
                                        : "hover:bg-white/50 dark:hover:bg-slate-700/50 border border-transparent"
                                }`}>
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`
                                        w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                                        ${
                                            isActive
                                                ? `bg-gradient-to-r ${item.gradient} text-white`
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:scale-110"
                                        }
                                    `}>
                                        <IconComponent className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p
                                            className={`font-semibold transition-colors ${
                                                isActive
                                                    ? "text-blue-700 dark:text-blue-300"
                                                    : "text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                                            }`}>
                                            {item.label}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Quick Stats Card */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Quick Stats
                </h3>

                <div className="space-y-4">
                    {/* Total Students */}
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Students
                            </span>
                        </div>
                        <span className="font-bold text-blue-600">
                            {stats?.counts?.totalStudents || 0}
                        </span>
                    </div>

                    {/* Active Percentage */}
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Active
                            </span>
                        </div>
                        <span className="font-bold text-green-600">
                            {stats?.counts?.activePercentage || 0}%
                        </span>
                    </div>

                    {/* Average Score */}
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Avg Score
                            </span>
                        </div>
                        <span className="font-bold text-purple-600">
                            {stats?.stats?.average?.avgScore?.toLocaleString() ||
                                0}
                        </span>
                    </div>

                    {/* Branches */}
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-orange-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Branches
                            </span>
                        </div>
                        <span className="font-bold text-orange-600">
                            {college?.branches?.length || 0}
                        </span>
                    </div>
                </div>
            </div>

            {/* College Info Card
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Institution Info
                </h3>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Join Code
                        </span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-mono rounded-full border border-blue-200 dark:border-blue-800">
                            {college?.joinCode}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Established
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(college?.createdAt)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Status
                        </span>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-green-600">
                                Active
                            </span>
                        </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span className="text-xs">
                                Last updated: {formatDate(college?.updatedAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Top Performer Preview */}
            {stats?.stats?.topStudents?.length > 0 && (
                <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        Top Performer
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                                {stats.stats.topStudents[0].name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {stats.stats.topStudents[0].name}
                                </p>
                                <p className="text-sm text-yellow-600 font-bold">
                                    {stats.stats.topStudents[0].score.toLocaleString()}{" "}
                                    points
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                                <Code className="h-3 w-3 text-gray-600" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    LeetCode
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Github className="h-3 w-3 text-gray-600" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    GitHub
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
