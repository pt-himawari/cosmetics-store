import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { pink } from "@mui/material/colors";

import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../../reducers/filtersSlice";
import {
  searchCategorySelector,
  searchTypeSelector,
} from "../../../redux-toolkit/selectors";

const haircareFilters = ["hairmask", "shampoo", "conditioner"];
const Haircare = () => {
  const dispatch = useDispatch();
  const [buttonValue, setButtonValue] = useState("haircare");
  // const { category, type } = props;
  const type = useSelector(searchTypeSelector);
  const category = useSelector(searchCategorySelector);
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
            value="haircare"
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
              "&:hover": {
                backgroundColor: "#fff",
                color: "red",
              },
            }}
            onClick={(e) => {
              dispatch(
                filtersSlice.actions.setSearchType(e.currentTarget.value)
              );
            }}
          >
            Haircare
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
          {haircareFilters.map((item, index) => (
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
                  textTransform: "capitalize",
                  fontWeight: item === category ? 800 : 500,
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

export default Haircare;
