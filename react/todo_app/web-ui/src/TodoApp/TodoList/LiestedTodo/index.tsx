import React from 'react';
import { Todo } from '../../Todo';
import './index.css';

type ListedTodoProps = {
    todo:Todo
    deleteItem:(todo:Todo)=>void
}

export class ListedTodo extends React.Component<ListedTodoProps> {

    onClick = ()=>{
        this.props.deleteItem(this.props.todo)
    }

    formattedDeadline = ():string=>{
        if(this.props.todo.deadline){
            return this.props.todo.deadline.toLocaleString()
        }
        return "None"
    }

    render(){
        
        return(
            <div className="ListedTodo">
                <div className="ListedTodoButtonContainer">
                    <div className="ListedTodoCheckButton" onClick={this.onClick}>
                        <div className="ListedTodoCheckIcon"></div>
                    </div>
                </div>
                <div className="ListedTodoContent">
                    <h1 className="ListedTodoContentEvent">{this.props.todo.event}</h1>
                    <h4 className="ListedTodoContentDeadline">Deadline: {this.formattedDeadline()}</h4>
                </div>
            </div>
        )
    }
}

export default ListedTodo