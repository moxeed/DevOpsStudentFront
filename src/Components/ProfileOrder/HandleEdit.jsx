import React from "react";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import { Grid } from "@material-ui/core";

const HandleEdit = (props) => {
  const { handleClick } = props;

  return (
    <Grid
      container
      style={{
        textAlign: "right",
        fontSize: "16px",
        width: "100%",
        padding: "5px",
        lineHeight: "25px",
      }}
    >
      <Grid item md={4}>
        <InputAdornment position="end">
          <IconButton onClick={handleClick}>
            <Edit />
          </IconButton>
        </InputAdornment>
      </Grid>
    </Grid>
  );
};
export default HandleEdit;
