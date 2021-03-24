import React from 'react'
import './index.css'
import { interval, Observable, Subscription, timer } from 'rxjs'
import { take } from 'rxjs/operators';

type ClockProps = {

}

type ClockState = {
    how_long_s:number
    subsc$?: Subscription
    is_studying:boolean
}

export class Clock extends React.Component<ClockProps,ClockState>{

    constructor(props:ClockProps){
        super(props)
        this.state = {
            how_long_s:0,
            is_studying:false,
        }
    }

    componentWillUnmount(){
        this.state.subsc$?.unsubscribe()
    }

    startClock = () => {
        if(!this.state.is_studying && !this.state.subsc$){
            // タイマーをスタートさせる
            this.setState( {
                subsc$:interval(1000).subscribe({
                    next:result=>{
                        const next_time = this.state.how_long_s+1
                        if(next_time > 24 * 3600){
                            alert("Maybe you don't live in the Earth !")
                            this.state.subsc$?.unsubscribe()
                            this.setState({is_studying:false})
                            return
                        }
                        this.setState({
                            how_long_s:next_time
                        })
                    }
                }),
                is_studying:true
        })

        }
    }
    stopClock = () => {
        this.state.subsc$?.unsubscribe()
        this.setState({is_studying:false,subsc$:undefined})
    }

    formatClock = (how_long_s:number):string=>{
        const hour = Math.floor(how_long_s / 3600).toString().padStart(2,"0")
        const minute = Math.floor((how_long_s % 3600) /60).toString().padStart(2,"0")
        const second = Math.floor(how_long_s % 60).toString().padStart(2,"0")
        const time_str = `${hour}:${minute}:${second}`
        return time_str
    }
    formatClock_ = (how_long_s:number):JSX.Element=>{
        const hour = Math.floor(how_long_s / 3600).toString().padStart(2,"0")
        const minute = Math.floor((how_long_s % 3600) /60).toString().padStart(2,"0")
        const second = Math.floor(how_long_s % 60).toString().padStart(2,"0")

        const time_str = `${hour}:${minute}:${second}`

        
        return (
            <div className="ClockWindowStrings" >
                <h1 style={{width:"15%"}}>{time_str[0]}</h1>
                <h1 style={{width:"15%"}}>{time_str[1]}</h1>
                <h1 style={{width:"5%"}}>{time_str[2]}</h1>
                <h1 style={{width:"15%"}}>{time_str[3]}</h1>
                <h1 style={{width:"15%"}}>{time_str[4]}</h1>
                <h1 style={{width:"5%"}}>{time_str[5]}</h1>
                <h1 style={{width:"15%"}}>{time_str[6]}</h1>
                <h1 style={{width:"15%"}}>{time_str[7]}</h1>
            </div>
        )
    }


    render(){
        const ll = interval(1).subscribe(result=>console.log(result))
        console.log(ll)
        const tt = timer(5).subscribe(
            result =>{
                ll.unsubscribe()
                console.log(ll)
                if(ll){
                    console.log("True")
                }
            }
        )
        return(
            <div className="Clock">
                <div className="ClockMessage">
                    <h1>
                        How long <br/>you've been studying Today!
                    </h1>
                </div>
                <div className="ClockWindow">
                    {this.formatClock_(this.state.how_long_s)}
                </div>
                <div className="ClockButtonWrapper">
                    <button className="ClockButtonStart" onClick={this.startClock}>Start</button>
                    <button className="ClockButtonStop" onClick={this.stopClock}>Stop</button>
                </div>
            </div>
        )
    }


}

export default Clock