import React from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  CardActions,
  CardContent,
  Rating,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
const Product = () => {
  return (
    <Grid item xs={6} md={4}>
      {/* San pham */}
      <Box
        sx={{
          height: "350px",
        }}
      >
        <Card
          elevation={3}
          sx={{
            height: "100%",
            borderRadius: "15px",
          }}
        >
          <CardHeader
            sx={{
              height: "10px",
              padding: "8px 20px 0px 0px",
            }}
            action={
              <IconButton aria-label="add to favorites">
                <FavoriteIcon color="error" />
              </IconButton>
            }
          />

          <CardMedia
            component="img"
            sx={{
              height: "auto",
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              margin: "auto",
            }}
            image={"/images/614MHILl3bL 1.png"}
            alt="Paella dish"
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // gap: 1,
            }}
          >
            <Box>
              <Rating
                sx={{
                  color: "red",
                }}
                name="text-feedback"
                value={3.5}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: "15px",
              }}
            >
              Cleanser
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              Mario Badescuss
            </Typography>
            <CardActions>
              <Stack
                direction="row"
                spacing={5}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">$140</Typography>
                <Button
                  sx={{
                    color: "#FFFF",
                    fontWeight: "bold",
                    backgroundColor: "#F25050",
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#CC4343",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Stack>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default Product;
