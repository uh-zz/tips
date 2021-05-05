import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { Button, StyleSheet, Text, View　} from 'react-native';
import { interval } from 'rxjs';
import { Item, Input, Label } from 'native-base'




export default App = () =>{
  const [leftTimeSeconds,setLeftTimeSeconds] = useState(0)
  const [isStarted,setIsStarted] = useState(false)

  
  const onPress = () =>{
    setIsStarted(!isStarted)
  }
  
  const intervalSubscriber = useRef()
  useEffect(() => {
    // useEffectはisStartedの値が変更された時しか実行されないので
    // 代わりにintervalの中で参照する値valueを定義する必要がある。
    let value = leftTimeSeconds
    if(isStarted){
      intervalSubscriber.current = interval(1000).subscribe(x=>{
        if(value === 0){
          alert("Time up!")
          intervalSubscriber.current.unsubscribe()
          return
        }
        value--
        setLeftTimeSeconds(value)
      })
      return () => {
        intervalSubscriber.current.unsubscribe()
      };
    }else{
      return ()=>{
      }
    }
  },[isStarted]);



  
  const leftTimeDisplay = isStarted?<Text>{leftTimeSeconds}</Text>:(
    <Item floatingLabel style={styles.input}>
            <Label>Set Seconds</Label>
            <Input 
              value={leftTimeSeconds.toString()}
              keyboardType="numbers-and-punctuation" 
              onChangeText={
                (ev)=>{
                  let value = Number(ev)
                  if(isNaN(value) || value < 0 ){
                    value = 0 
                  }
                  setLeftTimeSeconds(value)
                }
              }
            />
      </Item>
    
    )
    
    return(
      <View style={styles.container}>
        {leftTimeDisplay}
        <Button title={isStarted?'Stop':'Start'} onPress={ev => onPress() } />
        <StatusBar style="auto" />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width:200,
    height:40,
    margin:50,
  },
})