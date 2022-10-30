import {
  Grid,
  ListItemText,
  makeStyles,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import TomanConverter from "../../Utility/TomanConverter";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
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

export default function LineItem({ data, SelectItem, isSelected }) {
  const classes = useStyles();
  return (
    <Grid className={classes.container} container spacing={1} xs={12} item>
      <Grid xs={12} item>
        <button
          onClick={SelectItem}
          style={{ width: "100%", height: "auto", padding: "9px" }}
          className={
            data.remainingCount <= 0 || data.isPurchased === true
              ? "Btn-tab disabled"
              : isSelected
              ? "Btn-tab active "
              : "Btn-tab"
          }
          disabled={data.remainingCount <= 0 || data.isPurchased === true}
        >
          <Typography style={{ padding: 2, cursor: "pointer" }}>
            {data.remainingCount <= 0 ? (
              <Tooltip title="غیر قابل خرید">
                <RemoveShoppingCartIcon />
              </Tooltip>
            ) : data.isPurchased ? (
              <Tooltip title="خریداری شده">
                <Done color="primary" />
              </Tooltip>
            ) : (
              ""
            )}
          </Typography>
          <ListItemText
            style={{ textAlign: "right" }}
            primary={data.product.title}
          />
          <ListItemText
            style={{ textAlign: "left" }}
            primary={TomanConverter({
              Rial: data.product.price,
              isFree: data.product.price <= 0,
            })}
          />
        </button>
      </Grid>
    </Grid>
  );
}
