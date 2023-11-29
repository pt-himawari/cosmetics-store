import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  RadioGroup,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControl,
  Radio,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";

import { pink } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../../reducers/filtersSlice";
import {
  searchCategorySelector,
  searchTypeSelector,
} from "../../../redux-toolkit/selectors";

const skincareFilters = ["mask", "toner", "serum", "cleaner", "moisturizer"];
const Skincare = () => {
  const dispatch = useDispatch();
  const type = useSelector(searchTypeSelector);
  const category = useSelector(searchCategorySelector);
  const [buttonValue, setButtonValue] = useState("skincare");
  // const { category, type } = props;

  return (
    <Box>
      <Accordion defaultExpanded elevation={0}>
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
            value="skincare"
            sx={{
              width: "100%",
              pl: 2,
              py: 0,
              my: 0,
              fontSize: "16px",
              color: buttonValue === type ? "red" : "#242424",
              fontWeight: buttonValue === type ? 800 : "bold",
              justifyContent: "flex-start",
              textTransform: "capitalize",
            }}
            onClick={(e) => {
              dispatch(
                filtersSlice.actions.setSearchType(e.currentTarget.value)
              );
              // filtersSlice.actions.setSearchText(searchText)
            }}
          >
            Skincare
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
          {skincareFilters.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                // width: "100%",
                py: 0,
                minHeight: 32,
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

export default Skincare;
