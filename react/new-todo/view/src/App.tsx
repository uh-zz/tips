import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { UserName } from './features/user/UserName';
import { Header } from './components/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUser, selectUser } from './features/user/userSlice';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { LoginApp } from './components/ LogIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(103, 58, 183)',
    },
    secondary: {
      main: '#008060',
    },
  },
});
function App() {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchUser());
  // });
  const user = useAppSelector(selectUser);
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <Header />
          <Switch>
            <Route exact path="/login" component={LoginApp} />
            <Route
              exact
              path="/"
              render={() => (
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <Counter />
                  <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                  </p>
                  <span>
                    <span>Learn </span>
                    <a
                      className="App-link"
                      href="https://reactjs.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React
                    </a>
                    <span>, </span>
                    <a
                      className="App-link"
                      href="https://redux.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Redux
                    </a>
                    <span>, </span>
                    <a
                      className="App-link"
                      href="https://redux-toolkit.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Redux Toolkit
                    </a>
                    ,<span> and </span>
                    <a
                      className="App-link"
                      href="https://react-redux.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React Redux
                    </a>
                  </span>
                </header>
              )}
            />
            <Redirect to="/" />
          </Switch>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
