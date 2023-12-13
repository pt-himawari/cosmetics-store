import {
  Box,
  Button,
  Accordion,
  ListItemText,
  ListItemButton,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../../reducers/filtersSlice";
import { searchBrandSelector } from "../../../redux-toolkit/selectors";
const brandFilters = [
  "All",
  "LAB",
  "MAC",
  "BOBBI",
  "AVEDA",
  "BUMBLE",
  "ORIGINS",
  "CLINIQUE",
  "SMASHBOX",
  "GLAMGLOW",
];

const Brands = () => {
  const brand = useSelector(searchBrandSelector);
  const dispatch = useDispatch();

  return (
    <Box>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            borderTop: "1px solid #ccc",
            py: 0,
            pl: 0,
            my: 0,
          }}
        >
          <Button
            sx={{
              width: "100%",
              pl: 2,
              py: 0,
              my: 0,
              fontSize: "16px",
              color: "#242424",
              fontWeight: "bold",
              justifyContent: "flex-start",
              textTransform: "capitalize",
            }}
          >
            Brands
          </Button>
        </AccordionSummary>
        {/* <Divider /> */}
        <AccordionDetails
          sx={{
            py: 0,
            pr: 5,
          }}
        >
          {brandFilters.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                // width: "100%",
                py: 0,
                minHeight: 32,
                color: "#242424",
              }}
              onClick={() => {
                dispatch(filtersSlice.actions.setSearchBrand(item));
              }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  color:
                    item.toLowerCase() === brand.toLowerCase()
                      ? "#cc4343"
                      : "inherit",

                  fontSize: 15,
                  fontWeight:
                    item.toLowerCase() === brand.toLowerCase() ? 800 : 500,
                  textTransform: "capitalize",
                }}
              />
            </ListItemButton>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Brands;
