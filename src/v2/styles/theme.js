import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  direction: "rtl",
  palette: {
    green: "#04AA6D",
    white: "#fff",
    blueWhite: "#F9F9FF",
    solidGreen: "#4FC451",
    whiteSmoke: "#F5F5F5",
    mountainMeadow: "#01BA94",
    title: "#02332c",
    mediumJungleGreen: "#0A4158",
    wintergreenDream: "#4B8378",
    deepSaffron: "#FF9636",
    ScallopSeashell: "#E4D7D0",
    middleBlue: "#5cd4ed",
    cosmicCobalt: "#3E3087",
    marengo: "#5D6070BD",
    darkSpaceCadet: "#141a38",
    googooli: "#9B8DEB",
    byzantineBlue: "#555fd8",
    darkByzantineBlue: "#5433d6",
    platinum: "#E7E7E7",
    lightCyan: "#D0F0F2",
    blueBell: "#9F9DD6",
    babyPink: "#facece",
    eecolor: "#EEEEEE",
    melogray: "#A5A0A0",
    darkBlue:'#1E2756'
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  typography: {
    fontFamily:
      "-apple-system, Kalameh, KalamehBold, KalamehThin, KalamehNum, Ubuntu, MainKalameh, sans-serif",
  },
});

theme = responsiveFontSizes(theme);

export default theme;
