import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import IdentityService from "../../../../Services/Identity/IdentityService";

const SelectGroupId = ({ value, handleChange }) => {
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    IdentityService.GroupId()
      .then((res) => setGroups(res))
      .catch(() => {
        setGroups([]);
      });
  }, []);
  if (!groups) return null;
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">مقطع تحصیلی</InputLabel>
      <Select
        labelId="select-label"
        value={value}
        name="groupId"
        label="مقطع تحصیلی"
        onChange={handleChange}
        sx={{
          display: "flex",
          px: 3,
          flexDirection: "column",
        }}
      >
        {groups.map((item, i) => (
          <MenuItem
            key={"selectGroup" + i}
            value={item.id}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              backgroundColor: "white !important",
              border: "1px solid #00000050",
            }}
          >
            <Typography variant="h6">{item.name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectGroupId.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectGroupId;
