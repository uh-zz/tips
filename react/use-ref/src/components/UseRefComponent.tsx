import React, {useEffect, useRef, useState} from 'react';
import {interval, Subscription} from 'rxjs';

export const UseRefComponent = () => {
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalPerSecondsSubscription = useRef<Subscription>();

  // componentWillUnmountの時の処理
  useEffect(() => () => intervalPerSecondsSubscription.current?.unsubscribe(), []);

  const onClick = (prevTimeSeconds:number, prevIsRunning:boolean) => {
    // isRunningとtimeSecondsはimmutableなので値をコピーしておいて
    // 新しい変数を更新する。
    let currentTimeSeconds = prevTimeSeconds;
    const currentIsRunning = !prevIsRunning;
    // useState()にはcallbackは定義できない。
    setIsRunning(currentIsRunning);
    if (currentIsRunning) {
      intervalPerSecondsSubscription.current = interval(1000).subscribe((x) => {
        currentTimeSeconds++;
        setTimeSeconds(currentTimeSeconds);
      });
    } else {
      intervalPerSecondsSubscription.current?.unsubscribe();
    }
  };

  return (
    <div>
      <h1>useRef Component</h1>
      <h1>{timeSeconds} s</h1>
      <button
        onClick={() => onClick(timeSeconds, isRunning)}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};
