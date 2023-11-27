import React from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { pink } from "@mui/material/colors";
const haircareFilters = ["All", "shampoo", "conditioner", "hair mask"];
const Haircare = () => {
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
      <Accordion>
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
            Haircare
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
              {haircareFilters.map((haircare, index) => (
                <FormControlLabel
                  key={index}
                  value={haircare}
                  control={
                    <Radio
                      {...controlProps(haircare)}
                      sx={{
                        color: pink[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label={haircare.charAt(0).toUpperCase() + haircare.slice(1)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Haircare;
