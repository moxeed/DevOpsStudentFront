import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FilterSection from "../FilterSection/FilterSection.jsx";
import useSort from "../../Utility/Data/useSort";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Pagination, Typography } from "antd";
import Drawer from "@material-ui/core/Drawer";
import { Box, Hidden, Paper } from "@material-ui/core";
import "../Reusable/SelectionContainer.scss";
import useFilter from "../../Utility/Data/useFilter";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import NavFilters from "../FilterSection/NavFilters";
import NoResult from "../Reusable/NoResult.jsx";
import { CourseQuizIntro } from "./CourseQuizIntro.jsx";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    padding: "10px 0",
    marginBottom: "10px",
    textAlign: "center",
    color: "black",
    backgroundColor: "transparent",
    borderRadius: "12px",
    justifyContent: "space-betwen",
    "& p": {
      fontWeight: "bold",
    },
  },
  parentBtn: {
    backgroundColor: "transparent",
    borderColor: "#b600ff",
    padding: "3px",
    " & span": {
      "& span:hover": { color: "white" },
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  iconClose: {
    "&:hover": {
      background: "none !important",
    },
  },
}));

export default function QuizSelection({
  getFilters,
  getData,
  pageList: PageList,
}) {
  const classes = useStyles();
  const [
    filteredData,
    selectedFilters,
    filters,
    handleChange,
    chooseFilter,
    chooseCourse,
  ] = useFilter(getData, getFilters, true);
  const [sortedData, sortCol] = useSort(filteredData);
  const [visible, setVisible] = useState(false);
  const numEachPage = 32;
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(32);
  const [current, setCurent] = useState(1);
  const isAuthenticated = useSelector(IsAuthenticated);
  const handlePageination = (value) => {
    setMinValue((value - 1) * numEachPage);
    setMaxValue(value * numEachPage);
    setCurent(value);
  };

  const toggleDrawer = () => {
    setVisible(!visible);
  };
  const GroupIdCheck = () => {
    if (filters?.GroupIds) {
      const optionsGroupId = [...filters.GroupIds.options];
      optionsGroupId.splice(1, 1);
      return [filters.GroupIds.options[1], ...optionsGroupId];
    }
    return null;
  };
  useEffect(() => {
    handlePageination(1);
  }, [sortCol, selectedFilters]);
  return (
    <div className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid item sm={1} xs={1} md={3} style={{ padding: "10px" }}>
            <FilterSection
              filters={filters}
              onChange={handleChange}
              selectedFilters={selectedFilters}
            />
            {isAuthenticated ? (
              <Paper
                style={{
                  padding: "12px 0",
                  marginTop: "10px",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {<CourseQuizIntro />}
              </Paper>
            ) : null}
          </Grid>
        </Hidden>
        <Grid item md={9} xs={12}>
          <Hidden smDown>
            <Box height="5px" />
          </Hidden>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={0}
          >
            <Grid
              item
              xs={12}
              className={"Display-align"}
              style={{ paddingTop: "10px" }}
            >
              <Typography>
                گروه آزمایشی خود را از لیست زیر انتخاب نمایید، برای این کار بر
                روی نام رشته خود کلیک کنید.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.paper}
              style={{ display: "flex" }}
            >
              <Hidden mdUp>
                <Grid
                  xs={1}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton
                    type="primary"
                    shape="round"
                    style={{
                      width: "25px",
                      height: "30px",
                    }}
                    onClick={toggleDrawer}
                  >
                    <MenuIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Hidden>
              <NavFilters
                options={GroupIdCheck()}
                chooseFilter={chooseFilter}
                id={selectedFilters?.GroupIds?.at(0)}
              />
            </Grid>
            <Grid item xs={12} className={" Display-align"}>
              <Typography>
                درس مورد نظر خود را از لیست زیر انتخاب نمایید
              </Typography>
            </Grid>
            <NavFilters
              options={filters?.CourseIds?.options}
              chooseFilter={chooseCourse}
              id={selectedFilters?.CourseIds?.at(0)}
              title="درس ها"
            />
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "9px" }}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                xs={12}
                md={12}
              >
                {sortedData.length > 0 ? (
                  <PageList
                    sortedData={sortedData}
                    minValue={minValue}
                    maxValue={maxValue}
                  />
                ) : (
                  <NoResult />
                )}
                <Grid
                  item
                  xs={12}
                  style={{
                    margin: "20px 0px",
                    paddingBottom: "40px",
                    direction: "ltr",
                  }}
                >
                  <Pagination
                    current={current}
                    defaultPageSize={numEachPage}
                    onChange={handlePageination}
                    total={sortedData.length}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Drawer
        variant="temporary"
        anchor={"right"}
        onClose={toggleDrawer}
        open={visible}
        className="drawerStyle"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton className={classes.iconClose} onClick={toggleDrawer}>
            <HighlightOffIcon />
          </IconButton>
        </div>
        <FilterSection filters={filters} onChange={handleChange} />
        {isAuthenticated ? (
          <div
            style={{
              margin: "10px 0",
              display: "grid",
              placeItems: "center",
            }}
          >
            {<CourseQuizIntro />}
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
