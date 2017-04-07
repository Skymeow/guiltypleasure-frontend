import React from "react";
import ReactDom from "react-dom";
import {Route, Router, browserHistory} from "react-router";

import "./styles/normalize.css";
import "./styles/style.css";
import "./vendors/font-awesome/css/font-awesome.css";

import FoodResult from "./components/FoodResult/foodResult";
import Savedfood from "./components/Savedfood/Savedfood";


ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={FoodResult} />
    <Route path="/users/dashboard" component={Savedfood} />
  </Router>
  ,document.getElementById("app")
);
