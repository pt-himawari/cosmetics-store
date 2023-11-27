import React from "react";
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

const makeupFilters = ["All", "face", "eye", "lip", "accessories"];

const Makeup = () => {
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
            Makeup
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
              {makeupFilters.map((makeup, index) => (
                <FormControlLabel
                  key={index}
                  value={makeup}
                  control={
                    <Radio
                      {...controlProps(makeup)}
                      sx={{
                        color: pink[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label={makeup.charAt(0).toUpperCase() + makeup.slice(1)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Makeup;
