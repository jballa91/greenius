import gql from "graphql-tag";
// const [addArtist, newArtist] = useMutation(ADD_ARTIST);
const ADD_ARTIST = gql`
  mutation {
    addArtist(name: "Andre 3k", genre: "Hip Hop") {
      id
      name
      genre
    }
  }
`;

export const ADD_SONG = gql`
  mutation {
    addSong(
      name: "Lockdown"
      lyrics: "asdfasdfasdf;lkjasdl;ksadflkjsfadklj;fsadlkj;sfadlk;asfdlkj;asdf"
      artist: "Anderson .paak"
      genre: "Hip Hop"
    ) {
      name
      lyrics
      artist
      genre
    }
  }
`;
