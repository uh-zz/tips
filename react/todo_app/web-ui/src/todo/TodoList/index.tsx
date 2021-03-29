import React from 'react';
import Todo from '../Todo';
import './index.css';
import ListedTodo from './LiestedTodo'


type TodoListProps = {
    todos: Todo[]
    deleteItem:(todo:Todo)=>void
}
export class TodoList extends React.Component<TodoListProps>{
    render(){
        const listItems = this.props.todos.map((todo) => (
            <li>
                <ListedTodo key={todo.id} todo={todo} deleteItem={this.props.deleteItem} />
            </li>
        )
        )
        return (
            <div className="TodoList">
                <h1 className="TodoListHeader">Todo List</h1>
                <ul className="TodoListItems">
                    {listItems}
                </ul>
            </div>
        )
    }
}

export default TodoList