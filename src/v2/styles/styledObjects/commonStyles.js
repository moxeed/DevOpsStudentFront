import theme from "../theme";

const pageContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

const FlexAlignCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const GreenButton = {
  background: theme.palette.green,
  "&:hover": {
    background: theme.palette.mountainMeadow,
  },
};

export { pageContainerStyle, FlexAlignCenter, GreenButton };
