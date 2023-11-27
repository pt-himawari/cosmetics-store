import React from "react";
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
} from "@mui/material";
import { pink } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const skincareFilters = [
  "All",
  "cleaner",
  "toner",
  "moisturizer",
  "serum",
  "mask",
];
const Skincare = () => {
  const [selectedValue, setSelectedValue] = React.useState("a");

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
            Skincare
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
              {skincareFilters.map((skincare, index) => (
                <FormControlLabel
                  key={index}
                  value={skincare}
                  control={
                    <Radio
                      {...controlProps(skincare)}
                      sx={{
                        color: pink[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label={skincare.charAt(0).toUpperCase() + skincare.slice(1)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Skincare;
