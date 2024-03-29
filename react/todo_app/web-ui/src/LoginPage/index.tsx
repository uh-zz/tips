import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { ajax } from 'rxjs/ajax'
import { first } from 'rxjs/operators'
import User from '../User'
import './index.css'
import { History } from 'history'

type LoginPageProps = {
    user:User
    history:History
    setUser:(user:User)=>void
}
type LoginPageState = {
    userName:string
    password:string
}

export default class LoginPage extends React.Component<LoginPageProps,LoginPageState>{
    
    
    constructor(props:LoginPageProps){
        super(props)
        this.state = {
            userName:"",
            password:"",
        }
    }
    login = ()=>{
        let data$ = ajax({
            url: '/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                userName:this.state.userName,
                password:this.state.password,
            }
        }).pipe(
            first(),
        )
        let subsc = data$.subscribe({
            next:response => {
                if (response.status !== 200){
                    throw new Error(`Bad status!:${response.status}`)
                }
                let user = new User()
                user.userName = this.state.userName
                this.props.setUser(user)
                this.props.history.push("/")
            },
            error:err=> {throw new Error('Can\'t get Cookie')},
            complete: ()=>{
                subsc.unsubscribe()
                console.log("complete!")
            }
        })
    }
    render(){
        return(
            <div className="LoginPage">
                <h1 className="LoginHeader">Login</h1>
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
                    onClick={this.login}
                    disabled={ !(this.state.password && this.state.userName) }
                    >Login
                    </Button>
                    </div>
                </div>
                <div>
                    <div onClick={()=>{this.props.history.push("./signup")}}>Create a new account ?</div>
                </div>
            </div>
        )
    }
}
