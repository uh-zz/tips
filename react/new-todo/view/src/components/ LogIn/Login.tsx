import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, selectUser } from '../../features/user/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      justifyContent: 'center',
    },
    alignItems: 'center',
  },
  inputBox: {
    // flex: 1,
    // display: 'flex',
  },
  inputTitle: {
    width: 200,
  },
  container: {
    marginTop: 50,
  },
  popUp: {},
}));

const userNameValidator = (userName: string) => {
  if (userName == '') {
    return true;
  }
  const regexp = /^[a-zA-Z0-9_]{6,16}$/;
  if (regexp.test(userName)) {
    return true;
  }
  return false;
};
const passwordValidator = (password: string) => {
  if (password == '') {
    return true;
  }
  const regexp = /^[a-zA-Z0-9_]{8,20}$/;
  if (regexp.test(password)) {
    return true;
  }
  return false;
};

const inputValidator = (userName: string, password: string) => {
  if (!(userName && password)) {
    return false;
  }
  if (userNameValidator(userName) && passwordValidator(password)) {
    return true;
  }
  return false;
};

export const LoginApp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = useAppSelector(selectUser);
  const loadingStatus = useAppSelector((state) => state.user.status);

  useEffect(() => {
    if (user.name) {
      history.push('/');
    }
  });
  const circleSize = Math.min(
    window.innerWidth / 2,
    window.innerHeight / 2,
    200,
  );
  const loadingIcon = (
    <CircularProgress
      style={{
        width: circleSize,
        height: circleSize,
      }}
      className={classes.popUp}
      id="loadingIcon"
    />
  );
  return (
    <Container id="LogInApp" maxWidth="md" className={classes.container}>
      <Paper elevation={2}>
        <Dialog
          PaperProps={{
            elevation: 0,
            style: { backgroundColor: 'transparent' },
          }}
          id="loginLoadingIcon"
          open={loadingStatus === 'loading'}
          className={classes.popUp}
        >
          {loadingIcon}
        </Dialog>
        <form className={classes.root} noValidate autoComplete="off">
          <Typography
            // className={classes.inputTitle}
            variant="h2"
            component="h2"
          >
            User Name
          </Typography>
          <TextField
            id="user-name"
            label="User Name"
            variant="filled"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            error={!userNameValidator(userName)}
          />

          <Typography variant="h2" component="h2">
            Password
          </Typography>

          <FormControl variant="filled">
            <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              error={!passwordValidator(password)}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            variant="contained"
            size="large"
            color="secondary"
            disabled={!inputValidator(userName, password)}
            onClick={() => {
              dispatch(login({ userName, password }));
            }}
          >
            LOGIN
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
