import { Grid, List, ListItem, makeStyles } from "@material-ui/core";
import LineItem from "./LineItem";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  demo: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    textAlign: "center",
    color: "#98A39A",
  },
}));

export const PickerVitrine = ({ data, toolBox }) => {
  const classes = useStyles();

  const SelectItem = (item) => {
  
      toolBox.resetBasket();
    toolBox.addItem(item);
 
  };

  if (!data) return null;
  return (
    <Grid item xs={12}>
      <div className={classes.demo}>
        <List>
          {data.items.map((p, i) => (
            <ListItem key={i}>
              <LineItem
                data={p}
                SelectItem={() => SelectItem(p)}
                isSelected={toolBox.isSelected(p)}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Grid>
  );
};
