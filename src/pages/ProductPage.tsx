import ModalCreateProduct from "../components/ModalCreateProduct";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { productApi } from "../api/products.api";
import type { ProductI } from "../types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import ModalConfirm from "../components/ModalConfirm";

function ProductPage() {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<ProductI[]>([]);
    const [product, setProduct] = useState<ProductI | null>(null);

    const fetchProducts = () => {
        productApi
            .getList()
            .then(setProducts)
            .catch(() => toast.error("Lỗi tải sản phẩm"));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpen = () => {
        setProduct(null);
        setOpen(true);
    };

    const handleEdit = (p: ProductI) => {
        setProduct(p);
        setOpen(true);
    };
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        try {
            setLoadingDelete(true);
            await productApi.delete(deleteId);
            setProducts((prev) => prev.filter((c) => c.id !== deleteId));
            toast.success("Xóa khách hàng thành công!");
        } catch {
            toast.error("Xóa khách hàng thất bại!");
        } finally {
            setLoadingDelete(false);
            setDeleteId(null);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
                Tạo sản phẩm
            </Button>
            <ModalCreateProduct open={open} onClose={() => setOpen(false)} product={product} onSuccess={fetchProducts} />
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên</TableCell>
                            <TableCell>Danh mục</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Tồn kho</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.length ? (
                            products.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>{p.category.name}</TableCell>
                                    <TableCell>{p.price.toLocaleString()} đ</TableCell>
                                    <TableCell>{p.remaining}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={2}>
                                            <EditIcon onClick={() => handleEdit(p)} />
                                            <DeleteIcon color="error" onClick={() => setDeleteId(p.id)} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <ModalConfirm open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleConfirmDelete} loading={loadingDelete} description="Sản phẩm sẽ bị xoá vĩnh viễn." />
        </div>
    );
}

export default ProductPage;
