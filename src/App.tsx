import { useEffect } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { getUserFetch, saveKeyCloakInfo } from 'state/user/userState';
import { useDispatch } from 'react-redux';
import { useORAuth } from 'utils/auth';
import { fetchOrganizationsRequest } from 'state/user/userState';
import { getLeftMenuRequest } from 'state/layout/layoutState';
import router from 'routes';
import { fetchTableauTokenRequest } from 'state/pages/dashboard/dashboardState';

const App = () => {
  const { keycloak, initialized } = useORAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const abortController = new AbortController();

      if (initialized && keycloak.authenticated) {
        dispatch(fetchOrganizationsRequest());
        dispatch(saveKeyCloakInfo(keycloak));
        dispatch(getUserFetch());
        dispatch(getLeftMenuRequest());
        dispatch(fetchTableauTokenRequest());
      }

      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('user fetching error ', error);
    }
  }, [initialized, keycloak]);

  return (
    <>
      {initialized ? (
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      ) : (
        <Center h="100vh">
          <Spinner w="100px" h="100px" />
        </Center>
      )}
    </>
  );
};

export default App;
