import React from 'react';
import './Header.css';

export class Header extends React.Component{
    render(){
        return(
            <header className="Header">

                <div className="menu">
                    <label className="ham"><span></span>
                    </label>
                    <p>Menu</p>
                </div>
                <h1 className="App-logo">TODO with React and Go</h1>
            </header>
        )
    }
}