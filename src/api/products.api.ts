import axiosClient from "./axiosClient";
import type { ProductI } from "../types";
import type { CategoryI } from "../types/category";

export const productApi = {
    getList(): Promise<ProductI[]> {
        return axiosClient.get("/products");
    },

    getDetail(id: number): Promise<ProductI> {
        return axiosClient.get(`/products/${id}`);
    },

    create(data: ProductI) {
        return axiosClient.post("/products", data);
    },

    update(id: number, data: ProductI) {
        return axiosClient.put(`/products/${id}`, data);
    },

    delete(id: number) {
        return axiosClient.delete(`/products/${id}`);
    },

    getListCategory(): Promise<CategoryI[]> {
        return axiosClient.get("/categories");
    },
};
