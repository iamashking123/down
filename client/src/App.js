import React from "react";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import AnimeView from "./components/AnimeView";
import VideoView from "./components/VideoView";

import "./App.css";
import Test from "./Test";

export default function App() {
  return (
    <>
      <Test />
    </>
    // <Switch>
    //   <Route exact path="/" component={Home} />
    //   <Route exact path="/video" component={VideoView} />
    //   <Route exact path="/anime" component={AnimeView} />
    // </Switch>
  );
}
