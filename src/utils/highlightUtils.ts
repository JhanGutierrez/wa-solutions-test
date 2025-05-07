export function applyHighlightingToTable(
  table: HTMLDivElement,
  rowIndex: number | null,
  colIndex: number | null
) {
  removeHighlightedCells(table);

  if (colIndex !== null) getIndexCells(table, "column", colIndex);
  if (rowIndex !== null) getIndexCells(table, "row", rowIndex);
}

const getIndexCells = (table: HTMLDivElement, attr: string, index: number) => {
  return table
    .querySelectorAll(`[data-${attr}="${index}"]`)
    .forEach((el) => el.classList.add(`highlight-${attr}`));
};

const removeHighlightedCells = (table: HTMLDivElement) => {
  table
    .querySelectorAll(".highlight-row, .highlight-column")
    .forEach((el) => el.classList.remove("highlight-row", "highlight-column"));
};
