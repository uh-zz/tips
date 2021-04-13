import React from 'react';
import style from './Header.module.css';
import {History} from 'history'

import User from '../User';
import { Menu } from './Menu'

type HeaderProps = {
    history:History
    user:User
}
type HeaderState = {
    isMenuOpen:boolean
}

export class Header extends React.Component<HeaderProps,HeaderState>{
    constructor(props:HeaderProps){
        super(props)
        this.state = {
            isMenuOpen:false
        }
    }
    render(){
        return(
            <header className={style.Header}>
                <div className={style.Menu}>
                    <Menu history={this.props.history} />
                </div>
                <h1 className={style.AppLogo + " logo-font"}>CRaer Gti</h1>
                <div className={style.HeaderUserName  + " semibig-font"}>
                    <h1>Hello, <span className={style.UserName + " big-bold-font"}>{this.props.user.userName?this.props.user.userName:'Guest'}</span></h1>
                </div>
            </header>
        )
    }
}