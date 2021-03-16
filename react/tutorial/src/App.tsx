import React from 'react';
import logo from './logo.svg';
import './App.css';

type SquareProps = {
  value:string|undefined
  onClick:()=>void
}
// type SquareState = {
//   value:string|undefined,
// }

// class Square extends React.Component<SquareProps,SquareState>{

//   constructor(props:SquareProps){
//     super(props)
//     this.state = {
//       value:undefined,
//     }
//   }

//   render():JSX.Element{
//     return(
//       <button 
//       className="square"
//       onClick={()=>{this.props.onClick()}}
//       >
//         {this.state.value}
//       </button>
//     )
//   }
// }

// Replace the Square class with this function
function Square(props:SquareProps):JSX.Element{
  return (
    <button
      className="square"
      onClick ={props.onClick}
    >
      {props.value}
    </button>
  )
}

type BoardProps = {
  squares: (string|undefined)[]
  onClick:(i:number)=>void
}
// type BoardState = {
//   squares: (string|undefined)[]
//   xIsNext:boolean
// }

class Board extends React.Component<BoardProps> {
  constructor(props:BoardProps){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext : true
    }
  }

  renderSquare(i:number):JSX.Element {
    return (
    <Square 
      value={this.props.squares[i]} 
      onClick ={()=>{this.props.onClick(i)}}
    />
    )
  }

  render():JSX.Element {
    
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

type GameProps ={

}
type GameState ={
  history:{squares:(string|undefined)[]}[]
  xIsNext: boolean
  stepNumber: number,
}

export class Game extends React.Component<GameProps,GameState> {
  constructor(props:GameProps){
    super(props)
    this.state ={
      history:[{
        squares: Array(9).fill(null)
      }],
      xIsNext : true,
      stepNumber: 0,
    }
  }
  handleClick(i:number){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1]
    const squares = current.squares.slice()
    if(calculateWinner(squares)||squares[i]){
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history:history.concat([{
        squares:squares
      }]),
      stepNumber: history.length,
      xIsNext:!this.state.xIsNext,
    })
  }
  jumpTo(step:number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render():JSX.Element {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status:string
    if(winner){
      status = `Winner: ${winner}`
    }else{
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i)=>{this.handleClick(i)}}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//         </a>
//       </header>
//     </div>
//   );
// }

function calculateWinner(squares:(string|undefined)[]):string|undefined {
  const lines:number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a]  && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return undefined;
}

// export default App;

