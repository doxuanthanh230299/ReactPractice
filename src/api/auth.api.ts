import axiosClient from "./axiosClient";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const authApi = {
    login(data: LoginPayload): Promise<LoginResponse> {
        return axiosClient.post("/auth/signin", data);
    },
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
};
