import { DEFAULT_ENCODING } from 'crypto';
import React from 'react';
import Todo from '../Todo';
import './InputForm.css';

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
                event:""
            },
            deadline_text:""
        }
    }
    createItem = ()=>{
        this.props.createItem(this.state.todo)
        this.setState({
            todo:{
                event:"",
                deadline:undefined
            },
            deadline_text:""
        })
    }
    formatDate(){
        const formattedDate = this.state.todo.deadline?.toLocaleTimeString().slice( 0, -1)
        return formattedDate
    }
    render(){
        let existBottun = (
            <input className="input-form-submit" type="submit" value="Create" onClick={this.createItem}/> 
        )
        let submitButton = (this.state.todo.deadline && this.state.todo.event )? 
        existBottun : undefined
        return(
            <div className="input-form">
                <h1>What's you have to do?</h1>
                <textarea 
                name="event" 
                value={this.state.todo.event} 
                placeholder={"Write your event here!"}
                onChange={(e)=>this.setState({todo:{
                    event:e.target.value,
                    deadline:this.state.todo.deadline
                }})}
                />
                <div className="input-form-deadline">
                    <h2>Deadline:</h2>
                    <input 
                    type="datetime-local" 
                    name="deadline"
                    onChange={(e)=>{
                        this.setState({
                            todo:{
                                event: this.state.todo.event,
                                deadline: new Date(e.target.value),
                            },
                            deadline_text:e.target.value
                        })
                    }}
                    value={this.state.deadline_text}
                    ></input>
                </div>
                {submitButton}
            </div>
        )
    }
}