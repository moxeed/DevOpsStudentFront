import { TextField, Grid, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PhoneNumberValidation from "../../Utility/PhoneNumberValidation";
import "../../Pages/Register.scss";
import IDivider from "../Reusable/IDivider";
import useHistoryBack from "../../v2/components/hooks/useHistoryBack";

const CompleteProfileForm = () => {
  const [phoneNumber1, setphoneNumber1] = useState("");
  const [phoneNumber2, setphoneNumber2] = useState("");
  const [validation1, setValidation1] = useState();
  const [validation2, setValidation2] = useState();
  const history = useHistory();

  const handleSubmit = () => {
    useHistoryBack(history);
  };
  useEffect(() => {
    setValidation1(PhoneNumberValidation(phoneNumber1));
  }, [phoneNumber1]);
  useEffect(() => {
    setValidation2(PhoneNumberValidation(phoneNumber2));
  }, [phoneNumber2]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          {" "}
          <IDivider title="تکمیل اطلاعات" color="#41B64E" />{" "}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="tel"
            name="phone1"
            value={phoneNumber1}
            autoComplete="off"
            placeholder=" شماره تماس پدر"
            pattern="09[0-9]{9}"
            maxLength="11"
            minLength="11"
            onChange={(e) => {
              setphoneNumber1(e.target.value);
            }}
            required
            error={phoneNumber1 === ""}
            helperText={
              !validation1 && phoneNumber1 ? "شماره را درست وارد کنید!" : " "
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="tel"
            name="phone2"
            value={phoneNumber2}
            autoComplete="off"
            placeholder="شماره تماس مادر"
            pattern="09[0-9]{9}"
            maxLength="11"
            minLength="11"
            onChange={(e) => {
              setphoneNumber2(e.target.value);
            }}
            required
            error={phoneNumber2 === ""}
            helperText={
              !validation2 && phoneNumber2 ? "شماره را درست وارد کنید!" : " "
            }
          />
        </Grid>
        <Grid item={12}>
          <Button className="Button" type="submit" variant="contained">
            ثبت نام
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CompleteProfileForm;
