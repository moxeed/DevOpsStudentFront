import {
  Grid,
  Typography,
  ListItem,
  Button,
} from "@mui/material";
import classes from "./WorkWithUs.module.scss";

const WorkWithUsPage = () => {
  return (
    <div style={{ padding: 5 }}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: "3em" }}>
          <Typography variant="h4" className={classes.titel}>
            فرصت های شغلی گروه برترها
          </Typography>
          <Typography variant="h6" className={classes.items}>
            گروه برترهای کانون جهت توسعه تیم علمی مشاوره ای خود در زمینه شغل های
            زیر دعوت به همکاری میکند.
            <ListItem>
              <Typography className={classes.items}>
                1.مشاور و پشتیبان ویژه
              </Typography>
            </ListItem>
            <ListItem>
              <Typography className={classes.items}>
                2.تدریس خصوصی و رفع اشکال درسی
              </Typography>
            </ListItem>
            <ListItem>
              <Typography className={classes.items}>
                3.تولید محتوای علمی و مشاوره ای
              </Typography>
            </ListItem>
            <ListItem>
              <Typography className={classes.items}>
                4.برگزاری کلاس و همایش های درسی
              </Typography>
            </ListItem>
          </Typography>
          <Typography variant="h5" className={classes.preTitel}>
            مشاوره و پشتیبانی ویژه-شرح وظایف:
          </Typography>
          <ListItem>
            <Typography className={classes.items}>
              1.مکالمه 80 دقیقه ای با دانش آموز(4 تماس 20 دقیقه ای به صورت
              هفتگی)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              2.بررسی برنامه مطالعاتی و ساعت مطالعه دانش آموز به صورت روزانه و
              پاسخگویی به سوالات درسی دانش آموز در فضایمجازی به مدت 30 دقیقه در
              ماه
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              3.دادن برنامه مطالعاتی استاندارد و متناسب با سطح علمی دانش آموز
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              4.تحلیل کارنامه دانش آموز و نوشتن آن در دفتر پشتیبان
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              5.هدف گذاری واقع بینانه برای دانش آموز و نوشتن آن در دفتر پشتیبان
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              6.ارائه گزارش مکتوب به اولیا هر هفته یکبار
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              7.رفع اشکال درسی با دانش آموز هر هفته حداقل یک درس
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              8.معرفی منابع استاندارد به دانش آموز مطابق با سطح علمی ایشان
            </Typography>
          </ListItem>
          {/* <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.items}>رتبه کشوری</TableCell>
                <TableCell className={classes.items}>
                  هزینه دریافتی بابت هر دانش آموز به صورت ماهیانه
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.items}>رتبه زیر 50</TableCell>
                <TableCell className={classes.items}>504/000 تومان</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.items}>
                  رتبه زیر 50 تا 500
                </TableCell>
                <TableCell className={classes.items}>336/000تومان</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.items}>رتبه بالای 500</TableCell>
                <TableCell className={classes.items}>233/000 تومان</TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: "3em" }}>
          <Typography variant="h5" className={classes.preTitel}>
            تدریس خصوصی و رفع اشکال درسی-شرح وظایف:
          </Typography>
          <ListItem>
            <Typography className={classes.items}>
              1.توضیح کامل مبحث مورد نظر به همراه حل نمونه سوالات تشریحی
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              2.حل نمونه سوالات کنکور و سوالات تالیفی در درس مربوطه
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              3.تشریح روش های مطالعه در درس مورد نظر به صورت مبحث محور
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              4.معرفی منابع مطالعاتی استاندارد و متناسب با سطح درسی دانش آموز
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.items}>
              5.دادن تکالیف جهت کار در منزل توسط دانش آموز
            </Typography>
          </ListItem>
          {/* <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.items}>رتبه کشوری</TableCell>
                <TableCell className={classes.items}>
                  هزینه دریافتی بابت هر دانش آموز به صورت ماهیانه
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.items}>رتبه زیر 50</TableCell>
                <TableCell className={classes.items}>197/000 تومان</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.items}>
                  رتبه زیر 50 تا 500
                </TableCell>
                <TableCell className={classes.items}>113/000تومان</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.items}>رتبه بالای 500</TableCell>
                <TableCell className={classes.items}>62/000 تومان</TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
          <br />
          <Typography variant="h5" className={classes.preTitel}>
            تولید محتوای علمی-مشاوره ای:
          </Typography>
          <Typography variant="h6" className={classes.items}>
            تولید محتوا در فرمت های زیر انجام میشود:
          </Typography>
          <Grid xs={12} container style={{ flexDirection: "row" }}>
            <ListItem>
              <Grid item xs={4}>
                <Typography className={classes.items}>
                  1.فرمت ویدیویی
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.items}>2.فرمت صوتی</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.items}>3.فرمت متنی</Typography>
              </Grid>
            </ListItem>
          </Grid>

          {/* <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell className={classes.items}>متنی</TableCell>
                <TableCell className={classes.items}>
                  <bdi dir="rtl">یک فایل word 3 صفحه ای : 32/000 تومان</bdi>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.items}>ویدیویی</TableCell>
                <TableCell className={classes.items}>
                  <bdi dir="rtl">یک فایل ویدیو 10 دقیقه ای : 42/000 تومان</bdi>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.items}>صوتی</TableCell>
                <TableCell className={classes.items}>
                  <bdi dir="rtl">
                    یک فایل voice 2 الی 5 دقیقه ای : 10/000 تومان
                  </bdi>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
          <div style={{ textAlign: "center" }}>
            <Button
              className={classes.buttonLog}
              onClick={() =>
                window.open("https://bamis.ir/identity/account/Register")
              }
            >
              ثبت نام
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default WorkWithUsPage;
