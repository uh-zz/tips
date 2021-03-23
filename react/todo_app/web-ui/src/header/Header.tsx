import React from 'react';
import './Header.css';

export class Header extends React.Component{
    render(){
        return(
            <header className="Header">

                {/* <div className="menu">
                    <button className="menu-ham"><span></span>
                    </button>
                    <p>Menu</p>
                </div> */}
                <button className="header-menu">
                    <div className="line header-menu-line"></div>
                    <div className="line header-menu-line"></div>
                    <div className="line header-menu-line"></div>
                </button>
                <h1 className="App-logo">TODO with React and Go</h1>
            </header>
        )
    }
}