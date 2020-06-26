import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Container,
  Typography,
  Divider,
  Card,
  CardMedia,
  Box,
  CardActions,
  IconButton,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import HotelIcon from "@material-ui/icons/Hotel";

const useStyles = makeStyles((theme) => ({
  featured_card__link: {
    width: "50%",
    textDecoration: "none",
  },
  featured_card: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    "&&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
  featured_card__art: {
    height: "80px",
    width: "80px",
  },
  featured_card__column: {
    display: "Flex",
  },
  featured_card__info: {
    marginLeft: theme.spacing(2),
  },
  featured_card__like_icon: {
    color: theme.palette.error.main,
    "&&:hover": {
      color: theme.palette.error.light,
    },
  },
  featured_card__like_number: {
    // marginLeft: theme.spacing(1),
    color: theme.palette.error.main,
  },
  featured_card__dislike: {
    color: theme.palette.info.main,
    "&&:hover": {
      color: theme.palette.info.light,
    },
  },
  featured_card__dislike_icon: {},
  featured_card__dislike_number: {
    // marginLeft: theme.spacing(1),
    color: theme.palette.info.main,
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

const FeaturedCard = ({ song }) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const [editSong, editedSong] = useMutation(EDIT_SONG);
  const [likes, setLikes] = useState(song.likes);
  const [dislikes, setDislikes] = useState(song.dislikes);

  const onLike = async (e) => {
    e.preventDefault();
    setLikes(likes + 1);
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

  return (
    <Link className={classes.featured_card__link} to={`/songs/${song.id}`}>
      <Card className={classes.featured_card}>
        <Box className={classes.featured_card__column}>
          <CardMedia
            className={classes.featured_card__art}
            image={song.img}
            title="Album Artwork"
          />
          <Box className={classes.featured_card__info}>
            <Typography>{song.name}</Typography>
            <Typography>{song.artist}</Typography>
            <Typography>{song.genre}</Typography>
          </Box>
        </Box>
        <Box className={classes.featured_card__column}>
          <CardActions>
            <IconButton
              className={classes.featured_card__like}
              aria-label="Like"
              onClick={(e) => onLike(e)}
            >
              <WhatshotIcon className={classes.featured_card__like_icon} />
            </IconButton>
            <Typography className={classes.featured_card__like_number}>
              {likes}
            </Typography>
            <IconButton
              className={classes.featured_card__dislike}
              aria-label="Dislike"
              onClick={(e) => onDislike(e)}
            >
              <HotelIcon className={classes.featured_card__dislike_icon} />
            </IconButton>
            <Typography className={classes.featured_card__dislike_number}>
              {dislikes}
            </Typography>
          </CardActions>
        </Box>
      </Card>
    </Link>
  );
};

export default FeaturedCard;
