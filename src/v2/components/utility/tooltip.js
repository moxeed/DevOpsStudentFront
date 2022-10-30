import * as React from "react";
import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip, IconButton } from "@mui/material";

export const IconTooltip = ({
  color,
  text,
  Icon = InfoIcon,
  onClick = null,
}) => {
  return (
    <Tooltip title={text} followCursor>
      <IconButton onClick={onClick}>
        <Icon color={color} />
      </IconButton>
    </Tooltip>
  );
};
IconTooltip.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.any,
  onClick: PropTypes.func,
};

// Add another Tooltips
