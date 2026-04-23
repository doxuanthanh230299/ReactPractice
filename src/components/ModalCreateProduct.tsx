import * as React from "react";
import { Box, Button, Modal, TextField, Stack, Typography, Autocomplete } from "@mui/material";
import type { ProductI } from "../types";
import type { CategoryI } from "../types";
import { productApi } from "../api/products.api";
import { toast } from "react-toastify";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};

export default function ModalCreateProduct({ open, onClose, product, onSuccess }: { open: boolean; onClose: () => void; product: ProductI | null; onSuccess: () => void }) {
    const [defaultProduct, setDefaultProduct] = React.useState<ProductI | null>(product);
    const [categories, setCategories] = React.useState<CategoryI[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<CategoryI | null>(null);

    // load categories khi mở modal
    React.useEffect(() => {
        if (!open) return;

        productApi.getListCategory().then(setCategories);
        setDefaultProduct(product);
    }, [open]);

    // handle change text field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDefaultProduct((prev) => ({ ...prev, [name]: value } as ProductI));
    };

    const handleSubmit = () => {
        if (!defaultProduct) return;

        const payload = {
            ...defaultProduct,
            categoryId: selectedCategory?.id,
        };

        if (product) {
            productApi.update(product.id, payload).then(() => {
                toast.success("Cập nhật sản phẩm thành công!");
                onSuccess();
                onClose();
            });
        } else {
            productApi.create(payload).then(() => {
                toast.success("Tạo sản phẩm thành công!");
                onSuccess();
                onClose();
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6">{product ? "Cập nhật sản phẩm" : "Tạo mới sản phẩm"}</Typography>

                <Stack spacing={1.5} sx={{ mt: 2 }}>
                    <TextField
                        label="Tên sản phẩm"
                        defaultValue={defaultProduct?.name || ""}
                        onChange={(e) =>
                            handleChange({
                                ...e,
                                target: { ...e.target, name: "name" },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        fullWidth
                    />

                    {/* ⭐ AUTOCOMPLETE CATEGORY */}
                    <Autocomplete
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        value={selectedCategory}
                        onChange={(_, value) => setSelectedCategory(value)}
                        renderInput={(params) => <TextField {...params} label="Danh mục" />}
                    />

                    <TextField
                        label="Giá"
                        type="number"
                        defaultValue={defaultProduct?.price || ""}
                        onChange={(e) => setDefaultProduct((prev) => ({ ...prev, price: Number(e.target.value) } as ProductI))}
                        fullWidth
                    />

                    <TextField
                        label="Tồn kho"
                        type="number"
                        defaultValue={defaultProduct?.remaining || ""}
                        onChange={(e) => setDefaultProduct((prev) => ({ ...prev, stock: Number(e.target.value) } as ProductI))}
                        fullWidth
                    />

                    <TextField
                        label="Mô tả"
                        defaultValue={defaultProduct?.sku || ""}
                        onChange={(e) =>
                            handleChange({
                                ...e,
                                target: { ...e.target, name: "sku" },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        fullWidth
                    />

                    <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            {product ? "Cập nhật" : "Tạo mới"}
                        </Button>
                        <Button variant="contained" color="error" onClick={onClose}>
                            Hủy
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
