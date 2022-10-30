import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import OrderCard from "./OrderCard";
import ProfileService from "../../Services/Profile/ProfileService";
import { useDispatch } from "react-redux";
import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    color: "gray",
    padding: 20,
    "@media (max-width:970px)": { padding: 0 },
    paddingTop: "40px",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Grid>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

export default function TabOrders() {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  const [packages, setPackages] = React.useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowLoading());
    ProfileService.GetOrders().then(
      (res) => {
        setPackages(res.data);
        dispatch(HideLoading());
      },
      () => dispatch(HideLoading())
    );
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={11}>
      <Typography
        variant="h6"
        style={{ color: "gray", fontWeight: "bold", margin: 20 }}
      >
        سفارشات
      </Typography>
      <Grid item xs={12} md={12} className={classes.root}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "white",
            direction: "rtl",
            color: "gray",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <Tabs
            value={value}
            variant="scrollable"
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            TabIndicatorProps={{
              style: { background: "#5433d6", color: "#5433d6" },
            }}
          >
            <Tab
              value="one"
              label="سبد خرید"
              {...a11yProps("two")}
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            />
            <Tab
              value="two"
              label="پرداخت شده"
              {...a11yProps("one")}
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            />

            <Tab
              value="three"
              label=" کنسل شده"
              {...a11yProps("three")}
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            />
            <Tab
              value="four"
              label="بازپرداخت"
              {...a11yProps("four")}
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index="three">
          <OrderCard
            packages={packages.filter(
              (item) => item.orderState === "Cancelled"
            )}
          />
        </TabPanel>
        <TabPanel value={value} index="two">
          <OrderCard
            packages={packages.filter((item) => item.orderState === "Paid")}
          />
        </TabPanel>
        <TabPanel value={value} index="four">
          <OrderCard
            packages={packages.filter((item) => item.orderState === "Refunded")}
          />
        </TabPanel>
        <TabPanel value={value} index="one">
          <OrderCard
            packages={packages.filter((item) => item.orderState === "Draft")}
          />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
