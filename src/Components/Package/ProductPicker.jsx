import React from "react";
import Grid from "@material-ui/core/Grid";
import IDivider from "../Reusable/IDivider";
import ContentLoader from "react-content-loader";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";

export default function ProductPicker({ data, onSelect, selectedCategory }) {
  let buttons = undefined;
  if (data) {
    buttons = data.map((item, i) => (
      <Grid item xs={12} key={i}>
        <button
          className={
            selectedCategory === item.productSubCategoryId
              ? "Btn-tab active "
              : "Btn-tab "
          }
          style={{ width: "100%", fontWeight: "bold" }}
          onClick={() => onSelect(item.productSubCategoryId)}
        >
          <ShopTwoIcon style={{ marginLeft: 5 }} />
          {item.productSubCategoryName}
        </button>
      </Grid>
    ));
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <IDivider title="انتخاب محصول" />
      </Grid>
      <Grid spacing={1} justifyContent="center" xs={11} container item>
        {buttons ? (
          buttons
        ) : (
          <ContentLoader>
            <rect x="50" y="8" rx="3" ry="3" width="200" height="50" />
            <rect x="350" y="8" rx="3" ry="3" width="200" height="50" />
            <rect x="650" y="8" rx="3" ry="3" width="200" height="50" />
          </ContentLoader>
        )}
      </Grid>
    </Grid>
  );
}
