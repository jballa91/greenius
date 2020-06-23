import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "@apollo/link-context";

import { useAuth0 } from "./greenius-auth0-spa";
import React, { useState, useEffect } from "react";

function ApolloWrapper({ children }) {
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getTokenSilently() : "";
      setBearerToken(token);
    };
    getToken();
  }, [getTokenSilently, isAuthenticated]);

  const link = new HttpLink({ uri: "http://localhost:4000/graphql" });
  const cache = new InMemoryCache();

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) return { headers, ...rest };

    return {
      ...rest,
      headers: {
        ...headers,
        authorization: `Bearer ${bearerToken}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(link),
    cache,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
