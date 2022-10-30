/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FilterSection from "../FilterSection/FilterSection.jsx";
import useSort from "../../Utility/Data/useSort";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Pagination } from "antd";
import Drawer from "@material-ui/core/Drawer";
import { Box, Hidden, Paper } from "@material-ui/core";
import "./SelectionContainer.scss";
import useFilter from "../../Utility/Data/useFilter";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import NavFilters from "../FilterSection/NavFilters";
import NoResult from "./NoResult.jsx";
import { useParams } from "react-router-dom";
import { CommentSection } from "./CommnetSection.jsx";

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

export default function SelectionContainer({
  getFilters,
  getData,
  pageList: PageList,
  sortCols,
  Description,
  category,
}) {
  const classes = useStyles();
  const [
    filteredData,
    selectedFilters,
    filters,
    handleChange,
    chooseFilter,
    // eslint-disable-next-line no-unused-vars
    chooseCourse,
    handleFreePrice,
  ] = useFilter(getData, getFilters, category);

  const [sortedData, sortCol, setSortCol] = useSort(filteredData);
  const [visible, setVisible] = useState(false);
  const numEachPage = 32;
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(32);
  const [current, setCurent] = useState(1);

  const { FreeWebinars } = useParams();
  useEffect(() => {
    if (FreeWebinars === "free" && handleFreePrice) {
      setTimeout(() => handleFreePrice(true), 2000);
    }
  }, []);

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
      if (optionsGroupId.length >= 2) {
        optionsGroupId.splice(1, 1);
        return [filters.GroupIds.options[1], ...optionsGroupId];
      } else {
        return optionsGroupId;
      }
    }
    return [];
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
              handleFreePrice={handleFreePrice}
              category={category}
            />
            {Description ? (
              <Paper
                style={{
                  padding: "12px 0",
                  marginTop: "10px",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {Description}
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
            {" "}
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
                    NavFilter
                    type="primary"
                    shape="round"
                    style={{
                      width: "25px",
                      height: "30px",
                    }}
                    onClick={toggleDrawer}
                  >
                    <MenuIcon style={{ fontSize: "32px" }} />
                  </IconButton>
                </Grid>
              </Hidden>
              {category === "Tutoring" ? null : (
                <NavFilters
                  options={GroupIdCheck()}
                  chooseFilter={chooseFilter}
                  id={selectedFilters?.GroupIds[0]}
                  catrgory={category}
                />
              )}
            </Grid>
            {sortCols.length > 0 ? (
              <NavFilters
                options={sortCols}
                chooseFilter={setSortCol}
                title=" مرتب سازی بر اساس"
                id={sortCol}
              />
            ) : null}
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
        <Grid item xs={12}>
          <CommentSection identifier={`${"selection"}-${category}`} />
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
        {Description ? (
          <div
            style={{
              margin: "10px 0",
              display: "grid",
              placeItems: "center",
            }}
          >
            {Description}
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
