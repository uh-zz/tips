import React from 'react';
import ReactDOM from 'react-dom';

type TemperatureState = {
}

type BoilingVerdictProps = {
    celsius:number
}
type TemperatureProps ={
    scale:string
    temperature:string
    onTemperatureChange:(temperature:string)=>void
}

const scaleNames:{[key:string]:string} = {
    c:"Celsius",
    f:'Fahrenheit'
}

class TemperatureInput extends React.Component<TemperatureProps,TemperatureState> {
    constructor(props:TemperatureProps){
        super(props)
        this.state = {
        }
    }
    handleChange :React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        this.props.onTemperatureChange(e.target.value)
    }
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
          <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={temperature}
                   onChange={this.handleChange} />
          </fieldset>
        );
      }
}


function BoilingVerdict(props:BoilingVerdictProps) {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}
function toCelsius(fahrenheit:number) {
    return (fahrenheit - 32) * 5 / 9;
}
  
function toFahrenheit(celsius:number) {
return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature:string, convert:(temperature:number)=>number) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

type CalculatorState = 
{
    temperature:string
    scale:'c'|'f'
}

class Calculator extends React.Component<{},CalculatorState>{

    constructor(props:{}){
        super(props)
        this.state = {
            temperature:'',
            scale:'c'
        }
    }

    handleCelsiusChange = (temperature:string) =>{
        this.setState({scale: 'c', temperature});
    }
    handleFahrenheitChange = (temperature:string) => {
        this.setState({scale: 'f', temperature});
    }
    render(){
        const scale = this.state.scale
        const temperature = this.state.temperature
        const celsius = scale === 'f' ? tryConvert(temperature,toCelsius) :temperature
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return(
            <div>
                <TemperatureInput 
                    scale='c'
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput 
                    scale='f'
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict
                    celsius={parseFloat(celsius)}></BoilingVerdict>
            </div>
        )
    }
}

export default Calculator