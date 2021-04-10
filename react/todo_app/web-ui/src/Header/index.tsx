import React from 'react';
import style from './index.module.css';
// import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import {History} from 'history'

import Menu from './Menu'
import User from '../User';

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
                <div style={{position:"absolute",top:0,right:0,padding:0,margin:0}}>
                    <Menu history={this.props.history} />
                </div>
                <h1 className={style.AppLogo + " logo-font"}>CRaer Gti</h1>
                <div className={style.HeaderUserName  + " semibig-font"}>
                    <h1>Hello, <span className="big-bold-font">{this.props.user.userName?this.props.user.userName:'Guest'}</span></h1>
                </div>
            </header>
        )
    }
}
export default Header