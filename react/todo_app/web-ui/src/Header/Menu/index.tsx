import React from 'react';
import './index.css';
import classNames from 'classnames'
import {History} from 'history'

type MenuProps = {
    history:History
}
type MenuState ={
    isActive: boolean
}

export default class Menu extends React.Component<MenuProps,MenuState>{

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
        return classNames("HeaderMenu",{"Active":this.state.isActive})
    }
    calcNavClass = ()=>{
        return classNames("Nav",{"Active":this.state.isActive})
    }

    render(){
        return(
            <div className="Menu">
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
                        <li><a className="MenuLink"
                            href="#top"
                            onClick={()=>{
                                this.setState({isActive:false})
                            }}
                            >Top</a>
                        </li>
                        <li><div className="MenuLink"
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