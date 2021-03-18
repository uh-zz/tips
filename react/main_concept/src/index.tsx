import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Calculator from './liftUp'
import reportWebVitals from './reportWebVitals';
import EventEmitter from 'node:events';

type User ={
  firstName:string,
  lastName:string,
}


const user:User = {
  firstName:'Michael',
  lastName:'NakZ'
}
const name = 'NakZ'

function formatName(user:User){
  return `${user.firstName} ${user.lastName}`
}

function getGreeting(user:User|undefined){
  if(user){
    return(
      <h1>Hello, {formatName(user)}!</h1>
    )
  }
  return <h1>Hello, Stranger.</h1>
}
// ReactDOM.render(
//   getGreeting(undefined),
//   document.getElementById('root'),
// );

const element:JSX.Element = <h1>Hello, {formatName(user)}</h1>
// ReactDOM.render(
//   element,
//   document.getElementById('root'),
// );

const element_input:JSX.Element = <input value={user.firstName}></input>
// ReactDOM.render(
//   element_input,
//   document.getElementById('root'),
// );



// : React.DetailedReactHTMLElement<{
//   className: string;
// }, HTMLElement>
// のはJSX.Elementの実装
const element_obj:JSX.Element = React.createElement(
  'h1',
  {className:'greeting'},
  'Hello, world!'
)
// ReactDOM.render(
//   element_obj,
//   document.getElementById('root'),
// );

function tick(){
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element,document.getElementById('root'))
}
// 毎秒書き換えているけど時間を表示している部分しか更新してない
// すごい
// setInterval(tick,1000)

type WelcomeProps = {
  name:string
}
// コンポーネント名はつねに大文字で始めること
class Welcome extends React.Component<WelcomeProps> {
  // Propsはreadonlyだからエラーが起こる(Immutable)
  // handle_props(){
  //   // Cannot assign to 'name' because it is a read-only property.  
  //   this.props.name += "NakZ"
  // }
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
// const component_element = <Welcome name="NakZ"/>
// ReactDOM.render(
//   component_element,
//   document.getElementById('root')
// )

// コンポーネントの中にコンポーネントを作る
function ManyWelcome(){
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  )
}
// ReactDOM.render(
//   <ManyWelcome />,
//   document.getElementById('root')
// )
type ClockProps = {
  // date:Date,
}
type ClockState = {
  date:Date,
}
// クラスベースのコンポーネントはrender()メソッドを持つ必要がある。
class Clock extends React.Component<ClockProps,ClockState>{
  // Class components should always call the base constructor with props.
  timerID:NodeJS.Timeout|undefined
  constructor(props:ClockProps){
    super(props)
    this.state = {date:new Date()}
  }
  tick(){
    this.setState({
      date:new Date()
    })
  }
  componentDidMount(){
    this.timerID = setInterval(
      ()=>{
        this.tick()
      },100
    )
  }
  componentWillUnmount(){
    if (this.timerID){
      clearInterval(this.timerID)
    }
  }

