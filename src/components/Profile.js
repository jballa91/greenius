import React, { Fragment, useEffect } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profile: {
    width: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profile__pic: {
    height: "200px",
    width: "180px",
  },
  profile__info: {
    width: "fit-content",
  },
}));

const Profile = () => {
  const { user, loading } = useAuth0();
  const classes = useStyles();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className={classes.profile}>
        <img
          className={classes.profile__pic}
          src={user.picture}
          alt="Profile"
        />
        <Typography className={classes.profile__info} variant="h1">
          {user.name}
        </Typography>
        <Typography className={classes.profile__info} variant="h3">
          {user.email}
        </Typography>
      </div>
    </Container>
  );
};

export default Profile;
