import React from 'react'
import './index.css'
import { fromEvent, interval, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { first} from 'rxjs/operators';
// import TimeTable from './TimeTable';
import DurationChart from './DurationChart'
// import { SettingsSystemDaydreamTwoTone } from '@material-ui/icons';

type ClockProps = {

}

type ClockState = {
    duration:Duration
    durations:Duration[]
    subsc$?: Subscription
    is_studying:boolean
}

export class Clock extends React.Component<ClockProps,ClockState>{

    beforeUnLoad?:Subscription
    constructor(props:ClockProps){
        super(props)
        this.state = {
            duration: new Duration(),
            durations:[],
            is_studying:false,
        }
    }
    componentDidMount(){
        const data$ = ajax({
            url: '/clock/durations',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: this.state.duration
        }).pipe(
            first(),
        )

        let subsc = data$.subscribe({
            next:responce => {
                const durations:Duration[] = []
                if(responce.response instanceof Array){
                    responce.response.forEach(data=>{
                        let duration = new Duration(new Date(data.start),new Date(data.end),data.id)
                        durations.push(duration)
                    })
                }else{
                    throw new Error('Respnse is not array.')
                }
                this.setState({
                    durations:durations
                })
            },
            error:err=> {throw new Error('Clock can\'t mount!')},
            complete: ()=>{subsc.unsubscribe()}
        })
        this.beforeUnLoad = fromEvent(window,'beforeunload').subscribe(
            (e)=>{this.stopClock()}
        )
    }
    componentWillUnmount(){
        this.stopClock()
        this.state.subsc$?.unsubscribe()
        this.beforeUnLoad?.unsubscribe()

    }



    startClock = () => {
        let newDuration = new Duration(new Date())
        if(!this.state.duration.start){
            console.log("start!")
            this.setState({duration:newDuration})  
        }
        if(!this.state.is_studying){
            // タイマーをスタートさせる
            this.setState( {
                subsc$:interval(1000).subscribe({
                    next:result=>{
                        
                        this.setState({
                            duration:new Duration(this.state.duration.start,new Date(),this.state.duration.id)
                        })
                        if(this.state.duration.getDurationS() > 24 * 3600){
                            alert("Maybe you don't live in the Earth !")
                            this.state.subsc$?.unsubscribe()
                            this.setState({is_studying:false})
                            return
                        }
                    },

                }),
                is_studying:true
            })
            console.log("duration:",this.state.duration.start)
            const data$ = ajax({
                url: '/clock/start',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newDuration
            }).pipe(first())

            data$.subscribe({
                next:responce => {
                    console.log(responce.response)
                    let id = responce.response.id
                    this.setState({
                        duration:new Duration(this.state.duration.start,this.state.duration.end,id),
                    })
                },
                error:err=> {throw new Error('Clock can\'t stop')}
            })

        }
    }
    stopClock = () => {
        this.state.subsc$?.unsubscribe()
        if(!this.state.duration.start){
            return
        }
        const data$ = ajax({
            url: '/clock/stop',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: this.state.duration
        }).pipe(first())
        data$.subscribe({
            next:responce => {
                this.state.subsc$?.unsubscribe()
                const durations:Duration[] = []
                if(responce.response instanceof Array){
                    responce.response.forEach(data=>{
                        let duration = new Duration(new Date(data.start),new Date(data.end),data.id)
                        durations.push(duration)
                    })
                }else{
                    throw new Error('Respnse is not array.')
                }
                this.setState({
                    duration:new Duration(),
                    is_studying:false,
                    subsc$:undefined,
                    durations:durations,
                })
            },
            error:err=> {throw new Error('Clock can\'t stop')}
        })
    }

    deleteDuration = (duration:Duration)=>{
        const data$ = ajax({
            url: '/clock/delete',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: duration
        }).pipe(first())
        data$.subscribe({
            next:responce => {
                this.setState({
                    durations:this.state.durations.filter(function( duration_ ) {
                        return duration.id !== duration_.id;
                      })
                })
            },
            error:err=> {throw new Error('Duration can\'t be deleted!')}
        })
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
            <h1>
                {time_str}
            </h1>
        )
    }

    calcAllTime = ():number=>{
        let allTime = 0
        allTime += this.state.duration.getDurationS()
        this.state.durations.forEach(duration=>{
            allTime += duration.getDurationS()
        })
        return allTime
    }


    render(){
        return(
            <div className="Clock">
                {/* <div className="ClockTimeTableWrapper">
                    <TimeTable durations={this.state.durations} deleteItem={this.deleteDuration}/>
                </div> */}
                <DurationChart durations={this.state.durations} duration={this.state.duration}/>
                <div className="ClockContainer">
                    <div className="ClockMessage">
                        <h1>
                            How long <br/>you've been studying Today!
                        </h1>
                    </div>
                    <div className="ClockWindow">
                        {this.formatClock_(this.calcAllTime())}
                    </div>
                    <div className="ClockButtonWrapper">
                        <div className="ClockButtonContainer">
                          <button className="ClockButtonStart" onClick={this.startClock}>Start</button>
                        </div>
                        <div className="ClockButtonContainer">
                            <button className="ClockButtonStop" onClick={this.stopClock}>Stop</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export class Duration{
    id?:number
    start?:Date
    end?:Date
    constructor(start?:Date,end?:Date,id?:number){
        this.start = start
        this.end = end
        this.id = id
    }

    getDurationS = ()=>{
        if(this.end && this.start ){
            return Math.floor( (this.end.getTime() - this.start.getTime()) / 1000)
        }
        else if(this.start){
            return Math.floor( (new Date().getTime() - this.start.getTime()) / 1000)
        }else{
            return 0
        }
            
    }
    getTimeString = ()=>{
        const how_long_s = this.getDurationS()
        const hour = Math.floor(how_long_s / 3600).toString().padStart(2,"0")
        const minute = Math.floor((how_long_s % 3600) /60).toString().padStart(2,"0")
        const second = Math.floor(how_long_s % 60).toString().padStart(2,"0")

        return `${hour}:${minute}:${second}`
    }
}

export default Clock