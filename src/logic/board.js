
import { WINNER_COMBOS } from "../constants"


//Logica para chequear si hay un ganador
export const checkWinnerFrom = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo //cogemos las posiciones de cada combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

    //logica para revisar si hay empate. Si no hay mas espacios vacios en el tablero
 export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
 }

