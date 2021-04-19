import React from 'react';
import Prism from 'prismjs';
import "prismjs/themes/prism-okaidia.css";
import { Container, makeStyles, Paper } from '@material-ui/core';

// The code snippet you want to highlight, as a string
const useStyle = makeStyles(theme =>({
  codeBox:{
    color:"#fff",
    backgroundColor:"#222",
    lineHeight:"1.6em",
    fontSize:16,
    paddingLeft:"18px",
    paddingRight:"18px",
    paddingTop:"10px",
    paddingBottom:"10px",
    // paddingTop:"2px",
    // '& ':{

    // }
  }
})
);
// Returns a highlighted HTML string
export const CodeHightLight = ({children}:any)=>{
  const classes = useStyle();
  const innerHTML = Prism.highlight(children, Prism.languages.javascript, 'javascript');
  return (

    <Paper className={classes.codeBox} >
            
      <div dangerouslySetInnerHTML={{
        __html : innerHTML}
      }>
      </div>
    </Paper>
  );
};