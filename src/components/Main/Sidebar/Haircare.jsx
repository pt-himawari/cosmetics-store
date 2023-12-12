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
import {
  searchCategorySelector,
  searchTypeSelector,
} from "../../../redux-toolkit/selectors";

const haircareFilters = ["hairmask", "shampoo", "conditioner"];
const Haircare = () => {
  const dispatch = useDispatch();
  const buttonValue = "haircare";
  const type = useSelector(searchTypeSelector);
  const category = useSelector(searchCategorySelector);
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
            value="haircare"
            sx={{
              width: "100%",
              pl: 2,
              py: 0,
              my: 0,
              fontSize: "16px",
              color: buttonValue === type ? "#CC4343" : "#242424",
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

        <AccordionDetails
          sx={{
            py: 0,
            pr: 5,
            // minHeight: 32,
          }}
        >
          {haircareFilters.map((item, index) => (
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
                  color: item === category ? "#CC4343" : "#242424",
                  fontWeight: item === category ? 700 : 500,
                  fontSize: 15,
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

export default Haircare;
