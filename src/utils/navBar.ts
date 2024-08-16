import { LeftMenu } from 'state/layout/layoutState';

export interface Menu {
  parentMenuName: string | null;
}

export const getActiveMenu = (path: string, menu: LeftMenu): Menu => {
  let activeMenu: Menu = { parentMenuName: null };
  if (path && menu) {
    Object.entries(menu).map((entry) => {
      const [menu, submenu] = entry;
      if (submenu.subMenu) {
        Object.entries(submenu.subMenu).map((subMenuItem) => {
          const [key, value] = subMenuItem;
          if (typeof value !== 'boolean' && value.path === path) {
            activeMenu = { parentMenuName: menu };
          }
        });
      }
    });
  }
  return activeMenu;
};
