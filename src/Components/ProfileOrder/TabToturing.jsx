import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import ProfileToturing from "./ProfileToturing";
import ProfileService from "../../Services/Profile/ProfileService";
import { useDispatch } from "react-redux";

import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "theme.palette.background.paper",
    color: "gray",
    direction: "rtl",
    width: "100%",
    paddingRight: 20,
    "@media (max-width:970px)": { padding: 0 },
    paddingTop: "40px",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
      className={classes.tabs}
    >
      {value === index && (
        <Box p={4}>
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

export default function TabToturing() {
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const [filter, setFilter] = React.useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowLoading());
    ProfileService.ProfileTutoringFilters().then(
      (res) => {
        setFilter(res.data);
        setValue(res.data[0].id);
        dispatch(HideLoading());
      },
      () => dispatch(HideLoading())
    );
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item md={11}>
      <Typography
        variant="h6"
        style={{ color: "gray", fontWeight: "bold", padding: 30 }}
      >
        تدریس خصوصی من
      </Typography>
      <Grid item xs={12} md={12} className={classes.root}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "white",
            color: "gray",
            width: "100%",
          }}
        >
          <Tabs
            value={value}
            variant="scrollable"
            onChange={handleChange}
            TabIndicatorProps={{
              style: { background: "#5433d6", color: "#5433d6" },
            }}
          >
            {filter?.map((item, i) => (
              <Tab
                key={i}
                value={item.id}
                label={item.name}
                {...a11yProps(item.id)}
                style={{ fontSize: "1rem", fontWeight: "bold" }}
              />
            ))}
          </Tabs>
        </AppBar>
        {filter?.map((item, i) => (
          <TabPanel key={i} value={value} index={item.id}>
            <ProfileToturing id={item.id} />
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
}
