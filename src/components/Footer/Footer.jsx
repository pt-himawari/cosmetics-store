import React from "react";
import { Container, Grid, Box, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#f8f8f8", color: "black", py: 3 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderRight={{ sm: 1 }} borderColor="grey.300" pr={{ sm: 5 }}>
              {/* Logo and brand name here */}
              <Typography variant="h6" gutterBottom>
                GlamourGlow
              </Typography>
              {/* Add your logo here */}
            </Box>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="button" display="block" gutterBottom>
              ABOUT US
            </Typography>
            {/* Add about us links here */}
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="button" display="block" gutterBottom>
              HELP
            </Typography>
            {/* Add help links here */}
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="button" display="block" gutterBottom>
              MANAGE
            </Typography>
            {/* Add manage links here */}
          </Grid>
          <Grid item xs={6} sm={2}>
            <Box textAlign="right">
              {/* Add social icons here */}
              <Link href="#" color="inherit">
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit">
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon />
              </Link>
              <Link href="#" color="inherit">
                <PinterestIcon />
              </Link>
              <Typography variant="body2" gutterBottom>
                Brand@gmail.com
              </Typography>
              <Typography variant="body2">
                4 Norway St, City, Country
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            © All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
