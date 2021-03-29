import React from 'react';
import './TodoApp.css';

import { Observable, of, Subscription,throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError,map ,mergeMap,first} from 'rxjs/operators';
import  Todo from './Todo'

import InputForm from "./InputForm"
import TodoList from './TodoList'

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

    appendEvent = (event:Todo)=>{
        this.setState(state=>{
            return {
                todos:state.todos.concat([event])
            }
        })
    }
    subscribeEvent(){
        let data$ = fromFetch('/todo/all/').pipe(
            first(),
            mergeMap(response => response.ok ?response.json():throwError('RESPONSE IS BAD'))
        )
        
        let subsc = data$.subscribe({
            next: (response:Todo[]) => {
                let todos:Todo[] = []
                if(response instanceof Array){
                    response.forEach(data =>{
                        let todo:Todo = new Todo(data.event, data.deadline ? new Date(data.deadline):undefined,data.id)
                        todos.push(todo)
                    })
                }
                this.setState({
                    todos:todos
                })
            },
            complete: ()=>{subsc.unsubscribe()}
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
        }
    ).pipe(
            first(),
            map(response => {
                let result = response.response
                let new_todo = new Todo(result.event,new Date(result.deadline),result.id)
                return new_todo
            })
        )

        let subsc = data$.subscribe({
            next: (result:Todo)=>{
                this.appendEvent(result)
                console.log("created item",result)
            },
            complete: ()=>{subsc.unsubscribe()}
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
        ).pipe(
            first(),
        )
        let subsc = data$.subscribe({
            next: results => {
                this.setState({
                        todos:[]
                })
            },
            complete: ()=>{subsc.unsubscribe()}
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
            first(),
            map(response => {
                let todos : Todo[] = []
                if (response.response instanceof Array){
                    response.response.forEach(data=>{
                        todos.push(new Todo(data.event,new Date(data.deadline),data.id))
                    })
                }
                return todos
            })
        )
        let subsc = data$.subscribe({
            next: (result:Todo[])=>{
                this.setState({todos:result})
            },
            complete: ()=>{subsc.unsubscribe()}
        })
    }

    render(){
        
        return(
            <div className="TodoApp" >
                <div style={{flex:1,marginBottom:"auto",marginRight:"5%",minWidth:470,maxWidth:700}}>
                    <InputForm createItem={this.createItem} />
                </div>
                {/* <form onSubmit={this.allDelete}>
                    <input type="button" value="Delete All" />
                </form> */}
                <TodoList todos={this.state.todos} deleteItem={this.deleteItem} />
            </div>
        )
    }
}
