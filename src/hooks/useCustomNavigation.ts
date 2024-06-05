import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItemI } from 'types/layout';

const useCustomNavigation = (
  moduleName: string,
  navigationData: { [key: string]: MenuItemI },
  endpoint: string
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateToPath = () => {
      const module = navigationData[moduleName];
      if (module && module.path) {
        navigate(module.path);
      }
    };

    navigateToPath();
  }, [moduleName, navigationData, endpoint, navigate]);
};

export default useCustomNavigation;
