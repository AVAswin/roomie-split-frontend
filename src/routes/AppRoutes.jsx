import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ExpensePage from "../pages/ExpensePage";
import MyDuesPage from "../pages/MyDuesPage";
import MyPaidPage from "../pages/MyPaidPage";
import ProtectedRoute from "./ProtectedRoute";
import NotificationsPage from "../pages/NotificationsPage";
import HousePage from "../pages/HousePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedLayout from "./ProtectedLayout";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/expenses"
                        element={<ExpensePage />}
                    />

                    <Route
                        path="/house"
                        element={<HousePage />}
                    />

                    <Route
                        path="/my-dues"
                        element={<MyDuesPage />}
                    />

                    <Route
                        path="/my-paid"
                        element={<MyPaidPage />}
                    />

                    <Route
                        path="/notifications"
                        element={<NotificationsPage />}
                    />

                </Route>

                <Route
                        path="/login"
                        element={<LoginPage />}
                />

                <Route
                        path="/register"
                        element={<RegisterPage />}
                />

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;