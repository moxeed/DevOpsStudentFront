import { Button } from "@mui/material";
import classes from "./BlueButton.module.scss";
import PropTypes from "prop-types";

const BlueButton = ({
  label,
  type,
  link = "",
  func = () => {},
  Icon,
  outline,
  style,
}) => {
  return (
    <Button
      component={type !== undefined ? type : null}
      to={link}
      className={!outline ? classes.BlueButton : classes.OutlineBlueButton}
      sx={style}
      onClick={func}
    >
      {Icon && <Icon />} {label}
    </Button>
  );
};
BlueButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.elementType,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  outline: PropTypes.bool,
  style: PropTypes.any,
  func: PropTypes.func,
};
export default BlueButton;
