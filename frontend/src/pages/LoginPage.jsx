import React, { useState } from "react";
import { useLogin } from "../hooks/auth.hooks";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PRIMARY = "#3b82f6"; // blue-500
const PRIMARY_90 = "rgba(59,130,246,0.9)";

export default function LoginPage() {
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
                            Welcome Back to the Future
                        </h2>
                        <p className="text-lg text-white/90 leading-relaxed mb-6">
                            Continue your journey with India's most
                            comprehensive education analytics platform.
                        </p>

                        <ul className="space-y-3 text-white/90">
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                Access your personalized dashboard and insights
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                Track your progress across coding platforms
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                Connect with peers and mentors nationwide
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                Get AI-powered career recommendations
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

function LoginForm() {
    const { mutateAsync: login, isPending } = useLogin();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const onChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        await login({ email: form.email.trim(), password: form.password });
        navigate("/home");
    };

    const inputClass =
        "appearance-none rounded-lg block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm";

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Log in to your CodeNest account to continue your journey
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={onChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={onChange}
                        className={inputClass}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <button
                            type="button"
                            className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
                            Forgot password?
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors">
                    {isPending ? "Logging in..." : "Log in"}
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
                            Sign up
                        </button>
                    </p>
                </div>

                {/* Social Login Options (Optional) */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span className="ml-2">Google</span>
                        </button>

                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.264.32.03.889-.105 1.02-.394.389-.889-.263-.889-.263-.889-3.107 4.235-8.395 11.894-5.85 2.654.88 4.538 3.438 4.538 6.265 0 8.098-4.853 14.86-11.608 14.86C5.955 24 .587 18.634.587 11.987.587 5.348 5.955.021 12.017.021z" />
                            </svg>
                            <span className="ml-2">GitHub</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
