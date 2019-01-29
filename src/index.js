import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({value, onClick}) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}



class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    nextPlayer: 'X',
    winner: null
  };
  status = 'Next player: X';
  handleClick = (i) => {
    let squares = this.state.squares;
    if (this.state.winner || squares[i]) return;
    squares = squares.slice(); // clone
    const player = this.state.nextPlayer;
    squares[i] = player;
    const winner = this.calculateWinner(squares);
    const nextPlayer = (player  === 'X') ? 'O' : 'X';
    this.status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;
    this.setState({ squares, nextPlayer, winner });
  };
  calculateWinner(squares) {
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
  render() {
    return (
      <div>
        <div className="status">{this.status}</div>
        {[0,1,2].map(j =>
          <div className="board-row">
            {[0,1,2].map(i =>
              <Square
                value={this.state.squares[i+3*j]}
                onClick={() => this.handleClick(i+3*j)}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
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
  <Game />,
  document.getElementById('root')
);
