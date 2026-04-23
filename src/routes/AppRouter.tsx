import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerPage from "../pages/CustomerPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminLayout from "../layouts/AdminLayout";
import ProductPage from "../pages/ProductPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
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
                <Route
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/products" element={<ProductPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
