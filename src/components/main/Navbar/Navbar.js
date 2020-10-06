import React from "react";
import "./../main.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import firebase from "firebase";
// import Area from "./Area/Area";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: 45,
  },
}));

function Navbar(props) {
  const classes = useStyles();
  //   function register() {
  //     props.history.push("/signup");
  //   }
  function SignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        props.history.push("/");
        props.setUser([]);
      })
      .catch(function (error) {
        // An error happened.
      });
  }
  //  console.log(props.User)

  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="navHead">
            <h6>Parking Application</h6>
          </div>
          <div className="navs">
            {/* <div className="navLink">
              <i class="fas fa-map"></i>
              <p>Areas</p>
            </div> */}
            <div
              onClick={() => {
                props.history.push("/main");
              }}
              className="navLink"
            >
              <i class="fas fa-parking"></i>
              <p>Parkings</p>
            </div>
            <div
              onClick={() => {
                props.history.push("/booking");
              }}
              className="navLink"
            >
              <i class="fas fa-bookmark"></i>
              <p>Your Bookings</p>
            </div>
            <div onClick={()=>{
              props.history.push("/feedback")
            }} className="navLink">
            <i class="fas fa-comments"></i>
              <p>Feedbacks</p>
            </div>
            {props.User.email === "admin@admin.com" ? (
              <>
                <div
                  onClick={() => {
                    props.history.push("/users");
                  }}
                  className="navLink"
                >
                  <i class="fas fa-users"></i>
                  <p>Users</p>
                </div>
                <div
                  onClick={() => {
                    props.history.push("/add-area");
                  }}
                  className="navLink"
                >
                  <i class="fas fa-map-marked-alt"></i>
                  <p>Add Location</p>
                </div>
              </>
            ) : null}
          </div>
          <div onClick={() => SignOut()} className="signOut">
            <div className="navLink">
              <i class="fas fa-sign-out-alt"></i>
              <p>Sign Out</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
