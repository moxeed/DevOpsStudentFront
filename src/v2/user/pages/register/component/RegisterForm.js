import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { phoneNumberValidation } from "../../../../components/utility/validators";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../../components/utility/toast";
import { RegisterService } from "../../../service/registerService";
import { useAuthentication } from "../../../../components/slice/useAuthentication";
import RegisterFields from "./RegisterFields/RegisterFields";
import IdentityContainer from "../../../components/IdentityContainer/IdentityContainer";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import UUID from "src/v2/components/storage/ClientId";
import { toEnglishNumberString } from "src/v2/components/utility/converters";

const PasswordLength = 5;

const RegisterForm = () => {
  const [form, setForm] = React.useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    code: 0,
  });
  const history = useHistory();
  const [pending, setPending] = React.useState(false);
  const [resetTime, setResetTime] = React.useState(false);
  const [alreadyHasAccount, setAlreadyHasAccount] = React.useState(false);
  const { phone } = useParams();
  const { RegisterUser } = useAuthentication();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: toEnglishNumberString(e.target.value.trim()),
    });
  };

  React.useEffect(() => {
    if (phone) {
      setForm({ ...form, phoneNumber: phone });
    }
  }, [phone]);

  const sendOTP = () => {
    setResetTime(false);
    if (phoneNumberValidation(form.phoneNumber)) {
      setPending(true);
      RegisterService.sendOTP({ phoneNumber: form.phoneNumber })
        .then((res) => {
          successToast(res.data.message);
          setAlreadyHasAccount(false);
          GApushData("new register", {
            clientName: form.phoneNumber,
            clientSystem: UUID.get(),
          });
        })
        .catch((err) => {
          errorToast(err.message);
          if (err.errorCode === 1006) setAlreadyHasAccount(true);
          setResetTime(true);
        })
        .finally(() => setPending(false));
    } else {
      warningToast("شماره درست وارد نشده است");
      setResetTime(true);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (
      form.password.length >= PasswordLength &&
      form.confirmPassword.length >= PasswordLength &&
      form.password === form.confirmPassword &&
      phoneNumberValidation(form.phoneNumber) &&
      `${form.code}`.length === 4
    ) {
      setPending(true);
      RegisterService.signUp({
        ...form,
        code: +form.code,
        phoneNumber: form.phoneNumber,
      })
        .then((res) => {
          RegisterUser(res.data);
          successToast("ثبت نام با موفقیت انجام شد");
          history.push("/");
        })
        .catch((err) => {
          errorToast(err.message);
        })
        .finally(() => {
          setPending(false);
        });
    } else {
      if (form.password !== form.confirmPassword) {
        warningToast("رمز عبور با تایید رمز مطابقت ندارد");
      } else warningToast("اطلاعات ثبت درست وارد نشده است");
    }
  };

  const setOTP = (otp) => setForm({ ...form, code: otp });

  React.useEffect(() => {
    setResetTime(true);
  }, [form.phoneNumber]);

  return (
    <IdentityContainer
      Component={() => (
        <RegisterFields
          form={form}
          setForm={setForm}
          PasswordLength={PasswordLength}
          handleChange={handleChange}
          sendOTP={sendOTP}
          resetTime={resetTime}
          alreadyHasAccount={alreadyHasAccount}
          submit={submit}
          pending={pending}
          setOTP={setOTP}
        />
      )}
    />
  );
};

export default RegisterForm;
