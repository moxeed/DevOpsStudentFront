import * as React from "react";
import {
  IconButton,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import TomanConverter from "../../Utility/TomanConverter";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    color: "#808080",
    "*": {
      fontSize: "12px",
    },
  },
}));

export const LineItems = ({ items, onDelete }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} spacing={0}>
      <Grid item xs={12}>
        <List>
          {items.map((p, i) => (
            <ListItem key={i} style={{ borderBottom: "1px solid #f3f3f3" }}>
              <Grid
                className={classes.container}
                container
                spacing={1}
                item
                xs={12}
              >
                <Grid item xs={6} className="Display-align">
                  <Typography variant="h6">{p.title}</Typography>
                </Grid>
                <Grid item xs={5} className="Display-align">
                  <Typography variant="h6">
                    {TomanConverter({
                      Rial: p.price,
                      isFree: p.price === 0,
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={1} onClick={() => onDelete(p)}>
                  <IconButton style={{ witdh: "100%" }}>
                    <DeleteForeverIcon style={{ fontSize: "22px" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
