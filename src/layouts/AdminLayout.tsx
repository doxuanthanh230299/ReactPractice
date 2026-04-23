import { Box, Container } from "@mui/material";
import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <Box sx={{ display: "flex", bgcolor: "#f4f7f6", minHeight: "100vh" }}>
            <Sidebar />

            <Box sx={{ flex: 1, p: 3 }}>
                {/* <Header /> */}

                <Container sx={{ mt: 3 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default AdminLayout;
