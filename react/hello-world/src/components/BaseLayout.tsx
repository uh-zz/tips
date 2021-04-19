import { createMuiTheme } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Header } from './Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[700],
    },
    secondary: {
      main: orange[500],
    },
    
  },
  typography:{
    htmlFontSize: 12,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "Hiragino Kaku Gothic ProN",
      "Hiragino Sans",
      "Meiryo",
      "sans-serif",
    ].join(','),
  }
});
const headerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[700],
    },
    secondary: {
      main: "#fff",
    },
    
  },
  typography:{
    htmlFontSize: 12,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "Hiragino Kaku Gothic ProN",
      "Hiragino Sans",
      "Meiryo",
      "sans-serif",
    ].join(','),
  }
});
type BaseLayOutProps = {
    children: JSX.Element[]|JSX.Element
}

export const BaseLayout = ({children}:BaseLayOutProps)=>{
  const data = useStaticQuery(
    graphql`
          query {
            site {
              siteMetadata {
                title
              }
            }
          }
        `
  );
  return (
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={headerTheme}>
        <Header />
      </ThemeProvider>
      {children}
    </ThemeProvider>
  );
};