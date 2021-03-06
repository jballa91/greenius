import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container, Typography, Box, Divider } from "@material-ui/core";

import Loader from "./Loader";
import LikeSuiteSongPage from "./LikeSuiteSongPage";
import SongComments from "./SongComments";
import SongLikedBy from "./SongLikedBy";
import SongLyrics from "./SongLyrics";
import Annotation from "./Annotation";
import NewAnnotation from "./NewAnnotation";

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
    flexDirection: "column",
    height: "30px",
    maxWidth: "260px",
    marginLeft: theme.spacing(8),
    marginTop: theme.spacing(3),
  },
  left__header_liked_by: {
    marginLeft: theme.spacing(2),
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
      postedBy
      likedBy
      dislikedBy
      comments {
        id
        content
        likes
        dislikes
        songId
        postedBy
        likedBy
        dislikedBy
      }
      annotations {
        id
        startIndex
        endIndex
        content
        likes
        dislikes
        songId
        postedBy
        likedBy
        dislikedBy
      }
    }
  }
`;

const SongPage = (props) => {
  const classes = useStyles();
  const songId = props.match.params.id;
  const { data, loading, refetch } = useQuery(GET_SONG, {
    variables: { id: songId },
  });

  // Hooks for Annotation / Comments
  const [isAnnotationOpen, setIsAnnotationOpen] = useState(false);
  const [openAnnotation, setOpenAnnotation] = useState({});
  const [selection, setSelection] = useState({});
  const [isNewAnnotationOpen, setIsNewAnnotationOpen] = useState(false);

  useEffect(() => {
    console.log("SELECTION", selection);

    refetch();
  }, [props, selection]);

  if (loading) return <Loader />;

  return (
    <Box className={classes.song_page__container}>
      <Container className={classes.song_page}>
        <Box className={classes.song_page__left}>
          <Box className={classes.left__header}>
            <img
              className={classes.left__header_img}
              src={data.getSong.img}
              alt="Album Artwork"
            />
            <Box className={classes.left__header_details}>
              <Typography variant="h3">{data.getSong.name}</Typography>
              <Typography variant="h4">{data.getSong.artist}</Typography>
              <Typography variant="h6">{data.getSong.genre}</Typography>
            </Box>
            <Box className={classes.left__header_like_dislike}>
              <LikeSuiteSongPage refetch={refetch} song={data.getSong} />
            </Box>
          </Box>
          <Box className={classes.left__lyrics_container}>
            <Typography
              component="pre"
              variant="h6"
              className={classes.left__lyrics}
            >
              <SongLyrics
                songId={data.getSong.id}
                lyrics={data.getSong.lyrics.join("\n")}
                annotations={data.getSong.annotations}
                setOpenAnnotation={setOpenAnnotation}
                setIsAnnotationOpen={setIsAnnotationOpen}
                setIsNewAnnotationOpen={setIsNewAnnotationOpen}
                setSelection={setSelection}
              />
            </Typography>
          </Box>
        </Box>
        <Divider
          className={classes.song_page__divider}
          orientation="vertical"
          flexItem={true}
        />
        <Box className={classes.song_page__right}>
          {isAnnotationOpen ? (
            <Annotation
              setOpenAnnotation={setOpenAnnotation}
              setIsAnnotationOpen={setIsAnnotationOpen}
              refetch={refetch}
              annotation={
                data.getSong.annotations.filter(
                  (annotation) => annotation.id === openAnnotation
                )[0]
              }
            />
          ) : isNewAnnotationOpen ? (
            <NewAnnotation
              setIsNewAnnotationOpen={setIsNewAnnotationOpen}
              setIsAnnotationOpen={setIsAnnotationOpen}
              selection={selection}
              refetch={refetch}
              songId={data.getSong.id}
            />
          ) : (
            <SongComments
              loading={props.loading}
              refetch={refetch}
              song={data.getSong}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SongPage;
