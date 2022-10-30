import React from "react";
import ClassOnlinePakageService from "../../Services/Product/ClassOnlinePakageService";
import WebinarContent from "../../Services/Product/WebinarContent";
import WebinarList from "../../Components/Webinar/WebinarList";
import { WebinarIntro } from "../../Components/Webinar/WebinarIntro";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import SelectionContainer from "src/Components/Reusable/SelectionContainer";
const WebinarSelectionPage = () => {
  return (
    <Grid item xs={12}>
      <Alert severity="info" style={{ width: "100%", marginTop: "10px" }}>
        <AlertTitle style={{ fontSize: "18px" }}>آزمون های همایش</AlertTitle>
        برای شرکت در آزمون های همایش، از لیست همایش ها، همایش مورد نظر را انتخاب
        کرده و در قسمت آزمون های بازیابی ، روی آزمونی که میخواهید شرکت کنید،کلیک
        کنید.{" "}
      </Alert>
      <SelectionContainer
        getFilters={(filters) =>
          ClassOnlinePakageService.GetFiltersBroadCast(filters)
        }
        getData={(filters) => WebinarContent.GetProducts(filters)}
        pageList={WebinarList}
        sortCols={[]}
        Description={<WebinarIntro />}
        category="Webinar"
      />
    </Grid>
  );
};
export default WebinarSelectionPage;
