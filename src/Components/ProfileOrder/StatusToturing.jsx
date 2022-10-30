import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
import GetProfile from "../../Services/Profile/ProfileService";

export default function StatusToturing({ item }) {
  const [data, setData] = React.useState({});
  useEffect(() => {
    GetProfile.PostProfileAttempt({
      tutoringId: item.tutoringId,
      status: item.status,
      userId: GetUserId(),
    }).then((res) => setData(res.data));
  }, [item]);
  return (
    <Grid container justifyContent="center">
      {data?.isLink === true ? (
        <Typography className="RedirectLink">
          <a href={data.text}>وارد جلسه شوید</a>
        </Typography>
      ) : (
        <>{data.text}</>
      )}
    </Grid>
  );
}
