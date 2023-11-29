import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../../reducers/filtersSlice";
import {
  searchCategorySelector,
  searchTypeSelector,
} from "../../../redux-toolkit/selectors";
const makeupFilters = ["lip", "eye", "face", "accessories"];

const Makeup = (props) => {
  const type = useSelector(searchTypeSelector);
  const category = useSelector(searchCategorySelector);
  const dispatch = useDispatch();
  const [buttonValue, setButtonValue] = useState("makeup");

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
            value="makeup"
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
              color: buttonValue === type ? "red" : "#242424",
              fontWeight: buttonValue === type ? 800 : "bold",
            }}
            onClick={(e) => {
              dispatch(
                filtersSlice.actions.setSearchType(e.currentTarget.value)
              );
            }}
          >
            Makeup
          </Button>
        </AccordionSummary>
        {/* <Divider /> */}

        <AccordionDetails
          sx={{
            // width: "100%",
            // marginTop: 0,
            py: 0,
            pr: 5,
            // minHeight: 32,
          }}
        >
          {makeupFilters.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                // width: "100%",
                py: 0,
                minHeight: 32,
                // backgroundColor: "#fdecee",
                backgroundColor: item === category ? "#fdecee" : "inherit",
              }}
              onClick={() => {
                dispatch(filtersSlice.actions.setSearchCategory(item));
                // console.log(item);
              }}
            >
              {/* <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon> */}
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  color: "#ad1357",
                  fontSize: 15,
                  fontWeight: item === category ? 800 : 500,
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

export default Makeup;
