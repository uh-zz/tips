import React from 'react';
import './App.css';
import {TodoApp} from './todo/TodoApp'
import {Header} from './header/Header'
import Clock from './Clock'
import {Footer} from './footer/Footer'

function App() {
  return (
    <div className="App">
      
        
      <Header />
      <div style={{paddingTop:120}}>
        <Clock />
        <TodoApp />
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
