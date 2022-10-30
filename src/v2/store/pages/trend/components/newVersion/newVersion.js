import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { PanelService } from "src/v2/api/front-panel";
import theme from "src/v2/styles/theme";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import JDate from "jalali-date";
import { LoadingButton } from "@mui/lab";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "src/Services/StoreSlices/UserSlice";
import { GetUserId } from "src/Services/Authentication/useAuthentication";
import {
  errorToast,
  successToast,
  warningToast,
} from "src/v2/components/utility/toast";
import { CommentSection } from "src/Components/Reusable/CommnetSection";
import SlidersContainer from "src/v2/components/reusable/Slider/Slider";
import WebinarCard from "src/v2/components/reusable/cards/WebinarCard/WebinarCard";
import WebinarContent from "src/Services/Product/WebinarContent";
import { GApushData } from "src/v2/components/GAlog/GAlog";

const Trend = () => {
  const [product, setProduct] = useState();
  const [count, setCount] = useState(0);
  const [pending, setPending] = useState(false);
  const [webinars, setWebinars] = useState({ data: [...Array(6)] });

  const ServicesRef = useRef(null);
  const history = useHistory();
  const isLoggedIn = useSelector(IsAuthenticated);

  useEffect(() => {
    if (!product) {
      WebinarContent.GetTopWebinars().then(setWebinars);

      PanelService.GetRayanClass()
        .then((res) => {
          setProduct(res);
          PanelService.GetRayanCount(res.courseId).then((count) =>
            setCount(count.total)
          );
        })
        .catch(() => {
          GApushData("front-panel", {});
          setProduct({
            error: "گرفتن کلاس با مشکل مواجه شد، مجدد امتحان کنید.",
          });
        });
    }
  }, []);

  const gotoServices = () =>
    window.scrollTo({
      top: ServicesRef.current.offsetTop,
      behavior: "smooth",
    });

  const buy = () => {
    if (!isLoggedIn) {
      history.push(`/v2/identity/login`);
      return;
    }
    setPending(true);
    const time = Math.ceil(Math.random() * 10 * 1000);
    successToast("درحال انتقال به کلاس،لطفا صبر کنید");

    setTimeout(() => {
      PanelService.GetRayanLink(GetUserId(), product.courseId)
        .then((res) => {
          if (res.error) {
            errorToast(res.error);
          } else {
            window.location.href = res.link;
          }
        })
        .catch(() => {
          errorToast("گرفتن لینک با مشکل مواجه شد.");
          GApushData("front-panel", {});
        })
        .finally(() => setPending(false));
    }, time);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "70vh",
      }}
    >
      {!product ? (
        <CircularProgress />
      ) : product.error ? (
        <Card
          sx={{
            display: "grid",
            width: { sm: "90%", xs: "100%" },
            placeItems: "center",
          }}
        >
          <Grid container justifyContent={"center"}>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ p: 5 }}
              >
                {product.error}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  padding: "6px 12px",
                  fontSize: "1.2em",
                  margin: "18px 0",
                }}
                onClick={() => {
                  warningToast("لطفا چند لحظه صبر کنید.");
                  setTimeout(() => {
                    window.location.reload();
                  }, Math.ceil(Math.random() * 10 * 1000));
                }}
              >
                دریافت مجدد کلاس{" "}
              </Button>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <>
          <div style={{ height: "2vh" }}></div>
          <Card
            sx={{
              display: { sm: "flex", xs: "block" },
              width: { sm: "90%", xs: "100%" },
            }}
          >
            <CardMedia
              component="img"
              height="auto"
              image={product.poster}
              alt={product.name}
              sx={{
                width: { sm: "26%", xs: "100%" },
                maxHeight: { xs: "15em", sm: "100%" },
              }}
            />
            <CardContent
              sx={{
                width: { sm: "74%", xs: "100%" },
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  marginBottom: "0.5em",
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ textAlign: "justify" }}
              >
                کلاس های رایگان برترها، با همکاری رایان کلاس برای آمادگی شما
                برای کنکور برگزار میشود. برای ورود به کلاس، ابتدا در سایت لوگین
                کنید، وارد کلاس شوید و از آموزش اساتید برتر کنکور لذت ببرید.
              </Typography>
              <Typography
                variant="h5"
                style={{
                  textAlign: "justify",
                  color: theme.palette.cosmicCobalt,
                  margin: "0.5em 0",
                }}
              >
                راهنمای ورود به کلاس:
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                ابتدا نرم افزار adobe connect را از
                <a
                  href="https://adobeonline.ir/help/"
                  target={"_blank"}
                  rel="noreferrer"
                  style={{
                    margin: "6px 10px",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  لینک{" "}
                </a>
                دانلود کنید. سپس بر روی
                <strong
                  onClick={gotoServices}
                  style={{
                    margin: "6px 10px",
                    fontSize: "14px",
                    color: theme.palette.green,
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  ورود به کلاس{" "}
                </strong>
                کلیک کنید.
              </Typography>
              <Grid
                container
                sx={{
                  alignItems: "center",
                  justifyContent: { xs: "space-evenly", sm: "flex-end" },
                }}
                ref={ServicesRef}
              >
                <Chip
                  sx={{
                    m: { md: 2, sm: 4, xs: 1 },
                    backgroundColor: theme.palette.deepSaffron,
                  }}
                  color="primary"
                  icon={<CreditCardOffIcon />}
                  label="رایگان"
                />
                <Chip
                  sx={{
                    m: { md: 2, sm: 4, xs: 1 },
                    backgroundColor: theme.palette.googooli,
                  }}
                  color="primary"
                  icon={<TimelapseIcon />}
                  label={"90 دقیقه"}
                />
                <Chip
                  sx={{
                    m: { md: 2, sm: 4, xs: 1 },
                    backgroundColor: theme.palette.cosmicCobalt,
                  }}
                  color="primary"
                  icon={<FaceRetouchingNaturalIcon />}
                  label={count + " شرکت کننده  "}
                />
              </Grid>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: { sm: "flex", xs: "block" },
              width: { sm: "90%", xs: "100%" },
              mt: 4,
            }}
          >
            <CardContent sx={{ width: "100%" }}>
              <Grid
                sx={{ justifyContent: "center", marginBottom: 10 }}
                container
              >
                <Grid
                  sx={{
                    justifyContent: {
                      md: "flex-start",
                      sm: "flex-start",
                      xs: "center",
                    },
                  }}
                  container
                  item
                  alignItems={"center"}
                  sm={6}
                  xs={12}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    زمان برگزاری کلاس:
                    <strong
                      style={{
                        color: theme.palette.deepSaffron,
                        fontSize: "16px",
                      }}
                    >
                      {" "}
                      {new JDate(new Date(product.date + ":00")).format(
                        " dddd DD MMMM YYYY "
                      )}{" "}
                      ساعت{" "}
                      {("0" + new Date(product.date + ":00").getHours()).slice(
                        -2
                      ) +
                        ":" +
                        (
                          "0" + new Date(product.date + ":00").getMinutes()
                        ).slice(-2)}
                    </strong>
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    justifyContent: {
                      md: "flex-end",
                      sm: "flex-end",
                      xs: "center",
                    },
                  }}
                  container
                  item
                  sm={6}
                  xs={12}
                >
                  <LoadingButton
                    loading={pending}
                    variant="contained"
                    onClick={buy}
                    style={{
                      width: "12em",
                      padding: "0.6em 0.3em",
                      fontSize: "1.2em",
                      backgroundColor: theme.palette.green,
                    }}
                  >
                    {"ورود به کلاس"}
                  </LoadingButton>
                </Grid>
                {product.teacher && (
                  <Grid item xs={12}>
                    <Typography variant="h6" component="div">
                      مدرس این کلاس : {product.teacher}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Typography
                variant="h6"
                color="text.secondary"
                style={{ textAlign: "justify", padding: "0 1em" }}
              >
                راهنمای ورود به کلاس: ابتدا نرم افزار adobe connect را از
                <a
                  href="https://adobeonline.ir/help/"
                  target={"_blank"}
                  rel="noreferrer"
                  style={{
                    margin: "6px 10px",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  لینک{" "}
                </a>
                دانلود کنید. سپس بر روی
                <strong
                  style={{
                    margin: "6px 10px",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  ورود به کلاس{" "}
                </strong>
                کلیک کنید.
                {!isLoggedIn && (
                  <>
                    دقت کنید که اول باید
                    <Link
                      style={{
                        margin: "6px 10px",
                        fontSize: "14px",
                      }}
                      to="/v2/identity/login"
                    >
                      وارد شوید
                    </Link>
                    یا
                    <Link
                      style={{
                        margin: "6px 10px",
                        fontSize: "14px",
                      }}
                      to="/v2/identity/register"
                    >
                      ثبت نام کنید.
                    </Link>
                  </>
                )}
                لطفا نظر خود را درباره کلاس برگزار شده با ما به اشتراک بگذارید.
                همایش های برگزیده برترها را از دست ندهید!
              </Typography>
              <a
                href="https://adobeonline.ir/help/"
                target={"_blank"}
                rel="noreferrer"
                style={{
                  fontSize: "16px",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    padding: "6px 12px",
                    fontSize: "0.7em",
                    marginTop: "18px",
                  }}
                >
                  راهنما و دانلود adobe connect
                </Button>
              </a>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: { sm: "flex", xs: "block" },
              width: { sm: "90%", xs: "100%" },
              mt: 4,
            }}
          >
            <CommentSection identifier={`e`} />
          </Card>
          <Card
            sx={{
              display: { sm: "flex", xs: "block" },
              width: { sm: "90%", xs: "100%" },
              my: 4,
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ p: 5 }}
                >
                  همایش های مناسب شما
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <SlidersContainer
                  Card={WebinarCard}
                  slides={webinars.data}
                  slidePerView={{
                    xs: "0 0 100%",
                    sm: "0 0 50%",
                    md: "0 0 25%",
                    lg: "0 0 20%",
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Trend;
