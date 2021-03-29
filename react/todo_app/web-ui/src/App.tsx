import React from 'react';
import './App.css';
import {TodoApp} from './todo/TodoApp'
import Header from './Header'
import Clock from './Clock'
import Footer from './Footer'

function App() {
  return (
    <div className="App">
      
        
      <Header />
      <div style={{paddingTop:120}}>
        <Clock />
        <TodoApp />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
