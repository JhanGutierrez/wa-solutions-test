import { CSSProperties, FC, memo } from "react";
import { useSetSelectedColumn } from "../../store/index";

interface HeaderCellProps {
  date: string;
  style: CSSProperties;
  columnIndex: number;
  highlightCell: (rowIndex: number | null, columnIndex: number) => void;
}

const HeaderCell: FC<HeaderCellProps> = memo(
  ({ date, style, columnIndex, highlightCell }) => {
    const setSelectedColumn = useSetSelectedColumn();

    const formattedDate = new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    /**
     * Handle click on header cell to highlight the entire column and select the row corresponding to this date
     */
    const handleClick = () => {
      highlightCell(null, columnIndex);
      setSelectedColumn(date);
    };

    return (
      <div
        className="flex items-center justify-center h-[40px] font-bold text-md text-center border-border border-b border-r hover:bg-muted/50 cursor-pointer header-cell"
        style={style}
        data-column={columnIndex}
        onClick={handleClick}
      >
        {formattedDate}
      </div>
    );
  }
);

export default HeaderCell;
