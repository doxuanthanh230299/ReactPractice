import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box } from "@mui/material";
import { Home, Inventory, ShoppingCart, People, BarChart } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menu = [
    { text: "Tổng quan", icon: <Home />, path: "/dashboard" },
    { text: "Sản phẩm", icon: <Inventory />, path: "/products" },
    { text: "Đơn hàng", icon: <ShoppingCart />, path: "/orders" },
    { text: "Khách hàng", icon: <People />, path: "/customers" },
    { text: "Báo cáo", icon: <BarChart />, path: "/reports" },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    bgcolor: "#2c3e50",
                    color: "#fff",
                },
            }}
        >
            <Toolbar>
                <Typography variant="h6" color="#3498db" fontWeight="bold">
                    ShopAdmin
                </Typography>
            </Toolbar>

            <List>
                {menu.map((item) => (
                    <ListItemButton key={item.text} selected={location.pathname === item.path} onClick={() => navigate(item.path)}>
                        <ListItemIcon sx={{ color: "#ecf0f1" }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
