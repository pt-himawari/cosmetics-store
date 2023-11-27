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
  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
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
        <Divider />
        <AccordionDetails>
          <FormControl
            sx={{ marginLeft: "10px", fontWeight: "10px" }}
            onChange={(e) => console.log(e.target.value)}
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
