import HelperHeader from "./HelperHeader/HelperHeader";
import * as React from "react";
import { Box } from "@mui/system";
import NavbarMenu from "./NavbarMenu/NavbarMenu";
import { Hidden } from "@mui/material";

const MainHeader = ({ hideHelper }) => {
  const [top, setTop] = React.useState({
    position: "relative",
    top: "6vh",
    padding: "5px",
    paddingLeft: "20px",
  });

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset >= 50)
        setTop({ ...top, position: "absolute", top: "0" });
      else setTop({ ...top, position: "relative", top: "6vh" });
    };
  }, []);
  return (
    <Box sx={{ width: "100%", mb: { md: "85px", xs: ".8em" } }}>
      <Hidden mdUp={hideHelper}>
        <HelperHeader />
      </Hidden>
      <NavbarMenu top={hideHelper ? {} : top} />
      <div style={{ marginBottom: "10vh" }} />
    </Box>
  );
};

export default MainHeader;
