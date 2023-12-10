import { Grid, Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../../reducers/filtersSlice";
import Haircare from "./Haircare";
import Makeup from "./Makeup";
import Price from "./Price";
import Search from "./Search";
import Skincare from "./Skincare";
import Brands from "./Brands";
import { searchCategorySelector } from "../../../redux-toolkit/selectors";

const Sidebar = () => {
  const dispatch = useDispatch();

  const category = useSelector(searchCategorySelector);
  return (
    <Grid item xs={12} md={3}>
      <Stack
        sx={{
          fontSize: "14px !important",
          boxShadow:
            "0px -3px 8px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Search filter */}
        <Search />

        {/* search All */}
        <Button
          // value={category}
          sx={{
            width: "100%",
            py: 1,
            px: 2,
            fontSize: "16px",
            color: category === "All" ? "#CC4343" : "black",

            fontWeight: "bold",
            borderTop: "1px solid #ccc",
            borderRadius: "0px",
            justifyContent: "flex-start",
            textTransform: "capitalize",
            // backgroundColor: "#ccc",
          }}
          onClick={() => {
            dispatch(filtersSlice.actions.setSearchCategory("All"));
            dispatch(filtersSlice.actions.setSearchType("All"));
          }}
        >
          All
        </Button>

        {/* Skin care filter */}
        <Skincare />
        {/* Makeup care filter */}
        <Makeup />
        {/* Hair care filter */}
        <Haircare />
        {/* Price  filter */}
        <Price />
        {/* Brand filter */}
        <Brands />
      </Stack>
    </Grid>
  );
};

export default Sidebar;
