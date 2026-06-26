import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedLayout() {

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="p-6">
                <Outlet />
            </main>

        </div>

    );

}

export default ProtectedLayout;