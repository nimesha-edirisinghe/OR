import { BoxProps, HStack } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  groupConfigSliceSelector,
  IGroupConfig
} from 'state/pages/shared/groupConfig/groupConfigState';
import AppDropdown from '../AppDropdown/AppDropdown';

interface Props extends BoxProps {
  onGroupSelect: (item: string) => void;
  height?: string;
}

const AppGroupSelectDropDown: FC<Props> = ({ onGroupSelect, height = '36px', ...rest }) => {
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const selectedGroupKey = sharedGroupState.selectedGroupKey;
  const groupValueList = sharedGroupState.groupList?.list?.map((obj) => obj.value);

  const renderGroupSelectDropDown = useCallback(() => {
    const _selectedItem = sharedGroupState.groupList?.list?.find(
      (obj) => obj.key === selectedGroupKey
    )?.value;
    return (
      <AppDropdown
        options={groupValueList}
        buttonWidth="556px"
        handleItemClick={onGroupSelect}
        selectedItem={_selectedItem!}
        isEnableSearch
        height={height}
      />
    );
  }, [selectedGroupKey, sharedGroupState.groupList, height]);

  return (
    <HStack w="full" {...rest}>
      {renderGroupSelectDropDown()}
    </HStack>
  );
};

export default AppGroupSelectDropDown;
