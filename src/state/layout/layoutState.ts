import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iconName } from 'assets/svg/chakraIcons';
import { IRootState } from 'state/rootState';
import { initialLeftMenuState } from 'utils/layouts';
import { _updateCollapseTogglers } from './stateHelpers/stH_Layout';
import { getFromLocal } from 'utils/localStorage';
import { AccessType } from 'utils/permissions';

export type MenuItem = {
  iconName?: string;
  displayName: string;
  isOpen: boolean;
  subMenu: any;
  path?: string | null;
};

export interface LeftMenu {
  [key: string]: {
    iconName?: iconName;
    accessType?: AccessType;
    displayName: string;
    path?: string;
    isActive?: boolean;
    subMenu?: {
      [key: string]:
        | {
            displayName: string;
            accessType?: AccessType;
            path?: string | null;
            iconName?: string;
            subMenu?: {
              [key: string]:
                | {
                    displayName: string;
                    path?: string | null;
                  }
                | boolean;
            };
          }
        | boolean;
    };
  };
}

export interface ILayout {
  leftMenu: LeftMenu;
  isMayaActive: boolean;
  leftMenuOpen: boolean;
  leftMenuExpandAll: boolean;
  activeMenuItem: string | null;
  activeSubMenuItem: string | null;
  activePage: string | null;
  isLoading: boolean;
  refreshToggle: boolean;
}
const initialActiveSubMenuItem = getFromLocal('activeSubMenuItem');

export const LayoutSlice = createSlice({
  name: 'layout',
  initialState: {
    leftMenu: initialLeftMenuState,
    isMayaActive: false,
    leftMenuOpen: false,
    leftMenuExpandAll: false,
    activeMenuItem: null,
    activeSubMenuItem: initialActiveSubMenuItem,
    isLoading: false,
    refreshToggle: false
  } as ILayout,
  reducers: {
    updateLeftMenu: (state, action) => {
      state.leftMenu = action.payload;
    },
    collapsibleMenuToggler: (state, action) => {
      try {
        const menuRef = action.payload;
        let subMenu = state.leftMenu[menuRef[0]].subMenu!;

        if (menuRef.length === 1) {
          subMenu.isOpen = !subMenu.isOpen;
        }

        if (menuRef.length === 2) {
          const subMenu2 = (subMenu[menuRef[1]] as MenuItem).subMenu;
          subMenu2.isOpen! = !subMenu2.isOpen!;
        }
      } catch (error) {
        console.error('collapsibleMenuToggler ', error);
      }
    },
    leftMenuToggler: (state) => {
      try {
        state.leftMenuOpen = !state.leftMenuOpen;
        state.leftMenuExpandAll = false;
        _updateCollapseTogglers(state, false);
      } catch (error) {
        console.error('leftMenuToggler ', error);
      }
    },
    leftMenuCollapseExpandAllToggler: (state) => {
      try {
        _updateCollapseTogglers(state, !state.leftMenuExpandAll);
        state.leftMenuExpandAll = !state.leftMenuExpandAll;
      } catch (error) {
        console.error('leftMenuCollapseExpandAllToggler ', error);
      }
    },
    getLeftMenuRequest: (state) => {},
    getLeftMenuSuccess: (state, action: { payload: LeftMenu }) => {
      try {
        if (Object.keys(action.payload).some((kn) => kn === 'askMaya')) {
          delete action.payload['askMaya'];
          state.isMayaActive = true;
        }
        state.leftMenu = action.payload;
        state.refreshToggle = !state.refreshToggle;
      } catch (e) {
        console.error('Error occurred on menu fetching ', e);
      }
    },
    getLeftMenuFailure: (state) => {},
    setActiveMenuItem: (state, action: PayloadAction<{ menuItem: string | null }>) => {
      state.activeMenuItem = action.payload.menuItem;
    },
    setActiveSubMenuItem: (state, action: PayloadAction<{ subMenuItem: string | null }>) => {
      state.activeSubMenuItem = action.payload.subMenuItem;
    }
  }
});

export const layoutSliceSelector = (state: IRootState) => state.layout;
export const {
  collapsibleMenuToggler,
  leftMenuToggler,
  leftMenuCollapseExpandAllToggler,
  updateLeftMenu,
  getLeftMenuRequest,
  getLeftMenuSuccess,
  getLeftMenuFailure,
  setActiveMenuItem,
  setActiveSubMenuItem
} = LayoutSlice.actions;

export default LayoutSlice.reducer;
