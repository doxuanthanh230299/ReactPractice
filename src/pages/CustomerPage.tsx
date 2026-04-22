import ModalCreateCustomer from "../components/ModalCreateCustomer";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { customerApi } from "../api/customer.api";
import type { CustomerI } from "../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import { Stack } from "@mui/material";

function CustomerPage() {
    const [open, setOpen] = useState<boolean>(false);
    const [customers, setCustomers] = useState<CustomerI[]>([]);
    const [customer, setCustomer] = useState<CustomerI | null>(null);

    const handleOpen = () => {
        setCustomer(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const fetchCustomers = () => {
        customerApi
            .getList()
            .then((data) => setCustomers(data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleEdit = (customer: CustomerI) => {
        setCustomer(customer);
        setOpen(true);
    };

    const handleDelete = (id: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) return;

        customerApi
            .delete(id)
            .then(() => {
                setCustomers((prev) => prev.filter((c) => c.id !== id));
                toast.success("Xóa khách hàng thành công!");
            })
            .catch(() => toast.error("Xóa khách hàng thất bại!"));
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Tạo khách hàng
            </Button>

            <ModalCreateCustomer open={open} onClose={handleClose} customer={customer} onSuccess={fetchCustomers} />

            <ToastContainer />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>SĐT</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Rank</TableCell>
                            <TableCell>Số tiền đã tiêu</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {customers.length ? (
                            customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.address}</TableCell>
                                    <TableCell>{customer.rank}</TableCell>
                                    <TableCell>{customer.totalSpending}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={2}>
                                            <EditIcon onClick={() => handleEdit(customer)} />
                                            <DeleteIcon color="error" onClick={() => handleDelete(customer.id)} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CustomerPage;
