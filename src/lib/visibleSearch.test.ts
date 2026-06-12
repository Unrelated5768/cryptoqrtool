import { describe, expect, it } from 'vitest';
import {
  filterVisibleSearchRows,
  getHiddenSearchRowCount,
  getNextVisibleSearchCount,
  getVisibleSearchRows
} from './visibleSearch';

describe('visible search helpers', () => {
  const rows = [
    { name: 'Monero', symbol: 'XMR' },
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Ethereum', symbol: 'ETH' }
  ];

  it('filters rows with normalized query text', () => {
    expect(filterVisibleSearchRows(rows, ' xmr ', (row) => `${row.name} ${row.symbol}`)).toEqual([rows[0]]);
    expect(filterVisibleSearchRows(rows, '', (row) => `${row.name} ${row.symbol}`)).toBe(rows);
  });

  it('calculates visible and hidden row counts', () => {
    expect(getVisibleSearchRows(rows, 2)).toEqual(rows.slice(0, 2));
    expect(getHiddenSearchRowCount(rows.length, 2)).toBe(1);
    expect(getHiddenSearchRowCount(rows.length, 4)).toBe(0);
  });

  it('advances visible count without passing the available row count', () => {
    expect(getNextVisibleSearchCount(12, 30)).toBe(24);
    expect(getNextVisibleSearchCount(24, 30)).toBe(30);
  });
});
