import React, { useState } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Box, Typography, Divider } from "@material-ui/core";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CommentIcon from "@material-ui/icons/Comment";

import LikeSuite from "./LikeSuite";

const useStyles = makeStyles((theme) => ({
  song_comment_box: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.secondary.light,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  song_comment_box__header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  child_care_icon: {
    color: theme.palette.info.main,
  },
  header__icon_name: {
    display: "flex",
  },
  header__name: {
    marginLeft: theme.spacing(2),
  },
  song_comment_box__content_container: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  song_comment_box__icon_content: {
    display: "flex",
  },
  song_comment_box__content: {
    whiteSpace: "pre-wrap",
    marginLeft: theme.spacing(1),
  },
  like_suite_container: {
    display: "flex",
    width: "inherit",
    justifyContent: "flex-end",
  },
}));

const SongCommentBox = ({ comment }) => {
  const { user } = useAuth0();
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const classes = useStyles();
  console.log(comment);

  return (
    <Box className={classes.song_comment_box}>
      <Box className={classes.song_comment_box__header}>
        <Box className={classes.header__icon_name}>
          {likes >= 100 ? (
            <SportsHandballIcon color="error" />
          ) : (
            <Box className={classes.child_care_icon}>
              <ChildCareIcon />
            </Box>
          )}
          <Typography className={classes.header__name}>
            {comment.postedBy}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box className={classes.song_comment_box__content_container}>
        <Box className={classes.song_comment_box__icon_content}>
          <CommentIcon color="primary" />
          <Typography
            className={classes.song_comment_box__content}
            component="pre"
          >
            {comment.content}
          </Typography>
        </Box>
        <Box className={classes.like_suite_container}>
          <LikeSuite className={classes.like_suite} song={comment} />
        </Box>
      </Box>
    </Box>
  );
};

export default SongCommentBox;