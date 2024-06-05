
export const getFilterTitle = (
  filterType: string,
  filterCode: number
) => {
  
  switch(filterType + "_" + filterCode){
    case 'sku_1': return 'SKU-location';
    case 'sku_2': return 'SKU';
    case 'store_1': return 'Store';
    case 'store_2': return 'Warehouse';
  }  
};
