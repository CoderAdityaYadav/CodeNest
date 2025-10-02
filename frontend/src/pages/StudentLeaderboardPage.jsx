import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    Trophy,
    Medal,
    Award,
    Crown,
    Users,
    Target,
    Code,
    Github,
    ArrowLeft,
    Search,
    Globe,
    MapPin,
    Building2,
    Filter,
    TrendingUp,
    Star,
    Flame,
    Zap,
    ChevronDown,
    MoreHorizontal,
    Calendar,
    Activity,
} from "lucide-react";
import {
    useIndiaLeaderboard,
    useStateLeaderboard,
    useCityLeaderboard,
} from "../hooks/leaderboard.hooks";

// Indian states list
const INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];

// Major Indian cities
const INDIAN_CITIES = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivali",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Howrah",
    "Ranchi",
    "Gwalior",
    "Jabalpur",
];

export default function StudentLeaderboardPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("india");
    const [selectedState, setSelectedState] = useState("Uttar Pradesh");
    const [selectedCity, setSelectedCity] = useState("Ghaziabad");
    const [citySearchTerm, setCitySearchTerm] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("rank");

    // API calls based on active tab
    const {
        data: indiaData,
        isLoading: indiaLoading,
        error: indiaError,
    } = useIndiaLeaderboard();
    const {
        data: stateData,
        isLoading: stateLoading,
        error: stateError,
    } = useStateLeaderboard(activeTab === "state" ? selectedState : null);
    const {
        data: cityData,
        isLoading: cityLoading,
        error: cityError,
    } = useCityLeaderboard(activeTab === "city" ? selectedCity : null);

    // Get current data based on active tab
    const { data, isLoading, error, currentLocation } = useMemo(() => {
        switch (activeTab) {
            case "state":
                return {
                    data: stateData,
                    isLoading: stateLoading,
                    error: stateError,
                    currentLocation: selectedState,
                };
            case "city":
                return {
                    data: cityData,
                    isLoading: cityLoading,
                    error: cityError,
                    currentLocation: selectedCity,
                };
            default:
                return {
                    data: indiaData,
                    isLoading: indiaLoading,
                    error: indiaError,
                    currentLocation: "India",
                };
        }
    }, [
        activeTab,
        indiaData,
        stateData,
        cityData,
        indiaLoading,
        stateLoading,
        cityLoading,
        indiaError,
        stateError,
        cityError,
        selectedState,
        selectedCity,
    ]);

    const leaderboardData = data?.leaderboard;
    const entries = leaderboardData?.entries || [];

    // Calculate statistics
    const stats = useMemo(() => {
        if (!entries.length)
            return {
                totalStudents: 0,
                averageScore: 0,
                totalProblems: 0,
                totalRepos: 0,
            };

        const totalStudents = entries.length;
        const averageScore = Math.round(
            entries.reduce((sum, entry) => sum + entry.score, 0) / totalStudents
        );
        const totalProblems = entries.reduce(
            (sum, entry) =>
                sum +
                entry.easySolved +
                entry.mediumSolved +
                entry.hardSolved +
                entry.gfgSolved,
            0
        );
        const totalRepos = entries.reduce(
            (sum, entry) => sum + entry.githubRepos,
            0
        );

        return { totalStudents, averageScore, totalProblems, totalRepos };
    }, [entries]);

    // Filter cities based on search
    const filteredCities = useMemo(() => {
        if (!citySearchTerm) return INDIAN_CITIES;
        return INDIAN_CITIES.filter((city) =>
            city.toLowerCase().includes(citySearchTerm.toLowerCase())
        );
    }, [citySearchTerm]);

    // Filter and sort entries
    const filteredAndSortedData = useMemo(() => {
        if (!entries.length) return [];

        let filtered = [...entries];

        if (searchTerm) {
            filtered = filtered.filter((entry) =>
                entry.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "score":
                    return b.score - a.score;
                case "problems":
                    const aProblems =
                        a.easySolved +
                        a.mediumSolved +
                        a.hardSolved +
                        a.gfgSolved;
                    const bProblems =
                        b.easySolved +
                        b.mediumSolved +
                        b.hardSolved +
                        b.gfgSolved;
                    return bProblems - aProblems;
                default:
                    return a.rank - b.rank;
            }
        });

        return filtered;
    }, [entries, searchTerm, sortBy]);

    const getTabIcon = (tab) => {
        switch (tab) {
            case "state":
                return MapPin;
            case "city":
                return Building2;
            default:
                return Globe;
        }
    };

    const getTabTitle = () => {
        switch (activeTab) {
            case "state":
                return `${selectedState}`;
            case "city":
                return `${selectedCity}`;
            default:
                return "India";
        }
    };

    const getTabSubtitle = () => {
        switch (activeTab) {
            case "state":
                return "State Championship";
            case "city":
                return "City Masters";
            default:
                return "National Championship";
        }
    };

    const getRankBadgeColor = (rank) => {
        if (rank === 1)
            return "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-500/30";
        if (rank === 2)
            return "bg-gradient-to-r from-slate-300 via-gray-300 to-slate-400 text-gray-800 shadow-lg shadow-gray-500/30";
        if (rank === 3)
            return "bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/30";
        if (rank <= 10)
            return "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white shadow-lg shadow-blue-500/30";
        return "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300";
    };

    const getRankIcon = (rank) => {
        if (rank === 1) return Crown;
        if (rank === 2) return Medal;
        if (rank === 3) return Award;
        return Trophy;
    };

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-20 animate-pulse"></div>
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Loading Championship
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Preparing{" "}
                            {activeTab === "india" ? "national" : activeTab}{" "}
                            rankings...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <Activity className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Championship Unavailable
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error.message || "Unable to load leaderboard data"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Retry Loading
                    </button>
                </div>
            </div>
        );
    }

    const CurrentTabIcon = getTabIcon(activeTab);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Glassmorphism Header */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-b border-white/20 dark:border-slate-700/50 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="p-3 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl transition-all duration-200 backdrop-blur-sm">
                                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
                                    <div className="relative p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl">
                                        <CurrentTabIcon className="h-7 w-7 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                        {getTabTitle()}
                                    </h1>
                                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                                        {getTabSubtitle()}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                                        <Users className="h-4 w-4" />
                                        {stats.totalStudents} participants
                                        competing
                                        <span className="text-gray-400">•</span>
                                        <Calendar className="h-4 w-4" />
                                        {leaderboardData?.updatedAt
                                            ? new Date(
                                                  leaderboardData.updatedAt
                                              ).toLocaleDateString()
                                            : "Live"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Premium Tab Navigation */}
                        <div className="hidden md:flex items-center gap-2 p-2 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-slate-700/80 dark:to-slate-800/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-600/30 shadow-lg">
                            {[
                                {
                                    key: "india",
                                    label: "National",
                                    icon: Globe,
                                },
                                { key: "state", label: "State", icon: MapPin },
                                { key: "city", label: "City", icon: Building2 },
                            ].map((tab) => {
                                const TabIcon = tab.icon;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`
                                            relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300
                                            ${
                                                activeTab === tab.key
                                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50"
                                            }
                                        `}>
                                        <TabIcon className="h-5 w-5" />
                                        {tab.label}
                                        {activeTab === tab.key && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-20 -z-10"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Mobile Tab Navigation */}
                <div className="md:hidden">
                    <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-lg">
                        {[
                            { key: "india", label: "National", icon: Globe },
                            { key: "state", label: "State", icon: MapPin },
                            { key: "city", label: "City", icon: Building2 },
                        ].map((tab) => {
                            const TabIcon = tab.icon;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`
                                        flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300
                                        ${
                                            activeTab === tab.key
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                                                : "text-gray-600 dark:text-gray-400"
                                        }
                                    `}>
                                    <TabIcon className="h-4 w-4" />
                                    <span className="text-sm">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Premium Location Selector */}
                {activeTab !== "india" && (
                    <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                        {activeTab === "state" ? (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    Select Your State
                                </h3>
                                <select
                                    value={selectedState}
                                    onChange={(e) =>
                                        setSelectedState(e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm">
                                    {INDIAN_STATES.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-blue-600" />
                                    Find Your City
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search cities..."
                                            value={citySearchTerm}
                                            onChange={(e) =>
                                                setCitySearchTerm(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                                        />
                                    </div>
                                    <select
                                        value={selectedCity}
                                        onChange={(e) =>
                                            setSelectedCity(e.target.value)
                                        }
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm">
                                        <option value="">
                                            Choose your city
                                        </option>
                                        {filteredCities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Premium Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Total Students",
                            value: stats.totalStudents.toLocaleString(),
                            icon: Users,
                            gradient: "from-blue-600 to-cyan-600",
                            bgGradient:
                                "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                            iconBg: "from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50",
                        },
                        {
                            title: "Average Score",
                            value: stats.averageScore.toLocaleString(),
                            icon: TrendingUp,
                            gradient: "from-emerald-600 to-green-600",
                            bgGradient:
                                "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
                            iconBg: "from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50",
                        },
                        {
                            title: "Problems Solved",
                            value: stats.totalProblems.toLocaleString(),
                            icon: Code,
                            gradient: "from-purple-600 to-pink-600",
                            bgGradient:
                                "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
                            iconBg: "from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50",
                        },
                        {
                            title: "GitHub Repos",
                            value: stats.totalRepos.toLocaleString(),
                            icon: Github,
                            gradient: "from-orange-600 to-red-600",
                            bgGradient:
                                "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
                            iconBg: "from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50",
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
                                            {stat.value}
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

                {/* Premium Search and Filter */}
                <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search champions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="pl-10 pr-8 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer">
                                    <option value="rank">Sort by Rank</option>
                                    <option value="score">Sort by Score</option>
                                    <option value="problems">
                                        Sort by Problems
                                    </option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Leaderboard */}
                <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl overflow-hidden">
                    {/* Top 3 Podium */}
                    {filteredAndSortedData.length >= 3 && (
                        <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 p-8">
                            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 flex items-center justify-center gap-2">
                                <Crown className="h-6 w-6 text-yellow-500" />
                                Championship Podium
                            </h2>
                            <div className="flex items-end justify-center gap-4 lg:gap-8">
                                {/* Second Place */}
                                {filteredAndSortedData[1] && (
                                    <div className="text-center">
                                        <div className="relative mb-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto">
                                                {filteredAndSortedData[1].name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-300 to-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                                2nd
                                            </div>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                                            {filteredAndSortedData[1].name}
                                        </p>
                                        <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
                                            {filteredAndSortedData[1].score.toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {/* First Place */}
                                <div className="text-center relative">
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <Crown className="h-8 w-8 text-yellow-500 animate-pulse" />
                                    </div>
                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl mx-auto">
                                            {filteredAndSortedData[0].name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-base font-bold shadow-lg">
                                            Champion
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white text-xl">
                                        {filteredAndSortedData[0].name}
                                    </p>
                                    <p className="text-xl font-bold text-yellow-600">
                                        {filteredAndSortedData[0].score.toLocaleString()}
                                    </p>
                                </div>

                                {/* Third Place */}
                                {filteredAndSortedData[2] && (
                                    <div className="text-center">
                                        <div className="relative mb-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto">
                                                {filteredAndSortedData[2].name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                                3rd
                                            </div>
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                                            {filteredAndSortedData[2].name}
                                        </p>
                                        <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
                                            {filteredAndSortedData[2].score.toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 border-b border-gray-200 dark:border-slate-600">
                                <tr>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Rank
                                    </th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Participant
                                    </th>
                                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        Total Score
                                    </th>
                                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        LeetCode
                                    </th>
                                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        GeeksforGeeks
                                    </th>
                                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                        GitHub
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                {filteredAndSortedData.map((entry, index) => {
                                    const RankIcon = getRankIcon(entry.rank);
                                    const totalLeetCodeProblems =
                                        entry.easySolved +
                                        entry.mediumSolved +
                                        entry.hardSolved;

                                    return (
                                        <tr
                                            key={entry.userId}
                                            className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-200 group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`
                                                        px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 min-w-fit
                                                        ${getRankBadgeColor(
                                                            entry.rank
                                                        )}
                                                    `}>
                                                        <RankIcon className="h-4 w-4" />
                                                        #{entry.rank}
                                                    </div>
                                                    {entry.rank <= 3 && (
                                                        <div className="flex">
                                                            {Array.from({
                                                                length: Math.min(
                                                                    entry.rank,
                                                                    3
                                                                ),
                                                            }).map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="h-4 w-4 text-yellow-500 fill-current"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                            {entry.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                        {entry.rank <= 10 && (
                                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                                                <Flame className="h-3 w-3 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 dark:text-white text-lg">
                                                            {entry.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                            ID:{" "}
                                                            {entry.userId.slice(
                                                                -8
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                        {entry.score.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                        Championship Points
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="space-y-3">
                                                    <div className="text-center font-bold text-lg text-gray-900 dark:text-white">
                                                        {totalLeetCodeProblems}
                                                    </div>
                                                    <div className="flex justify-center gap-2">
                                                        <span
                                                            className={`px-3 py-1 rounded-lg text-xs font-bold ${getDifficultyColor(
                                                                "easy"
                                                            )}`}>
                                                            Easy:{" "}
                                                            {entry.easySolved}
                                                        </span>
                                                        <span
                                                            className={`px-3 py-1 rounded-lg text-xs font-bold ${getDifficultyColor(
                                                                "medium"
                                                            )}`}>
                                                            Med:{" "}
                                                            {entry.mediumSolved}
                                                        </span>
                                                        <span
                                                            className={`px-3 py-1 rounded-lg text-xs font-bold ${getDifficultyColor(
                                                                "hard"
                                                            )}`}>
                                                            Hard:{" "}
                                                            {entry.hardSolved}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <div className="space-y-2">
                                                    <div className="font-bold text-lg text-green-600">
                                                        {entry.gfgSolved}
                                                    </div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                        Problems
                                                    </div>
                                                    <div
                                                        className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${getDifficultyColor(
                                                            "default"
                                                        )}`}>
                                                        Score:{" "}
                                                        {entry.gfgCodingScore}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                                                        <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                                        <div className="font-bold text-lg text-gray-900 dark:text-white">
                                                            {entry.githubRepos}
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                        Repositories
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Premium Footer */}
                    <div className="px-6 py-5 border-t border-gray-100 dark:border-slate-700 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-slate-800/50 dark:to-slate-700/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Showing {filteredAndSortedData.length} of{" "}
                                    {stats.totalStudents} champions in{" "}
                                    {currentLocation}
                                </p>
                                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full">
                                    <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                        Live
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Updated:{" "}
                                {leaderboardData?.generatedAt
                                    ? new Date(
                                          leaderboardData.generatedAt
                                      ).toLocaleString()
                                    : "Just now"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
