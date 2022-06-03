import React from "react";
import logo from './logo.svg';
import './App.css';

import {Route} from "react-router-dom";
import Main from "./Main";
import Nav from "./Nav";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <Nav />
      <Route path="/" component={Main} exact/>
      <Route path="/signup" component={Signup} exact/>
      <Route path="/login" component={Login} exact/>
    </div>
  );
}



export default App;