import {
  Row,
  CellContent,
  Item,
  CellValue,
  Column,
  Filter,
  Sort,
} from "./types";

export function getSorting(
  columns: Column[],
  sortBy?: string,
  sortAsc?: boolean
): Sort | undefined {
  const index = columns.findIndex(
    (col) => col.sortable && col.label === sortBy
  );
  if (index >= 0) {
    return { index, asc: sortAsc !== undefined ? sortAsc : true };
  }
  return undefined;
}

export function getItems(rows: Row[], columns: Column[]): Item[] {
  return rows.map((row) => ({
    row,
    items: columns.map(
      (col): CellContent => {
        const originalCellValue = row[col.key] as string | undefined;
        let transformedCellValue;
        if (col.fn) {
          transformedCellValue = col.fn(originalCellValue, row);
        }
        return {
          originalCellValue,
          transformedCellValue,
        };
      }
    ),
  }));
}

function isString(value: CellValue): value is string {
  return typeof value === "string";
}

function defaultFn(
  transformed: CellValue,
  original: CellValue,
  filter: string
) {
  const value = transformed || original;
  if (isString(value)) {
    return value.includes(filter);
  }
  return false;
}

export function filterItems(
  items: Item[],
  columns: Column[],
  filters: Filter[]
): Item[] {
  return items.filter((itemRow) => {
    return itemRow.items.every((item, columnIndex) => {
      const filterFn = columns[columnIndex].search;
      const filterValue = filters[columnIndex]?.value;
      if (filterFn && filterValue) {
        return filterFn(
          item.transformedCellValue,
          item.originalCellValue,
          filterValue
        );
      }
      if (filterValue) {
        return defaultFn(
          item.transformedCellValue,
          item.originalCellValue,
          filterValue
        );
      }
      return true;
    });
  });
}

export function sortItems(
  items: Item[],
  columns: Column[],
  sorting: Sort | undefined
): Item[] {
  if (sorting?.index === undefined) {
    return items;
  }

  const sortingColumn = columns[sorting.index];

  const sorted = items.sort((leftRow, rightRow) => {
    const leftItem = leftRow.items[sorting.index];
    const rightItem = rightRow.items[sorting.index];

    if (sortingColumn.sort !== undefined) {
      return sortingColumn.sort(
        leftItem.transformedCellValue,
        leftItem.originalCellValue,
        rightItem.transformedCellValue,
        rightItem.originalCellValue
      );
    }

    const leftValue =
      leftItem.transformedCellValue || leftItem.originalCellValue;
    const rightValue =
      rightItem.transformedCellValue || rightItem.originalCellValue;

    if (isString(leftValue) && isString(rightValue)) {
      if (leftValue > rightValue) {
        return 1;
      }
      if (leftValue < rightValue) {
        return -1;
      }
    }
    return 0;
  });

  return sorting.asc ? sorted : [...sorted].reverse();
}
