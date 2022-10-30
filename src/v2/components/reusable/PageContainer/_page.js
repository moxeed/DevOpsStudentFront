import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  root: {
    minHeight: "80vh",
  },
}));

export default function Page({ Component }) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Component />
    </div>
  );
}
Page.propTypes = {
  text: PropTypes.string,
  Component: PropTypes.any,
};
