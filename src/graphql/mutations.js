import gql from "graphql-tag";
// const [addArtist, newArtist] = useMutation(ADD_ARTIST);
// const ADD_ARTIST = gql`
//   mutation {
//     addArtist(name: "Andre 3k", genre: "Hip Hop") {
//       id
//       name
//       genre
//     }
//   }
// `;

export const ADD_SONG = gql`
  mutation addSong {
    addSong(
      input: {
        name: "War Pigs"
        artist: "Led Zeppelin"
        genre: "Rock"
        lyrics: "Generals gather in their masses..."
        likes: 0
        dislikes: 0
      }
    ) {
      id
      name
      artist
      genre
      lyrics
      likes
      dislikes
    }
  }
`;
