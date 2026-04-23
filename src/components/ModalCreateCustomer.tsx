import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import type { CustomerI } from "../types";
import { FormControl, InputLabel, Typography } from "@mui/material";
import { customerApi } from "../api/customer.api";
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

export default function ModalCreateCustomer({
  open,
  onClose,
  customer,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  customer: CustomerI | null;
  onSuccess: () => void;
}) {
  const [defaultCustomer, setDefaultCustomer] =
    React.useState<CustomerI | null>(customer);
  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    | SelectChangeEvent<string>) => {
    setDefaultCustomer((prev) => ({ ...prev, [name]: value }) as CustomerI);
  };

  const handleSubmit = () => {
    if (customer) {
      console.log("Cập nhật khách hàng:", defaultCustomer);
      customerApi
        .update(customer.id, defaultCustomer as CustomerI)
        .then(() => {
          toast.success("Cập nhật khách hàng thành công!");
          onSuccess();
          onClose();
        })
        .catch((error) => {
          toast.error("Cập nhật khách hàng thất bại!");
          console.error("Failed to create/update customer:", error);
        });
    } else {
      customerApi
        .create(defaultCustomer as CustomerI)
        .then(() => {
          toast.success("Tạo khách hàng thành công!");
          onSuccess();
          onClose();
        })
        .catch((error) => {
          toast.error("Tạo khách hàng thất bại!");
          console.error("Failed to create/update customer:", error);
        });
    }
  };
  React.useEffect(() => {
    if (!open) return;
    setDefaultCustomer(customer);
  }, [open]);
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {customer ? "Cập nhật khách hàng" : "Tạo mới khách hàng"}
          </Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Họ tên"
              defaultValue={defaultCustomer?.name || ""}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "name" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              fullWidth
            />
            <TextField
              id="phone"
              label="Số điện thoại"
              defaultValue={defaultCustomer?.phone || ""}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "phone" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              fullWidth
            />
            <TextField
              id="email"
              label="Email"
              defaultValue={defaultCustomer?.email || ""}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "email" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              fullWidth
            />
            <TextField
              id="address"
              label="Địa chỉ"
              defaultValue={defaultCustomer?.address || ""}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "address" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="rank-label">Rank</InputLabel>
              <Select
                labelId="rank-label"
                id="rank"
                value={defaultCustomer?.rank || ""}
                label="Rank"
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "rank" },
                  } as
                    | React.ChangeEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLTextAreaElement>
                    | React.ChangeEvent<HTMLSelectElement>)
                }
                fullWidth
              >
                <MenuItem value={"BRONZE"}>Đồng</MenuItem>
                <MenuItem value={"SILVER"}>Bạc</MenuItem>
                <MenuItem value={"GOLD"}>Vàng</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="spent"
              label="Số tiền đã tiêu"
              onChange={(e) =>
                setDefaultCustomer(
                  (prev) =>
                    ({
                      ...prev,
                      totalSpending: Number(e.target.value),
                    }) as CustomerI,
                )
              }
              defaultValue={defaultCustomer?.totalSpending || ""}
              fullWidth
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {customer ? "Cập nhật" : "Tạo mới"}
              </Button>
              <Button variant="contained" color="error" onClick={onClose}>
                Hủy
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
