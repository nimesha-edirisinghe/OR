import { LeftMenu } from 'state/layout/layoutState';

export let initialLeftMenuState: LeftMenu = {};

export const onSearch = (val: string, initialMenuState: LeftMenu) => {
  try {
    if (Object.keys(initialLeftMenuState).length === 0) {
      initialLeftMenuState = initialMenuState;
    }
    let filteredMenu = initialLeftMenuState;
    if (val !== '') {
      filteredMenu = {};
      Object.keys(initialLeftMenuState).map((name: string, key) => {
        if (name.toLowerCase().includes(val.toLowerCase()) && initialLeftMenuState) {
          filteredMenu[key] = initialLeftMenuState[name];
        } else {
          if (
            initialLeftMenuState &&
            initialLeftMenuState[name].subMenu &&
            Object.keys(initialLeftMenuState[name].subMenu!).length > 0
          ) {
            Object.keys(initialLeftMenuState[name].subMenu!).map((name2: string, key2) => {
              if (name2.toLowerCase().includes(val.toLowerCase()) && initialLeftMenuState) {
                filteredMenu[key] = initialLeftMenuState[name];
              }
            });
          }
        }
      });
    }
    return filteredMenu;
  } catch (error) {
    console.error('Search for menu ', JSON.stringify(error));
  }
};

export const getBoxPosition = (
  e: MouseEvent,
  boxWidth: number,
  boxHeight: number,
  prePos?: { x?: number; y?: number }
) => {
  let popupXPosition = prePos && prePos.x ? prePos.x : 0,
    popupYPosition = prePos && prePos.y ? prePos.y : 0;

  if (!prePos || !prePos.x) {
    if (e.clientX + boxWidth > window.innerWidth) {
      popupXPosition = e.pageX - boxWidth;
    } else {
      popupXPosition = e.pageX;
    }
  }

  if (!prePos || !prePos.y) {
    if (e.clientY + boxHeight > window.innerHeight) {
      popupYPosition = e.pageY - boxHeight;
    } else {
      popupYPosition = e.pageY;
    }
  }
  return { x: popupXPosition, y: popupYPosition };
};
