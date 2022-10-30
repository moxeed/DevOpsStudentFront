import React, { useEffect, useState } from "react";
import SelectionContainer from "../../Components/Reusable/SelectionContainer";
import TouringList from "../../Components/Tutoring/TutoringList";
import ProviderService from "../../Services/Provider/ProviderService";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { GetGroupName } from "../../Utility/Kanoon/GetGroupName";
import { GetCourseName } from "../../Utility/Kanoon/GetCourseName";
const ToturingSelectionPage = () => {
  const sortCols = [
    { name: " نام خانوادگی", id: "lastName" },
    { name: " رتبه کشوری", id: "rankTotal" },
    { name: "امتیاز", id: "starRate" },
  ];
  const { group, course } = useParams();

  const [groupName, setGroupName] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    GetGroupName(group).then((res) => setGroupName(res));
    GetCourseName(group, course).then((res) => setCourseName(res));
  }, []);

  return (
    <Grid item xs={12}>
      <Alert severity="info" style={{ width: "100%", marginTop: "10px" }}>
        <AlertTitle style={{ fontSize: "18px" }}>
          تدریس خصوصی درس
          {` ${courseName} ، ${groupName}`}
        </AlertTitle>
        برای شرکت در تدریس خصوصی، مدرس خود را انتخاب و روی عکس آن کلیک کنید .
      </Alert>
      <SelectionContainer
        getFilters={() =>
          ProviderService.GetTutoringFilter("Tutoring", {
            GroupIds: [group],
            CourseIds: [course],
          })
        }
        getData={(filters) => ProviderService.GetProviders("Tutoring", filters)}
        pageList={TouringList}
        sortCols={sortCols}
        category="Tutoring"
      />
    </Grid>
  );
};
export default ToturingSelectionPage;
