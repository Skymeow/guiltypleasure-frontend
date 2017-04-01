import React from "react";
import ReactDom from "react-dom";
import {Route, Router, browserHistory} from "react-router";

import "./styles/normalize.css";
import "./styles/style.css";

import FoodResult from "./components/FoodResult/foodResult";
import Savedfood from "./components/Savedfood/Savedfood";
// import SignUp from "./components/SignUp/SignUp";
// import Login from "./components/Login/Login";

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/cravinglist" component={FoodResult} />
    <Route path="/users/dashboard" component={Savedfood} />

  </Router>
  ,document.getElementById("app")
);
