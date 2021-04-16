import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import styles from './Header.module.css';
import { selectUser } from '../../features/user/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = () => {
  const classes = useStyles();

  const user = useAppSelector(selectUser);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Hello, {user.name ? user.name : 'Guest'} !
        </Typography>
        <Button color="inherit">LOGOUT</Button>
      </Toolbar>
    </AppBar>
  );
};
