import { Center, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import HeaderCell from './TableCells/HeaderCell';
import { DemandForecastSkuHeaders } from 'types/responses/viewResponses';
import AppCheckbox from '../AppCheckbox/AppCheckbox';
import { ocean_blue_500 } from 'theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  IDFView,
  dfViewSliceSelector
  // setSelectedSku
} from 'state/pages/view/demandForecastView/dfViewPageState';

interface Props {
  headers: DemandForecastSkuHeaders;
}

const AppSelectableHeader: FC<Props> = ({ headers }) => {
  const dispatch = useDispatch();
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const onChangeHandler = (isSelected: boolean, id: number) => {
    // dispatch(
    //   setSelectedSku({
    //     isSelected: isSelected,
    //     id: 1,
    //     type: 'all'
    //   })
    // );
    // dispatch(
    //   addSelectedSkuList({
    //     isSelectedAll: isSelected,
    //     selectedType: 'all'
    //   })
    // );
  };

  const isSelectedAll = dfViewState.skuListData?.list.every((data) => data.isSelected);
  return (
    <HStack spacing="1px" h="36px">
      <Center w="50px" h="36px" bg={ocean_blue_500} borderTopLeftRadius="8px">
        <AppCheckbox
          id={1}
          isChecked={isSelectedAll!}
          onChange={(isChecked) => onChangeHandler(isChecked, 1)}
        />
      </Center>
      {headers &&
        Object.entries(headers).map((td, key) => <HeaderCell key={key}>{td[1]}</HeaderCell>)}
    </HStack>
  );
};

export default AppSelectableHeader;
