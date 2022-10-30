import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
import ServiceProvider from "../../Services/Product/PackageService";

export default function StartSession({ tutoringId }) {
  const [data, setData] = React.useState({});
  useEffect(() => {
    ServiceProvider.AttemptTutoring({
      tutoringId: tutoringId,
      studentId: GetUserId(),
    }).then((res) => setData(res.data));
  }, [tutoringId]);
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
