import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  Paper,
  Grow,
  Popper,
  Grid,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const options = [
  "بدون علامت",
  "فراموش کردم",
  "شک دارم",
  "ناقص یاد گرفتم",
  "سوال مهم",
];
const useStyles = makeStyles((theme) => ({
  btn: {
    border: "none",
    backgroundColor: "transparent",
    display: "flex",
    fontSize: "0.72rem",
    cursor: "pointer",
    [theme.breakpoints.up("lg")]: {
      width: 100,
      fontSize: "1rem",
    },
  },
  root: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginRight: 6,
    [theme.breakpoints.up("lg")]: {
      marginRight: 15,
    },
  },
  styleButtonGroup: {
    direction: "ltr",
    display: "inline-flex",
  },
}));
export default function ButtonSelect({
  handleChangeSituationMark,
  situationMark,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  return (
    <Grid container className={classes.root}>
      <div className={classes.styleButtonGroup}>
        {situationMark === "0" ? (
          <button onClick={handleClick} className={classes.btn}>
            تکنیک(ف,ش,ن,م)
            <ArrowDropDownIcon />
          </button>
        ) : (
          <button onClick={handleClick} className={classes.btn}>
            {options[situationMark]}
            <ArrowDropDownIcon />
          </button>
        )}
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ display: "contents" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              position: "absolute",
              width: 100,
              zIndex: 1,
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={(event) => {
                        handleChangeSituationMark(event, index);
                        handleClick();
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
}
