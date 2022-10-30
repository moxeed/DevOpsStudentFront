import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CommentService from "../../Services/Notification/CommnetService";
import JDate from "jalali-date";
import { makeStyles } from "@material-ui/core/styles";
// import ReplyIcon from "@material-ui/icons/Reply";
import CreateIcon from "@material-ui/icons/Create";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
import { GetUserFullName } from "src/Services/StoreSlices/UserSlice";
import { useSelector } from "react-redux";
import UUID from "src/v2/components/storage/ClientId";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const useStyle = makeStyles(() => ({
  root: {
    padding: 10,
    margin: 25,
    textAlign: "right",
  },
  title: {
    color: "#595352",
    fontSize: 20,
    padding: 10,
    width: "95%",
    borderBottom: "1px solid #f3f3f3",
  },
  inputComment: {
    width: "100%",
    padding: 10,
    resize: "none",
    borderRadius: 5,
    border: "1px solid gray",
    marginTop: 8,
  },
  replyContent: {
    display: "flex",
    marginTop: 10,
    justifyItems: "center",
    alignItems: "center",
    borderRight: "5px solid #f3f3f3",
    background: "#f3f3f3",
    color: "#778899",
    borderRadius: "10px",
  },
  replayButton: {
    margin: 5,
    width: "70px",
    borderRadius: "5px",
    padding: 5,
    color: "#7BA2F7",
    "&:hover": { color: "#808080", backgroundColor: "#fff" },
    height: "30px",
  },
  commentInfo: {
    width: "95%",
    padding: "7px 16px",
    background: "#eee55",
  },
  userName: {
    color: "#057C13",
    fontSize: 16,
  },
  date: {
    color: "#A58BAD",
    display: "flex",
    justifyContent: "flex-end ",
  },
  commentContent: {
    padding: 12,
  },
  closeButton: {
    minWidth: "10px",
    height: "10px",
  },
}));
const Comment = ({
  //id,
  userName,
  createdAt,
  content,
  replyToId,
  replies,
  reply,
  //, replies, onReply
}) => {
  console.log("🚀 ~ file: CommnetSection.jsx ~ line 87 ~ replies", replies);
  const jdate = new JDate(new Date(createdAt));
  const time = new Date(createdAt);

  function time_format(d) {
    const hours = format_two_digits(d.getHours());
    const minutes = format_two_digits(d.getMinutes());
    return hours + ":" + minutes;
  }

  function format_two_digits(n) {
    return n < 10 ? "0" + n : n;
  }

  const classes = useStyle();
  if (replyToId && !reply) return <div></div>;
  return (
    <Grid style={{ borderTop: "2px solid #f6f6f6" }}>
      <Grid className={classes.commentInfo} container>
        <Grid
          className={classes.userName}
          xs={5}
          item
          style={{
            color: userName === "مدیر سایت" ? "red" : "#057C13",
          }}
        >
          {userName}
        </Grid>
        <Grid className={classes.date} xs={7} item>
          {jdate.format("DD MMMM YYYY") + " ساعت " + time_format(time)}
        </Grid>
      </Grid>
      <Grid className={classes.commentContent}>
        <Typography variant="h6">{content}</Typography>
      </Grid>
      {/* <Grid xs={1} item>
        <Button
          className={classes.replayButton + " Button"}
          onClick={() => onReply(Id, Content)}
          disabled
        >
          <ReplyIcon />
          پاسخ
        </Button>
      </Grid>*/}
      {replies && replies.length > 0 ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} style={{ paddingRight: "5%" }}>
            {replies.map((r, i) => (
              <Comment {...r} key={i} reply />
            ))}
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export const CommentSection = ({ identifier }) => {
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyle();
  const Name = useSelector(GetUserFullName);
  const location = useLocation();
  const loadCommnets = () =>
    CommentService.GetComments(identifier).then((res) => setComments(res.data));

  const validataContent = () =>
    content !== "" && content?.match(/^ *$/) === null;

  //const handleReply = (id, content) => setReplyTo({ id, content });
  const hanleAddComment = () => {
    const id = GetUserId() !== 0 ? GetUserId() : null;
    if (validataContent()) {
      setLoading(true);
      CommentService.SendComment({
        content,
        key: identifier,
        userId: id,
        origin: location.pathname,
        userName:
          Name !== "ثبت نشده" && Name !== "مدیر سایت"
            ? Name
            : "user" + UUID.get().slice(0, 8),
        replyToId: replyTo ? replyTo.id : null,
      })
        .then(() => {
          setContent("");
          toast.success(
            "نظر شما ثبت شد؛ بعد از تایید مدیر سایت نمایش داده خواهد شد."
          );
          setReplyTo(undefined);
          loadCommnets();
        })
        .finally(() => setLoading(false));
    } else {
      toast.error("هیچ متنی برای نظر وارد نشده است.");
    }
  };
  useEffect(
    () =>
      CommentService.ReciveComment(identifier).then((res) => setComments(res)),
    [identifier]
  );
  return (
    <Grid
      xs={12}
      item
      style={{ backgroundColor: "white", marginBottom: 20, padding: 4 }}
    >
      <Grid style={{ marginBottom: 12 }}>
        <Typography className={classes.title}>
          <CreateIcon /> ارسال نظر{" "}
        </Typography>
        <Grid xs={12} container item spacing={2} alignItems="center">
          <Grid xs={12} sm={9} item style={{ marginRight: "10px" }}>
            <textarea
              rows={3}
              maxLength="510"
              placeholder="متن نظر"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className={classes.inputComment}
            />
            <Typography style={{ color: "red" }}>
              نظر شما پس از تایید مدیر نمایش داده میشود.
            </Typography>
          </Grid>
          <Grid xs={3} sm={2} item container justifyContent="flex-start">
            <Button
              className="Button"
              onClick={hanleAddComment}
              disabled={loading}
            >
              ارسال
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Typography className={classes.title}>
        <QuestionAnswerIcon /> نظرات شما{" "}
      </Typography>
      <Grid>
        {comments.length > 0 ? (
          comments.map((c, i) => (
            <Comment
              {...c}
              key={i}
              replies={comments.filter((item) => c.id === item.replyToId)}
            />
          ))
        ) : (
          <Typography variant="h5" style={{ margin: 8, color: "gray" }}>
            نظر خود را درباره این محصول ثبت کنید.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
