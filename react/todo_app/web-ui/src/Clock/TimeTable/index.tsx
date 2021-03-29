import React from 'react'
import { Duration } from '..'
import './index.css'
import ListedItem from './ListedItem'

type TimeTableProps = {
  durations:Duration[]
  deleteItem:(duration:Duration)=>void
}

export default class TimeTable extends React.Component<TimeTableProps>{
  getRow = (duration:Duration) => {
    return(
      <ListedItem duration={duration} delete={this.props.deleteItem}/>
    )
  }
  getRows = ()=>{
    return this.props.durations.map(duration => {
      return this.getRow(duration)
    })
  }
  render(){
    return(
      <div className="TimeTable">
        <h1 className="TimeTableHeader">{new Date().toLocaleDateString()}</h1>
        <div className="TimeTableColumns">
          <h1 className="TimeTableColumn">Start</h1>
          <h1 className="TimeTableColumn">End</h1>
          <h1 className="TimeTableColumn">Total</h1>
        </div>
        <div className="TimeTableBody">
          {this.getRows()}
        </div>
      </div>
    )
  }
}