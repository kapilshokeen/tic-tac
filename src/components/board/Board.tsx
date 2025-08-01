import { useState, type PropsWithoutRef, type ReactElement } from "react";
import { BoardLine, type BoardLineState } from "./BoardLine";
import { BoardSizeInput } from "./BoardSizeInput";

export type BoardState = {[key: number]: BoardLineState};

function checkForResult(player: 'X'|'O', state: BoardState, size: number) {
  let diagonalPass1 = true;
  let diagonalPass2 = true;
  for (let i = 0; i < size; i++) {
    let rowPass = true;
    let columnPass = true;
    for (let j = 0; j < size; j++) {
      if (state?.[i]?.[j] != player) {
        rowPass = false;
      }
      if (state?.[j]?.[i] != player) {
        columnPass = false;
      }
      if (i == j && state?.[i]?.[j] != player) {
        diagonalPass1 = false;
      }
      if ((size - (i + j)) == 1 && state?.[i]?.[j] != player) {
        diagonalPass2 = false;
      }
    }
    if (rowPass || columnPass) {
      return true;
    }
  }
  if (diagonalPass1 || diagonalPass2) {
    return true;
  }
  return false;
}

export function Board(props: PropsWithoutRef<{defaultSize: number}>) {
  const [boardValue, setValue] = useState({} as BoardState);
  const [size, setSize] = useState(props.defaultSize);
  const [isXTurn, setIsXTurn] = useState(true);
  const [playerResult, setPlayerResult] = useState('' as 'X'|'O'|'');
  const onResetClick = () => {
    setValue({});
    setPlayerResult('');
  };
  const onClickHandler = (boardLineIndex: number, squareIndex: number) => {
    const newValue = isXTurn ? 'X' : 'O';
    const boardLineValue = boardValue?.[boardLineIndex] ?? {};
    const newBoardValue: BoardState = {
      ...boardValue,
      [boardLineIndex]: {
        ...boardLineValue,
        [squareIndex]: newValue
      }
    };
    setValue(newBoardValue);
    if (checkForResult(isXTurn ? 'X' : 'O', newBoardValue, size)) {
      setPlayerResult(isXTurn ? 'X' : 'O');
    }
    else {
      setIsXTurn(!isXTurn);
    }
  };
  const boardLineList: ReactElement[] = [];
  for (let boardLineIndex = 0; boardLineIndex < size; boardLineIndex++) {
    boardLineList[boardLineIndex] = (
      <BoardLine
        key={boardLineIndex}
        size={size}
        value={boardValue[boardLineIndex]}
        onClickHandler={(squareIndex) => onClickHandler(boardLineIndex, squareIndex)}
        gameover={!!playerResult}
      />
    );
  }
  return (
    <>
      {playerResult ? `${playerResult} is winner !` : ''}
      <br/>
      {boardLineList}
      <div className="mt10">
        <BoardSizeInput onSizeSelect={(value) => setSize(value)} disabled={!!playerResult} />
        <button className="ui grey basic button ml10" disabled={!!playerResult} onClick={() => onResetClick()}>Reset</button>
      </div>
    </>
  );
}
