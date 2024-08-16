import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { userSliceSelector } from 'state/user/userState';
import { useORAuth } from 'utils/auth';

const PrivateRoute: FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const userState = useSelector(userSliceSelector);

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
