import React from 'react';
import './App.css';
import {TodoApp} from './TodoApp/TodoApp'
import {Header} from './Header'
import Clock from './Clock'
import Footer from './Footer'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import User from './User';
import { createBrowserHistory } from "history";
import { TodoInputForm } from './TodoInputForm'


import {
  Router,
  Switch,
  Route,
  // Link,
  Redirect,
} from "react-router-dom";
import { ajax } from 'rxjs/ajax';
import { first } from 'rxjs/operators';

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
    this.checkIn()
  }

  setUser = (user:User) => {
    this.setState({
      user:user
    })
  }

  createUser = (userName:string,password:string)=>{
    this.state.user.create(userName,password,this.setUser)
  }
  componentDidMount = ()=>{

  }

  checkIn = ()=>{
    if(!document.cookie.match("SessionID")){
      this.history.push("/login")
      return
    }
    let data$ = ajax({
      url: '/api/v1/checkIn',
      method: 'GET',
    }).pipe(
        first(),
    )
    let subsc = data$.subscribe({
        next:response => {
          if(!response.response.hasSession){
            this.history.push("/login")
            return
          }
          let user = new User()
          user.userName = response.response.user.userName
          this.setState({user:user})
        },
        error:err=> {
          this.history.push("/login")
        },
        complete: ()=>{
            subsc.unsubscribe()
        }
    })
  }
  render(){
    return(
      <div className="App">
      
      <Header history={this.history} user={this.state.user}  />
      <Router history={this.history}>
      
        <Switch>
          <Route exact path={'/'} render={()=>{
            return (
              <div >
                {/* ここが本体 */}
                <Clock />
                {/* <TodoApp /> */}
                <TodoInputForm />
              </div>
            )
          }}>
          </Route>
          <Route path="/login" >
            <LoginPage user={this.state.user} history={this.history} setUser={this.setUser} />
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
