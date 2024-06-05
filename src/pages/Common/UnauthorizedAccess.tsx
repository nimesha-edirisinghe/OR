import { Center, VStack } from '@chakra-ui/react';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback } from 'react';
import { ocean_blue_500 } from 'theme/colors';

interface Props { }

const UnauthorizedAccess: FC<Props> = () => {
  // const userState: IUser = useSelector(userSliceSelector);

  const pageContent = useCallback(() => {

    return (
      <VStack  w="full" h="full"  transition="all 0.1s ease-in" spacing="10px"  p="16px" >
        <Center h="calc(100vh - 70vh)" w="calc(100vw - 30vw)" verticalAlign="middle" bg={ocean_blue_500} borderRadius="20px" >
          <AppNoDataAvailablePanel />
        </Center>
      </VStack>
    );
  }, []);

  return (
    <>
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default UnauthorizedAccess;
