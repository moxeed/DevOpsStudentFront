import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Card,
  Box,
  Dialog,
  Paper,
  CardContent,
  Typography,
  Grid,
  Fab,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import classes from "./Comment.module.scss";
import classe from "./CommentForm.module.scss";
import JDate from "jalali-date";
import { GetUserId } from "src/Services/Authentication/useAuthentication";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentService from "src/Services/Notification/CommnetService";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "auto",
  width: "100%",
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

const CommentSection = ({
  content,
  createdAt,
  id,
  replyToId,
  userId,
  userName,
}) => {
  const jdate = new JDate(new Date(createdAt));

  return (
    <>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={12} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                display: "grid",
                gap: 2,
              }}
            >
              <Item>
                <Grid className={classes.content} item xs={12}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      display: "grid",
                      gridTemplateColumns: { md: "10fr 1fr" },
                      gap: 5,
                    }}
                  >
                    <Typography variant="h6" className={classes.name}>
                      {userName}||{userId}
                    </Typography>
                    <Typography variant="h6" className={classes.date}>
                      {jdate.format("dddd DD MMMM YYYY")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid className={classes.content} item xs={12}>
                  <Typography variant="h6">{content}</Typography>
                  <Accordion>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={() => replyToId(id, content)}
                    >
                      <Typography variant="h6" className={classes.answer}>
                        پاسخ
                        <ExpandMoreIcon />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {content && content.length > 0 ? (
                        <Grid
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                          xs={12}
                          item
                        >
                          {content.map((r, i) => (
                            <CommentSection
                              {...r}
                              replyToId={replyToId}
                              key={i}
                            />
                          ))}
                        </Grid>
                      ) : null}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Item>
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </>
  );
};

export const Comments = ({ identifier }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [open, setOpen] = useState(false);
  const handleReply = (id, content) => setReplyTo({ id, content });

  const loadCommnets = () =>
    CommentService.ReciveComment(identifier).then((res) =>
      setComments(res.data)
    );

  const validataContent = () =>
    content !== "" && content?.match(/^ *$/) === null;

  const hanleAddComment = () => {
    if (validataContent())
      CommentService.SendComment({
        content,
        key: identifier,
        userId: GetUserId(),
        userName: "user" + GetUserId(),
        replyToId: replyTo ? replyTo.id : null,
      }).then(() => {
        setContent("");
        setReplyTo(undefined);
        loadCommnets();
        setOpen(false);
      });
  };

  useEffect(() => {
    CommentService.GetComments(identifier).then((res) => {
      setComments(res.data);
    });
  }, [identifier]);

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Grid container item xs={12} justifyContent={"space-between"}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { md: "10fr 1fr" },
                gap: 5,
              }}
            >
              <Typography variant="h6">
                نظرات خود را با ما به اشتراک بگذارید...
              </Typography>
              <Fab
                className={classes.BButton}
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
                type="button"
                onClick={() => setOpen(true)}
              >
                ثبت دیدگاه شما
              </Fab>
              <Dialog
                onClose={() => setOpen(false)}
                open={open}
                maxWidth="sm"
                ma
                sx={{ mt: 20 }}
              >
                <Card className={classe.Form}>
                  <Grid container justifyContent={"space-between"}>
                    <Typography className={classe.Title}>
                      ارسال نظرات شما
                    </Typography>
                    <Grid item xs={12}>
                      {replyTo ? (
                        <Grid container>
                          <Grid
                            style={{ display: "flex", alignItems: "center" }}
                            xs={12}
                            item
                          >
                            <Button
                              className=" Button"
                              onClick={() => setReplyTo(undefined)}
                            >
                              <span>&times;</span>
                            </Button>
                            <Typography>
                              در پاسخ به {replyTo.content}
                            </Typography>
                          </Grid>
                        </Grid>
                      ) : null}
                      <TextField
                        error={!validataContent()}
                        className={classe.FormInput}
                        type={"text"}
                        fullWidth
                        multiline
                        maxLength="510"
                        placeholder={"پیام خود را وارد کنید ..."}
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Paper className={classe.Warn}>
                        توجه: در خاطر داشته باشید که نظرات شما پس از تایید ادمین
                        در سایت نمایش داده خواهد شد.
                      </Paper>
                    </Grid>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <LoadingButton
                        className={classe.SubmitBtn}
                        type={"submit"}
                        loadingIndicator="در حال ارسال"
                        variant={"contained"}
                        onClick={hanleAddComment}
                      >
                        ارسال پیام
                      </LoadingButton>
                    </div>
                  </Grid>
                </Card>
              </Dialog>
            </Box>
          </Grid>
          <Grid>
            {comments.map((c, i) => (
              <CommentSection {...c} key={i} onReply={handleReply} />
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
