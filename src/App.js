import React from "react";
import NavBar from "./components/NavBar";

// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";

import Featured from "./components/featured/Featured";
import Profile from "./components/Profile";
import AddSong from "./components/AddSong";
import SongPage from "./components/SongPage";

function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/songs/:id" component={SongPage} />
          <PrivateRoute path="/featured" component={Featured} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/add-song" component={AddSong} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
