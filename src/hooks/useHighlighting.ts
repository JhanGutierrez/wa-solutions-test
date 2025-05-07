import { RefObject, useCallback, useMemo, useRef } from "react";
import { throttle } from "throttle-debounce";
import { applyHighlightingToTable } from "../utils/highlightUtils";

export function useHighlighting(
  tableRef: RefObject<HTMLDivElement | null>,
  throttleTime: number = 400
) {
  const selectedRowRef = useRef<number | null>(null);
  const selectedColumnRef = useRef<number | null>(null);

  const applyHighlighting = useCallback(() => {
    const row = selectedRowRef.current;
    const col = selectedColumnRef.current;
    const table = tableRef.current;

    if (!table) return;

    applyHighlightingToTable(table, row, col);
  }, [tableRef]);

  /**
   * Throttled version of the highlighting function to avoid too many DOM updates during scroll
   */
  const throttledHighlight = useMemo(
    () => throttle(throttleTime, applyHighlighting),
    [applyHighlighting]
  );

  const highlightCells = useCallback(
    (row: number | null, col: number) => {
      if (row !== null) selectedRowRef.current = row;
      selectedColumnRef.current = col;
      applyHighlighting();
    },
    [applyHighlighting]
  );

  return { highlightCells, throttledHighlight };
}
