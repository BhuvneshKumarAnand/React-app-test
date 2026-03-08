import { useState } from "react";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";

    setBoard(newBoard);
    setXTurn(!xTurn);
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : board.every(Boolean)
          ? "Draw!"
          : `Turn: ${xTurn ? "X" : "O"}`}
      </div>

      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            className="cell"
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="restart" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}