import { FC, useCallback, useRef } from "react";
import { FixedSizeGrid, FixedSizeList } from "react-window";
import { useGroupedData } from "../../store/index";
import AutoSizer from "react-virtualized-auto-sizer";
import HeaderCell from "./HeaderCell";
import ColumnCell from "./ColumnCell";
import { useHighlighting } from "../../hooks/useHighlighting";


const Table: FC = () => {
  const { references, dates } = useGroupedData();

  // References to access virtualization components
  const gridRef = useRef<FixedSizeGrid>(null);
  const referenceListRef = useRef<FixedSizeList>(null);
  const dateListRef = useRef<FixedSizeList>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const totalRows = references.length;
  const totalColumns = dates.length;

  const { highlightCells, throttledHighlight } = useHighlighting(tableRef, 400);

  const handleGridScroll = useCallback(
    ({ scrollLeft, scrollTop }: { scrollLeft: number; scrollTop: number }) => {
      if (dateListRef.current) dateListRef.current.scrollTo(scrollLeft);
      if (referenceListRef.current) referenceListRef.current.scrollTo(scrollTop);

      throttledHighlight();
    }, []);

  return (
    <div
      className="rounded-lg border-border border w-full flex"
      style={{ height: totalRows * 30 + 42 }}
      ref={tableRef}
    >
      <div className="flex h-full w-full">
        {/* References column */}
        <div className="w-[200px] h-full">
          <div className="h-[40px] flex items-center justify-center font-bold border-border border-b">
            Reference
          </div>

          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                ref={referenceListRef}
                itemCount={totalRows}
                itemSize={30}
                width={width}
                height={height - 40} // 40px is the height of the header
              >
                {({ index, style }) => (
                  <div
                    style={style}
                    className="reference-cell text-center border-border border-b last:border-b-0"
                    data-row={index}
                  >
                    {references[index]}
                  </div>
                )}
              </FixedSizeList>
            )}
          </AutoSizer>
        </div>

        {/* Main table area */}
        <div className="w-full relative">
          {/* Dates header */}
          <div className="h-[40px]">
            <AutoSizer>
              {({ width, height }) => (
                <FixedSizeList
                  ref={dateListRef}
                  itemCount={totalColumns}
                  itemSize={120}
                  width={width}
                  height={height}
                  layout="horizontal"
                  style={{ overflow: "hidden" }}
                >
                  {({ index, style }) => (
                    <HeaderCell
                      date={dates[index]}
                      style={style}
                      highlightCell={highlightCells}
                      columnIndex={index}
                    />
                  )}
                </FixedSizeList>
              )}
            </AutoSizer>
          </div>

          {/* Main grid of cells */}
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeGrid
                ref={gridRef}
                columnCount={totalColumns}
                rowCount={totalRows}
                columnWidth={120}
                rowHeight={30}
                width={width}
                height={height - 40} // 40px is the height of the header
                onScroll={handleGridScroll}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const dateKey = dates[columnIndex];
                  const refKey = references[rowIndex];

                  return (
                    <ColumnCell
                      dateKey={dateKey}
                      refKey={refKey}
                      style={style}
                      columnIndex={columnIndex}
                      rowIndex={rowIndex}
                      highlightCell={highlightCells}
                    />
                  );
                }}
              </FixedSizeGrid>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
};

export default Table;
