import { Grid, Typography } from "@mui/material";
import classes from "./ColoredTitle.module.scss";
import PropTypes from "prop-types";

const ColoredTitle = ({ color, title }) => {
  return (
    <Grid
      className={classes.ColoredTitle}
      sx={{ backgroundColor: color }}
      container
      alignItems="center"
    >
      <Typography variant="h1" className={classes.ColoredTitleText}>
        {title}
      </Typography>
    </Grid>
  );
};
ColoredTitle.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ColoredTitle;
