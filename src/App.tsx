import { useEffect } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { IUser, getUserFetch, saveKeyCloakInfo, userSliceSelector } from 'state/user/userState';
import { useDispatch, useSelector } from 'react-redux';
import { useORAuth } from 'utils/auth';
import { fetchOrganizationsRequest } from 'state/user/userState';
import { getLeftMenuRequest } from 'state/layout/layoutState';
import router from 'routes';
import { fetchTableauTokenRequest } from 'state/pages/dashboard/dashboardState';
import { getDynamicConfigDataRequest } from 'state/pages/systemConfiguration/systemConfigurationState';

const App = () => {
  const { keycloak, initialized } = useORAuth();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const abortController = new AbortController();

      if (initialized && keycloak.authenticated) {
        dispatch(fetchOrganizationsRequest());
        dispatch(saveKeyCloakInfo(keycloak));
        dispatch(getUserFetch());
      }

      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('user fetching error ', error);
    }
  }, [initialized, keycloak]);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(getLeftMenuRequest());
        dispatch(getDynamicConfigDataRequest());
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('Organization fetching error', error);
    }
  }, [selectedOrgKey]);

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
