import ModalCreateCustomer from "./components/ModalCreateCustomer";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { customerApi } from "./api/customer.api";
import type { CustomerI } from "./types";
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

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setCustomer(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [customers, setCustomers] = useState<CustomerI[]>([]);
  const [customer, setCustomer] = useState<CustomerI | null>(null);

  const handleEdit = (customer: CustomerI) => {
    setCustomer(customer);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      customerApi
        .delete(id)
        .then(() => {
          setCustomers(customers.filter((customer) => customer.id !== id));
          toast.success("Xóa khách hàng thành công!");
        })
        .catch((error) => {
          toast.error("Xóa khách hàng thất bại!");
          console.error("Failed to delete customer:", error);
        });
    }
  };

  const handleSuccess = () => {
    customerApi
      .getList()
      .then((data) => {
        console.log("data", data);
        setCustomers(data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch customers:", error);
      });
  };

  useEffect(() => {
    customerApi
      .getList()
      .then((data) => {
        console.log("data", data);
        setCustomers(data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch customers:", error);
      });
  }, []);
  return (
    <div className="App">
      <Button onClick={handleOpen}>Tạo khách hàng</Button>
      <ModalCreateCustomer
        open={open}
        onClose={handleClose}
        customer={customer}
        onSuccess={handleSuccess}
      />
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Số tiền đã tiêu</TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length ? (
              customers.map((customer: CustomerI) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.rank}</TableCell>
                  <TableCell>{customer.totalSpending}</TableCell>
                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ justifyContent: "flex-end" }}
                    >
                      <EditIcon onClick={() => handleEdit(customer)} />
                      <DeleteIcon
                        color="error"
                        onClick={() => handleDelete(customer.id)}
                      />
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
    </div>
  );
}

export default App;
