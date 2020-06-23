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
