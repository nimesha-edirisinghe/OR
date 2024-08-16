import { Box, HStack, Input } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { iconName } from 'components/AppIcon/svgIcons';
import { FC, useRef } from 'react';
import { neutral_200, ocean_blue_300, ocean_blue_400 } from 'theme/colors';
import { CellTextAlignmentT } from '../../AppSimpleGrid';

interface Props {
  id?: string;
  metaInfo?: string;
  rowColorBg: string;
  displayValue: string;
  cellCallback?: (id: number | string, index: number, value: string | number) => void;
  index?: number;
  onActionHandler?: (id: string, metaInfo: string, iconName?: iconName) => void;
  enableAction?: boolean;
  actionIcons?: iconName[];
  textAlign?: CellTextAlignmentT;
  onEditActionHandler?: (
    ref: any,
    id: number | string,
    index: number,
    value: number | string,
    metaInfo?: string,
    icon?: iconName
  ) => any;
}

const EditableCell: FC<Props> = ({
  id,
  metaInfo,
  displayValue,
  cellCallback = (id: number | string, index: number, value: string | number) => {},
  index = 0,
  actionIcons = ['download'],
  textAlign,
  onEditActionHandler = (
    ref: any,
    id: number | string,
    index: number,
    value: number | string,
    metaInfo?: string,
    icon?: iconName
  ) => {}
}) => {
  const inputRef: any = useRef(null);
  const alignment = textAlign ? textAlign : typeof displayValue === 'number' ? 'right' : 'left';
  const icon: any = actionIcons[0] === 'download' ? '' : actionIcons[0];
  const iconFlag: boolean = !!icon;
  const inputWidth: string = iconFlag ? '95%' : '100%';
  const isCellEnabled = icon === 'calenderWithDate';

  const changeValue = (e: any) => {
    if (!isCellEnabled) {
      const value = e.target.value;
      cellCallback(id || 0, index, value);
    }
  };

  const iconActionHandler = () => {
    if (iconFlag) onEditActionHandler(inputRef, id!, index, inputRef.current.value, metaInfo, icon);
  };

  const onActionClickInternal = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    iconActionHandler();
  };

  return (
    <HStack w="full">
      <Box w={inputWidth}>
        <Input
          // @ts-ignore
          ref={inputRef}
          min={0}
          value={displayValue || ''}
          onChange={changeValue}
          noOfLines={1}
          textAlign={alignment}
          style={{ wordBreak: 'break-all', caretColor: !isCellEnabled ? 'auto' : 'transparent' }}
          outline="none"
          border="1px"
          borderColor={ocean_blue_300}
          borderRadius="4px"
          h="28px"
          p="4px 8px 4px 8px"
          w="100%"
          color={neutral_200}
          backgroundColor={ocean_blue_400}
          fontSize="13px"
          fontWeight="400"
          // disabled={isCellEnabled}
          _disabled={{ color: neutral_200, cursor: 'pointer' }}
          onClick={iconActionHandler}
        />
      </Box>
      {iconFlag && (
        <Box>
          <AppIcon
            onClick={(e) => onActionClickInternal(e)}
            cursor="pointer"
            transition="transform 0.25s ease"
            name={icon}
            fill={neutral_200}
            w="14px"
            h="14px"
          />
        </Box>
      )}
    </HStack>
  );
};

export default EditableCell;
