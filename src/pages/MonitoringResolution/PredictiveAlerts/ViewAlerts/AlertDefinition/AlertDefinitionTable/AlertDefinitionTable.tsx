import { FC, useState, useRef } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import { scrollbarXYStyles, scrollbarYStyles } from 'theme/styles';
import { isEmpty } from 'utils/utility';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useSelector } from 'react-redux';
import AlertDefinitionTableRow from './AlertDefinitionTableRow';
import AlertTableHeader from './AlertTableHeader';
import AlertDefinitionDefaultTable from './AlertDefinitionDefaultTable';
import { AlertTableViewTypeEnum } from 'utils/enum';

interface AlertDefinitionTableProps {
  enableAlertDetection?: boolean;
  tableType: AlertTableViewTypeEnum;
}

const AlertDefinitionTable: FC<AlertDefinitionTableProps> = ({
  enableAlertDetection = false,
  tableType
}) => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const alertTableData = alertState.alertDataList;
  const [onTableHover, setOnTableHover] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollTarget: string) => {
    const targetRef = scrollTarget === 'header' ? headerRef : bodyRef;
    const otherRef = scrollTarget === 'header' ? bodyRef : headerRef;
    if (targetRef.current && otherRef.current) {
      otherRef.current.scrollLeft = targetRef.current.scrollLeft;
    }
  };

  const handleHeaderScroll = () => {
    handleScroll('header');
  };

  const handleBodyScroll = () => {
    handleScroll('body');
  };

  return (
    <Box
      w="full"
      minH={enableAlertDetection ? 'calc(100vh - 285px)' : 'calc(100vh - 460px)'}
      mt="5px"
      borderRadius="8px"
    >
      <Skeleton
        isLoaded={!alertState.loading.data}
        w="full"
        h="full"
        minH={enableAlertDetection ? 'calc(100vh - 285px)' : 'calc(100vh - 370px)'}
        borderRadius="8px"
      >
        <Box
          position="relative"
          onMouseEnter={() => setOnTableHover(true)}
          onMouseLeave={() => setOnTableHover(false)}
          borderRadius="8px"
        >
          <Box
            overflowY={'clip'}
            overflowX={'hidden'}
            maxH={'calc(100vh - 245px)'}
            transition="all .2s ease-in"
            ref={headerRef}
            onScroll={handleHeaderScroll}
            __css={scrollbarYStyles}
            borderTopRadius="8px"
          >
            <AlertTableHeader alertTableHeaders={alertTableData.headers} tableType={tableType} />
          </Box>
          <Box
            overflow={onTableHover ? 'auto' : 'hidden'}
            maxH={'calc(100vh - 245px)'}
            transition="all .2s ease-in"
            __css={scrollbarXYStyles}
            ref={bodyRef}
            onScroll={handleBodyScroll}
            sx={{
              paddingRight: '50px'
            }}
            borderBottomRadius="8px"
          >
            {!isEmpty(alertTableData?.list) ? (
              alertTableData?.list?.map((dataItem, index) => (
                <AlertDefinitionTableRow
                  key={index}
                  data={dataItem}
                  alertTableHeaders={alertTableData.headers}
                  enableAlertDetection={enableAlertDetection}
                  tableType={tableType}
                />
              ))
            ) : (
              <AlertDefinitionDefaultTable />
            )}
          </Box>
        </Box>
      </Skeleton>
    </Box>
  );
};

export default AlertDefinitionTable;
