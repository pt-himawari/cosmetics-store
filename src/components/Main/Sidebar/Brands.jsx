import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
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
  // const { brand } = props;
  const brand = useSelector(searchBrandSelector);
  const dispatch = useDispatch();
  // const [buttonValue, setButtonValue] = useState("makeup");

  return (
    <Box>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          // aria-controls="panel1a-content"
          // id="panel1a-header"
          sx={{
            borderTop: "1px solid #ccc",
            py: 0,
            pl: 0,
            my: 0,
          }}
        >
          <Button
            // value="makeup"
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
              color: "#242424",
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
                // backgroundColor: "#fdecee",
                backgroundColor:
                  item.toLowerCase() === brand.toLowerCase()
                    ? "#fdecee"
                    : "inherit",
              }}
              onClick={() => {
                dispatch(filtersSlice.actions.setSearchBrand(item));
                // console.log(item);
              }}
            >
              {/* <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon> */}
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  color: "#ad1357",
                  fontSize: 15,
                  fontWeight:
                    item.toLowerCase() === brand.toLowerCase() ? 800 : 500,
                  textTransform: "capitalize",
                }}
              />
            </ListItemButton>
          ))}
        </AccordionDetails>
        {/* <Divider /> */}
      </Accordion>
    </Box>
  );
};

export default Brands;
