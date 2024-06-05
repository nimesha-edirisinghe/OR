import { Box } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { iconName } from 'components/AppIcon/svgIcons';
import { FC } from 'react';
import { neutral_200 } from 'theme/colors';

interface Props {
  id?: string;
  metaInfo?: string;
  onActionHandler?: (id: string, metaInfo: string, iconName?: iconName) => void;
  enableAction?: boolean;
  actionIcons?: iconName[];
}

const ActionIconCell: FC<Props> = ({
  id,
  metaInfo,
  onActionHandler,
  enableAction,
  actionIcons = ['download']
}) => {
  const onActionClickInternal = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id?: string,
    metaInfo?: string,
    iconName?: iconName
  ) => {
    if (onActionHandler) {
      event.stopPropagation();
      onActionHandler(id!, metaInfo!, iconName);
    }
  };

  return (
    <>
      {enableAction &&
        (actionIcons || ['download']).map((x) => (
          <Box textAlign="center">
            <AppIcon
              onClick={(e) => onActionClickInternal(e, id!, metaInfo!, x)}
              cursor="pointer"
              transition="transform 0.25s ease"
              name={x}
              fill={neutral_200}
              w="14px"
              h="14px"
            />
          </Box>
        ))}
    </>
  );
};

export default ActionIconCell;
