import React from "react";
import "./../main.scss";
import { makeStyles } from "@material-ui/core/styles";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Switch,
} from "react-router-dom";
function UserList(props) {
  return props.data.map((a, i) => {
    return (
      <div className="userDetail">
        <h4>{a.firstname} {a.lastname}</h4>
        <p>{a.email}</p>
        {/* <p>{a.user}</p> */}
        {/* <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<StorageIcon/>}
        onClick={handleOpen}
        >
        VIEW DETAILS
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
        <div clas="userName">
        <h2 id="transition-modal-title">Saqib</h2>
        <h2 id="transition-modal-title">Yousuf</h2>
        </div>
        <p id="transition-modal-description">
        031313113
        </p>
        <p id="transition-modal-description">
        email       
        </p>
        </div>
        </Fade>
      </Modal> */}
      </div>
    );
  });
}

export default withRouter(UserList);
