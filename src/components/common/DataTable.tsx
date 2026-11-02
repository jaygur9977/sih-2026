import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
  pageSize?: number;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  selectedRowId?: string | number;
  getRowId?: (item: T) => string | number;
}

export function DataTable<T>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search records...',
  pageSize = 10,
  emptyMessage = 'No records found',
  onRowClick,
  selectedRowId,
  getRowId,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = React.useMemo(() => {
    if (!search || !searchKey) return data;
    return data.filter((item) => {
      const val = item[searchKey];
      if (val === undefined || val === null) return false;
      return String(val).toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search, searchKey]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="w-full space-y-3">
      {searchKey && (
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full rounded-md bg-white border border-slate-300 pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filteredData.length}</span> rows
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`px-3 py-2.5 ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => {
                const rowId = getRowId ? getRowId(item) : idx;
                const isSelected = selectedRowId !== undefined && selectedRowId === rowId;
                return (
                  <tr
                    key={rowId}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={`transition-colors ${
                      onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''
                    } ${isSelected ? 'bg-blue-50/80 font-medium' : ''}`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-3 py-2.5 text-slate-700 ${
                          col.align === 'right'
                            ? 'text-right'
                            : col.align === 'center'
                            ? 'text-center'
                            : 'text-left'
                        }`}
                      >
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 text-slate-600" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
