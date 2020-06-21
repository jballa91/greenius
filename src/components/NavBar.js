import React from "react";
import { Link } from "react-router-dom";

import { useAuth0 } from "../greenius-auth0-spa.js";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </span>
      )}
    </div>
  );
};

export default NavBar;
