import React from 'react';
import styles from './Menu.module.css';
import classNames from 'classnames'
import {History} from 'history'

type MenuProps = {
    history:History
}
type MenuState ={
    isActive: boolean
}

export class Menu extends React.Component<MenuProps,MenuState>{

    constructor(props:MenuProps){
        super(props)
        this.state = {
            isActive:false
        }
    }

    signOut = () =>{
        document.cookie = "SessionID=;max-age=0";
        this.props.history.push("/login")
    }

    calcMenuClass = ()=>{
        return classNames(styles.HeaderMenu,{ [styles.Active] : this.state.isActive})
    }
    calcNavClass = ()=>{
        return classNames(styles.Nav,{[styles.Active] : this.state.isActive})
    }

    render(){
        return(
            <div className={styles.Menu}>
                <div 
                    className={this.calcMenuClass()}
                    onClick={()=>{
                        this.setState({
                            isActive:!this.state.isActive
                        })
                    }} 
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className={this.calcNavClass()}>
                    <ul>
                        <li><a className={styles.MenuLink + " big-bold-font"}
                            href="#top"
                            onClick={()=>{
                                this.setState({isActive:false})
                            }}
                            >Top</a>
                        </li>
                        <li><div className={styles.MenuLink + " big-bold-font"}
                            onClick={()=>{
                                this.setState({isActive:false})
                                this.signOut()
                            }}
                            >Sign Out</div>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
} 