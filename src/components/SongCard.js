import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardMedia, Box } from "@material-ui/core";

import LikeSuiteSongCard from "./LikeSuiteSongCard";

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
}));

const FeaturedCard = ({ song }) => {
  const classes = useStyles();

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
          <LikeSuiteSongCard song={song} />
        </Box>
      </Card>
    </Link>
  );
};

export default FeaturedCard;
