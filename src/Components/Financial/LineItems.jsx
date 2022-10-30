import * as React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import TomanConverter from "../../Utility/TomanConverter";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    direction: "rtl",
    textAlign: "center",
    height: "100%",
    transition: "all 1s",
    border: "0px solid red",
  },
  prevPrice: {
    textDecoration: "line-through",
  },
  demo: {
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    textAlign: "center",
    color: "#98A39A",
  },
}));

export const LineItems = ({ items }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} spacing={0}>
      <Grid item xs={12}>
        <List>
          {items.map((p, i) => (
            <ListItem key={i}>
              <Grid
                className={classes.container}
                container
                spacing={1}
                item
                xs={12}
              >
                <Grid item xs={6}>
                  <ListItemText primary={p.title} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    primary={TomanConverter({
                      Rial: p.price,
                      isFree: p.price === 0,
                    })}
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
