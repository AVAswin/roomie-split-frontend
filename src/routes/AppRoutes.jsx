import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ExpensePage from "../pages/ExpensePage";
import MyDuesPage from "../pages/MyDuesPage";
import MyPaidPage from "../pages/MyPaidPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <DashboardPage />
                    }
                />

                <Route
                    path="/expenses"
                    element={
                        <ProtectedRoute>
                            <ExpensePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-dues"
                    element={
                        <ProtectedRoute>
                            <MyDuesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-paid"
                    element={
                        <ProtectedRoute>
                            <MyPaidPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;