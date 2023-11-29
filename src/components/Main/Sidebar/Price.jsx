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
} from "@mui/material";
import { pink } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../../reducers/filtersSlice";

const prices = [
  {
    value: "0,0",
    name: "All",
  },
  {
    value: "0,50",
    name: "$0-$50",
  },
  {
    value: "50,100",
    name: "$50-$100",
  },
  {
    value: "100,150",
    name: "$100-$150",
  },
  {
    value: "150,150",
    name: "Over $150",
  },
];
const Price = () => {
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const dispatch = useDispatch();
  // const currenPrice = useSelector(priceSelector);

  return (
    <Box>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            borderTop: "1px solid #ccc",
          }}
        >
          <Typography
            sx={{
              color: "#242424",
              fontWeight: "bold",
            }}
          >
            Price
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <FormControl
            sx={{ marginLeft: "10px", fontWeight: "5px" }}
            onChange={(e) => {
              dispatch(filtersSlice.actions.setSearchPrice(e.target.value));
            }}
          >
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {prices.map((price, index) => (
                <FormControlLabel
                  key={index}
                  value={price.value}
                  control={
                    <Radio
                      {...controlProps(price.value)}
                      sx={{
                        fontSize: "10px",
                        color: pink[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label={price.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Price;
