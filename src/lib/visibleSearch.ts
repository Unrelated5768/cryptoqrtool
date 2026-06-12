export const defaultVisibleSearchPageSize = 12;

export function filterVisibleSearchRows<T>(rows: T[], query: string, getSearchText: (row: T) => string): T[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return rows;
  return rows.filter((row) => getSearchText(row).toLowerCase().includes(normalizedQuery));
}

export function getVisibleSearchRows<T>(rows: T[], visibleCount: number): T[] {
  return rows.slice(0, visibleCount);
}

export function getHiddenSearchRowCount(totalCount: number, visibleCount: number): number {
  return Math.max(totalCount - visibleCount, 0);
}

export function getNextVisibleSearchCount(
  visibleCount: number,
  totalCount: number,
  pageSize = defaultVisibleSearchPageSize
): number {
  return Math.min(visibleCount + pageSize, totalCount);
}

export function getSearchInputValue(event: Event): string {
  return event.currentTarget instanceof HTMLInputElement ? event.currentTarget.value : '';
}
