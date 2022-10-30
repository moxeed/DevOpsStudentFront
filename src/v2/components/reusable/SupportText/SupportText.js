import React from "react";
import { Typography } from "@mui/material";
import theme from "src/v2/styles/theme";

export default function SupportText({ category }) {
  return (
    <>
      <Typography
        variant="p"
        sx={{
          color: theme.palette.marengo,
          textAlign: "center",
          fontWeight: "bold",
          m: 0,
          p: 2,
          pb: 7,
          width: "100%",
          lineHeight: "30px",
          borderRadius: category === "identity" ? "0 0 10px 10px" : "10px",
          zIndex: "5",
        }}
      >
        درصورت بروز مشکل می{"\u200c"}توانید در وقت اداری (ساعت 9 تا 17 ) با
        شمارۀ پشتیبانی
        <a
          href="tel:02141023000"
          style={{ margin: 3, color: theme.palette.googooli }}
        >
          02141023000
        </a>
        تماس بگیرید.
      </Typography>
    </>
  );
}
