import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 100,
    color: "#FFF",
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loader;
