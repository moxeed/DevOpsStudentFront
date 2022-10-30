import {
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LineItem from "./LineItem";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  demo: {
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    textAlign: "center",
    color: "#98A39A",
  },
}));

export const MultiItemVitrine = ({ data, toolBox }) => {
  const classes = useStyles();

  const SelectItem = (item) => {
    if (toolBox.isSelected(item)) {
      toolBox.removeItem(item);
    } else {
      toolBox.addItem(item);
    }
  };

  if (!data) return null;
  return (
    <Grid item xs={12}>
      <div className={classes.demo}>
        <Typography>یک یا چند محصول را انتخاب و ثبت کنید</Typography>
        <List>
          {data.items.map((p, i) => (
            <ListItem key={i}>
              {" "}
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
