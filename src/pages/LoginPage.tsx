import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/auth.api";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (field: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await authApi.login(form);

            // lưu token
            localStorage.setItem("access_token", res.accessToken);

            toast.success("Đăng nhập thành công 🎉");

            // chuyển trang
            navigate("/customers");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Sai email hoặc mật khẩu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
    }, [])

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                background: "linear-gradient(120deg,#0f2027,#203a43,#2c5364)",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper elevation={10} sx={{ width: 380, p: 4, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight="bold" mb={1}>
                    Sign in
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                    Đăng nhập hệ thống
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        required
                        value={form.email}
                        onChange={handleChange("email")}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        required
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange("password")}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button fullWidth variant="contained" size="large" type="submit" disabled={loading} sx={{ mt: 3, height: 48 }}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;
