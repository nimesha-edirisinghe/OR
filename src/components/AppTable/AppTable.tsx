import { FC } from 'react';
import {
  Table,
  Thead,
  Tbody,
  TableContainer,
  TableProps,
  Box,
  Tr,
  Th,
  HStack
} from '@chakra-ui/react';
import TableRow from './TabelRow';
import TableHeader from './TableHeader';
import AppText from 'components/AppText/AppText';
import { useSelector } from 'react-redux';
import { fcConfigPageSliceSelector } from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { neutral_200, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';

interface Props extends TableProps {
  tableHeaders: string[];
  tableRowDataMapping: any[];
  tableRowsDataSet: any[];
  onTableSearch?: (searchKey: string) => void;
}

const AppTable: FC<Props> = ({
  tableHeaders,
  tableRowDataMapping,
  tableRowsDataSet,
  onTableSearch,
  ...rest
}: Props) => {
  const page = useSelector(fcConfigPageSliceSelector);
  const isEmpty = page.tableData && page.tableData.length === 0;
  return (
    <Box maxW="full" height="full">
      <TableContainer display={'unset'}>
        <Table {...rest} userSelect="none" w="full">
          <Thead position={'sticky'} top={-1}>
            <Tr>
              {!isEmpty &&
                tableHeaders.map((header, index) =>
                  index === 0 ? (
                    <Th
                      p={1}
                      justifyContent="start"
                      h="36px"
                      w="fixed"
                      maxW={'200px'}
                      minW={'200px'}
                      key={index}
                      backgroundColor={ocean_blue_500}
                    >
                      <HStack direction={'row'} justifyContent={'space-between'}>
                        <AppText fontSize="12px" fontWeight={600} color={neutral_200}>
                          {header}
                        </AppText>
                      </HStack>
                    </Th>
                  ) : (
                    <TableHeader key={index}>{header}</TableHeader>
                  )
                )}
            </Tr>
          </Thead>
          {page.tableData && page.tableData.length > 0 ? (
            <Tbody>
              {tableRowsDataSet.map((rowData, key) => {
                return (
                  <TableRow key={key} rowData={rowData} tableRowDataMapping={tableRowDataMapping}/>
                );
              })}
            </Tbody>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>
      {isEmpty ? (
        <HStack mt="5px" h="calc(100vh - 250px)">
          <AppNoDataAvailablePanel />
        </HStack>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default AppTable;
