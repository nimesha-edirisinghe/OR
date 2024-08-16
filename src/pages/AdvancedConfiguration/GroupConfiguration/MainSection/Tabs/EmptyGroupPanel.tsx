import { VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { INSTRUCTION_MESSAGES } from 'constants/messages';
import { FC } from 'react';
import { neutral_100, ocean_blue_500 } from 'theme/colors';
import { GroupTypes } from 'types/groupConfig';

interface Props {
  groupType: GroupTypes;
  onClickHandler: (groupType: GroupTypes) => void;
  isDisabled?: boolean;
}

const EmptyGroupPanel: FC<Props> = ({ onClickHandler, groupType, isDisabled = false }) => {
  return (
    <VStack w="full" h="220px" bg={ocean_blue_500} p={'40px'} borderRadius={'8px'} spacing={'23px'}>
      <AppText fontSize={'16px'} fontWeight={'600'} color={neutral_100}>
        Create your first group
      </AppText>
      <AppText size={'body2'} fontWeight={'400'} color={neutral_100} textAlign={'center'}>
        {INSTRUCTION_MESSAGES.EMPTY_GROUP_PANEL_MESSAGE}
      </AppText>
      <AppButton
        variant="primary"
        size="medium"
        onClick={() => !isDisabled && onClickHandler(groupType)}
        px="25px"
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        isDisabled={isDisabled}
      >
        Create Group
      </AppButton>
    </VStack>
  );
};

export default EmptyGroupPanel;
