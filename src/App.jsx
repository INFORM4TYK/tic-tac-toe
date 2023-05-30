import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [boardData, setBoardData] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    for (let i = 0; i < boardData.length; i++) {
      if (boardData[i] === null) {
        setIsFull(false);
        return;
      }
    }
    setIsFull(true);
  }, [boardData]);

  const checkForWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [6, 4, 2],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        return "Winner is " + boardData[a];
      }
    }
    if (isFull) {
      return "Draw ";
    }
  };
  const switchPlayer = () => {
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

  const updateBoard = (index) => {
    const newBoardData = [...boardData];
    if (newBoardData[index] === null) {
      newBoardData[index] = player;
      setBoardData(newBoardData);
      switchPlayer();
    }
  };

  function Tile({ index, tile }) {
    return (
      <div className="Tile" onClick={() => updateBoard(index)}>
        <h1>{tile}</h1>
      </div>
    );
  }

  function Board() {
    return (
      <div className="Board">
        {boardData.map((tile, index) => {
          return <Tile key={index} index={index} tile={tile} />;
        })}
      </div>
    );
  }

  function Reset() {
    setBoardData(Array(9).fill(null));
    setPlayer("X");
  }

  return (
    <>
      {checkForWinner() ? <h1>{checkForWinner()}</h1> : null}
      <Board />
      <button onClick={Reset}>Reset</button>
    </>
  );
}

export default App;
