import React from "react";
import { Box, Button, Grid } from "@mui/material/";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { VisuallyHiddenInput } from "../../components";

const ImageUpload = ({ formDataState, handleImageChange }) => {
  return (
    <Grid
      item
      xs={12}
      md={5}
      sx={{
        height: "350px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* <Stack> */}
      {!formDataState.selectedImage && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px dashed #b2c9dc",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            mb: 2,
          }}
        >
          <Button
            component="label"
            variant="text"
            sx={{
              flexDirection: "column",
              textTransform: "capitalize",
              color: "#8b8d98",
            }}
            startIcon={
              <AddPhotoAlternateIcon
                sx={{
                  width: "100px",
                  height: "100px",
                  color: "#6e56cf",
                }}
              />
            }
          >
            Browse file to upload
            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
          </Button>
        </Box>
      )}

      {/* anh hien thi */}
      {formDataState.selectedImage && (
        <>
          <Button
            component="label"
            sx={{
              width: "100%",
              height: "95%",
              position: "absolute",
              top: "0px",
            }}
          >
            <VisuallyHiddenInput
              type="file"
              onChange={handleImageChange}
              sx={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Button>

          <Box
            src={formDataState.selectedImage}
            mb={3}
            component="img"
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              padding: "0px !important",
              display: "block",
            }}
            alt="Paella dish"
          ></Box>
        </>
      )}

      {/* nuts up len sever */}
      {formDataState.selectedImage && (
        <Box>
          <Button
            color="secondary"
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: "#ab4aba",
            }}
          >
            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
            Choose file
          </Button>
        </Box>
      )}

      {/* </Stack> */}
    </Grid>
  );
};

export default ImageUpload;
