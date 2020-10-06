import React, { useState } from "react";
import "./../main.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch,
} from "react-router-dom";

// import { Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: 45,
  },
  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));
// console.log(firebase.database())

function AddArea(props) {
  const classes = useStyles();
  //   function register() {
  //     props.history.push("/signup");
  //   }
  // let [city, setCity] = useState("");
  let [area, setArea] = useState("");
  let [near, setnear] = useState("");
  let [slotKey, setSlotKey] = useState(
    firebase.database().ref('key').push().key
  );
  // console.log(area);
  // console.log(near);
  function addPark() {
    let parkObj = {
      userUid: props.User.uid,
      // city:city,
      area: area,
      near: near,
      parkingKey: slotKey,
     

    };
    firebase.database().ref('Parking').child(area).child(slotKey).set(parkObj);
  }

  return (
    <div>
      <div className="AddArea">
        <h2>Add Parking Slot In Different Areas</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <div className="AddAreaForm">
            {/* <TextField
              className="textField"
              required
              id="outlined-required"
              label="City"
              //   defaultValue="Hello World"
              variant="outlined"
              onChange={(event)=>{
                setCity(event.target.value)
              }}
            /> */}
            <TextField
              className="textField"
              required
              id="outlined-required"
              label="Area"
              //   defaultValue="Hello World"
              variant="outlined"
              onChange={(event) => {
                setArea(event.target.value);
              }}
            />
            <TextField
              className="textField"
              required
              id="outlined-required"
              label="Near"
              //   defaultValue="Hello World"
              variant="outlined"
              onChange={(event) => {
                setnear(event.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<AddCircleOutlineIcon />}
              onClick={(event) => addPark()}
            >
              ADD NOW
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(AddArea);
