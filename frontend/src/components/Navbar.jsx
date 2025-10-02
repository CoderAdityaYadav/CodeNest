import React, { useState, useEffect } from "react";
import { useAuthUser, useLogout } from "../hooks/auth.hooks";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    User,
    LogOut,
    Settings,
    ChevronDown,
    Home,
    Building2,
    Info,
    Trophy,
    GraduationCap, // For My College
    BookOpen, // For My Branch
    Users, // For My Section
} from "lucide-react";

const PRIMARY = "#3b82f6"; // blue-500
const PRIMARY_90 = "rgba(59,130,246,0.9)";

export default function Navbar() {
    const { data: user } = useAuthUser();
    const { mutate: logout, isLoading } = useLogout();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const joinedCollege = user?.data.collegeId;
    const joinedBranch = user?.data.branchId;
    const joinedSection = user?.data.sectionId;

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    // Base navigation items
    const baseNavigation = [
        { name: "Home", href: "/", icon: Home },
        { name: "Colleges", href: "/colleges", icon: Building2 },
        { name: "College Rankings", href: "/collegeLeaderboard", icon: Info },
        { name: "Student Rankings", href: "/studentLeaderboard", icon: Trophy },
    ];

    // Conditional navigation items based on user membership
    const conditionalNavigation = [];

    if (joinedCollege) {
        conditionalNavigation.push({
            name: "My College",
            href: `/colleges/${joinedCollege}`,
            icon: GraduationCap,
        });
    }

    if (joinedBranch && joinedCollege) {
        conditionalNavigation.push({
            name: "My Branch",
            href: `/colleges/${joinedCollege}/branches/${joinedBranch}`,
            icon: BookOpen,
        });
    }

    if (joinedSection && joinedCollege) {
        conditionalNavigation.push({
            name: "My Section",
            href: `/colleges/${joinedCollege}/sections/${joinedSection}`,
            icon: Users,
        });
    }

    // Combine base and conditional navigation
    const navigation = [...baseNavigation, ...conditionalNavigation];

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate("/login");
    };

    return (
        <>
            {/* Mobile Menu Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 relative z-50">
                <nav className="w-full px-4 lg:px-6">
                    <div className="flex items-center justify-between h-16 w-full">
                        {/* Logo - Positioned at far left */}
                        <div className="flex-shrink-0">
                            <Link
                                to="/"
                                className="flex items-center gap-3 group">
                                <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <span className="text-white font-bold text-sm">
                                        &lt;/&gt;
                                    </span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                    CodeNest
                                </h1>
                            </Link>
                        </div>

                        {/* Desktop Navigation - Centered - Changed from md: to lg: */}
                        <div className="hidden lg:flex items-center justify-center flex-1">
                            <div className="flex items-center gap-6 xl:gap-8">
                                {navigation.map((item) => {
                                    const IconComponent = item.icon;
                                    const active = isActive(item.href);

                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`
                                                inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                                ${
                                                    active
                                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm"
                                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                                                }
                                            `}>
                                            <IconComponent className="h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Desktop Actions - Positioned at far right - Changed from md: to lg: */}
                        <div className="hidden lg:flex items-center flex-shrink-0">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setUserMenuOpen(!userMenuOpen)
                                        }
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                                            <User className="h-3 w-3 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {user.name?.split(" ")[0] || "User"}
                                        </span>
                                        <ChevronDown
                                            className={`h-4 w-4 text-gray-400 transition-transform ${
                                                userMenuOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {userMenuOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() =>
                                                    setUserMenuOpen(false)
                                                }
                                            />
                                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        navigate("/profile");
                                                        setUserMenuOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                    <User className="h-4 w-4" />
                                                    Profile
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        navigate("/settings");
                                                        setUserMenuOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                    <Settings className="h-4 w-4" />
                                                    Settings
                                                </button>

                                                <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

                                                <button
                                                    onClick={handleLogout}
                                                    disabled={isLoading}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors disabled:opacity-50">
                                                    <LogOut className="h-4 w-4" />
                                                    {isLoading
                                                        ? "Logging out..."
                                                        : "Log out"}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                        Log in
                                    </button>
                                    <button
                                        onClick={() => navigate("/signup")}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                                        Sign up
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button - Changed from md:hidden to lg:hidden */}
                        <div className="lg:hidden flex-shrink-0">
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-50 relative">
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu - Changed from md:hidden to lg:hidden */}
                    <div
                        className={`
                        lg:hidden fixed left-0 right-0 top-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 
                        transition-all duration-300 ease-in-out z-40 max-h-screen overflow-y-auto
                        ${
                            mobileMenuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-4 pointer-events-none"
                        }
                    `}>
                        <div className="px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
                            {navigation.map((item) => {
                                const IconComponent = item.icon;
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`
                                            flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors
                                            ${
                                                active
                                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                                            }
                                        `}>
                                        <IconComponent className="h-5 w-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}

                            <div className="border-t border-gray-200 dark:border-gray-700 my-3" />

                            {user ? (
                                <div className="space-y-1">
                                    <div className="px-3 py-2">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            navigate("/profile");
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                        <User className="h-5 w-5" />
                                        Profile
                                    </button>

                                    <button
                                        onClick={() => {
                                            navigate("/settings");
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                        <Settings className="h-5 w-5" />
                                        Settings
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        disabled={isLoading}
                                        className="w-full flex items-center gap-3 px-3 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors disabled:opacity-50">
                                        <LogOut className="h-5 w-5" />
                                        {isLoading
                                            ? "Logging out..."
                                            : "Log out"}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <button
                                        onClick={() => {
                                            navigate("/login");
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full px-3 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left">
                                        Log in
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate("/signup");
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white text-base font-medium rounded-lg transition-colors">
                                        Sign up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}