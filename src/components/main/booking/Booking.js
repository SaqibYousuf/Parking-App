import React, { useEffect, useState } from "react";
import "./../main.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import firebase from "firebase";

import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import BookedSlot from "./Bookslot";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: 45,
    color: red,
  },
}));

function Booking(props) {
  const classes = useStyles();
  //   function register() {
  //     props.history.push("/signup");
  //   }
  let [bookedSlot, setBookedSot] = useState("");
  useEffect(() => {
    firebase
      .database()
      .ref("Bookings")
      .on("value", function (data) {
        if(data.val()){
          setBookedSot(Object.values(data.val()));
        }
      });
  }, []);
  console.log(bookedSlot);
  function unbook(a) {
    console.log(a)
    // firebase
    //   .database()
    //   .ref("Parking")
    //   .child(a.area)
    //   .child(a.parkingKey)
    //   .update({
    //     Totime:"" ,
    //     area: a.area,
    //     bookerUid: "" ,
    //     bookingDate:"" ,
    //     from: "",
    //     near: a.near ,
    //     parkingKey: a.parkingKey ,
    //     status: "Available" ,
    //     userUid: a.userUid,
    //   });
  }

  return (
    <div>
      <div className="Area">
        <div className="ParkingAreas"></div>
        <div className="parkingSlots">
          <h2>Your Booked Slot</h2>
          <div className="parkSlot">
            {bookedSlot.length ? (
              <BookedSlot
                bookedSlot={bookedSlot}
                User={props.User}
                unbook={unbook}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Booking);
