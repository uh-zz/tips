import React from 'react';
import {interval, Subscription} from 'rxjs';

type ClassComponentProps = {}
type ClassComponentState = {
    // 経過時間(s)
    timeSeconds:number
    // ストップウォッチが動いているかどうか
    isRunning:boolean
}

export class ClassComponent extends React.Component<ClassComponentProps, ClassComponentState> {
    // intervalのsubscription
    // 今回の話のメインになるインスタンス変数
    intervalPerSecondsSubscription?:Subscription

    constructor(props:ClassComponentProps) {
      super(props);
      this.state = {
        timeSeconds: 0,
        isRunning: false,
      };
    }

    onClick = () => {
      this.setState(
          {isRunning: !this.state.isRunning},
          // 実際にStateが更新された後にcallbackされる。
          ()=>{
            if (this.state.isRunning) {
              this.intervalPerSecondsSubscription = interval(1000).subscribe((x) => {
                this.setState({timeSeconds: this.state.timeSeconds + 1});
              });
            } else {
              this.intervalPerSecondsSubscription?.unsubscribe();
            }
          },
      );
    }

    componentWillUnmount = () => {
      this.intervalPerSecondsSubscription?.unsubscribe();
    }

    render = () => (
      <div>
        <h1>Class Component</h1>
        <h1>{this.state.timeSeconds} s</h1>
        <button onClick={this.onClick} >
          {this.state.isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
    )
}
