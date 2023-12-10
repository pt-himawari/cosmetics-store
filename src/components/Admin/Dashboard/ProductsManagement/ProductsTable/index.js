import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
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
import React, { useMemo } from "react";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

import { useSelector } from "react-redux";
import { cosmeticsListSelector } from "../../../../../redux-toolkit/selectors";
import { transformData } from "./dataUtils";
import { getComparator, stableSort } from "./utils";

export default function ProductsTable(props) {
  const { setEditProductDetails, setSelectProduct } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("currentPrice");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const products = useSelector(cosmeticsListSelector);

  const rows = useMemo(() => transformData(products), [products]);
  console.log(rows);
  // console.log(rows);

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

  console.log(visibleRows);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          setSelected={setSelected}
          selected={selected}
          numSelected={selected.length}
        />
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
                      <Link
                        component="button"
                        underline="hover"
                        sx={{
                          color: "#8e4ec6",
                        }}
                        onClick={() => {
                          setSelectProduct({ id: row.id });
                          setEditProductDetails(true);
                          // console.info("I'm a button.");
                        }}
                      >
                        #{row.id}
                      </Link>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        px: "10px !important",
                        textTransform: "capitalize",
                      }}
                    >
                      <Link
                        component="button"
                        underline="hover"
                        sx={{
                          color: "#8e4ec6",
                        }}
                        onClick={() => {
                          setSelectProduct({ id: row.id });
                          setEditProductDetails(true);
                          // console.info("I'm a button.");
                        }}
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.type}
                        sx={{
                          borderRadius: "5px",
                          textTransform: "capitalize",
                          backgroundColor:
                            row.type === "skincare"
                              ? "#00b4cf1d"
                              : row.type === "makeup"
                              ? "#f0004715"
                              : "#f7900938",
                          color:
                            row.type === "skincare"
                              ? "#007da5"
                              : row.type === "makeup"
                              ? "#cb1d63"
                              : "#b54708f7",
                        }}
                        // variant="outlined"
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {row.category}
                    </TableCell>

                    {/* <TableCell align="center">
                        {row.shipping === 0 ? "Free" : row.shipping}
                      </TableCell> */}
                    <TableCell
                      align="center"
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      {row.brand}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        textTransform: "uppercase",
                        color: row.quantity === 0 ? "#b42318" : "",
                      }}
                    >
                      {row.quantity === 0 ? (
                        <Chip
                          label="OOS"
                          sx={{
                            backgroundColor: "#f04438c4",
                            color: "#fff",
                            borderRadius: "5px",
                          }}
                        />
                      ) : (
                        row.quantity
                      )}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: row.currentPrice === 0 ? "#b42318" : "",
                      }}
                    >
                      ${row.currentPrice}
                    </TableCell>
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
  );
}
