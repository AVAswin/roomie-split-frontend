import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const navigate =
        useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            const response =
                await api.post(
                    "auth/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "accessToken",
                response.data.data.accessToken
            );

            navigate("/dashboard");

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Invalid email or password."

            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="
            min-h-screen
            bg-gray-100
            flex
            items-center
            justify-center
            px-4
        ">

            <div className="
                w-full
                max-w-md
                bg-white
                rounded-2xl
                shadow-xl
                p-8
            ">

                <h1 className="
                    text-3xl
                    font-bold
                    text-center
                    text-blue-600
                ">
                    🏠 RoomieSplit
                </h1>

                <p className="
                    text-center
                    text-gray-500
                    mt-2
                    mb-8
                ">
                    Welcome back!
                </p>

                {
                    error && (

                        <div className="
                            bg-red-100
                            text-red-700
                            p-3
                            rounded-lg
                            mb-4
                        ">
                            {error}
                        </div>

                    )
                }

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="
                            block
                            text-gray-700
                            mb-2
                            font-medium
                        ">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                            className="
                                w-full
                                px-4
                                py-3
                                border
                                rounded-lg
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                    </div>

                    <div>

                        <label className="
                            block
                            text-gray-700
                            mb-2
                            font-medium
                        ">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="********"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                required
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    rounded-lg
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="
                                    absolute
                                    right-4
                                    top-3
                                    text-gray-500
                                "
                            >
                                {
                                    showPassword
                                        ? "🙈"
                                        : "👁️"
                                }
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-semibold
                            py-3
                            rounded-lg
                            transition
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                        "
                    >
                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }
                    </button>

                </form>

                <p className="
                    text-center
                    mt-6
                    text-gray-600
                ">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="
                            ml-2
                            text-blue-600
                            hover:underline
                            font-medium
                        "
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default LoginPage;