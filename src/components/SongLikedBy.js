import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  liked_by: {
    marginLeft: theme.spacing(4),
  },
}));

const SongLikedBy = (props) => {
  const classes = useStyles();
  const [likedBy, setLikedBy] = useState([]);

  useEffect(() => {
    setLikedBy(props.likedBy);
  }, [props]);

  if (likedBy.length === 1) {
    return (
      <Typography className={classes.liked_by}>
        {likedBy[0]} thinks this song is Fire.
      </Typography>
    );
  } else if (likedBy.length === 2) {
    return (
      <Typography className={classes.liked_by}>
        {likedBy[0]} and {likedBy[1]} think this song is Fire.
      </Typography>
    );
  } else if (likedBy.length === 3) {
    return (
      <Typography className={classes.liked_by}>
        {likedBy[0]}, {likedBy[1]}, and {likedBy[2]} think this song is Fire.
      </Typography>
    );
  } else {
    return (
      <Typography className={classes.liked_by}>
        {likedBy[0]}, {likedBy[1]}, and {likedBy.length - 2} others thing this
        song is Fire.
      </Typography>
    );
  }
};

export default SongLikedBy;
