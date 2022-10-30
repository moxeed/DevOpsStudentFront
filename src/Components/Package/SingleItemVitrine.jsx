import {
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";

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

export const SingleItemVitrine = ({ data, toolBox }) => {

  const classes = useStyles();
  const { item } = data;

  useEffect(() => {
    toolBox.resetBasket();
    if (data && !data.isPurchased) toolBox.addItem(item);
  }, [data]);

  if (!data || !item.product) return null;
  return (
    <Grid item xs={12}>
      <div className={classes.demo}>
        <List>
          <ListItem>
            <Grid
              container
              item
              xs={12}
              justifyContent="space-between"
              alignItems="center"
              Style={{ padding: 5 }}
            >
              <Grid item>
                <Typography variant="h5">{item.product.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  قیمت :{" "}
                  {item.product.price > 0 ? item.product.price : "رایگان"}
                </Typography>
              </Grid>
            </Grid>
            {/* <LineItem data={item} SelectItem={() => {}} isSelected={true} /> */}
          </ListItem>
        </List>
      </div>
    </Grid>
  );
};
