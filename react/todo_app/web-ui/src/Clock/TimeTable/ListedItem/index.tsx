import React from 'react'
import { Duration } from '../..'
import './index.css'
import DeleteIcon from '@material-ui/icons/Delete';
import { ajax } from 'rxjs/ajax';
import { first } from 'rxjs/operators';

type ListedItemProps = {
    duration:Duration
    delete:(duration:Duration)=>void
}

export default class ListedItem extends React.Component<ListedItemProps>{
    delete = ()=>{
        this.props.delete(this.props.duration)
    }
    render(){
        return (
            <div className="ListedItem">
                <div className="TimeTableData">
                    <h2>{this.props.duration.start?.toLocaleTimeString()}</h2>
                    <h2>{this.props.duration.end?.toLocaleTimeString()}</h2>
                    <h2>{this.props.duration.getTimeString()}</h2>
                    <DeleteIcon onClick={this.delete} className="ListedItemDeleteIcon" />
                </div>
                <hr/>
            </div>
        )
    }
}