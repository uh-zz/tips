import React from 'react';
import './TodoApp.css';

import { Observable, of, Subscription,throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError,map ,mergeMap} from 'rxjs/operators';
import  Todo from './Todo'

import { InputForm } from "./InputForm/InputForm"
import { ListedTodo } from "./liestedTodo/ListedTodo"

type TodoAppProps = {

}

type TodoAppState = {
    todos:Todo[]
    eddited_todo:Todo
}

export class TodoApp extends React.Component<TodoAppProps,TodoAppState>{

    subsc?:Subscription

    constructor(props:TodoAppProps){
        super(props)
        this.state = {
            todos:[],
            eddited_todo:new Todo("Please input event name")
        }
    }
    componentDidMount= ()=>{
        this.subsc =  this.subscribeEvent()
    }
    componentWillUnmount =()=>{
        this.subsc?.unsubscribe()
    }

    appendEvent = (event:Todo)=>{
        this.setState(state=>{
            return {
                todos:state.todos.concat([event])
            }
        })
    }
    subscribeEvent(){
        let data$ = fromFetch('/todo/all/').pipe(
            mergeMap(response => response.ok ?response.json():throwError('RESPONSE IS BAD'))
        )
        
        let subsc = data$.subscribe({
        next: (result:Todo[]) => {
            console.log("RESPONSE: ", result)
            this.setState({
                todos:result
            })
        },
        error:err => {
            console.error(err)
        }
        });
        return subsc
    }
    createItem = (todo:Todo)=>{
        const data$ = ajax({
            url: '/todo/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: todo
        }).pipe(
            map(response => {
                // ここ汚いから上手くやって欲しい
                let todos = response.response as any as Todo
                return todos
            })
        )

        data$.subscribe({
            next: (result:Todo)=>{
                this.appendEvent(result)
            }
        })
        
    }

    allDelete = ()=>{
        const data$ = ajax({
            url: '/todo/delete/all',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "message": "All Delete"
            }
            }
        )
        data$.subscribe({
            next: results => {
                console.log(results)
                this.setState(state=>{
                    return {
                        todos:[]
                    }
                })
            }
        })
    }

    deleteItem = (todo:Todo)=>{
        const data$ = ajax({
                url: '/todo/delete',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: todo
            }
        ).pipe(
            map(response => {
                // ここ汚いから上手くやって欲しい
                let todos = response.response as any as Todo[]
                return todos
            })
        )
        data$.subscribe({
            next: (result:Todo[])=>{
                this.setState({todos:result})
            }
        })
    }
    

    render(){
        const listItems = this.state.todos.map((todo) =>
            <ListedTodo key={todo.id} todo={todo} deleteItem={this.deleteItem} />
        )
        return(
            <div className="TodoApp" style={{display:"flex",alignItems:"center",justifyContent:"space-between",margin:0,padding:0}}>
                <div style={{flex:1,marginBottom:"auto",marginRight:"5%"}}>
                    <InputForm createItem={this.createItem} />
                </div>
                {/* <form onSubmit={this.allDelete}>
                    <input type="button" value="Delete All" />
                </form> */}
                <div style={{flex:1,marginBottom:"auto"}}>
                    <h1 className="todo-list-header">Your ToDo List</h1>
                    {listItems}
                </div>
            </div>
        )
    }
}
