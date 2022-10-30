import { Box, Grid, Tab, Tabs } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import {
  a11yProps,
  TabPanel,
} from "../../../../../components/reusable/VerticalTabPanel/VerticalTabPanel";
import Basket from "./history/Basket";
import FinancialTransactionsTable from "./history/FinancialTransactionsTable";
import OrderHistory from "./history/OrderHistory";
import ActiveCalls from "./inventory/ActiveCalls";
import ActiveExams from "./inventory/ActiveExams";
import ActiveTutorings from "./inventory/ActiveTutorings";
import ActiveWebinar from "./inventory/ActiveWebinar";
import EditInfo from "./personal/EditInfo";
import UserInfo from "./personal/UserInfo";

const profileTabs = [
  "سبد خرید",
  "سفارشات اخیر",
  "تراکنش های مالی",
  "همایش های من",
  "آزمون های من",
  "تدریس خصوصی های من",
  "تماس های مشاوره ای من",
];

const Account = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { action } = useParams();

  return (
    <Box>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={1}
        sx={{ mt: "0.1em", flexFlow: "row wrap" }}
      >
        <Grid item xs={12}>
          {action === "orders" && <UserInfo />}
          {action === "edit" && <EditInfo />}
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Tabs variant="scrollable" value={value} onChange={handleChange}>
            {profileTabs.map((item, index) => (
              <Tab
                key={"userTabsHeaders_" + index}
                label={item}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          {[
            <Basket key={"userTabs_Basket"} />,
            <OrderHistory key={"userTabs_OrderHistory"} />,
            <FinancialTransactionsTable
              key={"userTabs_FinancialTransactionsReport"}
            />,
            <ActiveWebinar key={"userTabs_ActiveWebinar"} />,
            <ActiveExams key={"userTabs_ActiveExams"} />,
            <ActiveTutorings key={"userTabs_ActiveTutorings"} />,
            <ActiveCalls key={"userTabs_ActiveCalls"} />,
          ].map((item, index) => (
            <TabPanel key={"userTabs_" + index} value={value} index={index}>
              {item}
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
