import React, { useEffect, useState } from "react";
import "./../main.scss";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: 45,
    color: red,
  },
}));

function BookedSlot(props) {
  const classes = useStyles();
  return Object.values(Object.values(props.bookedSlot)).map((a, i) => {
      console.log(a.bookerUid)
      // console.log(Object.values(Object.values(a)))
    return a.bookerUid === props.User.uid ? (
      <div className="slot">
        <h5>Slot Booked at {a.area}</h5>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<HighlightOffIcon />}
          onClick={()=>props.unbook(a)}
        >
          UNBOOK NOW
        </Button>
      </div>
    ):null;
  });
}
export default BookedSlot;
