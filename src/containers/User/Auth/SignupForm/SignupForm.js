import React, { useState, useEffect, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar"; // Avatar is a component
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom"; // Link is also a component
import { useSpeechRecognition } from "react-speech-recognition";
import './SignupForm.css'; // CSS file

import axios from "axios";
import AuthService from "../../../../services/auth-service";
import { Description, SentimentVerySatisfied } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({ // useStyles is a function that returns an object
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.Avatar,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
   
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));
////////////////////////////////////////////////////////////
export default function SignUp(props) {
  const [focusState, setFocusState] = useState(true)

  const commandsAndDesc = [];
  commandsAndDesc.push({
    command: "Navigate signup page",
    description: "Navigate to the signup page"
  },
 {
  command: "Enter username",
  description: "Activate and focus the username input"
 }

)

//   const commands = [
//     {
//         command: 'Navigate *',
//         callback: cmd => handleNavigation('Navigate', cmd)
//     },
//     {
//         command: 'remove',
//         callback: ({resetTranscript}) => resetTranscript()
//     }
// ];

const commands = [
  {
    command: 'Enter username',
    callback: (focusState) => setFocusState(true)
  }
]
const {transcript} = useSpeechRecognition({commands});


useEffect(() => {
    if (props.setCommands)
        props.setCommands(commandsAndDesc);

}, [commandsAndDesc, props])

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState(null); // Store the file object
  
  const [loading, setLoading] = useState(false);

  const classes = useStyles();  

  const SignupHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    AuthService.register(
      form.username,
      form.email,
      form.password,
      form.confirmPassword
    )
      .then((response) => {
        setForm({ username: "", email: "", password: "", confirmPassword: "" });
        setLoading(false);
        props.history.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(error.response?.data?.data[0]?.msg);
      });
  };

  return (
    <React.Fragment>{/*React.Fragment is a special component in React that allows you to group multiple elements without adding an extra node to the DOM.*/}
      {loading ? <LinearProgress /> : ""}
      <div className="logo">
        <div style={{width: "45%", marginBottom: '20px'}}>
        <h1 className="hero-line">Ready to delve into the 
        world of Voice Commands?</h1>

        </div>
      <img src='/images/voisLogo.svg' alt='logo' className="image"/>
      </div>
    
      <Container
        component="main"
        maxWidth="sm"
        style={{ 
          marginLeft: "auto",
          marginTop: "px",
         padding: "30px 30px 15px 30px",
          borderRadius: '5%',
          backgroundColor: '#F2F2F2',

        
          
        }}
      >
        <CssBaseline />
        {/* <div className='poppins'> */}
          <div className="avatar">
          <Avatar  style={{borderRadius: '3px'}} className='makeStyles-paper-2'></Avatar>
          <Typography component="h1" variant="h4" style={{borderBottom: '5px solid #FFD54B', fontFamily: 'Poppins, sans-serif', fontWeight:'550', color: '#404040'}} className={classes.title}>
            Sign up
          </Typography>
          
          </div>
         
          <form className={classes.form}>
            <Grid container spacing={2}>
    
              <Grid item xs={12}>
                <TextField
              
                  autoComplete="fname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
              autoFocus={focusState}
                  value={form.username}
                  onChange={(event) => {
                    setForm({
                      username: event.target.value,
                      email: form.email,
                      password: form.password,
                      confirmPassword: form.confirmPassword,
                    });
                  }}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  autoFocus={focusState}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => {
                    setForm({
                      username: form.username,
                      email: event.target.value,
                      password: form.password,
                      confirmPassword: form.confirmPassword,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="hello"
                  value={form.password}
                  onChange={(event) => {
                    setForm({
                      username: form.username,
                      email: form.email,
                      password: event.target.value,
                      confirmPassword: form.confirmPassword,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  value={form.confirmPassword}
                  onChange={(event) => {
                    setForm({
                      username: form.username,
                      email: form.email,
                      password: form.password,
                      confirmPassword: event.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={SignupHandler}
              style={{fontFamily: 'poppins, sans-serif', backgroundColor: '#5D9B7C'}}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none", fontFamily: 'poppins, sans-serif'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        {/* </div> */}
        {/* <Box mt={5}></Box> */}
      </Container>
    </React.Fragment>
  );
}
