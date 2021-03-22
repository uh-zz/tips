import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoApp} from './todo/TodoApp'
import {Header} from './header/Header'

function App() {
  return (
    <div className="App">
      
        
      <Header/>
      <TodoApp/>
    </div>
  );
}

export default App;
