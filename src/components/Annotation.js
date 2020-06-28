import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Box, Typography, Divider, IconButton } from "@material-ui/core";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";

import Loader from "./Loader";
import LikeSuiteComment from "./LikeSuiteComment";

const useStyles = makeStyles((theme) => ({
  annotation__container: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.secondary.light,
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    width: "347px",
  },
  annotation__header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  header__icon_name: {
    display: "flex",
  },
  child_care_icon: {
    color: theme.palette.info.main,
  },
  header__name: {
    marginLeft: theme.spacing(2),
  },
  annotation__content_container: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  annotation__icon_content: {
    display: "flex",
  },
  annotation__content: {
    whiteSpace: "pre-wrap",
    marginLeft: theme.spacing(1),
  },
  annotation__like_suite_container: {
    display: "flex",
    width: "inherit",
    justifyContent: "flex-end",
  },
}));

// const GET_ANNOTATION = gql``;

const Annotation = ({ annotation, setOpenAnnotation, setIsAnnotationOpen }) => {
  const classes = useStyles();
  const likes = annotation.likes;
  const dislikes = annotation.dislikes;

  const handleClose = (e) => {
    e.preventDefault();
    setOpenAnnotation({});
    setIsAnnotationOpen(false);
  };

  return (
    <Box className={classes.annotation__container}>
      <Box className={classes.annotation__header}>
        <Box className={classes.header__icon_name}>
          {likes - dislikes >= 100 ? (
            <SportsHandballIcon color="error" />
          ) : (
            <Box className={classes.child_care_icon}>
              <ChildCareIcon />
            </Box>
          )}
          <Typography className={classes.header__name}>
            {annotation.postedBy}
          </Typography>
        </Box>
        <CloseIcon onClick={(e) => handleClose(e)} />
      </Box>
      <Divider />
      <Box className={classes.annotation__content_container}>
        <Box className={classes.annotation__icon_content}>
          <InfoIcon color="primary" />
          <Typography className={classes.annotation__content} component="pre">
            {annotation.content}
          </Typography>
        </Box>
        <Box className={classes.annotation__like_suite_container}>
          <LikeSuiteComment
            className={classes.like_suite}
            comment={annotation}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Annotation;
