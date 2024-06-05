import { Box, HStack, Table, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { FC, ReactNode, useRef, useState } from 'react';
import { ocean_blue_350, ocean_blue_400, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import { tableScrollbarXYStyles } from 'theme/styles';
import AppText from '../AppText/AppText';
import AppCheckbox from '../AppCheckbox/AppCheckbox';
import { TableHeader } from 'types/responses/viewResponses';
import { useTable } from 'hooks/useTable';
import AppSimpleGridCellsMap from './AppSimpleGridCells/AppSimpleGridCellsMap';
import { iconName } from 'components/AppIcon/svgIcons';

export type CellTextAlignmentT = 'start' | 'end';

interface Props {
  headers: TableHeader[];
  rows: { id?: any; isSelected?: boolean; row: any[]; editableFlags?: boolean[] }[] | null;
  maxW?: string;
  maxH?: string;
  isEnableAction?: boolean;
  onChangeHandler?: (id: number) => void;
  onChangeAllHandler?: (isSelected: boolean, id: number) => void;
  isSelectedAll?: boolean;
  freezedColumns?: number[];
  footerRow?: ReactNode;
  onActionHandler?: (id: string, metaInfo: string, iconName?: iconName) => void;
  isLastColExpandable?: boolean;
  onColumnClickHandler?: (key: string) => void;
  showIndicator?: boolean;
  isEditable?: boolean;
  cellCallback?: (id: number | string, index: number, value: string | number) => void;
  textAlign?: CellTextAlignmentT;
  onEditActionHandler?: (
    ref:any,
    id: number | string,
    index: number,
    value: number | string,
    metaInfo?: string,
    icon?: iconName
  ) => any;
}

const AppSimpleGrid: FC<Props> = ({
  headers,
  rows,
  maxW = '500px',
  maxH = '73px',
  isEnableAction = false,
  onChangeHandler,
  onChangeAllHandler,
  isSelectedAll = false,
  freezedColumns = [],
  footerRow,
  onActionHandler,
  isLastColExpandable = false,
  showIndicator = true,
  isEditable = false,
  cellCallback = (id: number | string, index: number, value: string | number) => {},
  textAlign,
  onEditActionHandler = (
    ref:any,
    id: number | string,
    index: number,
    value: number | string,
    metaInfo?: string,
    icon?: iconName
  ) => {}
}) => {
  const { headerConfigs, eventHandlers, getColumnConfigs } = useTable(
    headers,
    rows,
    freezedColumns,
    isEnableAction
  );

  const { startResize, endResize, onMouseMove } = eventHandlers;
  const [scroll, setScroll] = useState('hidden');
  const tableRoot = useRef<any>();

  rows && rows.map((obj) => obj.row);
  return (
    <Box
      maxW={maxW}
      borderRadius="8px"
      overflow={scroll}
      maxH={maxH}
      __css={tableScrollbarXYStyles}
      onMouseEnter={() => setScroll('auto')}
      onMouseLeave={() => setScroll('hidden')}
      ref={tableRoot}
    >
      <Table
        w="full"
        pos="initial"
        userSelect="none"
        onMouseUp={(e) => endResize(e)}
        onMouseMove={(e) => onMouseMove(e)}
        bg={ocean_blue_600}
        rounded="8px"
      >
        <Thead>
          <Tr pos="sticky" top="0" zIndex={9}>
            {isEnableAction && (
              <th
                style={{
                  position: 'sticky',
                  left: -1,
                  zIndex: 2,
                  maxWidth: '36px',
                  minWidth: '36px',
                  backgroundColor: ocean_blue_500,
                  borderRight: `1px solid ${ocean_blue_600}`,
                  padding: 0
                }}
              >
                <HStack justify="center" w="full" paddingLeft="2px">
                  <AppCheckbox
                    id={1}
                    isDisabled={rows?.length == 0}
                    isChecked={rows == undefined || (rows?.length > 0 && isSelectedAll)}
                    onChange={onChangeAllHandler!}
                  />
                </HStack>
              </th>
            )}
            {headerConfigs?.map((header, key) => {
              const [freezed, leftMargin, zIndex] = getColumnConfigs(key);
              return (
                <th
                  key={key}
                  style={
                    freezed
                      ? {
                          position: 'sticky',
                          left: leftMargin as number,
                          zIndex: zIndex as number,
                          minWidth: `${header.w + 1}px`,
                          padding: 0
                        }
                      : {
                          minWidth: `${header.w + 1}px`,
                          padding: 0,
                          margin: 0
                        }
                  }
                >
                  <HStack h="36px" pos="relative" minW={`${header.w}px`} bg={ocean_blue_500}>
                    <AppText size="h4Semibold" textIndent="10px" noOfLines={1}>
                      {header.displayValue}
                    </AppText>
                    <Box
                      w="10px"
                      h="full"
                      pos="absolute"
                      top={0}
                      right="0"
                      cursor="w-resize"
                      borderRight={`1px solid ${ocean_blue_600}`}
                      onMouseDown={(e) => startResize(e, key)}
                      zIndex={freezed ? (zIndex as number) - 1 : 0}
                    ></Box>
                  </HStack>
                </th>
              );
            })}
            {isLastColExpandable && (
              <th
                style={{
                  backgroundColor: ocean_blue_600,
                  borderColor: ocean_blue_600,
                  maxWidth: '50px',
                  minWidth: '50px'
                }}
              ></th>
            )}
          </Tr>
        </Thead>
        <Tbody bg={ocean_blue_600}>
          {rows?.map((rowConfig, key) => {
            const rowColorBg = rowConfig.isSelected
              ? `${ocean_blue_350} !important`
              : `${ocean_blue_400} !important`;
            return (
              <Tr key={rowConfig.id} p="0px" m="0px" cursor={isEnableAction ? 'pointer' : ''}>
                {isEnableAction && (
                  <td
                    style={{
                      position: 'sticky',
                      left: -1,
                      zIndex: 1,
                      maxWidth: '36px',
                      minWidth: '36px',
                      padding: '0px',
                      height: '36px'
                    }}
                  >
                    <HStack bg={rowColorBg} w="full" h="full" justify="center">
                      <AppCheckbox
                        id={rows?.[key]?.id}
                        isDisabled={rows?.length == 0}
                        isChecked={rows?.[key].isSelected!}
                        onChange={(isChecked, id) => onChangeHandler && rows && onChangeHandler(id)}
                      />
                    </HStack>
                  </td>
                )}
                {rowConfig?.row?.map((column, index) => {
                  const [freezed, leftMargin, zIndex] = getColumnConfigs(index);
                  const rowItem = rowConfig?.row;
                  const editFlag: any = rowConfig.editableFlags;
                  const editableFlag: boolean =
                    isEditable && editFlag.length > 0 ? editFlag[index] : false;
                  const cellType = editableFlag ? 'editableCell' : headerConfigs[index]?.cellType!;

                  return (
                    <Td
                      p="0px !important"
                      minW={`${headerConfigs && headerConfigs[index]?.w + 1}px`}
                      style={
                        freezed
                          ? {
                              position: 'sticky',
                              left: leftMargin as number,
                              zIndex: zIndex as number,
                              backgroundColor: rowColorBg
                            }
                          : { backgroundColor: rowColorBg }
                      }
                      key={index}
                      onClick={() => onChangeHandler && onChangeHandler(rowConfig.id)!}
                    >
                      <Box
                        display="flex"
                        w="full"
                        h="36px"
                        p="8px"
                        bg={rowColorBg}
                        alignItems={'center'}
                        justifyContent={freezed ? 'start' : textAlign}
                      >
                        <AppSimpleGridCellsMap
                          displayValue={column}
                          rowColorBg={rowColorBg}
                          cellType={editableFlag ? 'editableCell' : cellType}
                          onActionHandler={onActionHandler}
                          id={rows[key]?.id}
                          metaInfo={rowConfig?.row[0]}
                          enableAction={rowItem[rowItem.length - 1]}
                          showIndicator={showIndicator}
                          tableRoot={tableRoot}
                          cellCallback={cellCallback}
                          actionIcons={
                            headerConfigs[index]?.cellType! === 'actionIconCell'
                              ? headerConfigs[index]?.actionIcons
                              : undefined
                          }
                          index={index}
                          textAlign={freezed ? 'start' : textAlign}
                          onEditActionHandler={onEditActionHandler}
                        />
                      </Box>
                    </Td>
                  );
                })}
                {isLastColExpandable && (
                  <td
                    style={{
                      backgroundColor: ocean_blue_600,
                      borderColor: ocean_blue_600,
                      maxWidth: '50px',
                      minWidth: '50px'
                    }}
                  ></td>
                )}
              </Tr>
            );
          })}
          {footerRow}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AppSimpleGrid;
