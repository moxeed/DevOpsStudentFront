import {
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect } from "react";
import ProductService from "../../Services/Product/PackageService";
import PhoneNumberBox from "./PhoneNumberBox";
import StatusCard from "./StatusCard";
import UserWebinaCard from "./UserWebinaCard";

const StudentWebinars = () => {
  const [packages, setPackages] = React.useState({
    webinars: [],
    message: null,
  });
  const [user, setUser] = React.useState();
  const [cooldown, setCooldown] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (user) {
      ProductService.GetSubscriptionsByPhoneNumber(user)
        .then((res) => setPackages(res))
        .finally(() => setLoading(false));
    }
  }, [user]);
  const updateData = () => {
    setCooldown(true);
    setLoading(true);
    setPackages({
      webinars: [],
      message: null,
    });
    ProductService.GetSubscriptionsByPhoneNumber(user)
      .then((res) => {
        setPackages(res);
        setTimeout(() => setCooldown(false), 5000);
      })
      .finally(() => setLoading(false));
  };
  return (
    <Container style={{ width: "100%" }}>
      <Grid
        container
        direction={"column"}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "70vh" }}
      >
        {!user ? (
          <Grid item>
            <PhoneNumberBox setUser={setUser} />
          </Grid>
        ) : (
          <>
            <StatusCard
              packages={packages}
              user={user}
              cooldown={cooldown}
              updateData={updateData}
            />
            <Grid
              item
              xs={12}
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {!loading ? (
                packages.status === true ? (
                  packages.webinars.length > 0 ? (
                    packages.webinars.map((item, i) => (
                      <Grid xs={12} md={4} item key={"webinarcards_" + i}>
                        <UserWebinaCard data={item} />
                      </Grid>
                    ))
                  ) : (
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h4">
                        همایش فعالی برای این شماره وجود ندارد
                      </Typography>
                    </Grid>
                  )
                ) : (
                  <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction={"column"}
                  >
                    <Typography variant="h4" style={{ margin: "1em" }}>
                      دریافت همایش ها موفق نبود
                    </Typography>
                    <Typography
                      variant="h5"
                      style={{ margin: "1em", textAlign: "center" }}
                    >
                      شماره شما در سامانه همایش ها ثبت نشده است، شماره ای که با
                      آن همایش را خریداری کرده اید وارد کنید یا اگر از صحت شماره
                      تماس خود مطمئن هستید، به پشتیبانی اطلاع دهید
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginTop: "2em", padding: "1em", width: "20%" }}
                      onClick={() => setUser(null)}
                    >
                      اصلاح شماره وارد شده
                    </Button>
                  </Grid>
                )
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default StudentWebinars;
