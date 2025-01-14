//Componente casilla. updateBoard porque deberemos actualizar las casillas. isSelected para saber de quien es el turno, si X o O
export const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    //Para actualizar el tablero al hacer click
    const handleClick = () => {
      updateBoard(index)
    }
    return(
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }