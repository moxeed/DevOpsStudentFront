import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppInfo from "../../Assets/Images/AppInfo.jpg";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import GetAppIcon from "@material-ui/icons/GetApp";
import Text from "../../Assets/Text/text.json";

const useStyles = makeStyles(() => ({
  appBanner: {
    background: "#F2F9F2",
  },
  container: {
    display: "flex",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    '& li':{
      padding:5
    }
  },
}));

const AboutAppPage = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        className={classes.container + " " + classes.appBanner}
        container
        direction="column"
        item
        xs={12}
        md={6}
      >
        <Grid item>
          <Typography className={"Main-text-Ex"}>اپلیکیشن برتر ها</Typography>
        </Grid>
        <Grid item>
          <p className={"Text-Type-Ex"}>
            {Text.textAboutApp}
          </p>
          <p className={"Text-Type-Ex"}>
            شما می توانید با یکی از روش های زیر سوالات درسی خود را بپرسید:
          </p>
          <ul
            style={{
              fontSize: "15px",
              fontWeight: "200",
              textAlign: "right",
              padding: "0 50px",
              listStyleType: "none",
              color: "#000",
            }}
          >
            <li>
        
                <DoneOutlineIcon
                  style={{
                    fontSize: "15px",
                    color: "#37AA4B",
                  }}
                />{" "}
                ارسال سوال به صورت
                <span
                  style={{
                    color: "#37AA4B",
                    curser: "none",
                  }}
                >
                  {" "}
                  متنی
                </span>{" "}
                (فایل های pdf، video و voice ){" "}
       
            </li>
            <li>
        
                {" "}
                <DoneOutlineIcon
                  style={{
                    fontSize: "15px",
                    color: "#37AA4B",
                  }}
                />{" "}
                برقراری{" "}
                <span
                  style={{
                    color: "#37AA4B",
                    curser: "none",
                  }}
                >
                  تماس تصویری
                </span>{" "}
                (فضای اسکای روم)
         
            </li>
            <li>
      
                {" "}
                <DoneOutlineIcon
                  style={{
                    fontSize: "15px",
                    color: "#37AA4B",
                  }}
                />{" "}
                برقراری{" "}
                <span
                  style={{
                    color: "#37AA4B",
                    curser: "none",
                  }}
                >
                  ارتباط آنلاین صوتی
                </span>{" "}
                (تلفنی – آنلاین){" "}
              
            </li>
          </ul>
        </Grid>
        <Grid item>
          <Button className="Button" href="https://cafebazaar.ir/app/ir.pcontinue.kanoon_students">
            <GetAppIcon /> دانلود از بازار
          </Button>
          <Button className="Button" href="http://appstudent.mykanoon.ir/app/latest">
            <GetAppIcon /> دانلود  مستقیم
          </Button>
        </Grid>
      </Grid>
      <Grid
        className={classes.container}
        style={{
          background: "#F2F9F2",
          overflow: "hidden",
          height: "89vh",
        }}
        item
        container
        xs={12}
        md={6}
      >
        <a
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          href={"https://cafebazaar.ir/app/ir.pcontinue.kanoon_students"}
        >
          <img
            src={AppInfo}
            alt="banner"
            width="50%"
            style={{ minWidth: "300px" }}
            height="auto"
          />
        </a>
      </Grid>
    </Grid>
  );
};

export default AboutAppPage;
