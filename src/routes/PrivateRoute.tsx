import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { userSliceSelector } from 'state/user/userState';
import { useORAuth } from 'utils/auth';

const PrivateRoute: FC = () => {
  const location = useLocation();
  const menuState = useSelector(layoutSliceSelector);
  const { pathname } = location;
  const navigate = useNavigate();
  const userState = useSelector(userSliceSelector);

  useEffect(() => {
    if (Object.keys(menuState.leftMenu).length) {
      let result = Object.values(menuState.leftMenu).find((m) => {
        return (
          m.path == pathname ||
          (m.subMenu &&
            Object.values(m.subMenu as Object).find((item) => {
              return item.path == pathname;
            }))
        );
      });
      if (pathname != '/modules' && !result && !menuState.isMayaActive) {
        navigate('/app/unauthorized', { replace: true });
      }
    }
  }, [menuState.leftMenu]);

  useEffect(() => {
    if (
      pathname != '/modules' &&
      userState.user['base_modules'] &&
      !userState.user['base_modules']?.Factory
    ) {
      navigate('/accessdenied', { replace: true });
    }
  }, [userState.user]);

  useEffect(() => {
    if (
      pathname != '/modules' &&
      Object.keys(userState.userOrgs).length > 0 &&
      userState.userOrgs.orgDetails.length === 0
    ) {
      navigate('/accessdenied', { replace: true });
    }
  }, [location, userState.userOrgs]);

  const { keycloak } = useORAuth();
  return keycloak.authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
