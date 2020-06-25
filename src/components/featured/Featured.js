import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container, Box } from "@material-ui/core";

import FeaturedCard from "./FeaturedCard";

const useStyles = makeStyles((theme) => ({
  featured__container: {
    display: "Flex",
    flexDirection: "Column",
    alignItems: "center",
  },
}));

const ALL_SONGS = gql`
  query getSongsByDate {
    getSongsByDate {
      id
      name
      artist
      genre
      img
      lyrics
      likes
      dislikes
    }
  }
`;

const Featured = () => {
  const { user } = useAuth0();
  const { data, loading, error } = useQuery(ALL_SONGS);

  const classes = useStyles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error...</div>;

  return (
    <div className={classes.featured__page}>
      <Container className={classes.featured__container}>
        {data.getSongsByDate.map((song) => {
          return <FeaturedCard song={song} />;
        })}
      </Container>
    </div>
  );
};

export default Featured;
