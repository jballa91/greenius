import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container } from "@material-ui/core";

import Loader from "./Loader";
import SongCard from "./SongCard";

const useStyles = makeStyles((theme) => ({
  featured__container: {
    display: "Flex",
    flexDirection: "Column",
    alignItems: "center",
  },
}));

const ALL_SONGS = gql`
  query getSongsByPop {
    getSongsByPop {
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
    }
  }
`;

const Charts = () => {
  const { data, loading, error, refetch } = useQuery(ALL_SONGS);

  const classes = useStyles();
  useEffect(() => {
    refetch();
  });

  if (loading) return <Loader />;
  if (error) return <div>error...</div>;

  return (
    <div className={classes.featured__page}>
      <Container className={classes.featured__container}>
        {data.getSongsByPop.map((song) => {
          return <SongCard refetch={refetch} song={song} />;
        })}
      </Container>
    </div>
  );
};

export default Charts;
