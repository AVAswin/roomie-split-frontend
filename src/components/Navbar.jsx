import {
    NavLink,
    useNavigate
} from "react-router-dom";

import { useEffect, useState }
from "react";

import {
    getUnreadCount
} from "../api/notificationApi";

function Navbar() {

    const navigate =
        useNavigate();

    const [unreadCount, setUnreadCount] = useState(0);

    const handleLogout = () => {

        localStorage.removeItem(
            "accessToken"
        );

        navigate("/");
    };

    useEffect(() => {

    loadUnreadCount();

}, []);

const loadUnreadCount =
    async () => {

        try {

            const count =
                await getUnreadCount();

            setUnreadCount(count);

        } catch (error) {

            console.error(error);
        }
    };

    const navClass =
        ({ isActive }) =>
            isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600";

    return (

        <nav
            className="
                bg-white
                shadow
                px-8
                py-4
                flex
                justify-between
                items-center
            "
        >

            <h1
                className="
                    text-2xl
                    font-bold
                    text-blue-600
                "
            >
                RoomieSplit
            </h1>

            <div
                className="
                    flex
                    items-center
                    gap-6
                "
            >

                <NavLink
                    to="/dashboard"
                    className={navClass}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/house"
                    className={navClass}
                >
                    House
                </NavLink>

                <NavLink
                    to="/expenses"
                    className={navClass}
                >
                    Expenses
                </NavLink>

                <NavLink
                    to="/my-dues"
                    className={navClass}
                >
                    My Dues
                </NavLink>

                <NavLink
                    to="/my-paid"
                    className={navClass}
                >
                    My Paid
                </NavLink>

                <NavLink
                    to="/notifications"
                    className="relative"
                >

                    🔔

                    {
                        unreadCount > 0 && (

                            <span
                                className="
                                    absolute
                                    -top-2
                                    -right-3
                                    bg-red-500
                                    text-white
                                    text-xs
                                    rounded-full
                                    px-2
                                "
                            >
                                {unreadCount}
                            </span>

                        )
                    }

                </NavLink>

                <button
                    onClick={handleLogout}
                    className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                    "
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;