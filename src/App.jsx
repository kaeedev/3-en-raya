
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS} from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Tablero } from './components/Tablero.jsx'


//Dibujar el tablero. Utilizaremos el indice para saber las posiciones de cada casilla
function App() {

  //Tablero de 9 posiciones. Como deberemos ir actualizando el tablero cada vez que se haga click, necesitamos un state con el valor inicial del tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage? JSON.parse(boardFromStorage) : Array(9).fill(null) //Vemos si tenemos un tablero en localstorage para que inicialice el useState con el y si no pues creamos uno
  })

  //Estado para manejar los turnos. Empieza la X
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X //Lo mismo con los turnos
  })

  //Debemos indicar un ganador para que pare el juego. Null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)


  //para resetear el juego al darle al boton de empezar de nuevo
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    //Reseteamos la localstorage tambien
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  //Funcion para actualizar el tablero
  const updateBoard = (index) => {
    //si en el indice hay algo, no actualizamos la posicion
    if (board[index] || winner) return

    const newBoard = [...board] //Actualizamos el tablero, guardando donde se hizo click gracias al indice
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X //Al actualizar el tablero, hay que actualizar los turnos
    setTurn(newTurn) //Pasamos el nuevo valor del turno al set

    //guardar partida. El turno y el tablero
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return(
    <main className='board'>
      <h1>3 en raya</h1>
      <button onClick={resetGame}>Reset del juego</button>

      <Tablero board={board} updateBoard={updateBoard}/>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
