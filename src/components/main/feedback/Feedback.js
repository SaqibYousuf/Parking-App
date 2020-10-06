import React, { useEffect, useState } from "react";
import "./../main.scss";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";
// import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Allfeedback from "./Allfb";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Feedback(props) {
  const classes = useStyles();
  let [feedback, setFeedback] = useState("");
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  function feedBack() {
    let feedbackObj = {
      name: name,
      email: email,
      feedback: feedback,
      userUid: props.User.uid,
      reply: "",
    };
    firebase.database().ref("feedback").child(props.User.uid).set(feedbackObj);
  }
  let [feedbackData, setFeedbackData] = useState("");
  useEffect(() => {
    firebase
      .database()
      .ref("feedback")
      .on("value", function (data) {
        if (data.val()) {
          setFeedbackData(Object.values(data.val()));
        }
      });
  }, []);
  let [reply,setReply] =useState("")
//   console.log(reply)
  function Reply(a){
      console.log(a.userUid)
      firebase.database().ref('feedback').child(a.userUid).update({
        name: a.name,
        email: a.email,
        feedback: a.feedback,
        userUid: a.userUid,
        reply: reply,
      })

  }

  return (
    <div className="feedbackMain">
      <div className="inner">
        <div className="all">
            {feedbackData.length ?
                <Allfeedback feedbackData={feedbackData} Reply={Reply} setReply={setReply} User={props.User} />
            :null}
        </div>
        <div className="forms">
          <div className="feedback">
            <h3>YOUR FEEDBACK</h3>

            <div className="feedbackForm">
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  className="name"
                  id="standard-basic"
                  label="Your Name"
                />
                <TextField
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className="email"
                  id="standard-basic"
                  label="Your Email"
                />
                <TextField
                  onChange={(event) => {
                    setFeedback(event.target.value);
                  }}
                  className="feedbackInput"
                  id="outlined-multiline-static"
                  label="Feedback"
                  multiline
                  rows={4}
                  // defaultValue="Default Value"
                  variant="standard"
                />
                <Button
                  onClick={() => feedBack()}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Feedback);
