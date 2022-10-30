import React from "react";
import Grid from "@material-ui/core/Grid";
import NoResult from "../Reusable/NoResult";
import WebinarCard from "src/v2/components/reusable/cards/WebinarCard/WebinarCard";

export default function WebinarList({ sortedData, minValue, maxValue }) {
  return (
    <>
      {sortedData && sortedData.length > 0 ? (
        sortedData.slice(minValue, maxValue).map((p, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            container
            justifyContent="center"
            key={i}
            style={{ direction: "ltr", marginBottom: 4 }}
          >
            <WebinarCard item={p} />
          </Grid>
        ))
      ) : (
        <NoResult />
      )}
    </>
  );
}
