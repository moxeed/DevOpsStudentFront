import { CircularProgress, TextField } from "@mui/material";
import { toEnglishNumberString } from "src/v2/components/utility/converters";
import { phoneNumberValidation } from "src/v2/components/utility/validators";
import React from "react";
import classes from "./PhoneNumberInput.module.scss";
import PhoneCall from "src/v2/assets/images/Icons/phone.svg";

const PhoneNumberInput = ({ form, setForm, loading, phoneKey, className }) => {
  return (
    <TextField
      className={classes.inputRounded + " " + className}
      fullWidth
      type={"number"}
      value={form[phoneKey]}
      sx={{ input: { direction: "rtl", textAlign: "right" } }}
      onChange={(e) =>
        e.target.value.length <= 11 &&
        setForm({
          ...form,
          [phoneKey]: toEnglishNumberString(e.target.value.trim()),
        })
      }
      error={!phoneNumberValidation(form[phoneKey])}
      label={"شماره تماس"}
      disabled={loading}
      placeholder={"09xxxxxxxxx"}
      InputProps={
        loading
          ? {
              endAdornment: (
                <img src={PhoneCall} style={{ margin: 3, width: "25px" }} />
              ),

              startAdornment: (
                <CircularProgress color="secondary" sx={{ mx: 3 }} size={20} />
              ),
            }
          : {
              endAdornment: (
                <img src={PhoneCall} style={{ margin: 3, width: "25px" }} />
              ),
            }
      }
    />
  );
};
export default PhoneNumberInput;
