import { CSSProperties, FC, memo, useMemo, useState } from "react";
import { getColor } from "../../utils/getColor";
import { useGetCellValue, useSetSelectedColumn, useUpdateColumn } from "../../store/index";

interface ColumnCellProps {
  dateKey: string;
  refKey: string;
  style: CSSProperties;
  columnIndex: number;
  rowIndex: number;
  highlightCell: (rowIndex: number, columnIndex: number) => void;
}

const ColumnCell: FC<ColumnCellProps> = memo(({ dateKey, refKey, style, columnIndex, rowIndex, highlightCell }) => {
  const getCellValue = useGetCellValue();
  const updateColumn = useUpdateColumn();
  const setSelectedColumn = useSetSelectedColumn();

  const item = getCellValue(refKey, dateKey);
  const [value, setValue] = useState(String(item.MakeToOrder || 0));

  /**
   * Calculate the background color based on the values and zones
   */
  const cellColor = useMemo(() => {
    return getColor(item.NetFlow, Number(value), {
      redZone: item.RedZone,
      yellowZone: item.YellowZone,
      greenZone: item.GreenZone,
    });
  }, [value]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(String(newValue));
    updateColumn(refKey, dateKey, newValue);
  };

  /**
   * Handles the click on the cell to highlight the row/column and set the selected row
   */
  const handleClick = () => {
    highlightCell(rowIndex, columnIndex);
    setSelectedColumn(dateKey);
  };

  return (
    <div
      className={`relative h-[30px] text-sm border-border border-l border-t ${cellColor}`}
      style={style}
      data-column={columnIndex}
      data-row={rowIndex}
    >
      <input
        type="number"
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        className="
          w-full h-full text-foreground outline-none [appearance:textfield]
          [&::-webkit-inner-spin-button]:appearance-none
          transition-all duration-200 text-center
        "
      />
    </div>
  );
});

export default ColumnCell;
