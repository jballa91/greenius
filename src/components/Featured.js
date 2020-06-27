import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container } from "@material-ui/core";

import SongCard from "./SongCard";

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
  const { data, loading, error } = useQuery(ALL_SONGS);

  const classes = useStyles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error...</div>;

  return (
    <div className={classes.featured__page}>
      <Container className={classes.featured__container}>
        {data.getSongsByDate.map((song) => {
          return <SongCard song={song} />;
        })}
      </Container>
    </div>
  );
};

export default Featured;
