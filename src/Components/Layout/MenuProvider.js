import React from "react";
import Navbar from "./Navbar";
import Appbar from "./Appbar";
import GroupIcon from "@material-ui/icons/Group";
import { useAuthentication } from "../../Services/Authentication/useAuthentication";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import { useSelector } from "react-redux";
import { Hidden } from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CreateIcon from "@material-ui/icons/Create";
import CelebrationIcon from '@mui/icons-material/Celebration';
const Headers = [
  {
    title: "مشاوره و برنامه ریزی ",
    icon: <GroupIcon fontSize="small" />,
    disabled: false,
    route: "/Selection/Provider/Consultation/3",
  },

  {
    title: "همایش های آنلاین",
    icon: <SchoolIcon fontSize="small" />,
    disabled: false,
    route: "/Selection/Product/Webinar/3",
  },
  {
    title: "همایش های آنلاین رایگان",
    icon: <SchoolIcon fontSize="small" />,
    disabled: false,
    route: "/Selection/Product/Webinar/3/free",
  },
  {
    title: "تدریس خصوصی ",
    icon: <ContactPhoneIcon fontSize="small" />,
    disabled: false,
    route: "/Selection/Product/Tutoring/3",
  },
  {
    title: "کلاس های مجازی",
    icon: <CreateIcon fontSize="small" />,
    disabled: false,
    route: "/v2/store/selection/rayan",
  },
  {
    title: "رایان کلاس",
    icon: <CelebrationIcon fontSize="small" />,
    disabled: false,
    route: "/v2/store/trend",
  },
];
export default function MenuProvider() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const { ResetToken } = useAuthentication();
  const isAuthenticated = useSelector(IsAuthenticated);

  const breakpoint = 970;
  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  React.useEffect(() => {
    width > breakpoint ? removeSpace() : addSpace();
  }, [width]);
  function addSpace() {
    const div = document.getElementById("space");
    div.style.height = "90px";
    div.style.backgroundColor = "transparent";
  }
  function removeSpace() {
    if (document.getElementById("space") !== null) {
      const div = document.getElementById("space");
      div.style.height = "1px";
    }
  }

  return (
    <>
      <Hidden smDown>
        <Navbar
          navItems={[
            ...Headers.filter(
              (item) => item.title !== "همایش های آنلاین رایگان"
            ),
          ]}
          isLoggedIn={isAuthenticated}
          ResetToken={ResetToken}
        />
      </Hidden>
      <Hidden mdUp>
        <Appbar
          barItems={Headers}
          isLoggedIn={isAuthenticated}
          ResetToken={ResetToken}
        />
      </Hidden>
    </>
  );
}
