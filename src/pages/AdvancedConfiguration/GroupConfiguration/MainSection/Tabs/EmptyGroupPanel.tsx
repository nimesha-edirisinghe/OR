import { Center, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { blue_500, ocean_blue_50 } from 'theme/colors';
import { GroupTypes } from 'types/groupConfig';

interface Props {
  groupType: GroupTypes;
  onClickHandler: (groupType: GroupTypes) => void;
}

const EmptyGroupPanel: FC<Props> = ({ onClickHandler, groupType }) => {
  return (
    <Center w="full" h="full">
      <VStack spacing="5px">
        <AppText fontSize="16px" fontWeight={500} color={ocean_blue_50}>
          No Groups have been created yet.
        </AppText>
        <AppText fontSize="16px" fontWeight={500} color={ocean_blue_50}>
          <span
            style={{ color: blue_500, cursor: 'pointer' }}
            onClick={() => onClickHandler(groupType)}
          >
            Click here
          </span>{' '}
          to create a new Group.
        </AppText>
      </VStack>
    </Center>
  );
};

export default EmptyGroupPanel;
