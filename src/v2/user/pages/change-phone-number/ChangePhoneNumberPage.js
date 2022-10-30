import React from "react";
import { Grid, Typography } from "@mui/material";
import OtpInput from "react-otp-input";
import { LoadingButton } from "@mui/lab";
import classes from "src/v2/user/pages/register/component/RegisterFields/RegisterFields.module.scss";
import theme from "src/v2/styles/theme";
import IdentityContainer from "src/v2/user/components/IdentityContainer/IdentityContainer";
import PhoneNumberInput from "src/v2/components/reusable/PhoneNumberInput/PhoneNumberInput";
import SmsButton from "src/v2/components/reusable/SmsButton/SmsButton";
import { phoneNumberValidation } from "src/v2/components/utility/validators";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import UUID from "src/v2/components/storage/ClientId";
import { profileService } from "../../service/profileService";
import {
	errorToast,
	successToast,
	warningToast,
} from "src/v2/components/utility/toast";
import ConfirmPhone from "src/v2/components/storage/ConfirmPhone";
import Token from "src/v2/components/storage/Token";
import { useAuthentication } from "src/v2/components/slice/useAuthentication";
import useHistoryBack from "src/v2/components/hooks/useHistoryBack";
import { useHistory } from "react-router-dom";

const ChangePhoneNumberPage = () => {
	const [pending, setPending] = React.useState(false);
	const [resetTime, setResetTime] = React.useState(false);
	const { RegisterUser } = useAuthentication();
	const [form, setForm] = React.useState({
		phoneNumber: "",
		code: 0,
		id: Token.getUNI(),
	});

	const history = useHistory()

	const sendOTP = () => {
		setResetTime(false);
		if (phoneNumberValidation(form.phoneNumber)) {
			setPending(true);
			profileService
				.sendOTP({ phoneNumber: form.phoneNumber })
				.then((res) => {
					successToast(res.data.message);
					GApushData("new register", {
						clientName: form.phoneNumber,
						clientSystem: UUID.get(),
					});
				})
				.catch((err) => {
					errorToast(err.message);
					if (err.errorCode === 1006) setResetTime(true);
				})
				.finally(() => setPending(false));
		} else {
			warningToast("شماره درست وارد نشده است");
			setResetTime(true);
		}
	};

	const setOTP = (otp) => setForm({ ...form, code: otp });

	const submit = (e) => {
		e.preventDefault();
		if (
			form.id !== "" &&
			phoneNumberValidation(form.phoneNumber) &&
			`${form.code}`.length === 4
		) {
			setPending(true);
			profileService
				.confirmPhoneNumber({
					...form,
					code: +form.code,
					phoneNumber: form.phoneNumber,
				})
				.then((res) => {
					RegisterUser(res.data);
					successToast(" تغییر شماره با موفقیت انجام شد");
					ConfirmPhone.set(true);
					useHistoryBack(history);
				})
				.catch((err) => {
					errorToast(err.message);
				})
				.finally(() => {
					setPending(false);
				});
		} else {
			warningToast("اطلاعات درست وارد نشده است");
		}
	};

	return (
		<IdentityContainer
			Component={() => (
				<form className={`${classes.registerFieldsContainer} ${classes.pishi}`}>
					<Grid
						container
						justifyContent={"center"}
						sx={{ width: "100%", height: "100%", marginLeft: 0 }}
					>
						<Grid
							item
							xs={12}
							md={12}
							justifyContent={"center"}
							sx={{ textAlign: "center" }}
						>
							<div className={classes.registerFieldsTitle}>
								تغییر شماره تماس
							</div>
						</Grid>
						<Grid
							xs={12}
							item
							sx={{ my: 2 }}
							container
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid item xs={12} md={12} sx={{ my: 2 }}>
								<PhoneNumberInput
									form={form}
									setForm={setForm}
									loading={false}
									phoneKey={"phoneNumber"}
								/>
							</Grid>
							<Grid item xs={12} md={12} sx={{ my: 2 }}>
								<SmsButton
									resend={sendOTP}
									pending={pending}
									reset={resetTime}
									disabled={!phoneNumberValidation(form.phoneNumber)}
								/>
							</Grid>
						</Grid>
						<React.Fragment>
							<Grid
								xs={12}
								item
								sx={{
									display: "grid",
									placeItems: "center",
									direction: "rtl",
								}}
							>
								<Typography sx={{ color: theme.palette.darkSpaceCadet }}>
									.کد تایید پیامک شده را وارد کنید
								</Typography>
								<OtpInput
									value={form.code}
									onChange={setOTP}
									numInputs={4}
									separator={"\u2003"}
									inputStyle={classes.otp}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								container
								justifyContent={"center"}
								sx={{ my: 2 }}
							>
								<LoadingButton
									className={classes.primaryButton}
									loading={pending}
									type={"submit"}
									loadingIndicator="درحال بررسی داده"
									variant={"contained"}
									onClick={submit}
								>
									ثبت شماره تماس
								</LoadingButton>
							</Grid>
						</React.Fragment>
					</Grid>
				</form>
			)}
		/>
	);
};

export default ChangePhoneNumberPage;
