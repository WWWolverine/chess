import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";
import LostFigures from "./LostFigures";
import LostFigures1 from "./LostFigures1";
interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className="container">
      <h1>Текущий игрок:{currentPlayer?.color}</h1>

      <div className="BoardRadius">
        <div className="Boarder">
          <div className="board">
            {board.cells.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((cell) => (
                  <CellComponent
                    click={click}
                    cell={cell}
                    key={cell.id}
                    selected={
                      cell.x === selectedCell?.x && cell.y === selectedCell?.y
                    }
                  />
                ))}
              </React.Fragment>
            ))}
            <div>
              <LostFigures
                title="Черные фигуры"
                figures={board.lostBlackFigures}
              />
              <LostFigures1
                title="Белые фигуры"
                figures={board.lostWhiteFigures}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardComponent;
