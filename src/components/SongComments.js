import React, { useState, useEffect } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Typography, Box, Divider, TextField, Button } from "@material-ui/core";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";

import LikeSuite from "./LikeSuite";
import SongCommentBox from "./SongCommentBox";

const useStyles = makeStyles((theme) => ({
  comment_form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "inherit",
  },
  comment_form__text_input: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  comment_form__submit: {},
  call_to_action: {
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.light,
  },
}));

const ADD_COMMENT = gql`
  mutation addSongComment($newSongComment: NewSongCommentInput!) {
    addSongComment(input: $newSongComment) {
      id
      content
      likes
      dislikes
      songId
      postedBy
    }
  }
`;

const SongComments = (props) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const [addSongComment, newSongComment] = useMutation(ADD_COMMENT);
  const song = props.song;
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState("");

  console.log(user);

  const changeNewComment = (e) => {
    setNewCommentContent(e.target.value);
  };

  useEffect(() => {
    setComments(song.comments);
  }, [comments]);

  const onSubmit = async () => {
    await addSongComment({
      variables: {
        newSongComment: {
          content: newCommentContent,
          likes: 0,
          dislikes: 0,
          songId: song.id,
          postedBy: user.nickname,
        },
      },
    });
    setComments([...comments, newSongComment]);
  };

  return (
    <Box>
      {comments.length === 0 ? (
        <Typography className={classes.call_to_action}>
          Be the first to say something.
        </Typography>
      ) : (
        <Box className={classes.comment_list}>
          {comments.map((comment) => {
            return <SongCommentBox comment={comment} />;
          })}
        </Box>
      )}
      <form className={classes.comment_form}>
        <TextField
          required
          id="comment-form-input"
          label="Comment"
          variant="outlined"
          placeholder="Dunk on these fools"
          autoComplete="off"
          multiline={true}
          rows="5"
          rowsMax="7"
          className={classes.comment_form__text_input}
          onChange={(e) => changeNewComment(e)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.comment_form__submit}
          onClick={onSubmit}
          startIcon={<SportsHandballIcon />}
        >
          Dunk on 'em
        </Button>
      </form>
    </Box>
  );
};

export default SongComments;
