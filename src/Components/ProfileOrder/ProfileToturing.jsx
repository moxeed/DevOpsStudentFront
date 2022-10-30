import React, { useEffect } from "react";
import GetProfile from "../../Services/Profile/ProfileService";
import { useDispatch } from "react-redux";
import { Typography, Button ,Grid} from "@material-ui/core";
import { DateTime } from "../../Utility/Date/DateTime";
import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import NoResult from "../Reusable/NoResult";
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import StatusToturing from "./StatusToturing";

const ProfileToturing = ({ id }) => {
  const [packages, setPackages] = React.useState([]);
  const filter = id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowLoading());
    GetProfile.GetTutoringProfile(filter).then(
      (res) => {
        setPackages(res);
        dispatch(HideLoading());
      },
      () => dispatch(HideLoading())
    );
  }, [dispatch, filter]);

  return (
    <>
      {packages?.length > 0 ? (
        <Grid container>
          {packages.map((item, i) => (
            <Grid
              key={i}
              container
              item
              style={{
                backgroundColor: "white",
                display: "flex",
                padding: 5,
                marginTop: 10,
              }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                style={{
                  display: "flex",
                  paddingTop: 10,
                  color: "gray",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {" "}
                  نام درس :{" "}
                </Typography>
                <Typography variant="h6">
                  {" "}
                  {item.courseName !== null ? item.courseName : ""}{" "}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                style={{
                  display: "flex",
                  paddingTop: 10,
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {"  "}
                  مدت زمان :
                </Typography>
                <Typography variant="h6">
                  {" "}
                  {item.durationMinutes
                    ? item.durationMinutes + " دقیقه"
                    : "ندارد"}{" "}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={5}
                md={5}
                style={{
                  display: "flex",
                  paddingTop: 10,
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  تاریخ شروع :
                </Typography>
                <Typography variant="h6">
                  <DateTime date={item?.startDateRange} />
                </Typography>
              </Grid>
              {id !== 3 ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    display: "flex",
                    paddingTop: 10,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    className="Button"
                    onClick={() =>
                      dispatch(ShowModal(() => <StatusToturing item={item} />))
                    }
                  >
                    بررسی وضعیت
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <NoResult />{" "}
        </Grid>
      )}
    </>
  );
};
export default ProfileToturing;
