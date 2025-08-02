import type { PropsWithoutRef } from "react";

const MAX_SIZE = 10;

export function BoardSizeInput({onSizeSelect, disabled}: PropsWithoutRef<{onSizeSelect: (size: number) => void; disabled: boolean;}>) {
  const optionsList = [];
  for (let i = 1; i <= MAX_SIZE; i++) {
    optionsList.push(<option value={i}>Size {i}</option>);
  }
  return (
    <select
      className={`ui dropdown ${disabled? 'disabled' : ''}`}
      disabled={disabled}
      onInput={(ev) => onSizeSelect(Number((ev.target as HTMLSelectElement)?.value))}
    >
      {optionsList}
    </select>
  );
}