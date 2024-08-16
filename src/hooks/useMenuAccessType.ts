import { useSelector } from 'react-redux';
import { layoutSliceSelector, LeftMenu } from 'state/layout/layoutState';
import { AccessType } from 'utils/permissions';

export const findAccessType = (menu: LeftMenu, key: string): AccessType | undefined => {
  for (const [menuItemKey, menuItem] of Object.entries(menu)) {
    if (menuItemKey === key && menuItem && typeof menuItem !== 'boolean') {
      return menuItem.accessType;
    }
    if (menuItem?.subMenu && typeof menuItem.subMenu !== 'boolean') {
      const subMenuAccessType = findAccessType(menuItem.subMenu as LeftMenu, key);
      if (subMenuAccessType) {
        return subMenuAccessType;
      }
    }
  }
  return undefined;
};

const useAccessType = (menuKey: string, defaultAccessType: AccessType = 'V'): AccessType => {
  const sidebar = useSelector(layoutSliceSelector);
  const leftMenu: LeftMenu = sidebar.leftMenu;

  return findAccessType(leftMenu, menuKey) ?? defaultAccessType;
};

export default useAccessType;
