import React, { useEffect } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { ShowLoading } from "../../Services/StoreSlices/LoadingSlice";

import CircularProgress from "@material-ui/core/CircularProgress";
import { CustomerService } from "../../v2/user/service/customerService";
import IdentityService from "../../Services/Identity/IdentityService";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    backgroundColor: "white",
    "& td": {
      border: "1px solid #F5F5F5",
    },
    "& p": {
      display: "flex",
      justifyContent: "right",
      padding: 5,
      color: "gray",
    },
    "& .MuiTableRow-root": {
      display: "grid",
      [theme.breakpoints.up("970")]: {
        display: "table-row",
      },
    },
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const [user, setUser] = React.useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowLoading());

    IdentityService.GroupId().then((groups) => {
      CustomerService.customerInfo().then((res) => {
        const data = res.data;
        data.groupName = groups.filter(
          (item) => item.id === data.groupId
        )[0].name;
        setUser(data);
      });
    });
  }, [dispatch]);

  return (
    <Grid item xs={11} sm={11}>
      <Typography
        variant="h6"
        style={{ color: "gray", fontWeight: "bold", margin: 20 }}
      >
        اطلاعات شخصی
      </Typography>
      <Table className={classes.root}>
        {user ? (
          <TableBody style={{ border: "1px solid #F5F5F5" }}>
            <TableRow>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>
                    {" "}
                    نام و نام خانوادگی :{" "}
                    {user.name ? user.name : "ثبت نشده است"}{" "}
                    {user.lastName ? user.lastName : "ثبت نشده است"}
                  </Typography>
                </div>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Typography style={{ padding: "10px 15px " }}>
                    وضعیت تایید حساب:
                  </Typography>
                  <Typography style={{ paddingRight: 15 }}>
                    {user.isComplete === true ? (
                      <Typography style={{ color: "#41b64e" }}>
                        تایید شده است
                      </Typography>
                    ) : (
                      <Typography style={{ color: "red" }}>
                        لطفا اطلاعات حساب کاربری خود را تکمیل کنید{" "}
                      </Typography>
                    )}
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
            <TableRow style={{ border: "1px solid #F5F5F5" }}>
              <TableCell>
                <div style={{ display: "flex" }}>
                  <Typography>شماره تلفن همراه :</Typography>
                  <Typography>
                    {user.phoneNumber ? user.phoneNumber : "ثبت نشده است"}
                  </Typography>
                </div>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>
                    {" "}
                    مقطع تحصیلی :{" "}
                    {user.groupName ? user.groupName : "ثبت نشده است"}
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <CircularProgress />
        )}
      </Table>
    </Grid>
  );
};
export default UserProfile;
