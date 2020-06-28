import React, { useEffect, useState } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Typography, Box } from "@material-ui/core";

import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  song_lyrics__container: {
    lineHeight: "26px",
  },
  song_lyrics__no_anno: {
    "&&:hover": {
      cursor: "text",
    },
  },
  song_lyrics__anno: {
    backgroundColor: theme.palette.secondary.main,
    "&&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const SongLyrics = ({
  songId,
  lyrics,
  annotations,
  setOpenAnnotation,
  setIsAnnotationOpen,
}) => {
  const classes = useStyles();

  const handleAnnotationClick = (e) => {
    e.preventDefault();
    setIsAnnotationOpen(true);
    setOpenAnnotation(e.target.id);
  };

  const orderAnnotations = (annotations) => {
    const orderedAnnotations = annotations.sort((a, b) => {
      if (a.startIndex < b.startIndex) {
        return -1;
      } else {
        return 1;
      }
    });
    console.log(orderedAnnotations);

    return orderedAnnotations;
  };

  const annotateLyrics = (lyrics, annotations) => {
    const orderedAnnotations = orderAnnotations(annotations);
    let index = 0;
    let lyricsArray = [];

    orderedAnnotations.forEach((annotation) => {
      lyricsArray.push(
        <span className={classes.song_lyrics__no_anno}>
          {lyrics.slice(index, annotation.startIndex)}
        </span>
      );
      lyricsArray.push(
        <span
          className={classes.song_lyrics__anno}
          id={annotation.id}
          onClick={(e) => handleAnnotationClick(e)}
        >
          {lyrics.slice(annotation.startIndex, annotation.endIndex)}
        </span>
      );
      index = annotation.endIndex;
    });

    lyricsArray.push(
      <span className={classes.song_lyrics__no_anno}>
        {lyrics.slice(index, lyrics.length)}
      </span>
    );
    console.log(lyricsArray);

    return lyricsArray;
  };

  useEffect(() => {}, [setIsAnnotationOpen]);

  return (
    <Box className={classes.song_lyrics__container}>
      {annotateLyrics(lyrics, annotations)}
    </Box>
  );
};

export default SongLyrics;
