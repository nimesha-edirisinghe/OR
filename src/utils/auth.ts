import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useKeycloakAuth } from 'config/keyCloakAuth';
import { userSliceSelector } from 'state/user/userState';

export type baseModule = 'DF' | 'DS' | 'INV' | 'Factory';
export type permissionType = 'RWD' | 'R' | '';

export const useAuthorization = () => {
  const user = useSelector(userSliceSelector).user;
  try {
    const isBaseModuleAuthorized = useCallback(
      (module: baseModule) => {
        return user['base_modules'] && user['base_modules'][module];
      },
      [module]
    );

    return [isBaseModuleAuthorized];
  } catch (error) {
    console.error('use authorization error ', error);
    return [];
  }
};

export const useORAuth = () => {
  // return {
  //   initialized: true,
  //   keycloak: { authenticated: true, login: () => true, logout: () => true }
  // };
  const { initialized, keycloak } = useKeycloakAuth();
  return { initialized, keycloak };
};
