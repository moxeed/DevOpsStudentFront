// import React, { useState, useEffect } from "react";
// import classes from "./CommentForm.module.scss";
// import CommentService from "src/Services/Notification/CommnetService";
// import { LoadingButton } from "@mui/lab";
// import { GetUserId } from "src/Services/Authentication/useAuthentication";
// import {
//   Paper,
//   Card,
//   Grid,
//   TextField,
//   Typography,
//   Button,
// } from "@mui/material";

// const CommentForm = ({ setOpen, identifier }) => {
//   const [content, setContent] = useState("");
//   const [replyTo, setReplyTo] = useState("");
//   const { setComments } = useState([]);

//   const loadCommnets = () =>
//     CommentService.ReciveComment(identifier).then((res) =>
//       setComments(res.data)
//     );

//   const validataContent = () =>
//     content !== "" && content?.match(/^ *$/) === null;

//   const hanleAddComment = () => {
//     if (validataContent())
//       CommentService.SendComment({
//         content,
//         key: identifier,
//         userId: GetUserId(),
//         userName: "user" + GetUserId(),
//         replyToId: replyTo ? replyTo.id : null,
//       }).then(() => {
//         setContent("");
//         setReplyTo(undefined);
//         loadCommnets();
//         setOpen(false);
//       });
//   };
//   return (
//     <Card className={classes.Form}>
//       <Grid container justifyContent={"space-between"}>
//         <Typography className={classes.Title}>ارسال نظرات شما</Typography>
//         <Grid item xs={12}>
//           {replyTo ? (
//             <Grid container>
//               <Grid
//                 style={{ display: "flex", alignItems: "center" }}
//                 xs={12}
//                 item
//               >
//                 <Button
//                   className=" Button"
//                   onClick={() => setReplyTo(undefined)}
//                 >
//                   <span>&times;</span>
//                 </Button>
//                 <Typography>در پاسخ به {replyTo.content}</Typography>
//               </Grid>
//             </Grid>
//           ) : null}
//           <TextField
//             error={!validataContent()}
//             className={classes.FormInput}
//             type={"text"}
//             fullWidth
//             multiline
//             maxLength="510"
//             placeholder={"پیام خود را وارد کنید ..."}
//             onChange={(e) => setContent(e.target.value)}
//             value={content}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Paper className={classes.Warn}>
//             توجه: در خاطر داشته باشید که نظرات شما پس از تایید ادمین در سایت
//             نمایش داده خواهد شد.
//           </Paper>
//         </Grid>
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "flex-end",
//           }}
//         >
//           <LoadingButton
//             className={classes.SubmitBtn}
//             type={"submit"}
//             loadingIndicator="در حال ارسال"
//             variant={"contained"}
//             onClick={hanleAddComment}
//           >
//             ارسال پیام
//           </LoadingButton>
//         </div>
//       </Grid>
//     </Card>
//   );
// };

// export default CommentForm;
