import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../../../../services/auth-service";
import { Link } from "react-router-dom";
import { Store } from 'react-notifications-component';
import { AppContext } from "../../../../context/AppContext";

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

export default function SignIn(props) {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    auth: "" // for authentication errors
  });

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
    return "";
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);

    // Clear auth error when user starts typing
    setErrors(prev => ({ ...prev, auth: "" }));

    // Validate the changed field
    let error = "";
    switch (field) {
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(error => error !== "");
  };

  const SigninHandler = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    AuthService.login(form.email, form.password)
      .then((response) => {
        setForm({ email: "", password: "" });
        setLoading(false);
        Store.addNotification({
          title: "Wonderful",
          message: "Login Successful!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        props.history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        const resMessage =
          (error.response?.data?.message) ||
          error.message ||
          error.toString();
        
        // Set authentication error
        setErrors(prev => ({
          ...prev,
          auth: "Invalid email or password. Please try again."
        }));
      });
  };


  return (
    <React.Fragment>
      {loading ? <LinearProgress /> : ""}
      <div className="logo">
        <div style={{ width: "45%", marginBottom: '20px' }}>
          <h1 className="hero-line">Welcome back to the world of Voice Commands!</h1>
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
            Sign in
          </Typography>
        </div>

        <form className={classes.form} noValidate>
          {errors.auth && (
            <Typography color="error" align="center" style={{ marginBottom: '1rem' }}>
              {errors.auth}
            </Typography>
          )}
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
                value={form.password}
                error={!!errors.password}
                helperText={errors.password}
                onChange={(event) => handleInputChange("password", event.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={SigninHandler}
            style={{ fontFamily: 'poppins, sans-serif', backgroundColor: '#5D9B7C' }}
          >
            Sign In
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup" style={{ textDecoration: "none", fontFamily: 'poppins, sans-serif' }}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
} 