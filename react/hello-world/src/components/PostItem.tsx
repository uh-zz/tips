import { makeStyles, Paper, Typography } from '@material-ui/core';
import { Link } from 'gatsby';
import React from 'react';

type PostItemProps = {
  node: any
}
const useStyles = makeStyles(theme => ({
  root:{
    margin: theme.spacing(3),
  },
  descriptions:{
    display:"flex",
    justifyContent:"space-between",
    position:"relative",
  },
  description:{
    // maxWidth:"70%",
    flex:1,
    justifyContent:"space-between",
  },
  date:{
    position:"absolute",
    bottom:0,
    right:0,
  }
}));

export const PostItem = ( {node} :PostItemProps)=>{
  const classes = useStyles();
  return (
    <Link to={node.fields.slug} style={{textDecoration:"none"}}>
      <Paper key={node.id} elevation={3} className={classes.root}>
        <Typography variant="h5">
          {node.frontmatter.title}{" "}
        </Typography>
        <div className={classes.descriptions}>
          <Typography variant="body1" className={classes.description}>
            {node.excerpt}
          </Typography>
          <Typography variant="body2" className={classes.date}>
            {node.frontmatter.date}
          </Typography>
        </div>
      </Paper>
    </Link>
  );
};