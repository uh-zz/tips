import React from 'react';
import './Todo.css';

import { Observable, of, Subscription,throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError,map ,mergeMap} from 'rxjs/operators';

class Event{
    event:string
    constructor(event:string){
        this.event = event
    }
}

type TodoProps = {

}

type TodoState = {
    events:Event[]
}

export class Todo extends React.Component<TodoProps,TodoState>{

    subsc?:Subscription

    constructor(props:TodoProps){
        super(props)
        this.state = {
            events:[]
        }
    }
    componentDidMount= ()=>{
        this.subsc =  this.subscribeEvent()
    }
    componentWillUnmount =()=>{
        this.subsc?.unsubscribe()
    }

    appendEvent = (event:Event)=>{
        this.setState(state=>{
            return {
                events:state.events.concat([event])
            }
        })
    }
    subscribeEvent(){
        let data$ = fromFetch('/todo/events/').pipe(
            mergeMap(response => response.ok ?response.json():throwError('RESPONSE IS BAD'))
        )
        
        let subsc = data$.subscribe({
        next: (result:{events :Event[]}) => {
            console.log("RESPONSE!!", result.events)
            result.events.forEach((event) => {
                console.log(event)
                let new_event = new Event(event.event)
                this.appendEvent(new_event)
            });
        },
        error:err => {
            console.error(err)
        }
        });
        return subsc
    }

    render(){
        const listItems = this.state.events.map((event) =>
        <li key={event.event}>{event.event}</li>
        );
        return(
            <div className="Todo">
                <h1>NakZ</h1>
                <ul>{listItems}</ul>
            </div>
        )
    }
}
