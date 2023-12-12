import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material/";
import parse from "html-react-parser";
import React from "react";

const CKEditor = ({ productWithId }) => {
  return (
    <Grid
      item
      xs={12}
      mt={2}
      sx={{
        padding: "0px !important",
      }}
    >
      <Accordion
        sx={{
          minHeight: "100px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5"> Description...</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionDetails">
          <Typography>{parse(String(productWithId.description))}</Typography>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default CKEditor;
