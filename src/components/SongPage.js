import React, { useEffect, useState } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container, Typography, Box, Divider } from "@material-ui/core";

import LikeSuite from "./LikeSuite";
import SongComments from "./SongComments";

const useStyles = makeStyles((theme) => ({
  song_page__container: {
    backgroundColor: theme.palette.secondary.dark,
    paddingTop: theme.spacing(2),
    color: "#FFF",
  },
  song_page: {
    display: "flex",
    justifyContent: "space-between",
  },
  song_page__left: {
    display: "flex",
    flexDirection: "column",
    width: "calc(70% - 2px)",
  },
  left__header: {
    display: "flex",
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
  },
  left__header_img: {
    width: "200px",
    height: "200px",
  },
  left__header_details: {
    color: "#fff",
    marginLeft: theme.spacing(2),
  },
  left__header_like_dislike: {
    display: "flex",
    height: "30px",
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  left_header__like_icon: {
    color: theme.palette.error.main,
    "&&:hover": {
      color: theme.palette.error.light,
    },
  },
  left_header__like_number: {
    // marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    color: theme.palette.error.main,
  },
  left_header__dislike: {
    color: theme.palette.info.main,
    marginLeft: theme.spacing(2),
    "&&:hover": {
      color: theme.palette.info.light,
    },
  },
  left_header__dislike_icon: {},
  left_header__dislike_number: {
    // marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    color: theme.palette.info.main,
  },
  left__lyrics_container: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  left__lyrics: {},
  song_page__divider: {
    width: "4px",
    backgroundColor: theme.palette.primary.dark,
  },
  song_page__right: {
    width: "calc(30% - 2px)",
    paddingLeft: theme.spacing(2),
  },
}));

const GET_SONG = gql`
  query getSong($id: ID!) {
    getSong(_id: $id) {
      id
      name
      artist
      genre
      img
      lyrics
      likes
      dislikes
      comments {
        content
        likes
        dislikes
        songId
        postedBy
      }
    }
  }
`;

const SongPage = (props) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const songId = props.match.params.id;
  const { data, loading, error } = useQuery(GET_SONG, {
    variables: { id: songId },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <Box className={classes.song_page__container}>
      <Container className={classes.song_page}>
        <Box className={classes.song_page__left}>
          <Box className={classes.left__header}>
            <img className={classes.left__header_img} src={data.getSong.img} />
            <Box className={classes.left__header_details}>
              <Typography variant="h2">{data.getSong.name}</Typography>
              <Typography variant="h4">{data.getSong.artist}</Typography>
              <Typography variant="h6">{data.getSong.genre}</Typography>
            </Box>
            <Box className={classes.left__header_like_dislike}>
              <LikeSuite song={data.getSong} />
            </Box>
          </Box>
          <Box className={classes.left__lyrics_container}>
            <Typography
              component="pre"
              variant="h6"
              className={classes.left__lyrics}
            >
              {data.getSong.lyrics.join("\n")}
            </Typography>
          </Box>
        </Box>
        <Divider
          className={classes.song_page__divider}
          orientation="vertical"
          flexItem={true}
        />
        <Box className={classes.song_page__right}>
          <SongComments song={data.getSong} />
        </Box>
      </Container>
    </Box>
  );
};

export default SongPage;
