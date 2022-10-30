import { LoadingButton } from "@mui/lab";
import { Card, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PhoneNumberInput from "src/v2/components/reusable/PhoneNumberInput/PhoneNumberInput";
import TicketVector from "src/v2/assets/images/Vector/TicketCevtor.png";
import classes from "./TicketForm.module.scss";
import NotificationService from "../../../../Services/Notification/NotificationService";
import * as React from "react";
import Profile from "src/v2/assets/images/Icons/profile.svg";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { GetUserId } from "src/Services/Authentication/useAuthentication";
import { phoneNumberValidation } from "src/v2/components/utility/validators";
import UUID from "src/v2/components/storage/ClientId";

const TicketForm = ({ setOpen }) => {
  const location = useLocation();

  const [form, setForm] = useState({
    content: "",
    phoneNumber: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const checkText = (text) => {
    if (text === "سلام" || text === "" || text.length < 5) return false;
    return text;
  };
  const sendTicket = (e) => {
    e.preventDefault();
    if (!checkText(form.content)) {
      toast.warn("متن نوشته شما کوتاه میباشد، لطفا مشکل خود را شرح دهید.");
      return;
    }
    if (!phoneNumberValidation(form.phoneNumber)) {
      toast.warn("شماره تماس برای پشتیبانی الزامی است.");
      return;
    }
    setLoading(true);
    const postBody = {
      phoneNumber: form.phoneNumber.trim(),
      content: form.content,
      origin: location.pathname,
      userId: GetUserId(),
      userName: form.name,
      clientId: UUID.get(),
    };
    NotificationService.AddTicket(postBody).then(() => {
      setOpen(false);
      toast.success(
        "تیکت شما ثبت شد؛ همکاران ما به زودی با شما تماس خواهند گرفت."
      );
    });
  };

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => setToggleState(index);

  return (
    <Card className={classes.TicketForm}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid xs={12} item>
          <Typography className={classes.SupportInfoText}>
            پشتیبانی برترها جهت رفع ابهامات و مشکلات در خدمت شماست. درصورت عدم
            پاسخدهی آنلاین بعد از ده دقیقه، میتوانید با شماره پشتیبانی تماس
            بگیرید یا تا 24 ساعت آینده، پشتیبانان ما با شما تماس خواهند گرفت.
          </Typography>
        </Grid>
        <Grid xs={12} md={6} item sx={{ px: 1 }}>
          <Typography className={classes.TicketTitle}>
            تماس با برترها
          </Typography>
          <TextField
            className={
              toggleState === 1 ? classes.ActiveInput : classes.FormInput
            }
            onClick={() => toggleTab(1)}
            type={"text"}
            fullWidth
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            value={form.name}
            label={"نام و نام خانوادگی"}
            InputProps={{
              endAdornment: (
                <img src={Profile} style={{ margin: 3, width: "25px" }} />
              ),
            }}
          />
          <div onClick={() => toggleTab(2)}>
            <PhoneNumberInput
              form={form}
              className={
                toggleState === 2 ? classes.ActiveInput : classes.FormInput
              }
              setForm={setForm}
              loading={false}
              phoneKey={"phoneNumber"}
            />
          </div>
          <TextField
            className={
              toggleState === 3 ? classes.ActiveInput : classes.FormInput
            }
            onClick={() => toggleTab(3)}
            type={"text"}
            fullWidth
            multiline
            minRows={2}
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value,
              })
            }
            value={form.content}
            label={"مشکل خود را بنویسید ..."}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              className={classes.SubmitBtn}
              loading={loading}
              type={"submit"}
              loadingIndicator="در حال ارسال"
              variant={"contained"}
              onClick={sendTicket}
            >
              ارسال پیام
            </LoadingButton>
          </div>
        </Grid>
        <Grid
          xs={12}
          md={6}
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ p: 3 }}
        >
          <Typography className={classes.SupportInfoText}>
            در صورت بروز مشکل می توانید در وقت اداری در سایت
            <span className={classes.HighlightedText}>{" (9 الی 17) "}</span>
            با شماره پشتیبانی
            <span className={classes.UnderlinedText}>{" 02141023000 "}</span>
            تماس بگیرید.
          </Typography>
          <img src={TicketVector} alt="" style={{ width: "auto" }} />
          <Typography className={classes.SupportInfoText}>
            و یا مشکل خود را در کادر مقابل نوشته و همکاران ما در چند ساعت آینده
            با شما تماس خواهند گرفت.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TicketForm;
