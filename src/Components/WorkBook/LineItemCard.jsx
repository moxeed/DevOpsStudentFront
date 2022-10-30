import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles} from "@material-ui/core";
import ButtonGroup from "./ButtonGroup";
import ButtonSelect from './ButtonSelect'
import MarkSelect from "./MarkSelect";
import ModalAnswer from './ModalAnswer'
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import { useDispatch } from "react-redux";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#E1E1E2",
    },
    direction: "rtl",
    textAlign: "center",
    height: "40px",
  },
}));
const LineItemCard = ({ number, dataOffline, dataWorkBook }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const col = 10;
  return (
    <>
      {[...Array(col)].map((e, i) => (
        <Grid container item className={classes.root} key={i}>
          <Grid item md={3} xs={3} sm={3}>
            <ButtonSelect dataOffline={dataOffline} number={number + i} />
          </Grid>
          <Grid item md={3} xs={2} sm={2}>
            <MarkSelect dataOffline={dataOffline} number={number + i} />
          </Grid>
          <Grid item md={5} xs={6} sm={6}>
            <ButtonGroup
              dataOffline={dataOffline}
              number={number + i}
              handleButton={() =>
                dispatch(
                  ShowModal(() => (
                    <ModalAnswer
                      dataOffline={dataOffline}
                      number={number + i}
                      dataWorkBook={dataWorkBook}
                    />
                  ))
                )
              }
            />
          </Grid>
          <Grid
            item
            md={1}
            xs={1}
            sm={1}
            style={{ marginTop: 10, paddingLeft: 6 }}
          >
            {number + i}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default LineItemCard;
