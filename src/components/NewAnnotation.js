import React, { useState, useEffect } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Typography, Box, TextField, Button } from "@material-ui/core";

import ChildCareIcon from "@material-ui/icons/ChildCare";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";

const useStyles = makeStyles((theme) => ({
  new_annotation__container: {
    width: "347px",
  },
  new_annotation__form: {
    width: "inherit",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  new_annotation__form_input: {
    width: "inherit",
    marginBottom: theme.spacing(1),
  },
  new_annotation__buttons: {
    width: "inherit",
    display: "flex",
    justifyContent: "space-between",
  },
  new_annotation__form_cancel: {
    fontSize: "10px",
    backgroundColor: theme.palette.warning.main,
  },
}));

const ADD_ANNOTATION = gql`
  mutation addAnnotation($newAnnotation: NewAnnotationInput!) {
    addAnnotation(input: $newAnnotation) {
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
`;

const NewAnnotation = ({
  setIsNewAnnotationOpen,
  songId,
  selection,
  refetch,
}) => {
  const { user } = useAuth0();
  const classes = useStyles();
  const [addAnnotation, newAnnotation] = useMutation(ADD_ANNOTATION);
  const [newAnnotationContent, setNewAnnotationContent] = useState("");

  const handleContentChange = (e) => {
    setNewAnnotationContent(e.target.value);
  };

  const onCancel = () => {
    setIsNewAnnotationOpen(false);
  };

  const onSubmit = () => {
    if (!user) return;
    console.log(
      "INPUT",
      selection.start,
      selection.end,
      newAnnotationContent,
      songId,
      user.nickname
    );

    addAnnotation({
      variables: {
        newAnnotation: {
          startIndex: selection.start,
          endIndex: selection.end,
          content: newAnnotationContent,
          likes: 0,
          dislikes: 0,
          songId: songId,
          postedBy: user.nickname,
          likedBy: [],
          dislikedBy: [],
        },
      },
    });
    refetch();
    setIsNewAnnotationOpen(false);
  };

  return (
    <Box className={classes.new_annotation__container}>
      <form className={classes.new_annotation__form}>
        <TextField
          required
          id="new-annotation-form-input"
          label="Drop Some Knowledge"
          variant="outlined"
          placeholder="Dunk on these fools"
          autoComplete="off"
          multiline={true}
          rows="5"
          rowsMax="12"
          className={classes.new_annotation__form_input}
          onChange={(e) => handleContentChange(e)}
        />
        <Box className={classes.new_annotation__buttons}>
          <Button
            variant="contained"
            className={classes.new_annotation__form_cancel}
            onClick={onCancel}
            startIcon={<ChildCareIcon />}
          >
            Stutter and fall flat
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.new_annotation__form_submit}
            onClick={onSubmit}
            startIcon={<SportsHandballIcon />}
          >
            Dunk on 'em
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewAnnotation;
