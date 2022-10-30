import React from "react";
import Grid from "@material-ui/core/Grid";
import ProviderProfileCard from "./ProviderProfileCard";
import NoResult from "../Reusable/NoResult";

export default function ProviderList({ sortedData, minValue, maxValue }) {
  return (
    <>
      {sortedData && sortedData.length > 0 ? (
        sortedData.slice(minValue, maxValue).map((p, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            xl={3}
            container
            justifyContent="center"
            key={i}
            style={{ marginBottom: 4 }}
          >
            <ProviderProfileCard profile={p} />
          </Grid>
        ))
      ) : (
        <NoResult />
      )}
    </>
  );
}
