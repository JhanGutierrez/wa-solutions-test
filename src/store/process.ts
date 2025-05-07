import { DataItem, GroupedData } from "../types/types";

export const processGroupedData = (data: DataItem[]): GroupedData => {
  if (!data.length) return { references: [], dates: [], columns: {} };
  const referenceSet = new Set<string>();
  const columns: Record<string, Record<string, DataItem>> = {};

  for (const item of data) {
    referenceSet.add(item.Reference);
    if (!columns[item.VisibleForecastedDate])
      columns[item.VisibleForecastedDate] = {};
    columns[item.VisibleForecastedDate][item.Reference] = item;
  }

  return {
    references: Array.from(referenceSet),
    dates: Object.keys(columns).sort(),
    columns,
  };
};
