import React from 'react';
import Todo from '../Todo';
import './ListedTodo.css';

type ListedTodoProps = {
    todo:Todo
    deleteItem:(todo:Todo)=>void
}

export class ListedTodo extends React.Component<ListedTodoProps> {

    onClick = ()=>{
        this.props.deleteItem(this.props.todo)
    }
    render(){
        let deadline = this.props.todo.deadline as any as string
        let deadline_text = deadline.split("T").join(" ")
        deadline_text = deadline_text.split("+")[0]
        
        return(
            <div className="float-box">
                <form className="Button-box" onClick={this.onClick}>
                    <input className="DeleteButton" type="button" value="" />
                </form>
                <div className="todo-box">
                    <h1>{this.props.todo.event}</h1>
                    <h4>Deadline: {deadline_text}</h4>
                </div>
            </div>
        )
    }
}