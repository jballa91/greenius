import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
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

  const http = new HttpLink({ uri: "http://localhost:4000/graphql" });
  const delay = setContext(
    (request) =>
      new Promise((success, fail) => {
        setTimeout(() => {
          success();
        }, 800);
      })
  );

  const link = ApolloLink.from([delay, http]);
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
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
