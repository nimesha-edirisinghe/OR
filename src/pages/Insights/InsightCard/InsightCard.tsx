import { FC, ReactNode } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';

interface Props {
  title: ReactNode;
  sar?: number | string;
  pwDir?: ReactNode;
  splyDir?: ReactNode;
  contentAlign?: string;
  hasSARPrefix?: boolean;
  minWidth?: string;
  minHeight?: string;
}

const InsightCard: FC<Props> = ({
  title,
  sar,
  pwDir,
  splyDir,
  contentAlign = 'start',
  hasSARPrefix = true,
  minWidth = '210px',
  minHeight = '138px'
}) => {
  return (
    <VStack minW={minWidth} w="full" flex={1} spacing={0}>
      {title}
      <VStack
        minH={minHeight}
        w="full"
        px="10px"
        bg="card-body-bg"
        direction="row"
        spacing={0}
        justifyContent={contentAlign}
      >
        <HStack justifyContent="center" w="full" my="6px">
          {hasSARPrefix && (
            <AppText
              fontSize={{ base: '15px', md: '15px', lg: '20px' }}
              fontWeight={600}
              color="card-text-color"
              mt="6px"
              // lineHeight={{ base: '20px', md: '30px', lg: '38px' }}
            >
              SAR
            </AppText>
          )}
          <AppText
            fontSize={{ base: '20px', md: '20px', lg: '30px' }}
            fontWeight={600}
            color="#65DBD5"
            // lineHeight="38px"
          >
            {!isNaN(sar as number) ? Math.trunc(sar as number)?.toLocaleString() : sar}
          </AppText>
        </HStack>
        {pwDir && (
          <>
            <Box w="full" py="2px">
              {pwDir}
            </Box>
            <Box w="full" py="2px">
              {splyDir}
            </Box>
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default InsightCard;
