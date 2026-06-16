import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem(
            "accessToken"
        );

        navigate("/");
    };

    return (

        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                borderBottom: "1px solid #ddd"
            }}
        >

            <h2>RoomieSplit</h2>

            <div>

                <button
                    onClick={() =>
                        navigate("/notifications")
                    }
                >
                    🔔
                </button>

                <button
                    onClick={handleLogout}
                    style={{
                        marginLeft: "1rem"
                    }}
                >
                    Logout
                </button>

                <button
                    onClick={() =>
                        navigate("/expenses")
                    }
                >
                    Expenses
                </button>

                <button
                    onClick={() =>
                        navigate("/my-dues")
                    }
                >
                    My Dues
                </button>

                <button
                    onClick={() =>
                        navigate("/my-paid")
                    }
                >
                    My Paid
                </button>

            </div>

        </nav>
    );
}

export default Navbar;