import { useState, useEffect } from "react";
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  Button,
  makeStyles,
} from "@material-ui/core";
import PostTutoring from "../../Services/Tutoring/TutoringService";
import { toast } from "react-toastify";
import { SelectSchedules } from "../../Components/Financial/SelectSchedules";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "500",
    margin: "8px auto",
    width: "85%",
    fontSize: "18px",
    textAlign: "center",
    padding: "3px",
  },
  header: {
    fontWeight: "bold",
    color: "#41B64E",
    boxShadow: "none",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
    direction: "rtl !important",
  },
}));

export default function Questionnaire({ lineItem, onComplete }) {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    topic: "",
    dominance: 3,
  });
  const [labels, setLabels] = useState({
    a0: false,
    a1: false,
    a2: false,
  });
  const nextStep = () => {
    setStep(1);
  };

  const handleClick = (e) => {
    setLabels({ ...labels, [e.target.name]: e.target.checked });
  };

  const handleRadioClick = (e) => {
    setForm({ ...form, dominance: e.target.value });
  };

  useEffect(() => {
    const teachingMethods = [];
    if (labels.a0) teachingMethods.push(0);
    if (labels.a1) teachingMethods.push(1);
    if (labels.a2) teachingMethods.push(2);
    setForm({ ...form, teachingMethods });
  }, [labels]);

  const submit = () => {
    if (
      form.topic !== "" &&
      Object.values(labels).some((val) => val === true) &&
      +form.dominance !== 3
    ) {
      PostTutoring.PostQuestionnaire({
        OrderDetailsId: lineItem.orderDetailId,
        Topic: form.topic,
        TeachingMethods: form.teachingMethods,
        Dominance: +form.dominance,
      }).then(onComplete);
    } else {
      toast.warning("لطفا فیلد های خالی را پر کنید");
    }
  };

  const { a0, a1, a2 } = labels;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: step === 0 ? "block" : "none" }}>
        {SelectSchedules({ lineItem, onComplete: nextStep })}
      </div>
      <div
        style={{ margin: "1em auto", display: step !== 0 ? "block" : "none" }}
      >
        <form action="" method="post">
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom className={classes.header}>
                نام مبحثی که نیاز به تدریس آن دارید در کادر زیر بنویسید
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={form.topic}
                placeholder="نام مبحث"
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom className={classes.header}>
                روش تدریس
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component={"fieldset"}>
                <FormLabel>می توانید چند گزینه را انتخاب کنید</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={a0}
                        onChange={handleClick}
                        name={"a0"}
                      />
                    }
                    label="می خواهم به صورت تشریحی به من آموزش داده شود."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={a1}
                        onChange={handleClick}
                        name={"a1"}
                      />
                    }
                    label="نیاز به رفع اشکال و حل تشریحی نمونه سوال امتحانی دارم."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={a2}
                        onChange={handleClick}
                        name={"a2"}
                      />
                    }
                    label="نیاز به حل تست های تیپ بندی شده دارم."
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component={"fieldset"}>
                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.header}
                >
                  {" "}
                  وضعیت تسلط شما در این مبحث چگونه است؟
                </Typography>

                <RadioGroup
                  name="dominance"
                  value={form.dominance}
                  onChange={handleRadioClick}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label={"ضعیف هستم (میانگین درصد پاسخگویی: زیر 20%)"}
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={
                      "سطح متوسطی دارم (میانگین درصد پاسخگویی: بین 20% الی 50%)"
                    }
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={"تسلط دارم.  (میانگین درصد پاسخگویی: بالای 50%)"}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button className="Button" onClick={submit}>
                ثبت فرم
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
