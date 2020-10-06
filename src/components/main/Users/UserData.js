import React, { useEffect, useState } from "react";
import "./../main.scss";
import { makeStyles } from "@material-ui/core/styles";

// import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
// import SearchIcon from "@material-ui/icons/Search";
// import BookmarkIcon from "@material-ui/icons/Bookmark";
// import TextField from "@material-ui/core/TextField";
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// user
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";
// import StorageIcon from "@material-ui/icons/Storage";
// user

import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch,
} from "react-router-dom";
import firebase from "firebase";
// import Area from "../Area/Area";
// import Navbar from "../Navbar/Navbar";
// import Booking from "../booking/Booking";
// import AddArea from "../AddArea/AddArea";
import UsersList from "./UsersList";
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
  //   user
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
  },
  //   user end
}));

function UserData(props) {
  const classes = useStyles();
  //   function register() {
  //     props.history.push("/signup");
  //   }

  //   user
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   user
  let [data, setData] = useState("");
  useEffect(() => {
    firebase
      .database()
      .ref("Users")
      .on("value", function (data) {
        setData(Object.values(data.val()));
      });
  }, []);
  console.log(data);
  return (
    <div className="Users">
      <div className="Userlist">
        {data.length ?
         <UsersList data={data} /> 
         : null}
      </div>
    </div>
  );
}

export default withRouter(UserData);
