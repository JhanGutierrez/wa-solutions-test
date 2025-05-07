export interface DataItem {
  Reference: string;
  VisibleForecastedDate: string;
  NetFlow: number;
  GreenZone: number;
  YellowZone: number;
  RedZone: number;
  MakeToOrder: number;
}

export interface GroupedData {
  references: string[];
  dates: string[];
  columns: Record<string, Record<string, DataItem>>;
}

export interface Actions {
  loadData: () => Promise<void>;
  getCellValue: (reference: string, date: string) => DataItem;
  setSelectedColumn: (date: string) => void;
  updateColumn: (reference: string, date: string, value: number) => void;
}

export interface Store {
  groupedData: GroupedData;
  selectedColumn: Record<string, DataItem>;
  isLoading: boolean;
  actions: Actions;
}
