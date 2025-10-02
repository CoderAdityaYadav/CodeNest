import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    MapPin,
    Building2,
    Users,
    ArrowRight,
    Filter,
    Globe,
    Star,
    ChevronDown,
    ExternalLink,
    GraduationCap,
    Calendar,
    Award,
    TrendingUp,
    Code,
    BookOpen,
    Sparkles,
    Heart,
    Eye,
    ArrowLeft,
} from "lucide-react";
import { useGetColleges } from "../hooks/college.hooks";
import Loading from "../components/Loading";

export default function CollegesPage() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetColleges();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState("all");
    const [selectedCity, setSelectedCity] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [favorites, setFavorites] = useState(new Set());

    const colleges = data?.data || [];

    // Extract unique states and cities for filters
    const { states, cities } = useMemo(() => {
        const statesSet = new Set();
        const citiesSet = new Set();

        colleges.forEach((college) => {
            if (college.location?.state) statesSet.add(college.location.state);
            if (college.location?.city) citiesSet.add(college.location.city);
        });

        return {
            states: Array.from(statesSet).sort(),
            cities: Array.from(citiesSet).sort(),
        };
    }, [colleges]);

    // Filter and sort colleges
    const filteredColleges = useMemo(() => {
        let filtered = colleges.filter((college) => {
            const matchesSearch =
                college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                college.location?.city
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                college.location?.state
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesState =
                selectedState === "all" ||
                college.location?.state === selectedState;
            const matchesCity =
                selectedCity === "all" ||
                college.location?.city === selectedCity;

            return matchesSearch && matchesState && matchesCity;
        });

        // Sort colleges
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "state":
                    return (a.location?.state || "").localeCompare(
                        b.location?.state || ""
                    );
                case "city":
                    return (a.location?.city || "").localeCompare(
                        b.location?.city || ""
                    );
                case "newest":
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [colleges, searchTerm, selectedState, selectedCity, sortBy]);

    // Toggle favorite
    const toggleFavorite = (collegeId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(collegeId)) {
            newFavorites.delete(collegeId);
        } else {
            newFavorites.add(collegeId);
        }
        setFavorites(newFavorites);

        // Save to localStorage
        localStorage.setItem(
            "codenest-favorite-colleges",
            JSON.stringify(Array.from(newFavorites))
        );
    };

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem(
            "codenest-favorite-colleges"
        );
        if (savedFavorites) {
            setFavorites(new Set(JSON.parse(savedFavorites)));
        }
    }, []);

    if (isLoading) {
        return (
            <Loading
                context="general"
                duration={3000}
                showProgress={true}
                customMessage="Loading educational institutions across India..."
            />
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <Building2 className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Unable to Load Colleges
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error.message ||
                            "Failed to load educational institutions"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Premium Header */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-b border-white/20 dark:border-slate-700/50 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => navigate("/")}
                                className="p-3 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl transition-all duration-200 backdrop-blur-sm">
                                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
                                    <div className="relative p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl">
                                        <Building2 className="h-7 w-7 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                        Educational Institutions
                                    </h1>
                                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                                        Discover India's Premier Coding Colleges
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                                        <Globe className="h-4 w-4" />
                                        {filteredColleges.length} institutions
                                        found
                                        <span className="text-gray-400">•</span>
                                        <Calendar className="h-4 w-4" />
                                        Updated daily
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="hidden md:flex items-center gap-2 p-2 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-slate-700/80 dark:to-slate-800/80 backdrop-blur-md rounded-xl border border-white/30 dark:border-slate-600/30 shadow-lg">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-3 rounded-lg transition-all duration-200 ${
                                    viewMode === "grid"
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-700/50"
                                }`}>
                                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                                    <div className="bg-current rounded-sm"></div>
                                    <div className="bg-current rounded-sm"></div>
                                    <div className="bg-current rounded-sm"></div>
                                    <div className="bg-current rounded-sm"></div>
                                </div>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-3 rounded-lg transition-all duration-200 ${
                                    viewMode === "list"
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-700/50"
                                }`}>
                                <div className="space-y-1 w-4 h-4">
                                    <div className="bg-current h-0.5 rounded"></div>
                                    <div className="bg-current h-0.5 rounded"></div>
                                    <div className="bg-current h-0.5 rounded"></div>
                                    <div className="bg-current h-0.5 rounded"></div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Premium Search and Filters */}
                    <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            {/* Search Bar */}
                            <div className="lg:col-span-2 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search colleges, cities, or states..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        ×
                                    </button>
                                )}
                            </div>

                            {/* State Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <select
                                    value={selectedState}
                                    onChange={(e) => {
                                        setSelectedState(e.target.value);
                                        setSelectedCity("all"); // Reset city when state changes
                                    }}
                                    className="w-full pl-10 pr-8 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer">
                                    <option value="all">All States</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Sort Options */}
                            <div className="relative">
                                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full pl-10 pr-8 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white/90 dark:bg-slate-700/90 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer">
                                    <option value="name">Sort by Name</option>
                                    <option value="state">Sort by State</option>
                                    <option value="city">Sort by City</option>
                                    <option value="newest">Newest First</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {(searchTerm ||
                            selectedState !== "all" ||
                            selectedCity !== "all") && (
                            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    Active filters:
                                </span>
                                {searchTerm && (
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-800">
                                        Search: "{searchTerm}"
                                    </span>
                                )}
                                {selectedState !== "all" && (
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full border border-green-200 dark:border-green-800">
                                        State: {selectedState}
                                    </span>
                                )}
                                {selectedCity !== "all" && (
                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full border border-purple-200 dark:border-purple-800">
                                        City: {selectedCity}
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedState("all");
                                        setSelectedCity("all");
                                    }}
                                    className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-full border border-red-200 dark:border-red-800 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {filteredColleges.length} Institutions Found
                        </h2>
                        {filteredColleges.length > 0 && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full">
                                <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                    Live Data
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Mobile View Toggle */}
                    <div className="md:hidden flex items-center gap-2 p-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-lg border border-white/30 dark:border-slate-700/30">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded transition-all duration-200 ${
                                viewMode === "grid"
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                    : "text-gray-600 dark:text-gray-400"
                            }`}>
                            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                                <div className="bg-current rounded-sm"></div>
                                <div className="bg-current rounded-sm"></div>
                                <div className="bg-current rounded-sm"></div>
                                <div className="bg-current rounded-sm"></div>
                            </div>
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded transition-all duration-200 ${
                                viewMode === "list"
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                    : "text-gray-600 dark:text-gray-400"
                            }`}>
                            <div className="space-y-0.5 w-3 h-3">
                                <div className="bg-current h-0.5 rounded"></div>
                                <div className="bg-current h-0.5 rounded"></div>
                                <div className="bg-current h-0.5 rounded"></div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Colleges Grid/List */}
                {filteredColleges.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            No Colleges Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Try adjusting your search criteria or filters to
                            find more educational institutions.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedState("all");
                                setSelectedCity("all");
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div
                        className={`${
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                                : "space-y-6"
                        }`}>
                        {filteredColleges.map((college) => (
                            <CollegeCard
                                key={college._id}
                                college={college}
                                viewMode={viewMode}
                                isFavorite={favorites.has(college._id)}
                                onToggleFavorite={() =>
                                    toggleFavorite(college._id)
                                }
                                onVisit={() =>
                                    navigate(`/colleges/${college._id}`)
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// College Card Component
const CollegeCard = ({
    college,
    viewMode,
    isFavorite,
    onToggleFavorite,
    onVisit,
}) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (viewMode === "list") {
        return (
            <div className="group backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                        {/* College Avatar */}
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                {college.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                <GraduationCap className="h-3 w-3 text-white" />
                            </div>
                        </div>

                        {/* College Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {college.name}
                                </h3>
                                <button
                                    onClick={onToggleFavorite}
                                    className={`p-2 rounded-full transition-all duration-200 ${
                                        isFavorite
                                            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500"
                                    }`}>
                                    <Heart
                                        className={`h-4 w-4 ${
                                            isFavorite ? "fill-current" : ""
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>
                                        {college.location?.city},{" "}
                                        {college.location?.state}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span>
                                        {college.branches?.length || 0} branches
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        Joined {formatDate(college.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800">
                                    Join Code: {college.joinCode}
                                </span> */}
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onVisit}
                        className="group/btn px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        );
    }

    // Grid View
    return (
        <div className="group backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {college.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-3 w-3 text-white" />
                    </div>
                </div>

                <button
                    onClick={onToggleFavorite}
                    className={`p-3 rounded-full transition-all duration-200 ${
                        isFavorite
                            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 scale-110"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500 hover:scale-110"
                    }`}>
                    <Heart
                        className={`h-5 w-5 ${
                            isFavorite ? "fill-current" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {college.name}
            </h3>

            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">
                        {college.location?.city}, {college.location?.state}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                        {college.branches?.length || 0} branches available
                    </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">
                        Joined {formatDate(college.createdAt)}
                    </span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {/* <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800">
                    Code: {college.joinCode}
                </span> */}
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">
                    Active Institution
                </span>
            </div>

            {/* Action Button */}
            <button
                onClick={onVisit}
                className="group/btn w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Eye className="h-4 w-4" />
                Explore College
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            {/* Hover Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
        </div>
    );
};
