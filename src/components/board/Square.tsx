import type { PropsWithoutRef } from "react";
import styles from "./square.module.scss";

export type SquareState = 'X'|'O'|'';

export function Square(props: PropsWithoutRef<{value: SquareState|undefined, onClickHandler:() => void; gameover: boolean}>) {
  return (
    <div
      className={`${styles['square-box']} ${(props.gameover || props.value) && styles['disabled']}`}
      onClick={() => !(props.value || props.gameover) && props.onClickHandler()}
    >
      {props.value ?? ''}
    </div>
  );
}