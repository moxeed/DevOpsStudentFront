import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import Main from "./Main";
import MyApp from "./v2/App";
import CompleteInfoForm from "./v2/container/RegisterInfo/CompleteInfoForm";
import { CustomerService } from "./v2/user/service/customerService";
import { useSelector } from "react-redux";
import UserInfo from "./v2/components/storage/UserInfo";
import { IsAuthenticated } from "./Services/StoreSlices/UserSlice";
import { useAuthentication } from "./v2/components/slice/useAuthentication";
import { ToastContainer } from "react-toastify";
import theme from "./v2/styles/theme";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { errorToast } from "./v2/components/utility/toast";
import { SupportButton } from "./v2/container/Ticket/Button/SupportButton";
import useQuery from "./v2/components/hooks/QueryParam";
import WarnVPN from "./v2/container/WarnVPN/WarnVPN";
import UUID from "./v2/components/storage/ClientId";
import { GApushData } from "./v2/components/GAlog/GAlog";
import { Dialog } from "@material-ui/core";
import ConfirmPhoneNumber from "./v2/container/ConfirmPhoneNumber/ConfirmPhoneNumber";
import ConfirmPhone from "./v2/components/storage/ConfirmPhone";
import { GetUserId } from "./Services/Authentication/useAuthentication";
import { isTimeCorrect } from "./v2/components/utility/time";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

function App() {
  const query = useQuery();
  const source = query.get("source");
  const source2 = query.get("s");

  React.useEffect(() => {
    if (source) {
      sessionStorage.setItem("src", source);
      GApushData(source, {
        userId: GetUserId(),
      });
    }
    if (source2) {
      sessionStorage.setItem("src", source2);
      GApushData(source2, {
        userId: GetUserId(),
      });
    }
  }, [source, source2]);

  React.useEffect(() => {
    isTimeCorrect().then((res) => {
      sessionStorage.setItem("correct-time", res);
    });
  }, []);

  const [openForm, setOpenForm] = React.useState(false);
  const [openWarn, setOpenWarn] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({
    phoneNumber: "",
    id: "",
  });

  const isAuthenticated = useSelector(IsAuthenticated);

  const { CheckExpiration, SetUserName } = useAuthentication();

  React.useEffect(CheckExpiration, [CheckExpiration]);

  React.useEffect(() => {
    if (isAuthenticated) {
      CustomerService.customerInfo()
        .then((res) => {
          if (res.data.isComplete === false) {
            setOpenForm(true);
          } else {
            const { userId, name, lastName, groupId, phoneNumber } = res.data;
            UserInfo.set({ userId, groupId });
            SetUserName(name + " " + lastName);
            setUserData({ ...userData, phoneNumber: phoneNumber, id: userId });
            setOpen(true);
            GApushData("login", {
              clientName: name + " " + lastName,
              userId: userId,
              refrence: sessionStorage.getItem("src"),
              clientSystem: UUID.get(),
            });
          }
        })
        .catch((err) => {
          if (err) errorToast("خطا در احراز هویت");
        });
    } else {
      GApushData("enter", {
        clientSystem: UUID.get(),
        refrence: sessionStorage.getItem("src"),
      });
    }
  }, [isAuthenticated, openForm]);

  function ScrollToTop() {
    const history = useHistory();
    React.useEffect(() => {
      const unlisten = history.listen((location, action) => {
        if (action !== "POP") {
          window.scrollTo(0, 0);
        }
      });
      return () => unlisten();
    }, [history]);
    return null;
  }
  return (
    <Router>
      <Switch>
        <Route path="/v2">
          <MyApp></MyApp>
          {!Boolean(ConfirmPhone.get() === "true") || ConfirmPhone.expired() ? (
            <Dialog
              onClose={() => setOpen(false)}
              open={open}
              maxWidth="sm"
              sx={{ mt: 20 }}
            >
              <ConfirmPhoneNumber setOpen={setOpen} userData={userData} />
            </Dialog>
          ) : null}
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div
              style={{
                backgroundColor: theme.palette.background,
                direction: "rtl",
              }}
            >
              {openForm && (
                <CompleteInfoForm open={openForm} setOpen={setOpenForm} />
              )}
              <WarnVPN open={openWarn} setOpen={setOpenWarn} />
            </div>
            <div
              style={{
                position: "fixed",
                bottom: "15%",
                right: "5%",
                zIndex: "101",
              }}
            >
              <SupportButton />
            </div>
            <ToastContainer />
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
      <ScrollToTop />
    </Router>
  );
}

export default App;
