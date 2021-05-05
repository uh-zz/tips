import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { interval } from 'rxjs';


export default class App extends React.Component{

  constructor(){
    super()
    this.state = {
      isStarted:false,
      timeSeconds:10,
    }
    this.intervalSubscriber = null
  }


  onPress = () => {
    if(this.state.isStarted){
      this.intervalSubscriber.unsubscribe()
    }else{
      this.intervalSubscriber = interval(1000).subscribe(
        x=>{
          if(this.state.timeSeconds > 0){
            this.setState({timeSeconds:this.state.timeSeconds -1})
          }else{
            alert("Alert!")
            this.intervalSubscriber.unsubscribe()
            this.setState({isStarted:!this.state.isStarted})
          }
        }
      )
    }
    this.setState({isStarted:!this.state.isStarted})
  }

  render = ()=> {
    return(
      <View style={this.styles.container}>
        <Text>Set Time!</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({timeSeconds:Number(text)})}
          value={this.state.timeSeconds.toString()}
        />
        <Text>{this.state.timeSeconds}</Text>
        <Button title={this.state.isStarted?'Stop':'Start'} onPress={ev => this.onPress() } />

        <StatusBar style="auto" />
    </View>
    )

  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })
}

