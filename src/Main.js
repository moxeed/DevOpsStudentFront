import "./App.scss";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ModalContainer } from "./Components/Common/ModalContainer";
import "antd/dist/antd.css";
import MenuProvider from "./Components/Layout/MenuProvider";
import LoadingContainer from "./Components/Common/LoadingContainer";
import Router from "./Router";
import Offline from "react-offline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Footer from "./Components/Layout/Footer";
import ScrollToTop from "./Utility/ScrollToTop";
import { theme } from "./Styles/Theme";
import AboutUsPage from "./v2/main/pages/about-us/AboutUsPage";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  wrapper: {
    width: "100%",
    background: "#FFFBFA",
  },
}));
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleChange = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleChange} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
function Main(props) {

  return (
    <Offline>
      {({ isOffline }) => {
        return isOffline ? (
          <AboutUsPage />
        ) : (
          <ThemeProvider theme={theme}>
            <div className="App" data-test="component-app">
              <div id="back-to-top-anchor" />
              <LoadingContainer />
              <MenuProvider />
              <ScrollToTop>
                <Router isOffline={isOffline} />
              </ScrollToTop>
              <ScrollTop {...props}>
                <Fab
                  color="secondary"
                  size="small"
                  aria-label="scroll back to top"
                >
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
              <div id="space" />
              <Footer />
            </div>
            <ModalContainer />
            <ToastContainer />
          </ThemeProvider>
        );
      }}
    </Offline>
  );
}

export default Main;
