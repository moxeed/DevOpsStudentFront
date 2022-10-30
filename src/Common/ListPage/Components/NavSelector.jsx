import { makeStyles, Card, Typography, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useFilterOptions } from "../Hooks/UseFilterOptions";
import "../Styles/scrollbar.scss";

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

const NavSelector = ({ name, setPriority = (data) => data, defaultId }) => {
  const [filterOptions, filters, handleSet] = useFilterOptions(name);
  const classes = useStyles();
  const displayOptions = setPriority(filterOptions?.options);

  const chooseFilter = (id = 1) => {
    handleSet([id]);
  };
  useEffect(() => {
    if (displayOptions && displayOptions.length > 0) {
      if (defaultId > 0) chooseFilter(+defaultId);
      else chooseFilter(displayOptions[0]?.id);
    }
  }, [filterOptions, defaultId]);
  const options = displayOptions?.map((f) => ({
    ...f,
    checked: filters?.includes(f.id),
  }));

  return (
    <div className="div-scroll">
      {options ? (
        <Card className={classes.paper}>
          <Grid container alignItems="center" justifyContent="center">
            <div className={"div-scroll " + classes.container}>
              {filterOptions.name ? (
                <Typography
                  style={{
                    width: `${100 / options.length - 10}%`,
                    minWidth: "180px",
                  }}
                >
                  {filterOptions.name}
                </Typography>
              ) : null}
              {options.length > 0 ? (
                options.map((s, i) => (
                  <button
                    key={i}
                    style={{
                      minWidth: "165px",
                    }}
                    className={"Btn-tab" + (s.checked ? " active" : "")}
                    onClick={() => chooseFilter(s.id)}
                  >
                    <Typography>
                      {
                        s.name
                        // +
                        // " (" + s.itemCount + " آزمون)"
                      }
                    </Typography>
                  </button>
                ))
              ) : (
                <button
                  style={{
                    width: "100%",
                  }}
                  className={"Btn-tab"}
                >
                  <Typography>
                    برای مقطع تحصیلی شما آزمونی تعریف نشده است
                  </Typography>
                </button>
              )}
            </div>
          </Grid>
        </Card>
      ) : null}
    </div>
  );
};

export default NavSelector;
