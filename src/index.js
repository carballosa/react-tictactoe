import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({value, onClick}) {
  return (
    <button className="square" onClick={onClick} >{value}</button>
  );
}

function Board({squares, onClick}) {
  return (
    <div>
      {[0,1,2].map(j =>
        <div className="board-row" key={j}>
          {[0,1,2].map(i =>
            <Square key={i}
              value={squares[i+3*j]}
              onClick={onClick(i+3*j)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
class Game extends React.Component {
  state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    nextPlayer: 'X',
    winner: null,
    stepNumber: 0,
  }
  status = `Next player: X`;
  backTo = (step) => {
    this.setState({
      nextPlayer: (step % 2) ? 'O' : 'X',
      winner: null,
      stepNumber: step,
    });
  };
  handleClick = (i) => () => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let squares = current.squares;
    if (this.state.winner || squares[i]) return;
    squares = squares.slice(); // clone
    const player = this.state.nextPlayer;
    squares[i] = player;
    const winner = calculateWinner(squares);
    const nextPlayer = (player  === 'X') ? 'O' : 'X';
    this.status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;
    this.setState({
      history: history.concat([{ squares }]),
      nextPlayer,
      winner,
      stepNumber: history.length,
    });
  };
  render() {
    const history = this.state.history;
    const current = history[history.length-1];
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{this.status}</div>
          <ol>
            {history.map((step, move) =>
              <li key={move}>
                <button onClick={() => this.backTo(move)} >
                  {`go back to ${(!move)?'start':'step '+move}`}
                </button>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
