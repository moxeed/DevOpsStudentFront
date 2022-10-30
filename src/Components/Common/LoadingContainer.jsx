import React from "react";
import { useSelector } from "react-redux";
import ISnipper from "../../Utility/Loading/ISnipper";
import { LoadingSelector } from "../../Services/StoreSlices/LoadingSlice";
import Fade from "@material-ui/core/Fade";
import { Box } from "@material-ui/core";
const LoadingContainer = () => {
  const { isLoading } = useSelector(LoadingSelector);
  return (
    <Box
      style={{
        display: isLoading ? "flex" : "none",
        position: "fixed",
        marginTop: "-30px",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        top: 30,
        backgroundColor: "rgba(35, 15, 42, .2)",
        zIndex: "100",
      }}
    >
      <Fade>
        <ISnipper />
      </Fade>
    </Box>
  );
};
export default LoadingContainer;
