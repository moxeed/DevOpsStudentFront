import { Grid, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ResponsiveCarousel from "./ResponsiveCarousel/ResponsiveCarousel";

const SlidersContainer = ({
  title,
  description,
  slides,
  Card,
  slidePerView,
  loop,
}) => {
  return (
    <Grid container item direction={"column"}>
      <Typography sx={{ fontSize: "1.5em" }}>{title}</Typography>
      <Typography variant="caption" sx={{ fontSize: ".8em" }}>
        {description}
      </Typography>
      <ResponsiveCarousel
        slidesPerView={slidePerView}
        loop={loop}
        slides={slides.map((i, index) => (
          <React.Fragment key={index}>
            <Card item={i} />
          </React.Fragment>
        ))}
      />
    </Grid>
  );
};

SlidersContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  Card: PropTypes.elementType.isRequired,
  slides: PropTypes.array.isRequired,
  slidePerView: PropTypes.shape({
    xs: PropTypes.string.isRequired,
    sm: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired,
    lg: PropTypes.string.isRequired,
  }),
  loop: PropTypes.bool,
};

export default SlidersContainer;
