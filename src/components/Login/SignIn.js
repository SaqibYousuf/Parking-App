import React, { useEffect,useState } from 'react';
import './login.scss'
// import backgroundPic from './../Images/background.jpg'
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function SignIn(props) {
  const classes = useStyles();
  function register(){
      props.history.push('/signup')
      
  }
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  function SignIn(){
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
      props.history.push("/main")
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    
  }
  useEffect(()=>{
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // setUser(user);
      props.history.push("/main")
      console.log(user);
    } else {
      // No user is signed in.
    }
  });
}, []);

    
  return (
    <div className="LoginBody">
        <h2>Parking Application</h2>
        <div className="Login">

        <div className="lottiediv">
        <lottie-player className="loginLottie" src="https://assets8.lottiefiles.com/packages/lf20_CbDIkR.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player>
        </div>
        <div className="loginInput">
            <h3>Sign In</h3>
            <div className="loginField">
            <TextField className="input" id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(event)=>{
              setEmail(event.target.value)
            }} />
            <TextField className="input" id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(event)=>{
              setPassword(event.target.value)
            }} />
            <div className="btndiv">
            <p>Not registered yet? <span onClick={()=>register()}>Register Now</span> </p> <Button variant="contained" onClick={()=>SignIn()}>Sign In</Button>
            </div>
            
            </div>

        </div>
        </div>
       

      
    </div>
  );
}

export default withRouter(SignIn);
