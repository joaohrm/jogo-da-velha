import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import * as deriveUtils from "./derive-utils.js";

const PLAYERS = {
    X: 'Jogador 1',
    O: 'Jogador 2'
};

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  const [ players, setPlayers ] = useState(PLAYERS);

  const activePlayer = deriveUtils.deriveActivePlayer(gameTurns);
  const gameBoard = deriveUtils.deriveGameBoard(gameTurns);
  const winner = deriveUtils.deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = deriveUtils.deriveActivePlayer(prevTurns);
      const updateTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updateTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }
  
  return (
    <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player initialName={ PLAYERS.X } symbol="X" isActive={ activePlayer === 'X' } onChangeName={ handlePlayerNameChange } />
                <Player initialName={ PLAYERS.O } symbol="O" isActive={ activePlayer === 'O' } onChangeName={ handlePlayerNameChange } />
            </ol>
            { (winner || hasDraw) && <GameOver winner={ winner } onRestart={ handleRestart } />}
            <GameBoard onSelectSquare={ handleSelectSquare } board={ gameBoard } />
        </div>
        <Log turns={ gameTurns }/>
    </main>
  )
}

export default App
