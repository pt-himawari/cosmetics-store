import { Box, Grid } from "@mui/material/";
import React from "react";

const ImageInfo = ({ productWithId }) => {
  return (
    <Grid
      item
      xs={12}
      md={5}
      mb={8}
      sx={{
        padding: "5px !important",
        maxHeight: "350px",
        border: "1px solid #b2c9dc",
        borderRadius: "10px",
      }}
    >
      <Box
        component="img"
        sx={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
          margin: "auto",
          display: "block",
        }}
        src={productWithId.image}
        alt="Paella dish"
      ></Box>
    </Grid>
  );
};

export default ImageInfo;
