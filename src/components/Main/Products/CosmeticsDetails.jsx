import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Rating,
  Stack,
  Tab,
  Typography,
} from "@mui/material/";
import axios from "axios";
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState, useRef } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import formatterCurrency from "../../common/formatterCurrency";
import cartSlice from "../../../reducers/cartSlice";

const CosmeticsDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const timer = useRef();

  useEffect(() => {
    const currentTimer = timer.current;

    return () => {
      clearTimeout(currentTimer);
    };
  }, []);

  useEffect(() => {
    async function getProductById() {
      try {
        let productListRes = await axios.get(
          `https://json-server-psi-three.vercel.app/cosmeticsList/${id}`
        );
        let data = productListRes.data; // With axios, the response data is found in .data
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error appropriately
      }
    }
    getProductById();
  }, [id]);

  const cosmetics = { ...product };
  const navigate = useNavigate();
  const handleAddCart = () => {
    const newProduct = { ...cosmetics, quantityCart: quantity };
    dispatch(cartSlice.actions.addCart(newProduct));
    navigate("/");
  };
  const handleBuyNow = () => {
    const newProduct = { ...cosmetics, quantityCart: quantity };
    console.log(quantity);
    dispatch(cartSlice.actions.addCart(newProduct));
    navigate("/cartPage");
  };

  return (
    <Container
      sx={{
        mt: 15,
        mb: 10,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "90%",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            m: 0,
            p: 0,
            pt: 3,
          }}
        >
          {/* imge */}
          <Grid
            spacing={1}
            item
            container
            xs={12}
            md={5}
            mb={8}
            sx={{
              padding: "5px !important",
              height: "300px",
            }}
          >
            <Grid item xs={3}>
              <Stack
                spacing={1}
                sx={{
                  height: "50%",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    border: "1px solid #b2c9dc",
                    borderRadius: "10px",
                    // height: "100%",
                    height: "33.3%",
                    width: "100%",
                    objectFit: "contain",
                    margin: "auto",
                    display: "block",
                  }}
                  src={cosmetics.image}
                  alt="Paella dish"
                ></Box>
                <Box
                  component="img"
                  sx={{
                    border: "1px solid #b2c9dc",
                    borderRadius: "10px",
                    height: "33.3%",
                    width: "100%",
                    objectFit: "contain",
                    margin: "auto",
                    display: "block",
                  }}
                  src={cosmetics.image}
                  alt="Paella dish"
                ></Box>
                <Box
                  component="img"
                  sx={{
                    border: "1px solid #b2c9dc",
                    borderRadius: "10px",
                    height: "33.3%",
                    width: "100%",
                    objectFit: "contain",
                    margin: "auto",
                    display: "block",
                  }}
                  src={cosmetics.image}
                  alt="Paella dish"
                ></Box>
              </Stack>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                component="img"
                sx={{
                  border: "1px solid #b2c9dc",
                  borderRadius: "10px",
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  margin: "auto",
                  display: "block",
                }}
                src={cosmetics.image}
                alt="Paella dish"
              ></Box>
            </Grid>
          </Grid>
          {/* thong tin */}
          <Grid item container md={7} spacing={3}>
            <Stack
              // spacing={1}
              sx={{
                padding: "5px",
                paddingTop: "20px",
                paddingLeft: "50px",
                pb: "0px",
              }}
            >
              <Box mb={2}>
                {cosmetics.quantity !== 0 ? (
                  <Chip
                    label="In Stock"
                    sx={{
                      height: "22px",
                      backgroundColor: "#27ce88",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  <Chip
                    label="Out Of Stock"
                    sx={{
                      height: "22px",
                      backgroundColor: "#f04438c4",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  mb: "3px",
                  letterSpacing: "4px",
                  color: "#5f748d",
                  textTransform: "uppercase",
                }}
              >
                {cosmetics.brand}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  padding: "0px",
                  margin: "0px",
                  letterSpacing: "2px",
                  color: "#121f43",
                }}
              >
                {cosmetics.name}
              </Typography>
              <Box
                mb={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Chip
                  label={cosmetics.type}
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: "#f0004715",
                    color: "#cb1d63",
                    borderRadius: "5px",
                  }}
                />
                <Chip
                  label={cosmetics.category}
                  sx={{
                    mx: 3,
                    textTransform: "capitalize",
                    backgroundColor: "#3a00e70f",
                    color: "#6550b9",
                    borderRadius: "5px",
                  }}
                />
                <Box>
                  <Rating
                    size="small"
                    sx={{
                      color: "#FFB000",
                    }}
                    name="text-feedback"
                    value={Number(cosmetics.star)}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon
                        // style={{ opacity: 0.55 }}
                        fontSize="inherit"
                      />
                    }
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  alignItems: "center",
                }}
              >
                <Typography
                  my={2}
                  variant="h5"
                  sx={{
                    padding: "0px",
                    margin: "0px",
                    color: "#2499ef",
                    fontSize: "24px",
                    letterSpacing: "2px",
                    fontWeight: 600,
                    // textDecoration:
                    //   cosmetics.currentPrice === 0 ? "" : "line-through",
                  }}
                >
                  {`${formatterCurrency(cosmetics.currentPrice)}`}
                </Typography>
              </Box>

              <Box
                mt={1}
                sx={{
                  display: "flex",
                  gap: "30px",
                  alignItems: "center",
                }}
              >
                <Typography
                  mt={2}
                  sx={{
                    padding: "0px",
                    margin: "0px",
                    color: "#121f43",
                    fontWeight: "bold",
                  }}
                >
                  Quantity &nbsp;&nbsp;:
                </Typography>
                <Box
                  sx={{
                    borderRadius: "10px",
                    py: "5px",
                    fontWeight: "bold",
                    border: "2px solid #b2c9dc",
                  }}
                >
                  <Button
                    startIcon={<RemoveIcon />}
                    variant="text"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  />
                  <Typography component="span" mr={1}>
                    {quantity}
                  </Typography>

                  <Button
                    startIcon={<AddIcon />}
                    variant="text"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  />
                </Box>
              </Box>
              <Stack ml={4} mt={3} direction="row" spacing={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    backgroundColor: "#ab4aba",
                  }}
                  onClick={handleAddCart}
                >
                  Add to cart
                </Button>
                <Button
                  // component={Link}
                  // to={"/cartPage"}
                  variant="contained"
                  color="success"
                  sx={{
                    backgroundColor: "#399c3e",
                  }}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* des */}
          <Grid
            item
            xs={12}
            mt={2}
            sx={{
              padding: "10px !important",
              px: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    // backgroundColor: "#d4e6f3",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    textColor="secondary"
                    indicatorColor="secondary"
                  >
                    <Tab
                      textColor="secondary"
                      label="Description"
                      value="1"
                      sx={{
                        textTransform: "capitalize",
                      }}
                    />
                    <Tab
                      label="Reviews"
                      value="2"
                      sx={{
                        textTransform: "capitalize",
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Typography>
                    {parse(String(cosmetics.description))}
                  </Typography>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CosmeticsDetails;
