import { useState } from "react";
import Logo from "../../../assets/images/Vector/Support.gif";
import * as React from "react";
import { Dialog, Fab } from "@mui/material";
import TicketForm from "../Form/TicketForm";

export const SupportButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        color="inherit"
        type="button"
        onClick={() => setOpen(true)}
        size="large"
        style={{ width: "6em", height: "6em" }}
      >
        <img
          src={Logo}
          alt="support"
          style={{ width: "100%", borderRadius: "50%" }}
        />
      </Fab>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        maxWidth="sm"
        sx={{ mt: 20 }}
      >
        <TicketForm setOpen={setOpen} />
      </Dialog>
    </>
  );
};
