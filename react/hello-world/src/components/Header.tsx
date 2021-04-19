import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'gatsby';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  headerNavigation:{
    flex:"1",
    display:"flex",
    justifyContent:"flex-end",
  },
  toolbar:{
    display:"flex"
  },
  button:{
    margin: theme.spacing(1),
  }
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>

          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button >
                <Typography color="secondary" variant="h5" >nakazato<span style={{fontWeight:"bold"}}>overflow</span></Typography>
              </Button>
            </Link>
          </div>
          <div className={classes.headerNavigation}>
            <Link to="/">
              <IconButton component="span" className={classes.button} >
                <HomeIcon color="secondary" fontSize="default" />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};