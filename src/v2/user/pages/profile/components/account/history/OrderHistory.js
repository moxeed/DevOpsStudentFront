import * as React from "react";
import OrderCard from "./cards/OrderCard";
import { Box } from "@mui/material";
import { containerStyle } from "../../../../../../styles/cardContainerStyle";

const OrderHistory = () => {
  // todo
  // add service
  return (
    <Box sx={containerStyle}>
      {[...Array(4)].map((item, i) => (
        <Box
          key={"Box_cards_orders" + i}
          sx={{
            margin: "8px",
          }}
        >
          <OrderCard
            item={{
              name: "نام همایش عیدانه دروس عمومی سامانه برترها- محسن یگانه",
            }}
          />
        </Box>
      ))}
      {[...Array(10)].map((item, i) => (
        <Box
          key={"Box_cards_orders" + i}
          sx={{
            margin: "8px",
          }}
        >
          <OrderCard item={{ name: " آزمون های آنلاین" }} />
        </Box>
      ))}
    </Box>
  );
};

export default OrderHistory;
