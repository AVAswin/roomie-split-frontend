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
import NotificationsPage from "../pages/NotificationsPage";
import HousePage from "../pages/HousePage";

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

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <NotificationsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/house"
                    element={
                        <ProtectedRoute>
                            <HousePage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;