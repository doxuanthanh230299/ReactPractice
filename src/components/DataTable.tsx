import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export interface Column<T> {
    field: keyof T | string;
    headerName: string;
    render?: (row: T) => React.ReactNode;
}

interface Props<T> {
    columns: Column<T>[];
    rows: T[];
    emptyText?: string;
}

function DataTable<T extends { id: number | string }>({ columns, rows, emptyText = "Không có dữ liệu" }: Props<T>) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={String(col.field)}>{col.headerName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.length ? (
                        rows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((col) => (
                                    <TableCell key={String(col.field)}>{col.render ? col.render(row) : (row as any)[col.field]}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                {emptyText}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataTable;
