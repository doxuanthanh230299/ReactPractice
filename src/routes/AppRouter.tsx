import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerPage from "../pages/CustomerPage";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/customers" element={<CustomerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;