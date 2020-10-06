import React, { useState } from "react";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import "./../main.scss";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';


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
function Allfeedback(props) {
  const classes = useStyles();
  return props.feedbackData.map((a, i) => {
    return (
      <div className="feedDiv">
        <h5>{a.name}</h5>
        <p>{a.email}</p>
        <p>
          {a.feedback}
        </p>
        <hr/>
        
    <p className="adminreply">Admin Reply: <br/> <span>{a.reply}</span></p>
    {props.User.email === "admin@admin.com" ? 
        <div className="reply">
    <TextField onChange={(event)=>
    props.setReply(event.target.value)
} id="standard-basic" label="Reply" />
        <Button
             onClick={() => props.Reply(a)}
             variant="contained"
             color="primary"
             >
          Reply
        </Button>
          </div>
            :null}
      </div>
    );
  });
}
export default withRouter(Allfeedback);
