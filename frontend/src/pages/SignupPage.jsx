import React, { useState, useMemo } from "react";
import { useSignup } from "../hooks/auth.hooks.js";
import { useNavigate } from "react-router-dom";
import {
    User,
    Users,
    Building2,
    UserCheck,
    Shield,
    ArrowLeft,
} from "lucide-react";

const ROLES = [
    {
        id: "student",
        title: "Student",
        description: "Track your coding progress and compete with peers",
        icon: User,
        color: "text-blue-500",
    },
    {
        id: "coordinator",
        title: "Coordinator",
        description: "Manage sections and monitor student performance",
        icon: Users,
        color: "text-teal-500",
    },
    {
        id: "hod",
        title: "Head of Department",
        description: "Oversee branch-level analytics and performance",
        icon: Building2,
        color: "text-orange-500",
    },
    {
        id: "manager",
        title: "College Manager",
        description: "Manage college-wide performance and recruit talent",
        icon: UserCheck,
        color: "text-purple-500",
    },
    {
        id: "recruiter",
        title: "Recruiter",
        description: "Access talent pool and student performance data",
        icon: Shield,
        color: "text-emerald-500",
    },
    {
        id: "admin",
        title: "Admin",
        description: "Platform-level control and system management",
        icon: Shield,
        color: "text-gray-500",
        badge: "Limited",
    },
];

const PRIMARY = "#3b82f6";
const PRIMARY_90 = "rgba(59,130,246,0.9)";

export default function SignupPage() {
    const [selectedRole, setSelectedRole] = useState("");
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Side - Brand/Info */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
                    <button
                        onClick={() => navigate("/home")}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors absolute top-8 left-12">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Home
                    </button>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-xl">
                                &lt;/&gt;
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold">CodeNest</h1>
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold mb-4 leading-tight">
                            Join the Future of Education Analytics
                        </h2>
                        <p className="text-lg text-white/90 leading-relaxed mb-6">
                            Connect with India's largest network of educational
                            institutions and unlock the potential of data-driven
                            learning.
                        </p>

                        <ul className="space-y-3 text-white/90">
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                Track performance across all major coding
                                platforms
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                AI-powered insights and adaptive interventions
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                National leaderboards and competitive rankings
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                Direct recruiter access and placement
                                opportunities
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 overflow-y-auto">
                <div className="w-full max-w-2xl">
                    {" "}
                    {/* Increased max width for grid */}
                    {!showForm ? (
                        <RoleSelection
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                            setShowForm={setShowForm}
                        />
                    ) : (
                        <SignupForm
                            selectedRole={selectedRole}
                            setShowForm={setShowForm}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function RoleSelection({ selectedRole, setSelectedRole, setShowForm }) {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Create Your Account
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Choose your role and start your journey with CodeNest
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Select Your Role
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select your role to get started with the right features and
                    permissions
                </p>

                {/* Grid Layout for Roles - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ROLES.map((role) => {
                        const IconComponent = role.icon;
                        const isSelected = selectedRole === role.id;

                        return (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`
                                    relative p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 group h-full
                                    ${
                                        isSelected
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                                    }
                                `}>
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`
                                        flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                                        ${
                                            isSelected
                                                ? "bg-blue-100 dark:bg-blue-800"
                                                : "bg-gray-100 dark:bg-gray-700"
                                        }
                                    `}>
                                        <IconComponent
                                            className={`h-4 w-4 ${
                                                isSelected
                                                    ? "text-blue-600 dark:text-blue-400"
                                                    : role.color
                                            }`}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                                {role.title}
                                            </h4>
                                            {role.badge && (
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
                                                    {role.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                                            {role.description}
                                        </p>
                                    </div>

                                    {isSelected && (
                                        <div className="flex-shrink-0">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-2.5 h-2.5 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={() => selectedRole && setShowForm(true)}
                    disabled={!selectedRole}
                    className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors mt-6">
                    Continue
                </button>
            </div>
        </div>
    );
}

function SignupForm({ selectedRole, setShowForm }) {
    const { mutateAsync: signup, isPending } = useSignup();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        leetcode: "",
        gfg: "",
        github: "",
    });

    const isStudent = useMemo(() => selectedRole === "student", [selectedRole]);
    const selectedRoleData = ROLES.find((role) => role.id === selectedRole);

    const onChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
            email: form.email.trim(),
            password: form.password,
            role: selectedRole,
            ...(isStudent
                ? {
                      leetcode: form.leetcode.trim() || undefined,
                      gfg: form.gfg.trim() || undefined,
                      github: form.github.trim() || undefined,
                  }
                : {}),
        };
        await signup(payload);
        navigate("/home");
    };

    const inputClass =
        "appearance-none rounded-lg block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm";

    return (
        <div className="space-y-6 max-w-md mx-auto">
            {" "}
            {/* Constrain form width */}
            <div className="text-center">
                <button
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to role selection
                </button>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Sign Up
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    {selectedRoleData?.description}
                </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                {" "}
                {/* Reduced spacing */}
                <div className="grid grid-cols-2 gap-3">
                    {" "}
                    {/* Reduced gap */}
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            placeholder="John"
                            value={form.firstName}
                            onChange={onChange}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            placeholder="Doe"
                            value={form.lastName}
                            onChange={onChange}
                            className={inputClass}
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="john.doe@college.edu"
                        value={form.email}
                        onChange={onChange}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={onChange}
                        className={inputClass}
                    />
                </div>
                {isStudent && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Coding Platforms (Optional)
                        </h3>

                        <div className="grid grid-cols-1 gap-3">
                            <input
                                id="leetcode"
                                name="leetcode"
                                type="text"
                                placeholder="LeetCode ID"
                                value={form.leetcode}
                                onChange={onChange}
                                className={inputClass}
                            />
                            <input
                                id="gfg"
                                name="gfg"
                                type="text"
                                placeholder="GFG ID"
                                value={form.gfg}
                                onChange={onChange}
                                className={inputClass}
                            />
                            <input
                                id="github"
                                name="github"
                                type="text"
                                placeholder="GitHub Username"
                                value={form.github}
                                onChange={onChange}
                                className={inputClass}
                            />
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors">
                    {isPending ? "Creating Account..." : "Create Account"}
                </button>
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <button
                            type="button"
                            className="font-medium text-blue-500 hover:text-blue-600 transition-colors"
                            onClick={() => navigate("/login")}>
                            Log in
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}
