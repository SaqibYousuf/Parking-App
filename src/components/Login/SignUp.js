import React, { useEffect, useState } from "react";
import "./login.scss";
// import backgroundPic from './../Images/background.jpg'
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SignIn from "./SignIn";
import { Switch } from "@material-ui/core";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      margin: theme.spacing(1),
    },
  },
}));

function SignUp(props) {
  const classes = useStyles();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // setUser(user)
        // props.history.push("/main")
        console.log(user);
      } else {
        // No user is signed in.
      }
    });
  }, []);
  let [firstName, setFirstName] = useState("");
  let [LastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  var user = firebase.auth().currentUser;
  let [key, setKey] = useState(firebase.database().ref('students').push().key);

  function SignUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let userObj = {
          firstname: firstName,
          lastname: LastName,
          email: email,
          key:key
        };
        firebase.database().ref("Users").child(key).set(userObj);
      })
      .then(() => {
        props.history.push("/main");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    // user.updateProfile({
    //   displayName: `${firstName} ${LastName}`,
    //   // photoURL: "https://example.com/jane-q-user/profile.jpg"
    // }).then(function() {
    //

    // }).catch(function(error) {
    //   // An error happened.
    // });
    // // console.log(user)
  }
  function backSignIn() {
    props.history.push("/");
  }
  console.log(user);

  return (
    <div className="LoginBody">
      <h2>Parking Application</h2>
      <div className="Login">
        <div className="lottiediv">
          <lottie-player
            className="loginLottie"
            src="https://assets8.lottiefiles.com/packages/lf20_CbDIkR.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>

        <div className="loginInput">
          <h3>Sign Up</h3>
          <div className="signupField">
            <TextField
              className="input name"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <TextField
              className="input name"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <TextField
              className="input"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              className="input"
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className="btndiv">
              <p>
                Already Have an account?{" "}
                <span onClick={() => backSignIn()}>Sing In Now</span>
              </p>{" "}
              <Button variant="contained" onClick={() => SignUp()}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
