import React, { useMemo, useState } from "react";

import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material/";
import Chip from "@mui/material/Chip";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import dayjs from "dayjs";
import { transformData } from "./dataUtils";
import { getComparator, stableSort } from "./utils";
import { useSelector } from "react-redux";
import { orderListSelector } from "../../../../redux-toolkit/selectors";

export default function OrderManagement() {
  const orderList = useSelector(orderListSelector);

  const rows = useMemo(() => transformData(orderList), [orderList]);
  // console.log(rows);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("totalAmount");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    // <Container maxWidth="lg" sx={{ mt: 18, mb: 4 }}>
    <Box sx={{ width: "90%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ Width: 500 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      #{row.orderID}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        color: "#121f43",
                        fontWeight: 600,
                      }}
                    >
                      {row.customers}
                    </TableCell>

                    <TableCell align="center">
                      {" "}
                      {dayjs.unix(row.orderDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.status}
                        sx={{
                          borderRadius: "5px",
                          backgroundColor:
                            row.status === "REFUNDED"
                              ? "#f0443842"
                              : row.status === "DELIVERED"
                              ? "#10b98133"
                              : "#f7900938",
                          color:
                            row.status === "REFUNDED"
                              ? "#b42318"
                              : row.status === "DELIVERED"
                              ? "#0b815a"
                              : "#b54708f7",
                        }}
                        // variant="outlined"
                      />
                    </TableCell>
                    {/* <TableCell align="center">
                        {row.shipping === 0 ? "Free" : row.shipping}
                      </TableCell> */}

                    <TableCell align="center">{row.totalProduct}</TableCell>
                    <TableCell align="center">${row.totalAmount}</TableCell>

                    <TableCell align="center">{row.email}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            // height: (dense ? 33 : 53) * emptyRows,
            borderTop: "none",
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={
          <Switch
            color="secondary"
            checked={dense}
            onChange={handleChangeDense}
          />
        }
        label="Dense padding"
      />
    </Box>
    // </Container>
  );
}
