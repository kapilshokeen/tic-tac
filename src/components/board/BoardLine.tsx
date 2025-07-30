import type { PropsWithoutRef, ReactElement } from "react";
import { Square, type SquareState } from "./Square";
import styles from './board-line.module.scss';

export type BoardLineState = {[key: number]: SquareState};

export function BoardLine(props: PropsWithoutRef<{size: number, value: BoardLineState|undefined, onClickHandler: (squareIndex: number) => void; gameover: boolean;}>) {
  const squareList: ReactElement[] = [];
  for (let squareIndex = 0; squareIndex < props.size; squareIndex++) {
    squareList[squareIndex] = <Square key={squareIndex} value={props.value?.[squareIndex]} onClickHandler={() => props.onClickHandler(squareIndex)} gameover={props.gameover} />;
  }
  return (<div className={styles['board-line-container']}>{squareList}<br/></div>);
}
