import { Box } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { TableHeader } from 'types/responses/viewResponses';
import { dataIngestionSummaryViewTableHeader } from 'utils/constants';

interface TableSectionProps {
    rowData: { id?: any; row: any[] }[];
}

const TableSection: FC<TableSectionProps> = ({ rowData }) => {
    const tableHeaders: TableHeader[] = dataIngestionSummaryViewTableHeader

    const renderTable = useCallback(() => {
        return (
            <Box minH="calc(100vh - 245px)" w="full">
                <AppSimpleGrid
                    headers={tableHeaders}
                    rows={rowData}
                    maxW="100%"
                    maxH="calc(100vh - 245px)"
                    showIndicator={false}
                />
            </Box>
        );
    }, [rowData]);

    return (
        <>
           {renderTable()}
        </>
    );

    
};

export default TableSection;
