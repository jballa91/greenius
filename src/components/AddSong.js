import React, { useState } from "react";
import { useAuth0 } from "../greenius-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Container,
  Typography,
  Divider,
  TextField,
  Button,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
} from "@material-ui/core";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";

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
  add_song_form__radio_group: {
    flexDirection: "column",
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

const ADD_SONG = gql`
  mutation addSong($newSong: NewSongInput!) {
    addSong(input: $newSong) {
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

const AddSong = () => {
  const { user, loading } = useAuth0();
  const [addSong, newSong] = useMutation(ADD_SONG);

  const [songName, setSongName] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songImg, setSongImg] = useState("");
  const [songLyrics, setSongLyrics] = useState("");
  const [songGenre, setSongGenre] = useState("POP");

  const classes = useStyles();

  const changeName = (e) => {
    setSongName(e.target.value);
  };
  const changeArtist = (e) => {
    setSongArtist(e.target.value);
  };
  const changeImg = (e) => {
    setSongImg(e.target.value);
  };
  const changeLyrics = (e) => {
    setSongLyrics(e.target.value);
  };
  const changeGenre = (e) => {
    setSongGenre(e.target.value);
  };

  const onSubmit = async () => {
    await addSong({
      variables: {
        newSong: {
          name: songName,
          artist: songArtist,
          genre: songGenre,
          img: songImg,
          lyrics: songLyrics.split("\n"),
          likes: 0,
          dislikes: 0,
        },
      },
    });
  };

  if (loading || newSong.loading) {
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
              onChange={(e) => changeName(e)}
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
              onChange={(e) => changeArtist(e)}
            />
            <TextField
              required
              id="song-img-input"
              label="Album Artwork Url"
              variant="outlined"
              placeholder="What's the packaging on this wax look like?"
              color="primary"
              autoComplete="off"
              className={classes.add_song_form__input}
              onChange={(e) => changeImg(e)}
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
              onChange={(e) => changeLyrics(e)}
            />
            <FormControl component="fieldset" required>
              <FormLabel component="legend">Genre</FormLabel>
              <RadioGroup
                aria-label="genre"
                name="genre"
                className={classes.add_song_form__radio_group}
                value={songGenre}
                onChange={changeGenre}
                defaultValue={songGenre}
              >
                <div className={classes.add_song_form__radio_sub_group}>
                  <FormControlLabel
                    value="POP"
                    control={<Radio color="primary" />}
                    label="Pop"
                  />
                  <FormControlLabel
                    value="HIPHOP"
                    control={<Radio color="primary" />}
                    label="Hip Hop"
                  />
                  <FormControlLabel
                    value="ALT"
                    control={<Radio color="primary" />}
                    label="Alternative"
                  />
                  <FormControlLabel
                    value="ROCK"
                    control={<Radio color="primary" />}
                    label="Rock"
                  />
                </div>
                <div className={classes.add_song_form__radio_sub_group}>
                  <FormControlLabel
                    value="RB"
                    control={<Radio color="primary" />}
                    label="R&B"
                  />
                  <FormControlLabel
                    value="JAZZ"
                    control={<Radio color="primary" />}
                    label="Jazz"
                  />
                  <FormControlLabel
                    value="COUNTRY"
                    control={<Radio color="primary" />}
                    label="Country"
                  />
                  <FormControlLabel
                    value="NON"
                    control={<Radio color="primary" />}
                    label="Non-Music"
                  />
                </div>
              </RadioGroup>
            </FormControl>
            <br></br>
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
