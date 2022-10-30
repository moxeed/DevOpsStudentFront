import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { HideModal } from "../../../Services/StoreSlices/ModalSlice";
import { useDispatch } from "react-redux";


const ModalReadyWorkBook = () => {
   const dispatch = useDispatch();
    return (
      <Grid container>
        <Grid item md={12} xs={12} sm={12} style={{ textAlign: "center" }}>
          <HelpIcon style={{ fontSize: 50 }} />
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          sm={12}
          style={{ textAlign: "center", padding: 10, fontSize: 15 }}
        >
          <Typography variant="h6">
            در حال حاضر کارنامه آماده نمی باشد
          </Typography>
        </Grid>
        <Grid container style={{ direction: "ltr" }}>
          <Button
           className="Button"
            size="large"
            variant="contained"
            onClick={() => dispatch(HideModal())}
          >
            بستن پیام
          </Button>
        </Grid>
      </Grid>
    );
  };


export default ModalReadyWorkBook;
