export interface MenuItemI {
  iconName: string;
  displayName: string;
  path: string | null;
  subMenu: SubMenuI | null;
}

export interface SubMenuI {
  [key: string]: MenuItemI;
}
