import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Grid } from "@material-ui/core";
import WorkBookTable from "./WorkBookTable";
import WorkBookAnswer from "./WorkBookAnswer";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(() => ({
  iconLabelWrapper: {
    flexDirection: "row",
    textAlign: "right",
    fontWeight: "bold",
  },
}));

export default function HandleWorkBook({ dataWorkBook }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item md={12} xs={12} sm={12}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          TabIndicatorProps={{
            style: { background: "#5433d6" },
          }}
          style={{
            backgroundColor: "white",
            color: "gray",
            direction: "rtl",
            minWidth: "900px",
          }}
        >
          <Tab
            value="one"
            label="کارنامه"
            icon={<AssignmentIcon style={{ margin: 10 }} />}
            classes={{
              wrapper: classes.iconLabelWrapper,
            }}
          />
          <Tab
            value="two"
            label="پاسخ برگ"
            icon={<CheckCircleIcon style={{ margin: 10 }} />}
            classes={{
              wrapper: classes.iconLabelWrapper,
            }}
          />
          {/* {dataWorkBook.data.courses.length >= 2 ? (
            <Tab
              value="three"
              label="نمودار"
              icon={<EqualizerIcon style={{ margin: 10 }} />}
              classes={{
                wrapper: classes.iconLabelWrapper,
              }}
            />
          ) : null} */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <WorkBookTable dataWorkBook={dataWorkBook ? dataWorkBook : null} />
      </TabPanel>
      <TabPanel value={value} index="two">
        <WorkBookAnswer dataWorkBook={dataWorkBook ? dataWorkBook : null} />
      </TabPanel>
      {/* <TabPanel value={value} index="three">
        <WorkBookChart dataWorkBook={dataWorkBook ? dataWorkBook : null} />
      </TabPanel> */}
    </Grid>
  );
}
