import { Button, Card, Divider, Grid, Typography } from "@material-ui/core";

const StatusCard = ({ packages, user, cooldown, updateData }) => {
  return (
    <Card
      style={{
        margin: "2em",
        padding: "1.2em",
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h5">همایش های برترها</Typography>
      <Divider style={{ marginTop: "1em" }} />
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        direction={"column"}
        spacing={2}
      >
        {packages.message ? (
          <Grid item>
            <Typography variant="h6" style={{ marginTop: "1.5em" }}>
              پیام سامانه: {packages.message}
            </Typography>
          </Grid>
        ) : null}
        <Grid item>
          <Typography variant="h5" style={{ marginTop: "1.5em" }}>
            شماره تماس شما: {user}
          </Typography>
        </Grid>

        {!cooldown ? (
          <>
            <Grid item>
              <Typography variant="p" style={{ fontSize: "1.2em" }}>
                برای بررسی مجدد وضعیت همایش ها، بر دکمه زیر کلیک کنید
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={updateData}
                style={{ fontSize: "1em", marginTop: ".4em" }}
              >
                به روز رسانی
              </Button>
            </Grid>
          </>
        ) : (
          <Grid item>
            <Typography style={{ margin: "1em" }}>
              وضعیت همایش های شما در حال بررسی است{" "}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default StatusCard;
