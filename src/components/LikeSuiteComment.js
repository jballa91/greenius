import React, { useState } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Typography, CardActions, IconButton } from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import HotelIcon from "@material-ui/icons/Hotel";

import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  like_suite__container: {
    padding: 0,
  },
  like_suite__like_icon: {
    color: theme.palette.error.main,
    "&&:hover": {
      color: theme.palette.error.light,
    },
  },
  like_suite__like_number: {
    // marginLeft: theme.spacing(1),
    color: theme.palette.error.main,
    "&&:hover": {
      cursor: "text",
    },
  },
  like_suite__dislike: {
    color: theme.palette.info.main,
    "&&:hover": {
      color: theme.palette.info.light,
    },
  },
  like_suite__dislike_icon: {},
  like_suite__dislike_number: {
    // marginLeft: theme.spacing(1),
    color: theme.palette.info.main,
    "&&:hover": {
      cursor: "text",
    },
  },
}));

const EDIT_COMMENT = gql`
  mutation editSongComment($editedSongComment: SongCommentInput!) {
    editSongComment(input: $editedSongComment) {
      id
      content
      likes
      dislikes
      songId
      postedBy
      likedBy
      dislikedBy
    }
  }
`;

const LikeSuiteComment = ({ loading, comment, refetch }) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const [editSongComment, $editedSongComment] = useMutation(EDIT_COMMENT);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [likedBy, setLikedBy] = useState(comment.likedBy);
  const [dislikedBy, setDislikedBy] = useState(comment.dislikedBy);

  const onLike = async (e) => {
    e.preventDefault();
    if (!user || likedBy.includes(user.nickname)) {
      return;
    }
    setLikes(likes + 1);

    if (dislikes > 0) {
      setDislikes(dislikes - 1);
      setLikedBy([...likedBy, user.nickname]);
      setDislikedBy(
        dislikedBy.filter((nickname) => nickname !== user.nickname)
      );
      editSongComment({
        variables: {
          editedSongComment: {
            id: comment.id,
            content: comment.content,
            likes: comment.likes + 1,
            dislikes: comment.dislikes - 1,
            songId: comment.songId,
            postedBy: comment.postedBy,
            likedBy: [...comment.likedBy, user.nickname],
            dislikedBy: dislikedBy.filter(
              (nickname) => nickname !== user.nickname
            ),
          },
        },
      });
    } else {
      setLikedBy([...likedBy, user.nickname]);
      setDislikedBy(
        dislikedBy.filter((nickname) => nickname !== user.nickname)
      );
      editSongComment({
        variables: {
          editedSongComment: {
            id: comment.id,
            content: comment.content,
            likes: comment.likes + 1,
            dislikes: comment.dislikes,
            songId: comment.songId,
            postedBy: comment.postedBy,
            likedBy: [...comment.likedBy, user.nickname],
            dislikedBy: dislikedBy.filter(
              (nickname) => nickname !== user.nickname
            ),
          },
        },
      });
    }
    refetch();
  };

  const onDislike = async (e) => {
    e.preventDefault();
    if (!user || dislikedBy.includes(user.nickname)) {
      return;
    }
    setDislikes(dislikes + 1);
    if (likes > 0) {
      setLikes(likes - 1);
      setDislikedBy([...dislikedBy, user.nickname]);
      setLikedBy(likedBy.filter((nickname) => nickname !== user.nickname));
      editSongComment({
        variables: {
          editedSongComment: {
            id: comment.id,
            content: comment.content,
            likes: comment.likes - 1,
            dislikes: comment.dislikes + 1,
            songId: comment.songId,
            postedBy: comment.postedBy,
            likedBy: likedBy.filter((nickname) => nickname !== user.nickname),
            dislikedBy: [...comment.dislikedBy, user.nickname],
          },
        },
      });
    } else {
      setDislikedBy([...dislikedBy, user.nickname]);
      setLikedBy(likedBy.filter((nickname) => nickname !== user.nickname));
      editSongComment({
        variables: {
          editedSongComment: {
            id: comment.id,
            content: comment.content,
            likes: comment.likes,
            dislikes: comment.dislikes + 1,
            songId: comment.songId,
            postedBy: comment.postedBy,
            likedBy: likedBy.filter((nickname) => nickname !== user.nickname),
            dislikedBy: [...comment.dislikedBy, user.nickname],
          },
        },
      });
    }
    refetch();
  };

  const clickNum = (e) => {
    e.preventDefault();
  };

  if (loading) return <Loader />;

  return (
    <CardActions className={classes.like_suite__container}>
      <IconButton
        className={classes.like_suite__like}
        aria-label="Like"
        onClick={(e) => onLike(e)}
      >
        <WhatshotIcon
          className={classes.like_suite__like_icon}
          fontSize="small"
        />
      </IconButton>
      <Typography
        className={classes.like_suite__like_number}
        onClick={(e) => clickNum(e)}
      >
        {likes}
      </Typography>
      <IconButton
        className={classes.like_suite__dislike}
        aria-label="Dislike"
        onClick={(e) => onDislike(e)}
      >
        <HotelIcon
          className={classes.like_suite__dislike_icon}
          fontSize="small"
        />
      </IconButton>
      <Typography
        className={classes.like_suite__dislike_number}
        onClick={(e) => clickNum(e)}
      >
        {dislikes}
      </Typography>
    </CardActions>
  );
};

export default LikeSuiteComment;
