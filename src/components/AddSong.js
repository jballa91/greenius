import React from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import {
  Container,
  Typography,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import { ADD_SONG } from "../graphql/mutations";

const useStyles = makeStyles((theme) => ({
  add_song_form__page: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: "calc(100vw - 104px)",
    paddingTop: theme.spacing(2),
  },
  add_song_form: {
    color: "#FFF",
  },
  add_song_form__divider: {
    backgroundColor: "#FFF",
    opacity: ".08",
  },
  add_song_form__form: {
    margin: theme.spacing(3),
  },
  add_song_form__info_row: {
    width: "inherit",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  add_song_form__input: {
    color: "#FFF",
    borderColor: "#FFF",
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const AddSong = () => {
  const { user, loading } = useAuth0();
  const [addSong, newSong] = useMutation(ADD_SONG);

  const classes = useStyles();

  const onSubmit = () => {
    addSong();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.add_song_form__page}>
      <Container>
        <div className={classes.add_song_form}>
          <Typography variant="h3">Add Song</Typography>
          <div className={classes.add_song_form__info_row}>
            <Typography variant="h5">Primary Info</Typography>
            <Typography>* Required</Typography>
          </div>
          <Divider className={classes.add_song_form__divider} />
          <form className={classes.add_song_form__form}>
            <TextField
              required
              id="song-name-input"
              label="Song Title"
              variant="outlined"
              placeholder="What is this song called?"
              color="primary"
              autoComplete="off"
              className={classes.add_song_form__input}
            />
            <TextField
              required
              id="song-artist-input"
              label="Artist"
              variant="outlined"
              placeholder="Who performed this absolute banger?"
              color="primary"
              autoComplete="off"
              className={classes.add_song_form__input}
            />
            <TextField
              required
              id="song-lyrics-input"
              label="Lyrics"
              variant="outlined"
              placeholder="What words were used to drop this mad wisdom?"
              color="primary"
              autoComplete="off"
              multiline={true}
              rows="10"
              rowsMax="20"
              className={classes.add_song_form__input}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onSubmit}
              startIcon={<PlaylistAdd />}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddSong;
