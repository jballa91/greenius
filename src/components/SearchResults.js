import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container, Typography, Box } from "@material-ui/core";

import Loader from "./Loader";
import SongCard from "./SongCard";

const useStyles = makeStyles((theme) => ({
  search_results__page: {
    backgroundColor: theme.palette.secondary.light,
    minHeight: "calc(100vh - 84px)",
  },
  search_results__container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  search_results__songs_name: {
    width: "50%",
    display: "column",
    marginTop: theme.spacing(2),
    color: "#FFF",
  },
  search_results__songs_artist: {
    width: "50%",
    display: "column",
    marginTop: theme.spacing(2),
    color: "#FFF",
  },
  search_results__song_card: {
    width: "75%",
  },
  search_results__no_results: {
    marginTop: "11px",
  },
}));

const SONGS_NAME = gql`
  query getSongsSearchName($search: String!) {
    getSongsSearchName(name: $search) {
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

const SONGS_ARTIST = gql`
  query getSongsSearchArtist($search: String!) {
    getSongsSearchArtist(artist: $search) {
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

const SearchResults = (props) => {
  const searchString = props.match.params.string;
  console.log(searchString);

  const NAME = useQuery(SONGS_NAME, {
    variables: { search: searchString },
  });

  const ARTIST = useQuery(SONGS_ARTIST, {
    variables: { search: searchString },
  });

  const classes = useStyles();
  useEffect(() => {
    NAME.refetch();
    ARTIST.refetch();
  });

  if (NAME.loading || ARTIST.loading) return <Loader />;
  if (NAME.error || ARTIST.error) return <div>error...</div>;

  return (
    <Box className={classes.search_results__page}>
      <Container className={classes.search_results__container}>
        <Box className={classes.search_results__songs_name}>
          <Typography variant="h3">Songs</Typography>
          <Box className={classes.search_results__song_card}>
            {NAME.data.getSongsSearchName.length > 0 ? (
              NAME.data.getSongsSearchName.map((song) => {
                return <SongCard refetch={ARTIST.refetch} song={song} />;
              })
            ) : (
              <Typography className={classes.search_results__no_results}>
                No results found...
              </Typography>
            )}
          </Box>
        </Box>
        <Box className={classes.search_results__songs_artist}>
          <Typography variant="h3">Artists</Typography>
          <Box className={classes.search_results__song_card}>
            {ARTIST.data.getSongsSearchArtist.length > 0 ? (
              ARTIST.data.getSongsSearchArtist.map((song) => {
                return <SongCard refetch={NAME.refetch} song={song} />;
              })
            ) : (
              <Typography className={classes.search_results__no_results}>
                No results found...
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchResults;
