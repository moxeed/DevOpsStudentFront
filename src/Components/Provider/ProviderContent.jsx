import React, { useEffect } from "react";
import NoResult from "../Reusable/NoResult";
import ServiceArticels from "../../Services/Content/ContentService";
import { Button, Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function ProviderContent({ providerId }) {
  const [data, setData] = React.useState();
  const history = useHistory();
  useEffect(() => {
    ServiceArticels.GetFreeContentByProviderId(Number(providerId)).then(
      (res) => {
        setData(res);
      },
      () => {}
    );
  }, [providerId]);
  return (
    <>
      {data?.data.length > 0 ? (
        <Grid container justifyContent="center">
          {data.data.map((item, i) => (
            <Grid
              key={i}
              container
              item
              style={{
                backgroundColor: "white",
                display: "flex",
                padding: 5,
                margin: 10,
              }}
              xs={10}
              sm={6}
              md={6}
            >
              <Grid
              item
                xs={12}
                sm={6}
                md={6}
                style={{ display: "flex", paddingTop: 10, color: "gray" }}
              >
                <Typography variant="h6"> عنوان محتوا:{item.title} </Typography>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Button
                  onClick={() => {
                    history.push(`/Articles/${item.provider.providerId}`);
                  }}
                  className={"Green-link Button"}
                >
                  مشاهده کامل محتوا
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid className={"Display-flex-center"}>
          {" "}
          <NoResult />
        </Grid>
      )}
    </>
  );
}
