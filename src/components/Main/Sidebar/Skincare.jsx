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
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const buttonValue = "skincare";
  const theme = useTheme();
  const isNotXsScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box>
      <Accordion defaultExpanded={isNotXsScreen} elevation={0}>
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
            value="skincare"
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
            }}
            onClick={(e) => {
              dispatch(
                filtersSlice.actions.setSearchType(e.currentTarget.value)
              );
            }}
          >
            Skincare
          </Button>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            py: 0,
            pr: 5,
          }}
        >
          {skincareFilters.map((item, index) => (
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
                  fontSize: 15,
                  fontWeight: item === category ? 700 : 500,
                  textTransform: "capitalize",
                  sx: {
                    transition: "font-weight 0.3s ease",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Skincare;
