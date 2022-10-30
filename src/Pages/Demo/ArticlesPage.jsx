import React from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import TestApiCard from "./testAPIs/TestApiCard";
import ExamsCarousel from "./ExamsCarousel";
import {Button, Grid, Typography, makeStyles, Paper} from "@material-ui/core";
import {Menu} from "antd";
import './FilterSection.scss';
import Articles from "./Articles";

const { SubMenu } = Menu;
const useStyles=makeStyles(()=>({
    teachersButton: {
        margin: '3em',
        backgroundColor: "#f2f1ed !important",
        padding: "12px",
        color: "#2E8531 !important",
        width: '80%',
        "&:hover": {
            backgroundColor: "#fffbfb !important",
            color: "#000 !important",
        },
    },
    contentButton: {
        margin: '3em',
        backgroundColor: "#43bf46 !important",
        padding: "12px",
        color: "#fff !important",
        width: '80%',
        "&:hover": {
            backgroundColor: "#2E8531 !important",
        },
    },
    label: {
        marginTop: '2em',
        width: '12em',
    },
    menu: {
        margin: '2em',
        padding: '1em',
        border: '2px solid #9be39e',
        borderRadius: '4px',
    },
}));

export default function ArticlesPage() {
    const classes=useStyles();
    const { groupId } = useParams();
    const profile=TestApiCard?.data;
    const groupName=['ریاضی', 'تجربی', 'انسانی', 'هنر', 'زبان'];

    const teachersButtons=()=> {
        return(
            <Grid container>
                <Grid item lg={4} md={4} xs={12}>
                    <Button className={classes.teachersButton}>
                        همۀ مدرسان و مشاوران
                    </Button>
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <Button className={classes.teachersButton}>
                        مدرسانی که امروز کلاس آنلاین دارند
                    </Button>
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <Button className={classes.teachersButton}>
                        مؤلفین درس شیمی
                    </Button>
                </Grid>
            </Grid>
        )
    };

    const contentButtons=()=> {
        return(
            <Grid container>
                <Grid item lg={2} md={2} xs={12}>
                    <Typography variant='h5' className={classes.label}>
                        مطالب گروه آزمایشی {groupName[(groupId-1)/2]} :
                    </Typography>
                </Grid>
                <Grid item lg={2} md={2} xs={12}>
                    <Button className={classes.contentButton}>
                        آخرین مطالب
                    </Button>
                </Grid>
                <Grid item lg={2} md={2} xs={12}>
                    <Button className={classes.contentButton}>
                        جزوات
                    </Button>
                </Grid>
                <Grid item lg={2} md={2} xs={12}>
                    <Button className={classes.contentButton}>
                        نمونه سوالات امتحانی
                    </Button>
                </Grid>
                <Grid item lg={2} md={2} xs={12}>
                    <Button className={classes.contentButton}>
                        ویدیو های آموزشی
                    </Button>
                </Grid>
                <Grid item lg={2} md={2} xs={12}>
                    <Button className={classes.contentButton}>
                        آزمون های آنلاین
                    </Button>
                </Grid>
            </Grid>
        )
    };

    return(
        <Grid
            container
            style={{
                margin: "120px auto",
                textAlign: "center",
                borderTop: "2px solid #43BF46",
                backgroundColor: "white",
                padding: '20px 40px',
            }}
        >
            <Grid item lg={3} md={3} xs={12}>
                <Typography variant='h3' gutterBottom>
                    گروه آزمایشی {groupName[(groupId-1)/2]}
                </Typography>
                <div className={classes.menu}>
                    <Paper style={{ textAlign: "center", padding: "10px", borderBottom: '2px solid #43bf46', borderRadius: '2px 2px 0 0'}}>
                        <Typography style={{ fontSize: "15px", fontWeight: "bold", color: "#868686" }}>
                            فیلترها
                        </Typography>
                    </Paper>
                    <Menu mode="inline" className="menuStyle" style={{ backgroundColor: "transparent", border: 0 }}>
                        <SubMenu title='نام درس' className="subMenuStyle"></SubMenu>
                        <SubMenu title='نام مبحث' className="subMenuStyle"></SubMenu>
                        <SubMenu title='نام مدرس' className="subMenuStyle"></SubMenu>
                    </Menu>
                </div>
            </Grid>
            <Grid item lg={9} md={9} xs={12}>
                <ExamsCarousel/>
                {teachersButtons()}
                <ProfileCard profile={profile}/>
                {contentButtons()}
                <Articles/>
            </Grid>
        </Grid>
    )
}