import { Box, Button, Grid, Stack } from "@mui/material/";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../../components";

const ImageUpload = ({ formDataState, handleImageChange }) => {
  return (
    <Grid
      item
      xs={12}
      md={5}
      sx={{
        mb: 3,
        paddingLeft: "19px !important",
        paddingTop: "0px !important",
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          height: "350px",
          width: "100%",
        }}
      >
        <Box
          mb={2}
          component="img"
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "contain",

            padding: "0px !important",
            display: "block",
          }}
          src={formDataState.selectedImage}
          alt="Paella dish"
        ></Box>

        <Button
          color="secondary"
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            width: "50%",
            backgroundColor: "#916DB3",
          }}
        >
          Change
          <VisuallyHiddenInput type="file" onChange={handleImageChange} />
        </Button>
      </Stack>
    </Grid>
  );
};

export default ImageUpload;
