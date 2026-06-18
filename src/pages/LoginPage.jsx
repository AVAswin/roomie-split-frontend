import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response =
                await api.post(
                    "/auth/login",
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

        } catch (error) {

            console.error(error);

            console.log(error.response);

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    // return (
    //     <div>

    //         <h1>Login</h1>

    //         <form onSubmit={handleLogin}>

    //             <input
    //                 type="email"
    //                 placeholder="Email"
    //                 value={email}
    //                 onChange={(e) =>
    //                     setEmail(e.target.value)
    //                 }
    //             />

    //             <br />

    //             <input
    //                 type="password"
    //                 placeholder="Password"
    //                 value={password}
    //                 onChange={(e) =>
    //                     setPassword(
    //                         e.target.value
    //                     )
    //                 }
    //             />

    //             <br />

    //             <button type="submit">
    //                 Login
    //             </button>

    //         </form>

    //     </div>
    // );

return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-xl shadow-lg w-96"
        >

            <h1 className="text-3xl font-bold text-center mb-6">
                RoomieSplit
            </h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                className="w-full border rounded p-3 mb-4"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className="w-full border rounded p-3 mb-4"
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
            >
                Login
            </button>

        </form>

    </div>
);
}

export default LoginPage;