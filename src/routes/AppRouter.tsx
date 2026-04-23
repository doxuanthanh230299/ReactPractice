import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerPage from "../pages/CustomerPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminLayout from "../layouts/AdminLayout";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* login */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/customers" element={<CustomerPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
