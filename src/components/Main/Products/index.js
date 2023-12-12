import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import Product from "./Product";
import { fetchCosmeticsThunkAction } from "../../../reducers/cosmeticSlice";
import { filtersCosmeticsSelector } from "../../../redux-toolkit/selectors";

const Products = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 9;
  const remainCosmetics = useSelector(filtersCosmeticsSelector);
  useEffect(() => {
    dispatch(fetchCosmeticsThunkAction()); // Fetch toàn bộ dữ liệu
  }, [dispatch]);
  // Tính toán dữ liệu phân trang từ dữ liệu đã lọc
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return remainCosmetics.slice(startIndex, startIndex + limit);
  }, [remainCosmetics, page, limit]);

  // Tính toán tổng số trang
  const totalPageCount = useMemo(() => {
    return Math.ceil(remainCosmetics.length / limit);
  }, [remainCosmetics.length, limit]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          {paginatedData.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        my={3}
        sx={{
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box>
          {page} of {totalPageCount}
        </Box>
        <Pagination
          count={totalPageCount}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          sx={{
            ".Mui-selected": {
              color: "white", // active page number color
              backgroundColor: "#ca244d !important", // active page number background color
            },
            ".MuiButtonBase-root:hover": {
              backgroundColor: "#ca244d", // hover state background color
            },
          }}
        />
      </Stack>
    </>
  );
};

export default Products;
