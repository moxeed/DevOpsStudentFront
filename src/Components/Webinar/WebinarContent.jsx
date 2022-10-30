import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import ContentContainer from "./ContentContainer";

export default function WebinarContent({ data, isPurchased }) {
  if (!data) {
    return (
      <div style={{ minHeight: "20", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      {data.length !== 0
        ? data.map((item) => (
            <Grid item xs={12} key={item.contentId}>
              <ContentContainer item={item} isPurchased={isPurchased} />
            </Grid>
          ))
        : null}
    </>
  );
}
