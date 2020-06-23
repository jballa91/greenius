import React, { Fragment, useEffect } from "react";
import { useAuth0 } from "../greenius-auth0-spa";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ALL_ARTISTS = gql`
  {
    getArtists {
      id
      name
      genre
    }
  }
`;

const ADD_ARTIST = gql`
  mutation {
    addArtist(name: "Andre 3k", genre: "Hip Hop") {
      id
      name
      genre
    }
  }
`;

const Profile = () => {
  const { user } = useAuth0();
  const { data, loading, error } = useQuery(ALL_ARTISTS);
  const [addArtist, newArtist] = useMutation(ADD_ARTIST);

  if (loading || !user || newArtist.loading) {
    return <div>Loading...</div>;
  }

  const onClick = () => {
    addArtist({
      name: "J. Cole",
      genre: "Hip Hop",
    });
  };

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
      {data.getArtists.map((artist) => {
        return (
          <div>
            <h2>{artist.id}</h2>
            <h3>{artist.name}</h3>
            <h4>{artist.genre}</h4>
          </div>
        );
      })}
      <button onClick={onClick}>Add J. Cole</button>
    </Fragment>
  );
};

export default Profile;
