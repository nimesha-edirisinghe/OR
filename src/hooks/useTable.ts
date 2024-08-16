import { produce } from 'immer';
import { MouseEvent, useEffect, useState } from 'react';
import { TableHeader } from 'types/responses/viewResponses';

export const useTable = (
  headers: TableHeader[],
  rows: { id?: any; isSelected?: boolean; row: any[] }[] | null,
  freezedColumns: number[],
  isEnableAction: boolean
) => {
  const [headerConfigs, setHeaderConfigs] = useState(headers);
  const [rowConfigs] = useState(rows);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartPageX, setResizeStartPageX] = useState(0);
  const [selectedColumnKey, setSelectedColumnKey] = useState<number | null>(null);
  const [selectedColumnWidth, setSelectedColumnWidth] = useState(0);
  const [_freezedColumns, setFreezedColumns] = useState<number[]>(freezedColumns);

  useEffect(() => {
    setHeaderConfigs(headers);
  }, [headers]);

  useEffect(() => {
    setFreezedColumns(freezedColumns);
  }, [freezedColumns.toString()]);

  const startResize = (e: MouseEvent<HTMLDivElement>, columnKey: number) => {
    setSelectedColumnKey(columnKey);
    setIsResizing(true);
    setResizeStartPageX(e.pageX);
    setSelectedColumnWidth(headerConfigs[columnKey].w);
  };

  const endResize = (e: MouseEvent<HTMLDivElement>) => {
    setIsResizing(false);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isResizing) {
      const diff = e.pageX - resizeStartPageX;
      const _headerConfigs = produce(headerConfigs, (draft) => {
        // eslint-disable-next-line array-callback-return
        draft.map((header, key) => {
          if (selectedColumnKey === key) {
            const newColumnWidth = selectedColumnWidth + diff;
            header.w = newColumnWidth > 110 ? newColumnWidth : header.w;
          }
        });
      });
      setHeaderConfigs(_headerConfigs);
    }
  };

  const getColumnConfigs = (columnKey: number) => {
    let leftMargin = isEnableAction ? 36 : -1;
    let zIndex = _freezedColumns.length;

    if (columnKey > 0) {
      const preColumns = _freezedColumns?.filter((column) => column < columnKey);
      preColumns?.forEach((column) => {
        leftMargin += headerConfigs[column]?.w + 1;
      });
    }

    const freezed = _freezedColumns.includes(columnKey);
    return [freezed, leftMargin, zIndex];
  };

  const eventHandlers = {
    startResize,
    endResize,
    onMouseMove
  };

  return {
    headerConfigs,
    rowConfigs,
    eventHandlers,
    freezedColumns,
    setFreezedColumns,
    getColumnConfigs
  };
};
