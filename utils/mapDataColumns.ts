import { BREAKPOINTS } from "./constant";

export const mapDataColumns = (data: any[][], windowSize: number) => {
  const columns = getColumnCount(windowSize);
  const columnData: any[][] = Array.from({ length: columns }, () => []);

  for (let i = 0; i < data.length; i++) {
    const columnIndex = i % columns;
    columnData[columnIndex].push(data[i]);
  }
  return columnData;
};

export const getColumnCount = (windowWidth: number) => {
  if (windowWidth < BREAKPOINTS.sm) {
    return 1; // sm
  } else if (windowWidth < BREAKPOINTS.md) {
    return 2; // md
  } else if (windowWidth < BREAKPOINTS.lg) {
    return 3; // lg
  } else {
    return 4; // Default for larger screens
  }
};
