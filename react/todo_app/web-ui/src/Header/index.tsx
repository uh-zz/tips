import React from 'react';
import './index.css';

export class Header extends React.Component{
    render(){
        return(
            <header className="Header">
                <button className="header-menu">
                    <div className="line header-menu-line"></div>
                    <div className="line header-menu-line"></div>
                    <div className="line header-menu-line"></div>
                </button>
                <h1 className="App-logo">TODO</h1>
            </header>
        )
    }
}
export default Header