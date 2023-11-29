import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import filtersSlice from "../../../reducers/filtersSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  return (
    <Box sx={{ padding: "15px 8px 15px 15px" }}>
      <Typography
        mb={1}
        sx={{
          color: "#242424",
          fontWeight: "bold",
        }}
      >
        Search
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          error
          id="outlined-error"
          size="small"
          label="search"
          sx={{
            flex: 1,
            marginRight: "4px",
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => {
            dispatch(filtersSlice.actions.setSearchText(searchText));
          }}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
