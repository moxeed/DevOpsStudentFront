import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SchoolIcon from "@mui/icons-material/School";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { groupIdToLabel, tomanConverter } from "../../../../../../components/utility/converters";

// Box of user info

const Items = (form) => [
  {
    value: form.number,
    icon: <PhoneAndroidIcon color="primary" />,
  },
  {
    value: groupIdToLabel[form.groupId],
    icon: <SchoolIcon color="success" />,
  },
  {
    value: tomanConverter(form.money),
    icon: <CreditScoreIcon color="secondary" />,
  },
];

const UserInfo = () => {
  // todo
  // add service
  const [info, setInfo] = React.useState({
    name: "",
    number: "",
    money: 0,
    groupId: 1,
  });

  React.useEffect(() => {
    // todo
    // add service
    setInfo({
      name: "نام و نام خانوادگی",
      number: "09121212121",
      money: 120000,
      groupId: 1,
    });
  }, []);

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} spacing={2}>
      <Grid
        item
        container
        xs={12}
        md={6}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        <Grid item xs={12} sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography component={"span"} variant="h5">
            {info.name}
          </Typography>
        </Grid>
        {Items(info).map((item, i) => (
          <Grid item xs={6} md={12} key={"userInfo_" + i}>
            <Typography
              component={"span"}
              variant={"caption"}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {item.icon}
              {item.value}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={6} md={12}>
          <Link to="/v2/profile/edit" >
            <Typography
              component={"span"}
              variant={"caption"}
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 2,
                cursor: "pointer",
                color: blue[500],
              }}
            >
              <EditIcon fontSize="small" />
              ویرایش اطلاعات کاربری
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        sx={{ textAlign: { xs: "center", md: "left" }, mt: 5 }}
      >
        <Button variant={"contained"} color={"secondary"}>
          خروج از سیستم
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
