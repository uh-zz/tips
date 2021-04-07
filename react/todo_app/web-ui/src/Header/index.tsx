import React from 'react';
import './index.css';
// import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import {History} from 'history'

import Menu from './Menu'

type HeaderProps = {
    history:History
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
            <header className="Header">
                <div style={{position:"fixed",top:0,right:0,padding:0,margin:0}}>
                    <Menu history={this.props.history} />
                </div>
                <h1 className="AppLogo">CRaer Gti</h1>
            </header>
        )
    }
}
export default Header