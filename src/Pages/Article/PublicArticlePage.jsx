import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ContentCard from "../../Components/Content/ContentCard";
import ArticleCard from "../../Components/Content/ArticleCard";
import ServiceArticels from "../../Services/Content/ContentService";
import ArticleList from "../../Components/Content/ArticleList";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import { useDispatch } from "react-redux";
import NavFilters from "../../Components/FilterSection/NavFilters";
import IdentityService from "../../Services/Identity/IdentityService";

const useStyles = makeStyles((theme) => ({
  articleCard: {
    paddingTop: "8px",
    [theme.breakpoints.up("970")]: {
      padding: "2px",
      paddingTop: "5px",
    },
  },
}));
const PublicArticlePage = () => {
  const classes = useStyles();
  const numEachPage = 32;
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(32);
  const [current, setCurent] = useState(1);
  const handlePageination = (value) => {
    setMinValue((value - 1) * numEachPage);
    setMaxValue(value * numEachPage);
    setCurent(value);
  };
  const [cotents, setCotents] = useState();
  const dispatch = useDispatch();
  const [group, setGroup] = React.useState([]);
  const [providerId] = React.useState();
  const [data] = useState([]);
  const [course, setCourse] = React.useState([]);
  const [courseId, setCourseId] = React.useState(0);
  const [groupId, setGroupId] = React.useState(1);
  const [importantData, setImportantData] = React.useState([]);

  const chooseFilter = (id) => {
    setGroupId(id);
    dispatch(ShowLoading());
    ServiceArticels.GetFreeContentByFilter({
      CourseIds: data,
      GroupIds: Array.isArray(id) ? id : [id],
      ProviderId: providerId,
    }).then(
      (res) => {
        setCotents(res.data);
        dispatch(HideLoading());
      },
      () => dispatch(HideLoading())
    );
  };
  const chooseFilterCourse = (id) => {
    dispatch(ShowLoading());
    setCourseId(id);
    ServiceArticels.GetFreeContentByFilter({
      CourseIds: id,
      GroupIds: [groupId],
      ProviderId: providerId,
    }).then(
      (res) => {
        setCotents(res.data);
        dispatch(HideLoading());
      },
      () => dispatch(HideLoading())
    );
  };

  useEffect(() => {
    dispatch(ShowLoading());
    ServiceArticels.GetFreeContentGetImportant().then((res) => {
      setImportantData(res);
      dispatch(HideLoading());
    });
  }, [dispatch]);

  useEffect(() => {
    IdentityService.GroupId().then((res) => {
      setGroup([{ name: "همه", id: res.map((x) => x.id) }, ...res]);
      chooseFilter(res.map((x) => x.id));
    });
  }, []);

  useEffect(() => {
    if (!Array.isArray(groupId))
      ServiceArticels.GetCoursesByGroupId(groupId).then((res) => {
        const courses = res.map((x) => {
          return { name: x.name, id: [x.id] };
        });
        setCourse([{ name: "همه", id: res.map((x) => x.id) }, ...courses]);
      });
  }, [groupId]);
  return (
    <Grid container justifyContent="center" style={{ paddingTop: 10 }}>
      {importantData ? (
        <Grid container item sm={12} xs={12} md={10}>
          <Grid item sm={12} xs={12} md={4} className={classes.articleCard}>
            {importantData ? (
              <Link to={`/Articles/${importantData[0]?.contentId}`}>
                <ContentCard data={importantData[0]} />
              </Link>
            ) : null}
          </Grid>
          <Grid item sm={12} xs={12} md={8}>
            <Grid container justifyContent="center">
              {importantData &&
                importantData.slice(1, 9).map((item, i) => (
                  <>
                    <Grid
                      item
                      sm={12}
                      xs={12}
                      md={6}
                      className={classes.articleCard}
                      key={i}
                    >
                      <Link to={`/Articles/${item.contentId}`}>
                        <ArticleCard data={item} />
                      </Link>
                    </Grid>
                  </>
                ))}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Grid
        item
        xs={10}
        md={10}
        style={{
          padding: 5,
          backgroundColor: "#259F2D",
          borderRadius: 32,
          textAlign: "center",
          margin: 10,
        }}
      >
        <Typography variant="h6" style={{ color: "white" }}>
          اخبار سایت برترها
        </Typography>
      </Grid>
      <Grid item xs={10} md={10}>
        {group.length > 0 ? (
          <NavFilters
            options={group}
            chooseFilter={chooseFilter}
            title=" گروه آزمایشی"
            id={groupId}
          />
        ) : null}
      </Grid>
      <Grid item xs={10} md={10} style={{ marginTop: 20 }}>
        {!Array.isArray(groupId) && (
          <NavFilters
            options={course}
            chooseFilter={chooseFilterCourse}
            id={courseId}
          />
        )}
      </Grid>
      <Grid
        container
        item
        xs={10}
        md={10}
        justifyContent="center"
        style={{ marginRight: 10 }}
      >
        <ArticleList data={cotents} minValue={minValue} maxValue={maxValue} />
      </Grid>
      <Grid
        item
        xs={11}
        md={9}
        sm={11}
        style={{
          paddingTop: 20,
          paddingBottom: "40px",
          direction: "ltr",
        }}
      >
        <Pagination
          current={current}
          defaultPageSize={numEachPage}
          onChange={handlePageination}
          total={cotents ? cotents.length : null}
        />
      </Grid>
    </Grid>
  );
};

export default PublicArticlePage;
