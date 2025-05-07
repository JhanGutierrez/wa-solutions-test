import { Store, Actions } from "../types/types";
import { processGroupedData } from "./process";
import { Datos as data } from "../data/exampleData.json";
import { StateCreator } from "zustand";

type Setter = Parameters<StateCreator<Store>>[0];
type Getter = Parameters<StateCreator<Store>>[1];

export const createActions = (set: Setter, get: Getter): Actions => ({
  loadData: async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 500)); //500 just for testing
    const grouped = processGroupedData(data);
    set({ groupedData: grouped, isLoading: false });
  },

  getCellValue: (reference, date) => get().groupedData.columns[date][reference],

  setSelectedColumn: (date: string) => {
    const prev = Object.values(get().selectedColumn)[0];
    if (prev?.VisibleForecastedDate === date) return;
    set({ selectedColumn: get().groupedData.columns[date] });
  },

  updateColumn: (reference, date, value) => {
    const { columns } = get().groupedData;
    const updatedCol = {
      ...columns[date],
      [reference]: { ...columns[date][reference], MakeToOrder: value },
    };

    const sel = get().selectedColumn;
    const updatedColumn = sel[reference]
      ? { ...sel, [reference]: { ...sel[reference], MakeToOrder: value } }
      : sel;

    set({
      groupedData: {
        ...get().groupedData,
        columns: { ...columns, [date]: updatedCol },
      },
      selectedColumn: updatedColumn,
    });
  },
});
