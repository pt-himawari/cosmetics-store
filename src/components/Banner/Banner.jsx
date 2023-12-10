import React from "react";
import { Box, Grid, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/system";

// Custom styled components
const BannerBox = styled(Box)({
  height: "500px",
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
  backgroundImage: "url(path-to-your-background-image.jpg)",
  backgroundSize: "cover",
  color: "black",
  // direction: "column",
});

const TextSection = styled(Box)({
  maxWidth: "63%",
});

const ActionButton = styled(Button)({
  margin: "0 10px",
});

// Image and text can be passed as props or imported from a file
const Banner = () => {
  return (
    <Container sx={{ mt: { xs: "70px", md: "120px" }, height: "auto" }}>
      <BannerBox
        sx={{
          height: "100%",
        }}
      >
        <TextSection
          sx={{
            zIndex: 100,
            maxWidth: { xs: "100%", md: "63%" },
            mb: "20px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#242424",
              fontWeight: 500,
            }}
          >
            Unveil Your
          </Typography>
          <Typography
            mb={2}
            variant="h1"
            sx={{
              color: "#F25050",
              fontWeight: 500,
            }}
          >
            Natural Beauty
          </Typography>
          <Typography
            mb={5}
            style={{ letterSpacing: ".3em", fontSize: "20px" }}
          >
            <span style={{ color: "#F25050" }}>GlamourGlow:</span> Illuminating
            Beauty at its Finest. Discover your radiance with our exquisite
            range of transformative cosmetics.
          </Typography>
          <Box>
            <ActionButton
              variant="outlined"
              sx={{
                px: 2.5,
                py: 1.2,
                color: "#F25050", // Màu chữ mặc định
                borderColor: "#F25050", // Màu viền mặc định
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#F25050", // Màu nền khi hover
                  fontWeight: "bold",
                  color: "#FFFF",
                  borderColor: "#F25050",
                },

                // Các thuộc tính CSS khác tùy ý
              }}
            >
              Shop Now
            </ActionButton>
            <ActionButton
              variant="outlined"
              sx={{
                px: 2.5,
                py: 1.2,
                color: "#F25050", // Màu chữ mặc định
                borderColor: "#F25050", // Màu viền mặc định
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#F25050", // Màu nền khi hover
                  fontWeight: "bold",
                  color: "#FFFF",
                  borderColor: "#F25050",
                },
              }}
            >
              Join Us
            </ActionButton>
          </Box>
        </TextSection>

        <Box
          component="img"
          src="/images/banner.png"
          alt="Model"
          sx={{
            position: "absolute",
            right: -60,
            bottom: 0,

            display: { xs: "none", md: "block" },
          }}
        />
      </BannerBox>
    </Container>
  );
};

export default Banner;
