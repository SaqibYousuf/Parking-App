import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import firebase from "firebase";
import { firebaseConfig } from "./config";

// import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";
// import Login from "./components/Login/Login";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import UserData from "./components/main/Users/UserData";
import Area from "./components/main/Area/Area";
import Booking from "./components/main/booking/Booking";
import AddArea from "./components/main/AddArea/AddArea";
import Navbar from "./components/main/Navbar/Navbar";
import Feedback from "./components/main/feedback/Feedback";
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App(props) {
  let [User, setUser] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
        // props.history.push("/main")
        console.log(user);
      } else {
        // No user is signed in.
      }
    });
  }, []);
  console.log(User);
  useEffect(() => {
    // firebase
  }, []);
  return (
    <Router>
      {/* <div> */}
      {/* <Switch> */}
      {User ? (
        <Navbar setUser={setUser} User={User} />
      ) : (
        [User === [] ? null : null]
      )}

      <Route
        path="/"
        exact
        component={() => {
          return <SignIn />;
        }}
      />
      <Route
        path="/signup"
        exact
        component={() => {
          return <SignUp />;
        }}
      />
      {/* <Route
        path="/main"
        exact
        component={() => {
          return <Main />;
        }}
      /> */}
      <Route
        path="/main"
        exact
        component={() => {
          return <Area User={User} />;
        }}
      />
      <Route
        path="/booking"
        exact
        component={() => {
          return <Booking User={User} />;
        }}
      />
      <Route
        path="/add-area"
        exact
        component={() => {
          return <AddArea User={User} />;
        }}
      />
      <Route
        path="/users"
        exact
        component={() => {
          return <UserData />;
        }}
      />
          <Route
        path="/feedback"
        exact
        component={() => {
          return <Feedback User={User}/>;
        }}
      />

      {/* </Switch>
    </div> */}
    </Router>
  );
}

export default App;
