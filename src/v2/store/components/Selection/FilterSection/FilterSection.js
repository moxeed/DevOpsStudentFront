import {
  Accordion,
  AccordionDetails,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import classes from "../ProductSelection.module.scss";

export const FilterSection = ({ filters }) => {
  return (
    <Box className={classes.FilterSection}>
      <div className={classes.FilterHeader}>
        <Typography>دسته بندی ها</Typography>
      </div>
      {filters.map((item, key) => (
        <Accordion key={key}>
          <AccordionSummary>
            <Typography>{item.displayName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {item.items.length > 0 ? (
                item.items.map((i, k) => (
                  <FormControlLabel
                    key={k}
                    control={<Checkbox />}
                    label={i.name}
                    color="default"
                  />
                ))
              ) : (
                <Typography>دسته بندی یافت نشد</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowBackIosIcon sx={{ fontSize: "0.9rem", direction: "ltr" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));
