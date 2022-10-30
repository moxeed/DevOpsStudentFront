import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { CommentSection } from "../Reusable/CommnetSection";

export default function ArticleComments({ id }) {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" style={{ padding: 15, fontSize: 20 }}>
        نظرات
      </Typography>
      <CommentSection identifier={`${ArticleComments.name}-${id}`} />
    </Grid>
  );
}
