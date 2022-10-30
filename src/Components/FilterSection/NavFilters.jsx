import { makeStyles, Card, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import "../Reusable/SelectionContainer.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: "5px",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "12px",
    justifyContent: "space-betwen",
    "& p": {
      fontWeight: "bold",
    },
  },
  parentBtn: {
    backgroundColor: "transparent",
    borderColor: "#b600ff",
    padding: "3px",
    " & span": {
      "& span:hover": { color: "white" },
    },
  },
  container: {
    width: "100%",
    display: "flex",
    overflow: `auto`,
    gridTemplate: "none",
    [theme.breakpoints.up("md")]: {
      display: "grid",
      gridTemplate: `50px / auto auto auto auto auto`,
      borderBottom: "1px #bae3c0 solid",
    },
    alignItems: "center",
  },
}));

const NavFilters = ({
  options = [],
  chooseFilter,
  title,
  id = 1,
  catrgory = "null",
}) => {
  const classes = useStyles();
  return (
    <>
      {options?.length >= 1 ? (
        <Card className={classes.paper}>
          <Grid container alignItems="center" justifyContent="center">
            <div className={"div-scroll " + classes.container}>
              {title ? (
                <Typography
                  style={{
                    width: `${100 / options.length - 10}%`,
                    minWidth: "150px",
                  }}
                >
                  {title}
                </Typography>
              ) : null}
              {options.map((s) => (
                <button
                  style={{
                    minWidth: "165px",
                  }}
                  className={"Btn-tab" + (id === s.id ? " active" : "")}
                  onClick={() => chooseFilter(s.id)}
                  key={s.id}
                >
                  <Typography>
                    {s.name}
                    {catrgory === "Webinar" ? ` (${s.itemCount}) ` : null}
                  </Typography>
                </button>
              ))}
            </div>
          </Grid>
        </Card>
      ) : null}
    </>
  );
};

export default NavFilters;
