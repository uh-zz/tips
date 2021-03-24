import React from 'react';
import Todo from '../Todo';
import './InputForm.css';

type InputFormProps = {
    createItem:(todo:Todo)=> void 
}
type InputFormState = {
    todo:Todo
}

export class InputForm extends React.Component<InputFormProps,InputFormState>{
    constructor(props:InputFormProps){
        super(props)
        this.state = {
            todo:{
                event:"Write your event here!"
            }
        }
    }
    createItem = ()=>{
        this.props.createItem(this.state.todo)
    }
    render(){
        let existBottun = (
            <input className="input-form-submit" type="submit" value="Create" /> 
        )
        let submitButton = (this.state.todo.deadline && this.state.todo.event )? 
        existBottun : undefined
        return(
            <div className="input-form">
                <form onSubmit={this.createItem}>
                    <h1>What's you have to do?</h1>
                    <textarea 
                    name="event" 
                    value={this.state.todo.event} 
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
                                    deadline: new Date(e.target.value)
                                }
                            })
                        }}
                        ></input>
                    </div>
                    {submitButton}
                </form>
            </div>
        )
    }
}