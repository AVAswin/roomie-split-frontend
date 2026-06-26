import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import api from "../api/axios";

function RegisterPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            setLoading(true);

            await register(form);

            setSuccess(
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Registration failed."

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
                    Create your account
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

                {
                    success && (

                        <div className="
                            bg-green-100
                            text-green-700
                            p-3
                            rounded-lg
                            mb-4
                        ">
                            {success}
                        </div>

                    )
                }

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="
                            block
                            text-gray-700
                            mb-2
                            font-medium
                        ">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Please enter your username"
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
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
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
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                placeholder="********"
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
                                ? "Creating Account..."
                                : "Create Account"
                        }
                    </button>

                </form>

                <p className="
                    text-center
                    mt-6
                    text-gray-600
                ">

                    Already have an account?

                    <Link
                        to="/login"
                        className="
                            ml-2
                            text-blue-600
                            hover:underline
                            font-medium
                        "
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default RegisterPage;