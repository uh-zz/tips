import { Container, Typography } from '@material-ui/core';
import React from 'react';

export const H1 = ({children}:any)=>{
  return (
    <Typography variant="h2" style={{fontWeight:"bold"}}>{children}</Typography>
  );
};