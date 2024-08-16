import { HStack, TableCellProps, Td, VStack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { cellActionType } from '../AppTableCell';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { neutral_100 } from 'theme/colors';

interface Props extends TableCellProps {
  rowId: string;
  mainLabel: ReactNode;
  subLabel?: ReactNode;
  actions?: cellActionType[];
  rowActionsEnable?: boolean;
}

const GeneralCellLayout: FC<Props> = ({
  rowId,
  rowActionsEnable,
  mainLabel,
  subLabel,
  actions,
  ...rest
}) => {
  let date = new Date();

  return (
    <Td p={1} {...rest}>
      <HStack align="center">
        <VStack align="start" justify="center" spacing={0}>
          {mainLabel}
          {subLabel}
        </VStack>
        <HStack
          justify="right"
          w="full"
          h="full"
          visibility={rowActionsEnable ? 'visible' : 'hidden'}
        >
          {actions?.map((action, index) => {
            console.log('action : ', action);
            return (
              <AppIcon
                cursor={action?.isDisabled ? 'not-allowed' : 'pointer'}
                key={index}
                transition="transform 0.25s ease"
                name={action.iconName as any}
                fill={neutral_100}
                opacity={action?.isDisabled ? 0.1 : 1}
                onClick={() =>
                  !action?.isDisabled && action.onClick && action.onClick(action.action, rowId)
                }
              />
            );
          })}
        </HStack>
      </HStack>
    </Td>
  );
};

export default GeneralCellLayout;
