import React from "react";
import { Router, Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./containers/Home";
import CreateRecord from "./containers/CreateRecord";

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <CreateRecord path="create" />
        <CreateRecord path="edit/:id" />
      </Router>
    </div>
  );
}

export default App;
