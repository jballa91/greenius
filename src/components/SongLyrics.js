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
    whiteSpace: "pre-wrap",
    backgroundColor: theme.palette.secondary.light,
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
  setIsNewAnnotationOpen,
  setSelection,
}) => {
  const classes = useStyles();

  const handleAnnotationClick = (e) => {
    e.preventDefault();
    setIsAnnotationOpen(true);
    setOpenAnnotation(e.target.id);
  };

  const findOffset = (ele) => {
    let offset = 0;
    while (ele.previousSibling) {
      offset += ele.previousSibling.textContent.length;
      ele = ele.previousSibling;
    }
    return offset;
  };

  const isValidAnnotation = (range, annotations) => {
    let valid = true;
    if (range[1] - range[0] <= 0) {
      valid = false;
    }
    annotations.forEach((annotation) => {
      if (
        range[0] <= annotation.endIndex &&
        annotation.startIndex <= range[1]
      ) {
        valid = false;
      }
    });
    console.log("VALID", valid);

    return valid;
  };

  const handleSelection = (e) => {
    let parent = document.getSelection().anchorNode.parentElement;
    let start = document.getSelection().anchorOffset;
    let end = document.getSelection().focusOffset;

    if (end < start) {
      let temp = start;
      start = end;
      end = temp;
    }
    console.log("START", start);
    console.log("END", end);

    let offset = findOffset(parent);
    let range = [start + offset, end + offset];
    console.log("RANGE", range);

    if (isValidAnnotation(range, annotations)) {
      setIsAnnotationOpen(false);
      setSelection({ start: range[0], end: range[1] });
      setIsNewAnnotationOpen(true);
    } else {
      setIsNewAnnotationOpen(false);
      return;
    }
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

  useEffect(() => {
    annotateLyrics(lyrics, annotations);
  }, [setIsAnnotationOpen, annotations]);

  return (
    <p className={classes.song_lyrics__container} onMouseUp={handleSelection}>
      {annotateLyrics(lyrics, annotations)}
    </p>
  );
};

export default SongLyrics;
