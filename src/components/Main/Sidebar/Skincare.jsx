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

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../../reducers/filtersSlice";
import {
  searchCategorySelector,
  searchTypeSelector,
} from "../../../redux-toolkit/selectors";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const skincareFilters = ["mask", "toner", "serum", "cleaner", "moisturizer"];
const Skincare = () => {
  const dispatch = useDispatch();
  const type = useSelector(searchTypeSelector);
  const category = useSelector(searchCategorySelector);
  const buttonValue = "skincare";
  const theme = useTheme();
  const isNotXsScreen = useMediaQuery(theme.breakpoints.up("sm"));

  // const { category, type } = props;

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
                // backgroundColor: item === category ? "#fdecee" : "inherit",
              }}
              onClick={() => {
                dispatch(filtersSlice.actions.setSearchType(buttonValue));
                dispatch(filtersSlice.actions.setSearchCategory(item));
                // console.log(item);
              }}
            >
              {/* <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon> */}
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  // color: "#242424",
                  color: item === category ? "#CC4343" : "#242424",
                  fontSize: 15,
                  fontWeight: item === category ? 700 : 500,
                  textTransform: "capitalize",
                  sx: {
                    // transition: "color 0.3s ease, font-weight 0.1s ease", // Thêm dòng này
                    transition: "font-weight 0.3s ease",
                  },
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
