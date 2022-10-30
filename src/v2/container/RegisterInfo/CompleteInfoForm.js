import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Slide,
  TextField,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
import { profileService } from "src/v2/user/service/profileService";
import {
  errorToast,
  successToast,
  warningToast,
} from "src/v2/components/utility/toast";
import SelectGroupId from "src/v2/components/reusable/SelectGroupId/SelectGroupId";
import { CustomerService } from "src/v2/user/service/customerService";
import UserInfo from "src/v2/components/storage/UserInfo";
import { useAuthentication } from "src/v2/components/slice/useAuthentication";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CompleteInfoForm = ({ open, setOpen }) => {
  const [form, setForm] = React.useState({
    name: "",
    lastName: "",
    groupId: 1,
    sex: null,
  });

  const { SetUserName } = useAuthentication();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (form.name.length > 0 && form.lastName.length > 0 && form.sex) {
      profileService
        .completeProfile({ ...form, sex: Boolean(form.sex) })
        .then((data) => {
          if (data.status === 200) {
            successToast("ثبت نام شما با موفقیت انجام شد");

            setOpen(false);
            CustomerService.customerInfo().then((res) => {
              const { userId, name, lastName, groupId } = res.data;
              UserInfo.set({ userId, groupId });
              SetUserName(name + " " + lastName);
            });
          } else {
            errorToast("ثبت با مشکل رو به رو شد");
          }
        })
        .catch(() => errorToast("ثبت با مشکل رو به رو شد"));
    } else {
      warningToast("اطلاعات ثبت درست وارد نشده است");
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(true)}
    >
      <DialogTitle>
        لطفا جهت تجربه کاربری بهتر، فرم زیر را تکمیل کنید.
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <TextField
              value={form.name}
              fullWidth
              label={"نام"}
              name={"name"}
              error={form.name.length === 0}
              onChange={handleChange}
              variant={"outlined"}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <TextField
              value={form.lastName}
              fullWidth
              name={"lastName"}
              label={"نام خانوادگی"}
              error={form.lastName.length === 0}
              variant={"outlined"}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <SelectGroupId value={form.groupId} handleChange={handleChange} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ p: 2 }}
          >
            <FormControl sx={{ display: { md: "inline", xs: "" } }} required>
              <FormLabel sx={{ mr: "12px" }}>جنسیت</FormLabel>
              <RadioGroup
                value={form.sex}
                onChange={handleChange}
                name="sex"
                style={{ display: "inline" }}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={"خانم"}
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label={"آقا"}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent={"center"}
            sx={{ p: 1 }}
          ></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} type={"submit"} onClick={submit}>
          ثبت اطلاعات ورود
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteInfoForm;
