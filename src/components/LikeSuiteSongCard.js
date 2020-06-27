import React, { useState, useEffect } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Typography, CardActions, IconButton } from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import HotelIcon from "@material-ui/icons/Hotel";

import SongLikedBy from "./SongLikedBy";

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
      postedBy
      likedBy
      dislikedBy
    }
  }
`;

const LikeSuiteSongCard = ({ song }) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const [editSong, $editedSong] = useMutation(EDIT_SONG);
  const [likes, setLikes] = useState(song.likes);
  const [dislikes, setDislikes] = useState(song.dislikes);
  const [likedBy, setLikedBy] = useState(song.likedBy);
  const [dislikedBy, setDislikedBy] = useState(song.dislikedBy);

  useEffect(() => {
    editSong({
      variables: {
        editedSong: {
          id: song.id,
          name: song.name,
          artist: song.artist,
          genre: song.genre,
          img: song.img,
          likes: likes,
          dislikes: dislikes,
          postedBy: song.postedBy,
          likedBy: likedBy,
          dislikedBy: dislikedBy,
        },
      },
    });
  }, [likes, dislikes, likedBy, dislikedBy]);

  console.log("LIKEDBY", likedBy);
  console.log("DISLIKED BY", dislikedBy);

  const onLike = async (e) => {
    e.preventDefault();
    if (likedBy.includes(user.nickname)) {
      return;
    }
    setLikes(likes + 1);
    console.log("LIKES BEFORE GQL", likes);

    if (dislikes > 0) {
      setDislikes(dislikes - 1);
      setLikedBy([...likedBy, user.nickname]);
      setDislikedBy(
        dislikedBy.filter((nickname) => nickname !== user.nickname)
      );
    } else {
      setLikedBy([...likedBy, user.nickname]);
      setDislikedBy(
        dislikedBy.filter((nickname) => nickname !== user.nickname)
      );
    }
    console.log("likes", likes);
    console.log("dislikes", dislikes);
  };

  const onDislike = async (e) => {
    e.preventDefault();
    if (dislikedBy.includes(user.nickname)) {
      return;
    }
    setDislikes(dislikes + 1);
    if (likes > 0) {
      setLikes(likes - 1);
      setDislikedBy([...dislikedBy, user.nickname]);
      setLikedBy(likedBy.filter((nickname) => nickname !== user.nickname));
    } else {
      setDislikedBy([...dislikedBy, user.nickname]);
      setLikedBy(likedBy.filter((nickname) => nickname !== user.nickname));
    }
    console.log("likes", likes);
    console.log("dislikes", dislikes);
  };

  const clickNum = (e) => {
    e.preventDefault();
  };

  return (
    <div>
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
    </div>
  );
};

export default LikeSuiteSongCard;
