import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}
//                 >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

//function components are a simpler way to write components
//that only contain a render method and don’t have their own state

//Square component is a controlled components.
//The Board has full control over it
function Square(props) {
  return (

      /* When a Square is clicked,
      the onClick function provided by the Board is called.
      Here’s a review of how this is achieved:
      1. The onClick prop on the built-in DOM <button> component
      tells React to set up a click event listener.
      2. When the button is clicked, React will call the onClick
      event handler that is defined in Square’s render() method.
      3. This event handler calls this.props.onClick().
      The Square’s onClick prop was specified by the Board.
      4. Since the Board passed onClick={() => this.handleClick(i)}
      to Square, the Square calls this.handleClick(i) when clicked */

      //In a class, we used an arrow function to access the correct this value,
      //but in a function component we don’t need to worry about this.
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

    /* To collect data from multiple children,
    or to have two child components communicate with each other,
    you need to declare the shared state in their parent component.
    The parent component can pass the state back down to the children
    by using props; this keeps the child components in sync with each other
    and with the parent component */
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    handleClick(i) {
        //.slice() operator creates a copy of the squares array to modify
        //helps you build pure components in React
        //helps detect changes
        //complex features becomes easy by avoiding direct data manipulation
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });


    }

    renderSquare(i) {
        return (
            <Square
                //we’re passing down two props from Board to Square
                //value and onClick
                value={this.state.squares[i]}
                onClick={ () => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');

        return (
            <div>
                <div className="status">{status}</div>
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

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>, document.getElementById('root'));
