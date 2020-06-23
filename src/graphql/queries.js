import gql from "graphql-tag";
//  const { data, loading, error } = useQuery(ALL_ARTISTS);
const ALL_ARTISTS = gql`
  {
    getArtists {
      id
      name
      genre
    }
  }
`;
