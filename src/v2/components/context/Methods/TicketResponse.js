import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PanelService } from "src/v2/api/front-panel";
import BlueButton from "../../reusable/BlueButton/BlueButton";

export const TicketResponse = ({ connection }) => {
  const [open, setOpen] = useState(false);
  const [response, add] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (response.id) PanelService.ReadTicket(response.id);
    setOpen(false);
  };
  useEffect(() => {
    if (connection) {
      connection.on("RespondTicket", (body) => {
        add(body);
        handleClickOpen();
      });
    }
  }, [connection]);

  if (!response) return null;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      width="md"
      fullWidth
    >
      <DialogTitle id="responsive-dialog-title">
        پشتیبانی آنلاین سایت
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="responsive-dialog-title">
          در پاسخ به :{" "}
          <span style={{ color: "green", fontSize: "16px" }}>
            {response.content}
          </span>
        </DialogContentText>

        <DialogContentText
          sx={{
            fontSize: "16px",
            mt: 3,
            width: "100%",
            border: "1px solid grey",
            padding: "6px 12px",
            color: "black",
            borderRadius: "12px",
          }}
        >
          {response.reply}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <BlueButton func={handleClose} label="متوجه شدم" />
      </DialogActions>
    </Dialog>
  );
};
