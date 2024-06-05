export const getTableColumnWidth = (columnIndex: number): number => {
    const _defaultWidth = 100;
    switch (columnIndex) {
      case 0:
        return 300;
      case 1:
      case 2:
        return 180;
      default:
        return _defaultWidth;
    }
};
