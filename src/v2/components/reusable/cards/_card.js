import * as React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent } from "@mui/material";
import { cardContainerStyle, flexibleCardStyle } from "../../../styles/cardContainerStyle";

const BamisCard = (props) => {
  return (
    <Card sx={cardContainerStyle}>
      <Box sx={flexibleCardStyle}>
        <CardContent sx={{ flex: "1 0 auto" }}>{props.children}</CardContent>
      </Box>
    </Card>
  );
};

BamisCard.propTypes = {
  children: PropTypes.any.isRequired,
};

export default BamisCard;
