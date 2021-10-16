import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, ThreadDetails, NewThread } from "./components";

import "./App.css";

class App extends Component {
  
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <BrowserRouter>
          <Switch>
            <Route path="/new-thread">
              <NewThread />
            </Route>
            <Route path="/thread-detail">
              <ThreadDetails />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
