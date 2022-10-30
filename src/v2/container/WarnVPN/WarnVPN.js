import * as React from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { checkVPN } from "turn-it-off";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WarnVPN = ({ open, setOpen }) => {
  React.useEffect(() => {
    if (sessionStorage.getItem("vpn") !== "true")
      checkVPN()
        .then((res) => {
          if (res?.hasVPN) {
            setOpen(true);
          }
        })
        .catch(console.log);
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(true)}
    >
      <DialogTitle>هشدار استفاده از فیلترشکن</DialogTitle>
      <DialogContent>
        <Typography>
          برای استفاده راحت تر از سایت، لطفا فیلترشکن خود را خاموش کنید.
        </Typography>
      </DialogContent>
      <DialogActions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            color="secondary"
            onChange={(e) => {
              sessionStorage.setItem("vpn", e.target.checked);
            }}
          />
          <Typography>دیگر نمایش نده</Typography>
        </div>
        <Button
          variant={"contained"}
          type={"submit"}
          onClick={() => setOpen(false)}
        >
          خاموش کردم
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarnVPN;
