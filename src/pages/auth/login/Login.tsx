import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
    const navigate= useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                setLoading(false);
                return;
            }

            // ✅ Login successful → redirect
            try {
                // API sets cookie; notify UI to refetch user via API
                window.dispatchEvent(new CustomEvent("auth-changed", { detail: { loggedIn: true } }));
            } catch {
                // do nothing
            }
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md bg-gray-800 border border-amber-500/30 rounded-2xl p-8 shadow-[0_0_25px_rgba(245,158,11,0.25)]">

                {/* Title */}
                <h1 className="text-3xl font-black text-center mb-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                    Login
                </h1>

                {/* Error Message */}
                {error && (
                    <p className="mb-4 text-red-400 text-center font-medium">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    {/* Username */}
                    <div>
                        <label className="block text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 transition-all"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 transition-all"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                    >
                        {loading ? (
                            <span className="animate-pulse">Logging in...</span>
                        ) : (
                            <>
                                <FiLogIn size={20} />
                                Login
                            </>
                        )}
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center text-gray-400 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/auth/register"
                        className="text-amber-400 hover:text-amber-300 transition-colors"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