  render():JSX.Element{
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

// ReactDOM.render(
//   <Clock  />,
//   document.getElementById('root')
// );
/**
 * 1. When <Clock /> is passed to ReactDOM.render(), 
 * React calls the constructor of the Clock component. 
 * Since Clock needs to display the current time, 
 * it initializes this.state with an object including the current time. 
 * We will later update this state.
 * 
 * 2. When <Clock /> is passed to ReactDOM.render(), 
 * React calls the constructor of the Clock component. 
 * Since Clock needs to display the current time, 
 * it initializes this.state with an object including the current time. 
 * We will later update this state.
 * 
 * 3. When the Clock output is inserted in the DOM, 
 * React calls the componentDidMount() lifecycle method. 
 * Inside it, the Clock component asks the browser to set up 
 * a timer to call the component’s tick() method once a second.
 * 
 * 4. Every second the browser calls the tick() method. 
 * Inside it, the Clock component schedules 
 * a UI update by calling setState() with an object containing the current time. 
 * Thanks to the setState() call, 
 * React knows the state has changed, 
 * and calls the render() method again to learn 
 * what should be on the screen. 
 * This time, this.state.date in the render() method will be different, 
 * and so the render output will include the updated time. 
 * React updates the DOM accordingly.
 * 
 * 5. If the Clock component is ever removed from the DOM, 
 * React calls the componentWillUnmount() lifecycle method 
 * so the timer is stopped. 
 * 
 * 
 * 
 * There are three things you should know about setState().
 * 
 * 1. Do Not Modify State Directly, use setState()
 * The only place where you can assign this.state is the constructor.
 * 
 * 2. State Updates May Be Asynchronous.
 * React may batch multiple setState() calls into a single update for performance.
 * For example, this code may fail to update the counter:
 * // Wrong
 *  this.setState({
 *    counter: this.state.counter + this.props.increment,
 *  });
 * To fix it, use a second form of setState() 
 * that accepts a function rather than an object. 
 * That function will receive the previous state as the first argument, 
 * and the props at the time the update is applied as the second argument:
 * // Correct
 *  this.setState((state, props) => ({
 *    counter: state.counter + props.increment
 *  }));
 * 
 * 3. State Updates are Merged
 */

/**
 * HTMLでは
 * <button onclick="activateLasers()">
 *  Activate Lasers
 * </button>
 * って書くけど
 * Reactでは
 * <button onClick={activateLasers}>
 * Activate Lasers
 * </button>
 * こう。
 * 
 * HTMLでデフォルトの挙動を変更する時はこう書く
 * <a href="#" onclick="console.log('The link was clicked.'); return false">
 *  Click me
 * </a>
 * でもReactだとこう書く
 * function ActionLink() {
 * function handleClick(e) {
 *   e.preventDefault();
 *   console.log('The link was clicked.');
 *  }

 *  return (
 *    <a href="#" onClick={handleClick}>
 *      Click me
 *    </a>
 *  );
 * }
 */

type ToggleProps = {

}
type ToggleState ={
  isToggleOn:boolean
}
interface IClick{
  handleClick():void
}

 class Toggle extends React.Component<ToggleProps,ToggleState> implements IClick {
  constructor(props:ToggleProps) {
    super(props);
    this.state = {isToggleOn: true};
    // this.handleClick = this.handleClick.bind(this);
  }

  /**アロー関数使うと.bind(this)しなくて済む 
   * 一応、パフォーマンスの観点からこっちのほうが下の方法よりいいらしい
  */
  handleClick = ()=>{
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  // render = ()=> {
  //   return (
  //     <button onClick={this.handleClick}>
  //       {this.state.isToggleOn ? 'ON' : 'OFF'}
  //     </button>
  //   );
  
  // }

  // handleClick(){
  //   this.setState(state => ({
  //     isToggleOn: !state.isToggleOn
  //     })
  //   )
  // }
  // render(){
  //   return(
  //     <button onClick={()=>{this.handleClick()}}>{this.state.isToggleOn ? 'ON':'OFF'}</button>
  //   )
  // }
  // イベントのハンドルはこういう書き方もできる。
  // <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// 
}

// ReactDOM.render(
//   <Toggle />,
//   document.getElementById('root')
// );

// これは何故か表示される
// 使わない方が良さそう
function Falsy() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
// ReactDOM.render(
//   <Falsy></Falsy>,
//   document.getElementById("root")
// )

// 三項演算子も使える
function Login() {
  const isLoggedIn = 1
  return (
    <div>
      {isLoggedIn
        ? <Toggle />
        : <Falsy />
      }
    </div>
  );
}

// リストっぽく並べたい時はmapを使う
// const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) =>
//   <li>{number}</li>
// );
// ReactDOM.render(
//   <ul>{listItems}</ul>,
//   document.getElementById('root')
// );

type NumberProps={
  numbers:number[]
}

function NumberList(props:NumberProps) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//   <NumberList numbers={numbers} />,
//   document.getElementById('root')
// );

type NameProps = {
  
}
type NameState = {
  value:string
}

class NameForm extends React.Component<NameProps,NameState> {
  constructor(props:NameProps){
    super(props)
    this.state = {value:''}
  }

  handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({value:event.target.value})
    // 何をしてもNakZ
    // this.setState({value:'NakZ'})

    // alert('A name was submitted: ' + this.state.value)
  }
  handleSubmit:React.FormEventHandler<HTMLFormElement> = (event:React.FormEvent<HTMLFormElement>) =>{
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label >
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

// ReactDOM.render(
//   <NameForm />,
//   document.getElementById('root')
// )

type EssayProps = {

}

type EssayState = {
  value:string
}

class EssayForm extends React.Component<EssayProps,EssayState> {
  constructor(props:EssayProps){
    super(props)
    this.state ={
      value:'Please write an essay about your favorite DOM element.'
    }
  }

  // 定義のところに書けば、eventの型とかは推論してくれるよ
  handleChange:React.ChangeEventHandler<HTMLTextAreaElement> = (event)=>{
    this.setState({
      value:event.target.value
    })
  }

  handleSubmit:React.FormEventHandler<HTMLFormElement> = (event) => {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// ReactDOM.render(
//   <EssayForm />,
//   document.getElementById('root')
// )

type FlavorProps = {

}

type FlavorState = {
  value:string
}

class FlavorForm extends React.Component<FlavorProps,FlavorState> {
  constructor(props:FlavorProps) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange:React.ChangeEventHandler<HTMLSelectElement> = (event)=> {
    this.setState({value: event.target.value});
  }

  handleSubmit:React.FormEventHandler<HTMLFormElement> =  (event) => {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select multiple={true} value={[this.state.value,"mango"]} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


// ReactDOM.render(
//   <FlavorForm />,
//   document.getElementById('root')
// )

type ReservationProps ={}
type ReservationState ={
  isGoing:boolean
  numberOfGuests:number
  [name:string]:boolean|number|string
}

class Reservation extends React.Component<{},ReservationState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

  }

  handleInputChange:React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]:value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}


function MyApp(props:{}){
  return(
    <div>
      <FlavorForm />
      <form action="">
        <select multiple={true} value={['B', 'C']}>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <input type="file" />
        これは好きに編集できる<input value={undefined} />
      </form>
      <Reservation/>
      <Calculator/>

    </div>
    
  )
}

ReactDOM.render(
  <MyApp />,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
