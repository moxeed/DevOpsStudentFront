import React from "react";
import { Grid } from "@material-ui/core";

export default function ButtonGroup({ choice, handleChange }) {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        paddingTop: 2,
        margin: 0,
        textAlign: "center",
        direction: "ltr",
      }}
    >
      {[...Array(4)].map((e, i) => (
        <button
          key={i}
          onClick={handleChange}
          value={i + 1}
          className={"Btn-Quiz" + (choice === `${i + 1}` ? " correct" : "")}
        >
          {i + 1} 
        </button>
      ))}
    </Grid>
  );
}
