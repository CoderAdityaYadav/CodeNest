import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Award,
    BarChart3,
    Bot,
    Building2,
    ChevronRight,
    Github,
    Globe,
    GraduationCap,
    MapPin,
    Search,
    Star,
    Target,
    Trophy,
    Users,
    Zap,
    Code,
    TrendingUp,
    Sparkles,
    CheckCircle,
    Play,
    ExternalLink,
    Rocket,
    Shield,
} from "lucide-react";

export default function HomePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 0.1);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-400"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 opacity-20 animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
            {/* Premium Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Hero Content */}
                        <div className="text-center lg:text-left space-y-8">
                            {/* Premium Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
                                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                    India's #1 Coding Analytics Platform
                                </span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                    <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
                                        Transform Your
                                    </span>
                                    <br />
                                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        Coding Journey
                                    </span>
                                </h1>
                                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                                    Unlock your potential with AI-powered
                                    insights, comprehensive tracking, and
                                    national-level competitions. Join thousands
                                    of students already achieving excellence.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-3 overflow-hidden">
                                    <span className="relative z-10">
                                        Start Free Journey
                                    </span>
                                    <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/leaderboards/india")
                                    }
                                    className="group px-8 py-4 backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-700/30 text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-white/90 dark:hover:bg-slate-700/90 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
                                    <Trophy className="h-5 w-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                                    View Championships
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        500+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Colleges
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        50K+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Students
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        2M+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Problems
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Premium Feature Cards */}
                        <div className="relative">
                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    {
                                        icon: BarChart3,
                                        title: "Live Analytics Dashboard",
                                        description:
                                            "Real-time performance tracking across platforms",
                                        gradient:
                                            "from-emerald-500 to-green-600",
                                        bgGradient:
                                            "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
                                    },
                                    {
                                        icon: Bot,
                                        title: "AI-Powered Insights",
                                        description:
                                            "Personalized readiness scores and recommendations",
                                        gradient:
                                            "from-purple-500 to-indigo-600",
                                        bgGradient:
                                            "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
                                    },
                                    {
                                        icon: Trophy,
                                        title: "National Championships",
                                        description:
                                            "Compete across India with real rankings",
                                        gradient:
                                            "from-yellow-500 to-orange-600",
                                        bgGradient:
                                            "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
                                    },
                                ].map((feature, index) => {
                                    const IconComponent = feature.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`relative backdrop-blur-xl bg-gradient-to-br ${feature.bgGradient} p-6 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-1`}>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`relative p-3 bg-gradient-to-br ${feature.gradient} rounded-xl shadow-lg`}>
                                                    <IconComponent className="h-6 w-6 text-white" />
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {feature.title}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Stats Section */}
            <section className="relative py-20 backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-y border-white/30 dark:border-slate-700/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                            Trusted by India's Leading Institutions
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Join the revolution transforming computer science
                            education
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                label: "Active Colleges",
                                value: "500+",
                                icon: Building2,
                                color: "text-blue-600",
                            },
                            {
                                label: "Students Tracked",
                                value: "50K+",
                                icon: Users,
                                color: "text-green-600",
                            },
                            {
                                label: "Problems Solved",
                                value: "2M+",
                                icon: Code,
                                color: "text-purple-600",
                            },
                            {
                                label: "Recruiting Partners",
                                value: "100+",
                                icon: Target,
                                color: "text-orange-600",
                            },
                        ].map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={index} className="text-center group">
                                    <div className="relative mb-4">
                                        <div
                                            className={`w-16 h-16 mx-auto ${stat.color
                                                .replace("text-", "bg-")
                                                .replace(
                                                    "600",
                                                    "100"
                                                )} dark:bg-opacity-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent
                                                className={`h-8 w-8 ${stat.color}`}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                                        {stat.value}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                                        {stat.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Premium Features Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full backdrop-blur-sm mb-6">
                            <Rocket className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                                Comprehensive Platform
                            </span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent mb-6">
                            Everything You Need to Excel
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            From individual progress tracking to institutional
                            analytics, CodeNest provides the complete ecosystem
                            for coding excellence and career success.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Bot,
                                title: "AI-Powered Analytics",
                                description:
                                    "Advanced machine learning algorithms provide personalized readiness scores, adaptive learning paths, and predictive career insights.",
                                features: [
                                    "Smart Recommendations",
                                    "Performance Prediction",
                                    "Skill Gap Analysis",
                                ],
                                gradient: "from-purple-600 to-indigo-600",
                                bgGradient:
                                    "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
                            },
                            {
                                icon: BarChart3,
                                title: "Multi-Platform Integration",
                                description:
                                    "Seamlessly track progress across LeetCode, GeeksforGeeks, GitHub, and more from a unified, intelligent dashboard.",
                                features: [
                                    "Real-time Sync",
                                    "Cross-platform Analytics",
                                    "Unified Metrics",
                                ],
                                gradient: "from-emerald-600 to-green-600",
                                bgGradient:
                                    "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
                            },
                            {
                                icon: Trophy,
                                title: "National Championships",
                                description:
                                    "Compete at every level from section to national with real-time rankings, leaderboards, and recognition systems.",
                                features: [
                                    "Live Rankings",
                                    "Multi-level Competition",
                                    "Achievement System",
                                ],
                                gradient: "from-yellow-500 to-orange-600",
                                bgGradient:
                                    "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
                            },
                            {
                                icon: Search,
                                title: "Recruiter Marketplace",
                                description:
                                    "Connect top-performing students with leading companies through our comprehensive talent discovery and matching platform.",
                                features: [
                                    "Talent Matching",
                                    "Company Profiles",
                                    "Direct Communication",
                                ],
                                gradient: "from-blue-600 to-cyan-600",
                                bgGradient:
                                    "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                            },
                            {
                                icon: Award,
                                title: "Gamification Engine",
                                description:
                                    "Boost engagement with comprehensive achievement systems, challenges, contests, and interactive learning experiences.",
                                features: [
                                    "Dynamic Challenges",
                                    "Badge System",
                                    "Progress Tracking",
                                ],
                                gradient: "from-pink-600 to-rose-600",
                                bgGradient:
                                    "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
                            },
                            {
                                icon: Zap,
                                title: "Real-time Insights",
                                description:
                                    "Access live performance data, advanced analytics, and actionable insights to drive continuous improvement and success.",
                                features: [
                                    "Live Monitoring",
                                    "Predictive Analytics",
                                    "Custom Reports",
                                ],
                                gradient: "from-violet-600 to-purple-600",
                                bgGradient:
                                    "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
                            },
                        ].map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className={`relative group backdrop-blur-xl bg-gradient-to-br ${feature.bgGradient} p-8 rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden`}>
                                    {/* Icon */}
                                    <div className="relative mb-6">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                        {feature.description}
                                    </p>

                                    {/* Feature List */}
                                    <ul className="space-y-2">
                                        {feature.features.map(
                                            (item, itemIndex) => (
                                                <li
                                                    key={itemIndex}
                                                    className="flex items-center gap-2 text-sm">
                                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                        {item}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    {/* Hover Effect */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Premium For Colleges Section */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10"></div>
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm mb-8">
                                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-blue-700 dark:text-blue-300 font-semibold">
                                    For Educational Institutions
                                </span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent mb-6">
                                Elevate Your Institution's Excellence
                            </h2>

                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Transform your college into a coding powerhouse.
                                Join hundreds of leading institutions across
                                India who trust CodeNest to drive student
                                success and attract top recruiters.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    "Comprehensive analytics and performance insights for all students",
                                    "AI-driven early intervention systems for struggling learners",
                                    "National ranking system to showcase institutional excellence",
                                    "Direct recruiter access to your top-performing graduates",
                                    "Detailed progress reports and stakeholder dashboard access",
                                ].map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 group">
                                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate("/signup")}
                                className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 flex items-center gap-3">
                                Transform Your Institution
                                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Premium Dashboard Preview */}
                        <div className="relative">
                            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-2xl">
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Institution Dashboard
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                                Live
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {[
                                            {
                                                label: "National Rank",
                                                value: "#23",
                                                change: "+5",
                                                color: "text-blue-600",
                                            },
                                            {
                                                label: "Active Students",
                                                value: "1,247",
                                                change: "+12%",
                                                color: "text-green-600",
                                            },
                                            {
                                                label: "Avg. Performance",
                                                value: "87.4%",
                                                change: "+3.2%",
                                                color: "text-purple-600",
                                            },
                                            {
                                                label: "Placement Rate",
                                                value: "94.2%",
                                                change: "+1.8%",
                                                color: "text-orange-600",
                                            },
                                        ].map((metric, index) => (
                                            <div
                                                key={index}
                                                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-gray-200 dark:border-slate-600">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                            {metric.label}
                                                        </p>
                                                        <p
                                                            className={`text-lg font-bold ${metric.color}`}>
                                                            {metric.value}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                                        <span className="text-xs text-green-600 font-medium">
                                                            {metric.change}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Star className="h-5 w-5 text-yellow-300 fill-current" />
                                            <span className="font-bold">
                                                Top 5% Nationally
                                            </span>
                                        </div>
                                        <p className="text-sm text-blue-100">
                                            Excellence in Computer Science
                                            Education
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium For Recruiters Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Talent Discovery Interface */}
                        <div className="lg:order-2">
                            <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 p-8 rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Talent Discovery
                                    </h3>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                                            Real-time
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        {
                                            name: "Rahul Kumar",
                                            college:
                                                "IIT Delhi • CSE Final Year",
                                            score: 94,
                                            skills: [
                                                "Python",
                                                "React",
                                                "System Design",
                                            ],
                                            github: "250+ repos",
                                            leetcode: "1847 problems",
                                            avatar: "from-blue-500 to-indigo-600",
                                        },
                                        {
                                            name: "Priya Sharma",
                                            college:
                                                "NIT Trichy • IT Final Year",
                                            score: 91,
                                            skills: [
                                                "Java",
                                                "Spring",
                                                "Microservices",
                                            ],
                                            github: "180+ repos",
                                            leetcode: "1654 problems",
                                            avatar: "from-purple-500 to-pink-600",
                                        },
                                        {
                                            name: "Arjun Patel",
                                            college:
                                                "BITS Pilani • CS Final Year",
                                            score: 89,
                                            skills: [
                                                "Go",
                                                "Docker",
                                                "Kubernetes",
                                            ],
                                            github: "320+ repos",
                                            leetcode: "1523 problems",
                                            avatar: "from-emerald-500 to-green-600",
                                        },
                                    ].map((candidate, index) => (
                                        <div
                                            key={index}
                                            className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 cursor-pointer">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-12 h-12 bg-gradient-to-br ${candidate.avatar} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                                        {candidate.name.charAt(
                                                            0
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {candidate.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {candidate.college}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div
                                                        className={`text-lg font-bold ${
                                                            candidate.score >=
                                                            90
                                                                ? "text-green-600"
                                                                : candidate.score >=
                                                                  85
                                                                ? "text-blue-600"
                                                                : "text-purple-600"
                                                        }`}>
                                                        {candidate.score}%
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Readiness Score
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {candidate.skills.map(
                                                    (skill, skillIndex) => (
                                                        <span
                                                            key={skillIndex}
                                                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800">
                                                            {skill}
                                                        </span>
                                                    )
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Github className="h-3 w-3 text-gray-600" />
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            {candidate.github}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Code className="h-3 w-3 text-gray-600" />
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            {candidate.leetcode}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-medium rounded-full hover:from-green-700 hover:to-emerald-700 transition-all">
                                                    Contact
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recruiter Content */}
                        <div className="lg:order-1">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full backdrop-blur-sm mb-8">
                                <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <span className="text-green-700 dark:text-green-300 font-semibold">
                                    For Talent Recruiters
                                </span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent mb-6">
                                Discover India's Elite Coding Talent
                            </h2>

                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Access verified, comprehensive data on top
                                students from 500+ colleges across India. Find
                                perfect candidates with real coding performance
                                metrics and AI-powered matching.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    "Real-time performance data from LeetCode, GeeksforGeeks, and GitHub",
                                    "AI-powered readiness scores and skill assessments for accurate evaluation",
                                    "Advanced filtering by college, specialization, location, and performance metrics",
                                    "Direct communication platform with integrated messaging and scheduling",
                                    "Comprehensive coding portfolios with project histories and achievements",
                                ].map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 group">
                                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate("/signup")}
                                className="group px-8 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white font-bold rounded-2xl hover:from-green-700 hover:via-emerald-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-green-500/25 flex items-center gap-3">
                                Start Talent Discovery
                                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Leaderboard Preview */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-rose-50/50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-rose-900/10"></div>
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm mb-8">
                            <Trophy className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                                National Championships
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent mb-6">
                            India's Premier Coding Leaderboards
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Witness the competition that drives excellence. See
                            how institutions and students rank across India in
                            our comprehensive championship system.
                        </p>

                        <button
                            onClick={() => navigate("/leaderboards/india")}
                            className="group px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3 mx-auto">
                            View Live Championships
                            <ExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Top Institutions",
                                icon: Building2,
                                gradient: "from-blue-600 to-indigo-600",
                                bgGradient:
                                    "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
                                data: [
                                    {
                                        name: "IIT Delhi",
                                        score: "98.5%",
                                        rank: 1,
                                        badge: "🏆",
                                    },
                                    {
                                        name: "IIT Bombay",
                                        score: "97.8%",
                                        rank: 2,
                                        badge: "🥈",
                                    },
                                    {
                                        name: "IIIT Hyderabad",
                                        score: "96.9%",
                                        rank: 3,
                                        badge: "🥉",
                                    },
                                    {
                                        name: "NIT Trichy",
                                        score: "95.2%",
                                        rank: 4,
                                        badge: "⭐",
                                    },
                                    {
                                        name: "BITS Pilani",
                                        score: "94.8%",
                                        rank: 5,
                                        badge: "⭐",
                                    },
                                ],
                            },
                            {
                                title: "Leading States",
                                icon: MapPin,
                                gradient: "from-emerald-600 to-green-600",
                                bgGradient:
                                    "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
                                data: [
                                    {
                                        name: "Delhi",
                                        score: "94.2%",
                                        rank: 1,
                                        badge: "🏆",
                                    },
                                    {
                                        name: "Maharashtra",
                                        score: "92.8%",
                                        rank: 2,
                                        badge: "🥈",
                                    },
                                    {
                                        name: "Karnataka",
                                        score: "91.5%",
                                        rank: 3,
                                        badge: "🥉",
                                    },
                                    {
                                        name: "Tamil Nadu",
                                        score: "90.3%",
                                        rank: 4,
                                        badge: "⭐",
                                    },
                                    {
                                        name: "Telangana",
                                        score: "89.7%",
                                        rank: 5,
                                        badge: "⭐",
                                    },
                                ],
                            },
                            {
                                title: "Elite Students",
                                icon: GraduationCap,
                                gradient: "from-purple-600 to-pink-600",
                                bgGradient:
                                    "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
                                data: [
                                    {
                                        name: "Rahul K.",
                                        score: "2,847",
                                        rank: 1,
                                        badge: "🏆",
                                    },
                                    {
                                        name: "Priya S.",
                                        score: "2,756",
                                        rank: 2,
                                        badge: "🥈",
                                    },
                                    {
                                        name: "Arjun P.",
                                        score: "2,689",
                                        rank: 3,
                                        badge: "🥉",
                                    },
                                    {
                                        name: "Sneha M.",
                                        score: "2,634",
                                        rank: 4,
                                        badge: "⭐",
                                    },
                                    {
                                        name: "Kiran R.",
                                        score: "2,598",
                                        rank: 5,
                                        badge: "⭐",
                                    },
                                ],
                            },
                        ].map((leaderboard, index) => {
                            const IconComponent = leaderboard.icon;
                            return (
                                <div
                                    key={index}
                                    className={`relative group backdrop-blur-xl bg-gradient-to-br ${leaderboard.bgGradient} p-8 rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden`}>
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div
                                            className={`w-12 h-12 bg-gradient-to-br ${leaderboard.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {leaderboard.title}
                                        </h3>
                                    </div>

                                    {/* Leaderboard Entries */}
                                    <div className="space-y-3">
                                        {leaderboard.data.map(
                                            (item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-700/60 rounded-xl border border-white/40 dark:border-slate-600/40 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300 group/item">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg">
                                                                {item.badge}
                                                            </span>
                                                            <span
                                                                className={`
                                                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                                            ${
                                                                item.rank === 1
                                                                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                                                                    : item.rank ===
                                                                      2
                                                                    ? "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
                                                                    : item.rank ===
                                                                      3
                                                                    ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                                                                    : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/50 dark:to-blue-800/50 dark:text-blue-300"
                                                            }
                                                        `}>
                                                                {item.rank}
                                                            </span>
                                                        </div>
                                                        <span className="font-semibold text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                                            {item.name}
                                                        </span>
                                                    </div>

                                                    <span
                                                        className={`font-bold ${
                                                            leaderboard.gradient.includes(
                                                                "blue"
                                                            )
                                                                ? "text-blue-600"
                                                                : leaderboard.gradient.includes(
                                                                      "emerald"
                                                                  )
                                                                ? "text-emerald-600"
                                                                : "text-purple-600"
                                                        }`}>
                                                        {item.score}
                                                        {leaderboard.title.includes(
                                                            "Students"
                                                        )
                                                            ? " pts"
                                                            : ""}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* Hover Effect */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Premium CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>

                {/* Animated Background Elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm mb-8">
                        <Rocket className="h-4 w-4 text-white" />
                        <span className="text-sm font-semibold text-white">
                            Join the Revolution
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to Transform Your
                        <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                            Coding Journey?
                        </span>
                    </h2>

                    <p className="text-xl lg:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Join thousands of students and hundreds of institutions
                        already using CodeNest to achieve coding excellence,
                        career success, and educational transformation.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => navigate("/signup")}
                            className="group px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
                            <Zap className="h-5 w-5 group-hover:text-yellow-500 transition-colors" />
                            Get Started Free
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => navigate("/about")}
                            className="group px-10 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                            <Play className="h-5 w-5" />
                            Watch Demo
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 pt-8 border-t border-white/20">
                        <p className="text-blue-200 text-sm mb-6">
                            Trusted by leading institutions across India
                        </p>
                        <div className="flex items-center justify-center gap-8 opacity-60">
                            {["IIT", "NIT", "IIIT", "BITS", "VIT"].map(
                                (institution, index) => (
                                    <div
                                        key={index}
                                        className="text-white/80 font-bold text-lg">
                                        {institution}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
