import { create } from "zustand";
import { Store } from "../types/types";
import { createActions } from "./actions";
import { useShallow } from "zustand/shallow";

const useStore = create<Store>((set, get) => ({
  isLoading: true,
  groupedData: { references: [], dates: [], columns: {} },
  selectedColumn: {},
  actions: createActions(set, get),
}));

export const useGroupedData = () =>
  useStore(
    useShallow((state) => ({
      references: state.groupedData.references,
      dates: state.groupedData.dates,
    }))
  );

export const useGetCellValue = () =>
  useStore((state) => state.actions.getCellValue);

export const useUpdateColumn = () =>
  useStore((state) => state.actions.updateColumn);

export const useSetSelectedColumn = () =>
  useStore((state) => state.actions.setSelectedColumn);

export const useSelectedColumn = () =>
  useStore((state) => state.selectedColumn);

export const useIsLoading = () => useStore((state) => state.isLoading);

export const useLoadData = () => useStore((state) => state.actions.loadData);
