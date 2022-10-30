import * as React from "react";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import {
  successToast,
  warningToast,
} from "../../../../../../components/utility/toast";
import SelectGroupId from "../../../../../../components/reusable/SelectGroupId/SelectGroupId";

// User edit info form

const EditInfo = () => {
  const [info, setInfo] = React.useState({
    name: "",
    lastName: "",
    groupId: 0,
  });

  React.useEffect(() => {
    // todo
    // add service
    setInfo({
      name: " نام ",
      lastName: " نام خانوادگی",
      groupId: 3,
    });
  }, []);
  const router = useHistory();

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (info.name.length > 0 && info.lastName.length > 0) {
      // todo
      // add service
      successToast("ویرایش با موفقیت انجام شد");
      router.push("/v2/profile/orders");
    } else {
      warningToast("خانه های ضروری را پر کنید");
    }
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} spacing={1}>
      <Grid item xs={12} md={3} container justifyContent={"center"}>
        <Avatar sx={{ width: 160, height: 160, bgcolor: purple[200] }}></Avatar>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={6}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={3}
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography component={"span"} variant="h5">
            ویرایش اطلاعات کاربری
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={"نام"}
            name={"name"}
            variant={"outlined"}
            value={info.name}
            onChange={handleChange}
            error={info.name.length === 0}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={"نام خانوادگی"}
            variant={"outlined"}
            name={"lastName"}
            value={info.lastName}
            onChange={handleChange}
            error={info.lastName.length === 0}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectGroupId value={info.groupId} handleChange={handleChange} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant={"contained"}
          color={"secondary"}
          onClick={handleSubmit}
        >
          ثبت ویرایش
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditInfo;
