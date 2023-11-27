import { Grid, Stack } from "@mui/material";
import Haircare from "./Haircare";
import Makeup from "./Makeup";
import Price from "./Price";
import Search from "./Search";
import Skincare from "./Skincare";

const Sidebar = () => {
  return (
    <Grid item xs={0} md={3}>
      <Stack
        sx={{
          boxShadow:
            "0px -3px 8px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Search filter */}
        <Search />
        {/* Skin care filter */}
        <Skincare />
        {/* Makeup care filter */}
        <Makeup />
        {/* Hair care filter */}
        <Haircare />
        {/* Price  filter */}
        <Price />
      </Stack>
    </Grid>
  );
};

export default Sidebar;
