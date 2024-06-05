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
      <HStack align="start">
        <VStack align="start" spacing={0}>
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
            return (
              <AppIcon
                cursor="pointer"
                key={index}
                transition="transform 0.25s ease"
                name={action.iconName as any}
                fill={neutral_100}
                onClick={() => action.onClick && action.onClick(action.action, rowId)}
              />
            );
          })}
        </HStack>
      </HStack>
    </Td>
  );
};

export default GeneralCellLayout;
