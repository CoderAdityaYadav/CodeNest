import React, { useState, useEffect } from "react";
import {
    Code,
    Trophy,
    Target,
    BarChart3,
    Users,
    Bot,
    Github,
    Award,
    Star,
    TrendingUp,
    Globe,
    Building2,
    GraduationCap,
    Rocket,
    Shield,
    Zap,
    Sparkles,
} from "lucide-react";

const Loading = ({
    duration = 3000,
    customMessage = null,
    showProgress = true,
    context = "general",
}) => {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Different content sets based on context
    const contentSets = {
        general: [
            {
                icon: Rocket,
                title: "Welcome to CodeNest",
                description:
                    "India's premier coding analytics platform powering 500+ colleges nationwide.",
                gradient: "from-blue-600 to-indigo-600",
            },
            {
                icon: Bot,
                title: "AI-Powered Insights",
                description:
                    "Our advanced algorithms analyze your coding patterns to provide personalized recommendations.",
                gradient: "from-purple-600 to-pink-600",
            },
            {
                icon: Trophy,
                title: "National Championships",
                description:
                    "Compete with 50,000+ students across India in real-time coding leaderboards.",
                gradient: "from-yellow-500 to-orange-600",
            },
            {
                icon: BarChart3,
                title: "Multi-Platform Tracking",
                description:
                    "Track progress across LeetCode, GeeksforGeeks, GitHub, and more from one dashboard.",
                gradient: "from-emerald-600 to-green-600",
            },
            {
                icon: Target,
                title: "Career Success",
                description:
                    "Connect with 100+ recruiting partners and showcase your skills to top companies.",
                gradient: "from-red-600 to-rose-600",
            },
        ],
        login: [
            {
                icon: Shield,
                title: "Secure Authentication",
                description:
                    "Your data is protected with enterprise-grade security and encryption.",
                gradient: "from-blue-600 to-cyan-600",
            },
            {
                icon: Users,
                title: "Join the Community",
                description:
                    "Connect with thousands of aspiring developers and coding enthusiasts.",
                gradient: "from-indigo-600 to-purple-600",
            },
            {
                icon: Zap,
                title: "Instant Sync",
                description:
                    "Your profiles are syncing in real-time for the most accurate analytics.",
                gradient: "from-yellow-600 to-orange-600",
            },
        ],
        dashboard: [
            {
                icon: TrendingUp,
                title: "Real-Time Analytics",
                description:
                    "Your latest coding activity is being processed for personalized insights.",
                gradient: "from-emerald-600 to-teal-600",
            },
            {
                icon: Star,
                title: "Performance Metrics",
                description:
                    "Advanced algorithms are calculating your coding readiness score.",
                gradient: "from-purple-600 to-indigo-600",
            },
            {
                icon: Award,
                title: "Achievement System",
                description:
                    "Unlocking new badges and tracking your milestone progress.",
                gradient: "from-orange-600 to-red-600",
            },
        ],
        leaderboard: [
            {
                icon: Trophy,
                title: "Championship Rankings",
                description:
                    "Loading the latest standings from India's premier coding competition.",
                gradient: "from-yellow-500 to-amber-600",
            },
            {
                icon: Globe,
                title: "National Competition",
                description:
                    "Connecting with leaderboards across all states and cities in India.",
                gradient: "from-blue-600 to-indigo-600",
            },
            {
                icon: Building2,
                title: "Institutional Excellence",
                description:
                    "Showcasing top-performing colleges and their coding champions.",
                gradient: "from-purple-600 to-pink-600",
            },
        ],
        signup: [
            {
                icon: Sparkles,
                title: "Creating Your Profile",
                description:
                    "Setting up your personalized coding journey with AI-powered recommendations.",
                gradient: "from-pink-600 to-rose-600",
            },
            {
                icon: Code,
                title: "Platform Integration",
                description:
                    "Connecting to LeetCode, GeeksforGeeks, and GitHub for comprehensive tracking.",
                gradient: "from-green-600 to-emerald-600",
            },
            {
                icon: GraduationCap,
                title: "Academic Excellence",
                description:
                    "Joining India's largest network of coding students and institutions.",
                gradient: "from-indigo-600 to-purple-600",
            },
        ],
    };

    const currentContent = contentSets[context] || contentSets.general;

    // Rotate content every 2 seconds
    useEffect(() => {
        const contentInterval = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % currentContent.length);
        }, 2000);

        return () => clearInterval(contentInterval);
    }, [currentContent.length]);

    // Progress simulation
    useEffect(() => {
        if (!showProgress) return;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Simulate realistic loading with variable speed
                const increment = Math.random() * 15 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        return () => clearInterval(progressInterval);
    }, [showProgress]);

    // Auto-hide after duration
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const currentTip = currentContent[currentTipIndex];
    const IconComponent = currentTip.icon;

    if (!isVisible && progress >= 100) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative max-w-2xl mx-auto px-6 text-center">
                {/* Logo Section */}
                <div className="mb-12">
                    <div className="relative inline-flex items-center justify-center">
                        {/* Main Spinner */}
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-blue-200/30 rounded-full"></div>
                            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
                            <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animate-reverse"></div>
                            <div className="absolute inset-4 w-12 h-12 border-4 border-transparent border-b-cyan-400 rounded-full animate-spin"></div>
                        </div>

                        {/* Floating Icons */}
                        <div className="absolute inset-0 w-32 h-32">
                            {[Code, Github, Trophy, Target].map(
                                (Icon, index) => (
                                    <div
                                        key={index}
                                        className={`absolute w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 animate-float-${
                                            index + 1
                                        }`}
                                        style={{
                                            top:
                                                index === 0
                                                    ? "0%"
                                                    : index === 1
                                                    ? "100%"
                                                    : "50%",
                                            left:
                                                index === 2
                                                    ? "0%"
                                                    : index === 3
                                                    ? "100%"
                                                    : "50%",
                                            transform: "translate(-50%, -50%)",
                                            animationDelay: `${index * 0.5}s`,
                                        }}>
                                        <Icon className="h-4 w-4 text-white/80" />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mt-8 mb-2">
                        CodeNest
                    </h1>
                    <p className="text-blue-200 text-lg font-medium">
                        India's Premier Coding Analytics Platform
                    </p>
                </div>

                {/* Dynamic Content Card */}
                <div className="relative mb-8">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
                        {/* Icon with Gradient Background */}
                        <div className="relative mb-6">
                            <div
                                className={`w-16 h-16 mx-auto bg-gradient-to-br ${currentTip.gradient} rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-110`}>
                                <IconComponent className="h-8 w-8 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div key={currentTipIndex} className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                {customMessage || currentTip.title}
                            </h2>
                            <p className="text-blue-100 text-lg leading-relaxed">
                                {currentTip.description}
                            </p>
                        </div>

                        {/* Content Indicators */}
                        <div className="flex justify-center gap-2 mt-8">
                            {currentContent.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentTipIndex
                                            ? "bg-white scale-125"
                                            : "bg-white/40"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Progress Section */}
                {showProgress && (
                    <div className="space-y-4">
                        {/* Progress Bar */}
                        <div className="relative">
                            <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm border border-white/20">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                                    style={{ width: `${progress}%` }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Text */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-200">
                                Loading your dashboard...
                            </span>
                            <span className="text-white font-mono">
                                {Math.round(progress)}%
                            </span>
                        </div>

                        {/* Loading Steps */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            {[
                                {
                                    label: "Authenticating",
                                    done: progress > 20,
                                },
                                { label: "Syncing Data", done: progress > 60 },
                                { label: "Ready!", done: progress > 90 },
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2">
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                            step.done
                                                ? "bg-green-400 border-green-400"
                                                : "border-white/40"
                                        }`}>
                                        {step.done && (
                                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5 animate-pulse"></div>
                                        )}
                                    </div>
                                    <span
                                        className={`text-sm transition-colors duration-300 ${
                                            step.done
                                                ? "text-green-300"
                                                : "text-blue-200"
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Fun Fact Footer */}
                <div className="mt-12 text-center">
                    <p className="text-blue-200/80 text-sm">
                        💡 Did you know? CodeNest has tracked over 2 million
                        problems solved by Indian students!
                    </p>
                </div>
            </div>

            {/* Custom Styles for Animations */}
            <style jsx="true">{`
                @keyframes float-1 {
                    0%,
                    100% {
                        transform: translate(-50%, -50%) translateY(0px)
                            rotate(0deg);
                    }
                    50% {
                        transform: translate(-50%, -50%) translateY(-10px)
                            rotate(180deg);
                    }
                }
                @keyframes float-2 {
                    0%,
                    100% {
                        transform: translate(-50%, -50%) translateY(0px)
                            rotate(0deg);
                    }
                    50% {
                        transform: translate(-50%, -50%) translateY(-8px)
                            rotate(-180deg);
                    }
                }
                @keyframes float-3 {
                    0%,
                    100% {
                        transform: translate(-50%, -50%) translateX(0px)
                            rotate(0deg);
                    }
                    50% {
                        transform: translate(-50%, -50%) translateX(-12px)
                            rotate(90deg);
                    }
                }
                @keyframes float-4 {
                    0%,
                    100% {
                        transform: translate(-50%, -50%) translateX(0px)
                            rotate(0deg);
                    }
                    50% {
                        transform: translate(-50%, -50%) translateX(12px)
                            rotate(-90deg);
                    }
                }
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                @keyframes fade-in {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-float-1 {
                    animation: float-1 3s ease-in-out infinite;
                }
                .animate-float-2 {
                    animation: float-2 3s ease-in-out infinite;
                }
                .animate-float-3 {
                    animation: float-3 3s ease-in-out infinite;
                }
                .animate-float-4 {
                    animation: float-4 3s ease-in-out infinite;
                }
                .animate-shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
                .animate-reverse {
                    animation-direction: reverse;
                }
            `}</style>
        </div>
    );
};

export default Loading;