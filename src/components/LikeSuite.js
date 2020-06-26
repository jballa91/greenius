import React, { useState } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Typography, CardActions, IconButton } from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import HotelIcon from "@material-ui/icons/Hotel";

const useStyles = makeStyles((theme) => ({
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

const EDIT_SONG = gql`
  mutation editSong($editedSong: SongInput!) {
    editSong(input: $editedSong) {
      id
      name
      artist
      genre
      img
      lyrics
      likes
      dislikes
    }
  }
`;

const LikeSuite = ({ song }) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const [editSong, $editedSong] = useMutation(EDIT_SONG);
  const [likes, setLikes] = useState(song.likes);
  const [dislikes, setDislikes] = useState(song.dislikes);

  const onLike = async (e) => {
    e.preventDefault();
    setLikes(likes + 1);
    if (dislikes > 0) {
      setDislikes(dislikes - 1);
      await editSong({
        variables: {
          editedSong: {
            id: song.id,
            name: song.name,
            artist: song.artist,
            genre: song.genre,
            img: song.img,
            likes: song.likes + 1,
            dislikes: song.dislikes - 1,
          },
        },
      });
    }
    await editSong({
      variables: {
        editedSong: {
          id: song.id,
          name: song.name,
          artist: song.artist,
          genre: song.genre,
          img: song.img,
          likes: song.likes + 1,
          dislikes: song.dislikes,
        },
      },
    });
  };

  const onDislike = async (e) => {
    e.preventDefault();
    setDislikes(dislikes + 1);
    if (likes > 0) {
      setLikes(likes - 1);
      await editSong({
        variables: {
          editedSong: {
            id: song.id,
            name: song.name,
            artist: song.artist,
            genre: song.genre,
            img: song.img,
            likes: song.likes - 1,
            dislikes: song.dislikes + 1,
          },
        },
      });
    }
    await editSong({
      variables: {
        editedSong: {
          id: song.id,
          name: song.name,
          artist: song.artist,
          genre: song.genre,
          img: song.img,
          likes: song.likes,
          dislikes: song.dislikes + 1,
        },
      },
    });
  };

  const clickNum = (e) => {
    e.preventDefault();
  };

  return (
    <CardActions>
      <IconButton
        className={classes.like_suite__like}
        aria-label="Like"
        onClick={(e) => onLike(e)}
      >
        <WhatshotIcon className={classes.like_suite__like_icon} />
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
        <HotelIcon className={classes.like_suite__dislike_icon} />
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

export default LikeSuite;
