import { Grid } from "@material-ui/core";
import React from "react";
import { CommentSection } from "../Reusable/CommnetSection";
import WebinarContent from "./WebinarContent";

export default function WebinarTabs({ productId, isPurchased, data }) {
  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        {data?.contents && (
          <WebinarContent data={data.contents} isPurchased={isPurchased} />
        )}
      </Grid>
      <Grid item xs={12} style={{ marginTop: "1em", padding: "1em" }}>
        <CommentSection identifier={`${WebinarTabs.name}-${productId}`} />
      </Grid>
    </Grid>
  );
}
