import * as React from "react";
import { Box } from "@mui/material";
import { containerStyle } from "../../../../../../styles/cardContainerStyle";
import OrderCard from "./cards/OrderCard";

const Basket = () => {
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
              name: "نام همایش عیدانه دروس عمومی سامانه برترها - محسن چاووشی",
            }}
            isBasket={true}
          />
        </Box>
      ))}
      {[...Array(1)].map((item, i) => (
        <Box
          key={"Box_cards_orders" + i}
          sx={{
            margin: "8px",
          }}
        >
          <OrderCard item={{ name: " آزمون های آنلاین" }} isBasket={true} />
        </Box>
      ))}
    </Box>
  );
};

export default Basket;
