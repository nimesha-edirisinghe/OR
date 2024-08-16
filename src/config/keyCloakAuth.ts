import Keycloak from 'keycloak-js';

import { REACT_APP_KC_AUTH_SERVER, REACT_APP_KC_REALM, REACT_APP_KC_CLIENT_ID } from './constants';
import { useKeycloak } from '@react-keycloak/web';

const initOptions = {
  url: REACT_APP_KC_AUTH_SERVER,
  realm: REACT_APP_KC_REALM,
  clientId: REACT_APP_KC_CLIENT_ID,
  enableLogging: true,
  publicClient: true,
  checkLoginIframe: false,
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  tokenMinTimeToLive: 30
};

const keycloak = Keycloak(initOptions);

export default keycloak;

export const useKeycloakAuth = () => {
  const { initialized, keycloak } = useKeycloak();
  return { initialized, keycloak };
};
