import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SendIcon from "@material-ui/icons/Send";
import { Grid } from "@material-ui/core";
import { CommentSection } from "../Reusable/CommnetSection";
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

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  iconLabelWrapper: {
    flexDirection: "row",
  },
}));

export default function CourseQuizInfoTab({ productId }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid item xs={12}>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", direction: "rtl", color: "gray" }}
      >
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          indicatorColor="primary"
          textColor="primary"
          TabIndicatorProps={{
            style: { background: "#5433d6", color: "#5433d6" },
          }}
        >
          <Tab
            value="one"
            label=" نظرات "
            icon={<SendIcon style={{ margin: 10 }} />}
            {...a11yProps("one")}
            classes={{
              wrapper: classes.iconLabelWrapper,
            }}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <CommentSection identifier={`${CourseQuizInfoTab.name}-${productId}`} />
      </TabPanel>
    </Grid>
  );
}
