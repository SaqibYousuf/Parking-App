import React, { useEffect, useState } from "react";
import "./../main.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import StorageIcon from "@material-ui/icons/Storage";
import TextField from "@material-ui/core/TextField";
import Slot from "./slot";
import firebase from "firebase";
import Options from "./Option";

import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import slot from "./slot";
import userEvent from "@testing-library/user-event";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: 45,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 400,
    height: 400,
    display: "flex",
    // justifyContent: "space-between",
    flexDirection: "column",
  },
  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

function Area(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // setUser(user);
        console.log(user);
      } else {
        props.history.push("/");
        // No user is signed in.
      }
    });
  }, []);
  const classes = useStyles();
  //   function register() {
  //     props.history.push("/signup");
  //   }
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  let [areas, setAreas] = useState("");
  let [filterArea, setfilterArea] = useState("");
  // console.log(filterArea)
  useEffect(() => {
    firebase
      .database()
      .ref("Parking")
      .on("value", function (data) {
        if (data.val()) {
          setAreas(Object.keys(data.val()));
        }
      });
  }, []);
  console.log(areas);
  let [slots, setSlots] = useState("");
  useEffect(() => {
    if (filterArea) {
      firebase
        .database()
        .ref("Parking")
        .child(filterArea)
        .on("value", function (data) {
          if (data.val()) {
            setSlots(Object.values(data.val()));
          }
        });
    }
  }, [filterArea]);
  console.log(slots);
  let [booking, setbooking] = useState("");
  useEffect(() => {
    firebase
      .database()
      .ref("Bookings")
      .on("value", function (data) {
        if (data.val()) {
          setbooking(data.val());
          console.log(Object.values(data.val()));
        }
      });
  }, []);
  let [slotTimeTo, setSlottimeTo] = useState("");
  let [slotTimeFrom, setSlottimeFrom] = useState("");
  let [slotDateFrom, setSlotDateFrom] = useState("");
  let [slotDateTo, setSlotDateTo] = useState("");
  // console.log(slotTimeTo)
  // console.log(slotTimeFrom)
  // console.log(slotDateFrom)
  // console.log(slots)
  // console.log(Object.values(booking).length);
  // if ("2020-10-02" < slotDateFrom) {
  //   console.log(slotDateFrom);
  // }
  function bookNow(a) {
    // console.log(a)
    for (let j = 0; j < Object.values(booking).length; j++) {
      if (
        ((slotTimeFrom >= Object.values(booking)[j].from &&
          slotTimeFrom <= Object.values(booking)[j].Totime) &&
         ( (slotDateFrom >= Object.values(booking)[j].FromDate) &&
          slotDateFrom <= Object.values(booking)[j].ToDate)) &&
          a.area ===  Object.values(booking)[j].area
          ||
          ((slotTimeFrom <= Object.values(booking)[j].from &&
          slotTimeFrom >= Object.values(booking)[j].Totime) &&
         ( slotDateFrom <= Object.values(booking)[j].FromDate &&
          slotDateFrom <= Object.values(booking)[j].ToDate))&&
          a.area ===  Object.values(booking)[j].area
          ||
          ((slotTimeTo >= Object.values(booking)[j].Totime &&
          slotTimeFrom <= Object.values(booking)[j].Totime) &&
         ( slotDateFrom <= Object.values(booking)[j].FromDate &&
          slotDateFrom <= Object.values(booking)[j].ToDate))&&
          a.area ===  Object.values(booking)[j].area
          ||
          ((slotTimeFrom <= Object.values(booking)[j].from &&
          slotTimeTo >= Object.values(booking)[j].from) &&
         ( slotDateFrom >= Object.values(booking)[j].FromDate &&
          slotDateFrom <= Object.values(booking)[j].ToDate))&&
          a.area ===  Object.values(booking)[j].area
          
      ) {
        alert("already Booked")
        return
      }

      // console.log(Object.values(booking)[j].from);
      // if (
      //   (slotDateFrom >= Object.values(booking)[j].FromDate &&
      //     slotDateTo <= Object.values(booking)[j].ToDate) ||
      //   (slotDateFrom <= Object.values(booking)[j].FromDate &&
      //     slotDateTo >= Object.values(booking)[j].ToDate) ||
      //   (slotDateFrom >= Object.values(booking)[j].FromDate &&
      //     slotDateTo >= Object.values(booking)[j].ToDate) ||
      //   (slotDateFrom <= Object.values(booking)[j].FromDate &&
      //     slotDateTo <= Object.values(booking)[j].ToDate)
      // ) {
      //   if (
      //     (slotTimeFrom >= Object.values(booking)[j].from &&
      //       slotTimeTo <= Object.values(booking)[j].Totime &&
      //       (slotDateFrom >= Object.values(booking)[j].FromDate ||
      //         slotDateTo <= Object.values(booking)[j].ToDate ||
      //         slotDateFrom <= Object.values(booking)[j].FromDate ||
      //         slotDateTo >= Object.values(booking)[j].ToDate))
      //          ||
      //     (slotTimeFrom <= Object.values(booking)[j].from &&
      //       slotTimeTo >= Object.values(booking)[j].Totime &&
      //       (slotDateFrom >= Object.values(booking)[j].FromDate ||
      //         slotDateTo <= Object.values(booking)[j].ToDate ||
      //         slotDateFrom <= Object.values(booking)[j].FromDate ||
      //         slotDateTo >= Object.values(booking)[j].ToDate))
      //         ||
      //     (slotTimeFrom <= Object.values(booking)[j].from &&
      //       slotTimeTo <= Object.values(booking)[j].from &&
      //       (slotDateFrom >= Object.values(booking)[j].FromDate ||
      //         slotDateTo <= Object.values(booking)[j].ToDate))
      //          ||
      //     (slotTimeFrom >= Object.values(booking)[j].from &&
      //       slotTimeTo >= Object.values(booking)[j].from &&
      //       (slotDateFrom > Object.values(booking)[j].FromDate &&
      //         slotDateTo < Object.values(booking)[j].ToDate))

      //     // (slotTimeFrom >= Object.values(booking)[j].from &&
      //     //   slotTimeTo >= Object.values(booking)[j].Totime) ||
      //     //   (slotTimeFrom <= Object.values(booking)[j].from &&
      //     //   slotTimeTo <= Object.values(booking)[j].Totime)
      //   ) {
      //     alert("already booked timining");
      //     return;
      //   }
      // }
    }
    // for (let i = 0; i < Object.keys(booking).length; i++) {
    //   if (
    //     Object.keys(booking)[i] ===
    //     `${slotDateFrom}-${slotTimeFrom}-${slotTimeTo}-${a.area}`
    //   ) {
    //     //  && (slotTimeFrom >= a.from)
    //     alert("already Booked");
    //     return;
    //   }
    // }

    // for(let i = 0; i < bookingKeys.length; i++){
    // }
    firebase
      .database()
      .ref("Bookings")
      .child(`${slotDateFrom}-${slotTimeFrom}-${slotTimeTo}-${a.area}`)
      .set({
        area: a.area,
        near: a.near,
        parkingKey: a.parkingKey,
        status: "Booked",
        bookerUid: props.User.uid,
        Totime: slotTimeTo,
        from: slotTimeFrom,
        FromDate: slotDateFrom,
        ToDate: slotDateTo,
      })
      .then(() => {
        console.log("booked");
      });
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }
  return (
    <div>
      <div className="Area">
        <div className="ParkingAreas">
          <div className="search">
            <select
              onChange={(event) => {
                setfilterArea(event.target.value);
              }}
              className="locationSelect"
            >
              {areas.length ? <Options areas={areas} /> : null}
            </select>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SearchIcon />}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="parkingSlots">
          <h2>Book Your Slots</h2>
          <div className="parkSlot">
            {slots.length ? (
              <Slot
                slots={slots}
                setSlottimeTo={setSlottimeTo}
                setSlottimeFrom={setSlottimeFrom}
                setSlotDateFrom={setSlotDateFrom}
                bookNow={bookNow}
                setSlotDateTo={setSlotDateTo}
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={open}
              />
            ) : null}
            {/* <div className="slot">
              <h5>Slot Available</h5>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<BookmarkIcon />}
                onClick={handleOpen}
              >
                Book Now
              </Button>
              <Modal
                className="Modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">BOOKING DETAIL</h2>
                    <hr />
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        className="modalInput"
                        required
                        id="outlined-required"
                        label="Date"
                        defaultValue=""
                        type="date"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div className="input">
                        <TextField
                          className="modalInput"
                          required
                          id="outlined-required"
                          label="from"
                          defaultValue=""
                          type="time"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          className="modalInput"
                          required
                          id="outlined-required"
                          label="to"
                          defaultValue=""
                          type="time"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div className="modalButton">
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<BookmarkIcon />}
                          onClick={handleOpen}
                        >
                          Book Now
                        </Button>
                      </div>
                    </form>
                  </div>
                </Fade>
              </Modal>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Area);
