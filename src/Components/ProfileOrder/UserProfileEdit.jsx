import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileService from "../../Services/Profile/ProfileService";
import { useDispatch } from "react-redux";
import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import HandleEdit from "./HandleEdit";
import EditableTextFieldName from "./EditableTextFieldName";
import EditableTextFieldGroup from "./EditableTextFieldGroup";
import EditPhoneNumber from "./EditPhoneNumber";
import ModalEdit from "./ModalEdit";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const UserProfileEdit = () => {
  const classes = useStyles();
  const [user, setUser] = React.useState();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userphoneNumber, setUserphoneNumber] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [groupId, setGroupId] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visiblePhoneNumber, setVisiblePhoneNumber] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVisible(false);
    setVisiblePhoneNumber(false);
  };

  useEffect(() => {
    dispatch(ShowLoading());
    ProfileService.GetUserProfile().then((res) => {
      setUser(res);
      setUserName(res.name);
      setUserLastName(res.lastName);
      setUserphoneNumber(res.phoneNumber);
      dispatch(HideLoading());
    });
  }, [dispatch, open, visible, visiblePhoneNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(name);
    setUserLastName(lastName);
    setUserphoneNumber(phoneNumber);
    const postBody = {
      Name: name ? name : user.name,
      LastName: lastName ? lastName : user.lastName,
      PhoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
      Sex: Boolean(user?.sex),
      GroupId: groupId ? groupId : user.groupId,
    };
    ProfileService.PostEditeProfile(postBody).then(() => {
      setOpen(false);
      setVisible(false);
      setVisiblePhoneNumber(false);
    });
  };

  const handleChangeGroup = (event) => {
    setGroupId(Number(event.target.value));
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
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
                  <Typography>
                    <HandleEdit handleClick={handleOpen} />
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
                    {user.isPhoneConfirmed === true ? (
                      <Typography style={{ color: "#41b64e" }}>
                        تایید شده است
                      </Typography>
                    ) : (
                      <Typography style={{ color: "red" }}>
                        لطفا شماره تماس خود را تایید کنید
                      </Typography>
                    )}
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
            <TableRow style={{ border: "1px solid #F5F5F5" }}>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>
                    شماره تلفن همراه :
                    {user.phoneNumber ? user.phoneNumber : "ثبت نشده است"}
                  </Typography>
                  <Typography>
                    <HandleEdit
                      handleClick={() => setVisiblePhoneNumber(true)}
                    />
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
                  <Typography>
                    <HandleEdit handleClick={() => setVisible(true)} />
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <CircularProgress />
        )}
        <ModalEdit
          body={
            <EditableTextFieldName
              handleChangeName={handleChangeName}
              handleChangeLastName={handleChangeLastName}
              handleSubmit={handleSubmit}
              userName={userName}
              userLastName={userLastName}
            />
          }
          visible={open}
          handleClose={handleClose}
        />
        <ModalEdit
          body={
            <EditPhoneNumber
              handleChangePhoneNumber={handleChangePhoneNumber}
              handleSubmit={handleSubmit}
              userphoneNumber={userphoneNumber}
            />
          }
          visible={visiblePhoneNumber}
          handleClose={handleClose}
        />
        <ModalEdit
          body={
            <EditableTextFieldGroup
              handleChangeGroup={handleChangeGroup}
              groupId={groupId}
              handleSubmit={handleSubmit}
            />
          }
          visible={visible}
          handleClose={handleClose}
        />
      </Table>
    </Grid>
  );
};
export default UserProfileEdit;
