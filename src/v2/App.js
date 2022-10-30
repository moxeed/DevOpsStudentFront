import * as React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "./styles/theme";
import "./styles/globals.css";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { ToastContainer } from "react-toastify";
import V2Router from "./router/Router";
import "react-toastify/dist/ReactToastify.css";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export default function MyApp() {
  return (
    <StyledEngineProvider injectFirst>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div
              className="v2"
              style={{
                minHeight: "100vh",
                backgroundColor: theme.palette.whiteSmoke,
                direction: "rtl",
              }}
            >
              <V2Router />
            </div>
            <ToastContainer />
          </ThemeProvider>
        </CacheProvider>
    </StyledEngineProvider>
  );
}
