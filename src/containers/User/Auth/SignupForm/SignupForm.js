import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-recognition";
import './SignupForm.css';

import axios from "axios";
import AuthService from "../../../../services/auth-service";
import { Description, SentimentVerySatisfied } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignUp(props) {
  const [focusState, setFocusState] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputRef = useRef(null);
  
  const commandsAndDesc = [
    {
      command: "Navigate signup page",
      description: "Navigate to the signup page"
    },
    {
      command: "Enter username",
      description: "Activate and focus the username input"
    }
  ];

  const commands = [
    {
      command: 'Enter username',
      callback: () => setFocusState(true)
    }
  ];

  useEffect(() => {
    if (focusState) {
      console.log('focus', focusState)
    }
  }, [focusState]);

  const { transcript } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (props.setCommands)
      props.setCommands(commandsAndDesc);
  }, [commandsAndDesc, props]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  // Validation functions
  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3 || username.length > 20) return "The username must be between 3 and 20 characters long.";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8 || password.length > 25) return "Password must be between 8 and 24 characters long";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== form.password) return "Passwords do not match";
    return "";
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);

    // Validate the changed field
    let error = "";
    switch (field) {
      case "username":
        error = validateUsername(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        // Also validate confirm password when password changes
        const confirmPasswordError = value !== form.confirmPassword ? "Passwords do not match" : "";
        setErrors(prev => ({ ...prev, confirmPassword: confirmPasswordError }));
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value);
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      username: validateUsername(form.username),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.confirmPassword),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const SignupHandler = (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return; // Stop if validation fails
    }

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
        props.history.push("/facial-login");
      })
      .catch((error) => {
        setLoading(false);
        const resMessage =
          (error.response?.data?.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      });
  };

  return (
    <React.Fragment>
      {loading ? <LinearProgress /> : ""}
      <div className="logo">
        <div style={{ width: "45%", marginBottom: '20px' }}>
          <h1 className="hero-line">Ready to delve into the world of Voice Commands?</h1>
        </div>
        <img src='/images/voisLogo.svg' alt='logo' className="image" />
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
        <div className="avatar">
          <Avatar style={{ borderRadius: '3px' }} className='makeStyles-paper-2'></Avatar>
          <Typography 
            component="h1" 
            variant="h4" 
            style={{
              borderBottom: '5px solid #FFD54B',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '550',
              color: '#404040'
            }}
            className={classes.title}
          >
            Sign up
          </Typography>
        </div>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus={focusState}
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={form.username}
                error={!!errors.username}
                helperText={errors.username}
                onChange={(event) => handleInputChange("username", event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={form.email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={(event) => handleInputChange("email", event.target.value)}
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
                value={form.password}
                error={!!errors.password}
                helperText={errors.password}
                onChange={(event) => handleInputChange("password", event.target.value)}
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
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                onChange={(event) => handleInputChange("confirmPassword", event.target.value)}
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
            style={{ fontFamily: 'poppins, sans-serif', backgroundColor: '#5D9B7C' }}
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/facial-login" style={{ textDecoration: "none", fontFamily: 'poppins, sans-serif' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}