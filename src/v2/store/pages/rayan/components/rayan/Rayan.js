import {
  ListItemText,
  ListItem,
  List,
  Divider,
  Toolbar,
  Typography,
  Grid,
  CircularProgress,
  CardMedia,
  ListItemIcon,
  Alert,
  AlertTitle,
  Container,
  Paper,
} from "@mui/material";
import * as React from "react";
import { RayanService } from "src/v2/store/service/RayanService";
import { LoadingButton } from "@mui/lab";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "src/Services/StoreSlices/UserSlice";
import { GetUserId } from "src/Services/Authentication/useAuthentication";
import { toast } from "react-toastify";
import ClassIcon from "@mui/icons-material/Class";
import TomanConverter from "src/Utility/TomanConverter";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";

export const Rayan = () => {
  const { productId } = useParams();

  const [product, setProduct] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [state, setState] = React.useState();
  const [error, setError] = React.useState();

  const history = useHistory();
  const isLoggedIn = useSelector(IsAuthenticated);

  const GetData = () => {
    setLoading(true);
    RayanService.ProductById(Number(productId), GetUserId())
      .then((res) => {
        setProduct(res);
        setState(res.isPurchased);
        if (res.isPurchased && !res.isSynced) {
          setTimeout(GetData, 5000);
        }
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    RayanService.ProductById(Number(productId), GetUserId())
      .then((res) => {
        setProduct(res);
        setState(res.isPurchased);
      })
      .finally(() => setLoading(false));
  }, []);

  const buy = () => {
    if (!isLoggedIn) {
      history.push(`/v2/identity/login`);
      return;
    }
    setPending(true);
    setTimeout(() => setPending(false), 5000);
    RayanService.Purchase({
      userCode: GetUserId(),
      productId: Number(productId),
    })
      .then((res) => {
        if (res.order.lastState === 6) {
          toast.success("خرید با موفقیت انجام شد");
          GetData();
        } else if (res.order.lastState === 2) {
          window.location.href = res.paymentUrl;
        }
      })
      .catch((err) => {
        setError(err);
        setPending(false);
        setTimeout(() => setError(), 5000);

        scrollAfterSearch();
      });
  };

  const getLink = (id) => {
    if (!isLoggedIn) {
      history.push(`/v2/identity/login`);
      return;
    }
    setLoading(true);
    setError();
    RayanService.Link(Number(id), GetUserId())
      .then((res) => {
        window.location.href = res;
        toast.success("درحال انتقال به صفحه کلاس");
      })
      .catch((err) => {
        setError(err);
        setTimeout(() => setError(), 5000);
        scrollAfterSearch();
      })
      .finally(() => setLoading(false));
  };

  function scrollAfterSearch() {
    const element = document.getElementById("class-is-error");
    element.scrollIntoView();
  }

  if (!product)
    return (
      <Grid
        item
        xs={12}
        sm={12}
        sx={{
          display: "grid",
          placeItems: "center",
          mt: 10,
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Grid>
    );

  return (
    <Grid
      container
      sx={{ display: "grid", placeItems: "center", mt: 10, minHeight: "70vh" }}
    >
      <Paper sx={{ minWidth: { md: "70vw", xs: "90vw" } }}>
        <Container sx={{ position: "relative", my: 4 }}>
          <Toolbar>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems="center"
              sx={{ p: 3 }}
            >
              <Grid item xs={12} sm={8} md={8}>
                <Typography
                  sx={{ ml: 2, flex: 1, color: "#000" }}
                  variant="h4"
                  component="div"
                >
                  {product.name}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={1} md={1} sx={{ mt: { xs: 3, md: 0 } }}>
                <Typography
                  sx={{ ml: 2, flex: 1, color: "#000" }}
                  variant="h5"
                  component="div"
                >
                  <TomanConverter Rial={+product.price} />
                </Typography>
              </Grid>
              <Grid item xs={6} sm={1} md={2} sx={{ mt: { xs: 3, md: 0 } }}>
                {isLoggedIn ? (
                  <LoadingButton
                    loading={pending}
                    loadingIndicator="بررسی"
                    variant="contained"
                    color="error"
                    disabled={state}
                    onClick={buy}
                    style={{
                      minWidth: "2em",
                      padding: "0.5em 0.7em",
                      fontSize: "1.2em",
                    }}
                  >
                    {state ? "خریداری شده" : "خرید کلاس"}
                  </LoadingButton>
                ) : (
                  <BlueButton
                    label="وارد شوید"
                    type={Link}
                    link="/v2/identity/login"
                  />
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
        {pending && (
          <Grid container justifyContent={"center"} sx={{ my: 3 }}>
            <Alert
              severity="warning"
              variant="outlined"
              sx={{ width: { md: "40%", sm: "60%", xs: "90%" } }}
            >
              <AlertTitle>لطفا صبر کنید</AlertTitle>
              لطفا چند ثانیه صبر کنید، در حال برقراری ارتباط با سرور...
            </Alert>
          </Grid>
        )}
        {product.images[0]?.src && (
          <Grid container justifyContent={"center"}>
            <CardMedia
              component="img"
              image={product.images[0].src}
              alt={product.images[0].alt}
              sx={{
                height: "auto",
                maxHeight: "40vh",
                width: { md: "40%", sm: "60%", xs: "90%" },
              }}
            />
          </Grid>
        )}
        {error && (
          <Grid container justifyContent={"center"} sx={{ my: 3 }}>
            <Alert
              severity="error"
              id="class-is-error"
              variant="outlined"
              sx={{ width: { md: "40%", sm: "60%", xs: "90%" } }}
            >
              <AlertTitle>خطا</AlertTitle>
              {error.Message ?? error.message}
            </Alert>
          </Grid>
        )}
        <Typography sx={{ fontSize: "1.8em", textAlign: "center", mt: 4 }}>
          دروس تدریس شده در این کلاس
        </Typography>
        <Typography sx={{ fontSize: "1.2em", textAlign: "center", mt: 4 }}>
          {product.isPurchased
            ? "با کلیک بر روی  'ورود به کلاس'، به پنل کلاس مربوطه وارد شوید."
            : "ابتدا کلاس را خریداری کنید، سپس با 'ورود به کلاس' به پنل خود هدایت خواهید شد."}
        </Typography>
        <Container maxWidth="md">
          <List sx={{ p: 3 }}>
            {product.courses.map((i) => {
              return (
                <div key={i.id}>
                  <ListItem
                    xs={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <ListItemIcon>
                      <ClassIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: { xs: "1.1em", md: "1.4em" },
                            maxWidth: { xs: "18em", md: "max-content" },
                          }}
                          id="class-is-error"
                        >
                          {i.name === "" ? product.name : i.name}
                        </Typography>
                      }
                    />
                    <LoadingButton
                      loading={pending || loading}
                      variant="contained"
                      disabled={
                        !isLoggedIn || error !== undefined || !product.isSynced
                      }
                      color={"primary"}
                      onClick={() => getLink(i.id)}
                      style={{
                        width: "10em",
                        padding: "0.4em 0.2em",
                        fontSize: "1em",
                      }}
                    >
                      {"ورود به کلاس"}
                    </LoadingButton>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
            {product.courses.length === 0 && (
              <Typography
                sx={{ fontSize: "1.8em", textAlign: "center", mt: 4 }}
              >
                درسی برای این کلاس ثبت نشده است.
              </Typography>
            )}
          </List>
        </Container>
      </Paper>
    </Grid>
  );
};
