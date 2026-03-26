import React, {useState} from "react";
import {FiUserPlus} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username || !fullName || !password || !confirmPassword || email) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    fullName,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed.");
                setLoading(false);
                return;
            }

            window.dispatchEvent(new CustomEvent("auth-changed", {detail: {loggedIn: true}}));
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div
                className="w-full max-w-md bg-gray-800 border border-amber-500/30 rounded-2xl p-8 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                {/* Title */}
                <h1 className="text-3xl font-black text-center mb-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                    Register
                </h1>

                {/* Error Message */}
                {error && (
                    <p className="mb-4 text-red-400 text-center font-medium">
                        {error}
                    </p>
                )}

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 transition-all"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 transition-all"
                            placeholder="enter a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 transition-all"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 transition-all"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-300 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 transition-all"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                    >
                        {loading ? (
                            <span className="animate-pulse">Creating Account...</span>
                        ) : (
                            <>
                                <FiUserPlus size={20}/>
                                Register
                            </>
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/auth/login"
                        className="text-amber-400 hover:text-amber-300 transition-colors"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
