import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import IdentityService from "../../Services/Identity/IdentityService";
import { Button, Grid } from "@material-ui/core";

const EditableTextFieldGroup = ({
  handleChangeGroup,
  handleSubmit,
  groupId,
}) => {
  const [group, setGroup] = React.useState([]);
  useEffect(() => {
    IdentityService.GroupId().then((res) => {
      setGroup(res);
    });
  }, []);
  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: 20 }}>
      <Grid container justifyContent="center">
        <Grid item md={4} style={{ padding: 15 }}>
          گروه درسی :
        </Grid>
        <Grid item md={8}>
          <TextField
            select
            required
            value={groupId}
            style={{ width: 200 }}
            onChange={handleChangeGroup}
            error={groupId === ""}
            helperText={groupId === "" ? "گروه را وارد کنید!" : " "}
            SelectProps={{
              native: true,
            }}
          >
            {group &&
              group.map((option, i) => (
                <option key={i} value={option.id}>
                  {option.name}
                </option>
              ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container style={{ direction: "ltr" }}>
        <Button className="Button" type="submit" variant="contained">
          ثبت
        </Button>
      </Grid>
    </form>
  );
};
export default EditableTextFieldGroup;
