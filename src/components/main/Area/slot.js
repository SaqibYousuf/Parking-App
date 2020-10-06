import React from "react";
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

import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";

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

function Slot(props) {
  const classes = useStyles();
  //   function register() {
  //     props.history.push("/signup");
  //   }
 
  return props.slots.map((a, i) => {
    console.log(Object.values(a)[i]);

    return (
      <div className="slot">
        <h5>Slot Available</h5>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<BookmarkIcon />}
          onClick={props.handleOpen}
        >
          Book Now
        </Button>
        <Modal
          className="Modal"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.open}
          onClose={props.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">BOOKING DETAIL</h2>
              <hr />
              <form className={classes.root} noValidate autoComplete="off">
                <div className="input">
                  <TextField
                    className="modalInput"
                    required
                    id="outlined-required"
                    label="From"
                    defaultValue=""
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      props.setSlotDateFrom(event.target.value);
                    }}
                  />
                     <TextField
                    className="modalInput"
                    required
                    id="outlined-required"
                    label="To"
                    defaultValue=""
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      props.setSlotDateTo(event.target.value);
                    }}
                  />
                </div>
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
                    onChange={(event) => {
                      props.setSlottimeFrom(event.target.value);
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
                    onChange={(event) => {
                      props.setSlottimeTo(event.target.value);
                    }}
                  />
                </div>
                <p className="modalName">
                  Near: <span>{a.near}</span>
                </p>
                <div className="modalButton">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<BookmarkIcon />}
                    onClick={() => [props.handleOpen, props.bookNow(a)]}
                  >
                    Book Now
                  </Button>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  });
}

export default withRouter(Slot);
