import { Button, TextField } from '@material-ui/core'
import React from 'react'
import User from '../User'
import {History} from 'history'
import './index.css'

type SignUpPageProps = {
    user:User
    createUser:(user:User)=>void
    history:History
}
type SignUpPageState = {
    userName:string
    password:string
}

export default class SignUpPage extends React.Component<SignUpPageProps,SignUpPageState>{

    constructor(props:SignUpPageProps){
        super(props)
        this.state = {
            userName:"",
            password:"",
        }
    }
    signUp = ()=>{
        this.props.user.create(this.state.userName,this.state.password,this.props.createUser)
        this.setState({
            userName:"",
            password:"",
        })
        this.props.history.push("/login")
    }
    render(){
        return(
            <div className="SignUpPage">
                <h1 className="SignUpHeader">SignUp</h1>
                <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center"}}>

                    <div>
                    <TextField
                        required 
                        id="filled-basic" 
                        variant="filled"
                        label="User Name" 
                        value={this.state.userName}
                        onChange={ (data)=>{
                            this.setState({
                                password:this.state.password,
                                userName:data.target.value
                            })
                        } }
                        />
                    </div>
                    <div>
                    <TextField
                        required 
                        id="filled-basic" 
                        variant="filled"
                        label="Password" 
                        value={this.state.password}
                        onChange={ (data)=>{
                            this.setState({
                                password:data.target.value,
                                userName:this.state.userName,
                            })
                        } }
                        />
                    </div>
                    <div>
                    <Button 
                    className="InputFormButton"
                    variant="outlined" 
                    color="primary" 
                    size="large" 
                    onClick={this.signUp}
                    disabled={ !(this.state.password && this.state.userName) }
                    >SignUp
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
}