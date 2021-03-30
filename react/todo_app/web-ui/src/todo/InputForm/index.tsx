import React from 'react';
import Todo from '../Todo';
import './index.css';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
  } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

type InputFormProps = {
    createItem:(todo:Todo)=> void 
}
type InputFormState = {
    todo:Todo
    deadline_text:string
}


export class InputForm extends React.Component<InputFormProps,InputFormState>{

    constructor(props:InputFormProps){
        super(props)
        this.state = {
            todo:{
                event:"",
                deadline: new Date()
            },
            deadline_text:""
        }
    }
    createItem = ()=>{
        this.props.createItem(this.state.todo)
        this.setState({
            todo:{
                event:"",
                deadline:new Date(),
            },
            deadline_text:""
        })
    }
    formatDate(){
        const formattedDate = this.state.todo.deadline?.toLocaleTimeString().slice( 0, -1)
        return formattedDate
    }
    render(){

        return(
            <div className="InputForm">
                <div className="InputFormHeader">
                    <h1 className="InputFormHeaderTitle">What's <br/> you have to do?</h1>
                </div>
                <div className="InputFormContainer">

                <form className="InputFormEvent" noValidate autoComplete="off">
                    <h2 >Todo</h2>
                    <TextField 
                    required 
                    multiline
                    rows={3}
                    id="filled-basic" 
                    variant="filled"
                    label="Write your Todo here!" 
                    value={this.state.todo.event}
                    onChange={ (data)=>{
                        this.setState({
                            todo:{
                                deadline:this.state.todo.deadline,
                                event:data.target.value
                            }
                        })
                    } }
                    />
                </form>
                <div className="InputFormDeadline">
                    <h2>Deadline</h2>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={this.state.todo.deadline} onChange={(data)=>{this.setState({
                            todo:{
                                event:this.state.todo.event,
                                deadline: data ? new Date(data.toLocaleString()) : new Date()
                            }
                        })}} />
                    </MuiPickersUtilsProvider>
                </div>
                </div>
                <Button 
                className="InputFormButton"
                variant="outlined" 
                color="primary" 
                size="large" 
                onClick={this.createItem}
                disabled={ !(this.state.todo.deadline && this.state.todo.event) }
                >
                    Add
                </Button>
            </div>
        )
    }
}

export default InputForm