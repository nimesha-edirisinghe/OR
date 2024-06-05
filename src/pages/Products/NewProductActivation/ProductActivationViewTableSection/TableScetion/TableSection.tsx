import { HStack, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { useDispatch, useSelector } from 'react-redux';
import {  ISelectProductView, newProductActivationSliceSelector, setConfigMode, setSelectedAll, updateSelectedItem } from 'state/pages/product/newActivation/productNewActivationState';
import { useNavigate } from 'react-router-dom';
import { productActivationHeader } from 'pages/Products/Common/constant';

interface TableSectionProps {}

const TableSection: FC<TableSectionProps> = () => {
  const state: ISelectProductView = useSelector(
    newProductActivationSliceSelector
  ).productActivationView;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let tableDataList = state.data.activationData ;
  let tableHeaders = productActivationHeader;
  const dataLoading = false;

  let rowData: { id?: any; isSelected?: boolean; row: any[] }[] = [];

  const onChangeItem = (id: number) => {
    let data = rowData.find((x) => x.id == id);
    // data.isSelected = !data.isSelected;
    dispatch(updateSelectedItem({data: data}));
  };

  const onChangeAllHandler = (isSelected: boolean, id: number) => {
    dispatch(setSelectedAll({selectAll:isSelected}));
  }
  const onActionHandler = (id: string, metaInfo: string) => {
    dispatch(setConfigMode({ mode: 'single', id: id }));
    navigate("/app/products/new-activation/location-selection");
  }

  rowData =
    tableDataList?.map((item:any, index) => ({
      id: item.anchorProdKey,
      isSelected: item.isSelected,
      row: (tableHeaders.length && tableHeaders.map((header) => item[header.key])) || []
    })) || [];

  const freezeCols = [0, 1];

  return (
    <HStack w="full" h="full" align="start">
      <Skeleton
        w="full"
        height="full"
        borderRadius="10px"
        isLoaded={!dataLoading}
        fadeDuration={1}
        speed={1}
      >
        <AppSimpleGrid
          headers={tableHeaders}
          isEnableAction={true}
          isSelectedAll={state.selection.selectedAll}
          rows={rowData}
          maxW="100%"
          maxH="calc(100vh - 288px)"
          freezedColumns={freezeCols}
          onChangeHandler={onChangeItem}
          onChangeAllHandler={onChangeAllHandler}
          onActionHandler={onActionHandler}
        />
      </Skeleton>
    </HStack>
  );
};

export default TableSection;
