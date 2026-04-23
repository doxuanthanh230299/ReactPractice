import { Box, Button, Modal, Stack, Typography, Fade, Backdrop } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface Props {
    open: boolean;
    title?: string;
    description?: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ModalConfirm({
    open,
    title = "Xác nhận xoá",
    description = "Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xoá dữ liệu này?",
    loading = false,
    onClose,
    onConfirm,
}: Props) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: { timeout: 300 },
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 420,
                        bgcolor: "background.paper",
                        borderRadius: 4,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                        p: 4,
                    }}
                >
                    {/* icon + title */}
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                bgcolor: "#f3b9b8",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <WarningAmberRoundedIcon color="error" />
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {title}
                        </Typography>
                    </Stack>

                    {/* description */}
                    <Typography sx={{lineHeight: '1.6', mb: '4', color: "text.secondary" }}>
                        {description}
                    </Typography>

                    {/* actions */}
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                px: 3,
                                borderRadius: 2,
                                textTransform: "none",
                            }}
                        >
                            Huỷ
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={onConfirm}
                            disabled={loading}
                            sx={{
                                px: 3,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                boxShadow: "0 8px 20px rgba(211,47,47,0.35)",
                                "&:hover": {
                                    boxShadow: "0 10px 25px rgba(211,47,47,0.5)",
                                },
                            }}
                        >
                            {loading ? "Đang xoá..." : "Xoá"}
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}
