import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, Typography } from "@mui/material";

const Search = () => {
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
          id="search-bar"
          variant="outlined"
          size="small"
          placeholder="search..."
          color="secondary"
          sx={{
            flex: 1,
            marginRight: "4px",
          }}
        />
        <Button variant="contained" color="secondary" size="large">
          <SearchIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
