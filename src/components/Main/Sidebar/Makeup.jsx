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
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../../reducers/filtersSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  searchCategorySelector,
  searchTypeSelector,
} from "../../../redux-toolkit/selectors";

const makeupFilters = ["lip", "eye", "face", "accessories"];

const Makeup = (props) => {
  const type = useSelector(searchTypeSelector);
  const category = useSelector(searchCategorySelector);
  const dispatch = useDispatch();
  const buttonValue = "makeup";

  return (
    <Box>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: buttonValue === type ? "#CC4343" : "#242424",
                fontWeight: buttonValue === type ? 800 : "bold",
              }}
            />
          }
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

              justifyContent: "flex-start",
              textTransform: "capitalize",
              color: buttonValue === type ? "#CC4343" : "#242424",
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

        <AccordionDetails
          sx={{
            py: 0,
            pr: 5,
          }}
        >
          {makeupFilters.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                py: 0,
                minHeight: 32,
              }}
              onClick={() => {
                dispatch(filtersSlice.actions.setSearchType(buttonValue));
                dispatch(filtersSlice.actions.setSearchCategory(item));
              }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  fontSize: 15,
                  color: item === category ? "#CC4343" : "#242424",
                  fontWeight: item === category ? 700 : 500,
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

export default Makeup;
