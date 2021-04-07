import React from 'react';
import './App.css';
import {TodoApp} from './todo/TodoApp'
import Header from './Header'
import Clock from './Clock'
import Footer from './Footer'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import User from './User';
import { createBrowserHistory } from "history";


import {
  Router,
  Switch,
  Route,
  // Link,
  Redirect,
} from "react-router-dom";

type AppState = {
  user:User
}
type AppProps = {
  
}

class App extends React.Component<AppProps,AppState> {
  history = createBrowserHistory();
  constructor(props:AppProps){
    super(props)
    this.state = {
      user:new User()
    }
  }

  setUser = (user:User) => {
    this.setState({
      user:user
    })
  }

  createUser = (userName:string,password:string)=>{
    this.state.user.create(userName,password,this.setUser)
  }
  render(){
    return(
    <div className="App">
      
        
      <Header history={this.history} />
      {/* Headerの高さ分の余白をつける */}
      <div style={{paddingTop:80}}></div>
      <Router history={this.history}>
      
        <Switch>
          <Route exact path={'/'} render={()=>{
            if(!document.cookie){
              return (
                <Redirect to="/login"/>
              )
            }
            return (
              <div >
                {/* ここが本体 */}
                <Clock />
                <TodoApp />
                
              </div>
            )
          }}>
          </Route>
          <Route path="/login" >
            <LoginPage user={this.state.user} history={this.history} />
          </Route>
          <Route path="/signup" >
            <SignUpPage user={this.state.user} createUser={this.setUser} history={this.history}/>
          </Route>
        </Switch>
      </Router>
      <Footer/>
    </div>
  )}
}

export default App;
