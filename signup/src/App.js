import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Google } from 'react-bootstrap-icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import validator from 'validator';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Redirect } from 'react-router-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import Axios from 'axios';

export default function App(){
    return (
      <HashRouter basename="/">
        <div>
          <Route exact path="/" component={SignUp} />
          <Route path="/loggedin" component={LoggedIn} />
        </div>
      </HashRouter>
    );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function SignUp() {

  const [ok,setOkay] = useState(false);
  const [show,setShow] = useState(false);
  const classes = useStyles();
  const [emailError, setEmailError] = useState('');
  const [errorCol, setErrorcol] = useState(false);
  const [data, setUserData] = useState([]);
  const [passwordError, setPasswordError] = useState('');
  const [errorPass, setErrorpass] = useState(false);

  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('All set!')
      setErrorcol(false);
    } else {
      setEmailError('Enter valid Email!')
      setErrorcol(true);
    }
  }

  const validatePassword = (e) => {
    var password = e.target.value

    if(password.length < 8){
      setPasswordError('Password length not optimum')
      setErrorpass(false);
    } else {
      setPasswordError('All set!')
      setErrorpass(true);
    }
  }

  const dummyApicall = async () => {
    try {
        const userData = await Axios.get(`/##`);
        setUserData(userData.data);
        alert("api call made");
    } catch (error) {
        console.log(error);
    }
  };

  const [log,setLog] = useState(false);
  function handleSubmit(){
    if(errorPass && !errorCol){
      dummyApicall();
      setLog(!log);
    }
    else{
        alert("Check Password & Email Id")
      }
    }

  if (log){
    return <Redirect to="/loggedin" />
  }
  else{
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h2" style={{fontWeight:"600"}}>
          Create Account
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => validateEmail(e)} required
              />
              <FormHelperText error={errorCol}>{emailError}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type={show ? "text" : "password"}
                id="password"
                minlength="8"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {show ?  
                      <IconButton aria-label="show" className={classes.margin} size="small" onClick={() => setShow(!show)}>
                        <VisibilityIcon />
                      </IconButton> 
                      :
                      <IconButton aria-label="hide" className={classes.margin} size="small" onClick={() => setShow(!show)}>
                        <VisibilityOffIcon />
                      </IconButton>}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => validatePassword(e)}
              />
              <FormHelperText error={!errorPass}>{passwordError}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="policyok" color="primary" onClick={() => setOkay(!ok)} />}
              />
              I agree to the <Link href='#' style={{fontWeight:"600", fontSize:"13px",textDecoration: "none"}}>Terms and Conditions</Link> and <Link href='#' style={{fontWeight:"600", fontSize:"13px", textDecoration: "none"}}>Privacy Policy</Link>.
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disableElevation
            disabled={!ok}
            onClick={() => {handleSubmit()}}
            size="large"
          >
            <Link to="/loggedin" style={{textDecoration: "none", color:"white"}}>Create Account</Link>
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined" color="primary"
            className={classes.submit}
            disableElevation
            startIcon={<Google size={18} />}
            size="large"
          >
            Sign Up with Google
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              Already have an account? 
              <Link href="#" variant="body2" style={{fontWeight:"600", fontSize:"14px", textDecoration: "none"}}>
                &nbsp;Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
}

function LoggedIn() {
  const classes = useStyles();

  const [log,setLog] = useState(false);

  function handleSubmit(){
    setLog(!log);
  }

  if (log){
    return <Redirect to="/" />
  }
  else{
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h2">
          You are Logged In! 
        </Typography>
        <Button
            type="submit"
            fullWidth
            variant="outlined" color="primary"
            className={classes.submit}
            disableElevation
            onClick={() => {handleSubmit()}}
          >
            <Link to="/" color="white" style={{textDecoration: "none"}}>Go back</Link>
          </Button>
      </div>
    </Container>
  );
  }
}