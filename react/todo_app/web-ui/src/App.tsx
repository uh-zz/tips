import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoApp} from './todo/TodoApp'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'

function App() {
  return (
    <div className="App">
      
        
      <Header/>
      <TodoApp/>
      <Footer/>
    </div>
  );
}

export default App;
