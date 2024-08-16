import { GroupLabelI } from 'types/groupConfig';
import { ILayout, LeftMenu, MenuItem } from '../layoutState';

export type filterHierarchTypes =
  | 'viewForecast'
  | 'viewReplenishment'
  | 'default'
  | 'viewWhReplenishment'
  | 'viewWhForecast'
  | 'viewOrderParamRepl';

export const filterHierarchyGenerator = (hierarchyType: filterHierarchTypes) => {
  try {
    let formattedHierarchy = [];
    switch (hierarchyType) {
      case 'viewForecast':
        {
          formattedHierarchy = [
            {
              name: 'Product',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'product') ||
                ([2].includes(x.code) && x.name == 'sku')
            },
            {
              name: 'Location',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
                ([1].includes(x.code) && x.name == 'store')
            }
          ];
        }
        break;
      case 'viewReplenishment':
        {
          formattedHierarchy = [
            {
              name: 'Product',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'product') ||
                ([2].includes(x.code) && x.name == 'sku')
            },
            {
              name: 'Location',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
                ([1].includes(x.code) && x.name == 'store')
            },
            {
              name: 'Vendor',
              filter: (x: GroupLabelI) => [1].includes(x.code) && x.name == 'vendor'
            }
          ];
        }
        break;
      case 'viewOrderParamRepl':
        {
          formattedHierarchy = [
            {
              name: 'Product',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'product') ||
                ([2].includes(x.code) && x.name == 'sku')
            },
            {
              name: 'Location',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
                ([1].includes(x.code) && x.name == 'store'),
              customLabel: (x: GroupLabelI, whFlag: 0 | 1 | 2) =>
                whFlag == 2 && x.code == 1 && x.name == 'store' ? 'Location' : x.label
            },
            {
              name: 'Vendor',
              filter: (x: GroupLabelI) => [1].includes(x.code) && x.name == 'vendor'
            }
          ];
        }
        break;
      case 'viewWhForecast':
        {
          formattedHierarchy = [
            {
              name: 'Product',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'product') ||
                ([2].includes(x.code) && x.name == 'sku')
            },
            {
              name: 'Location',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
                ([2].includes(x.code) && x.name == 'store')
            }
          ];
        }
        break;
      case 'viewWhReplenishment':
        {
          formattedHierarchy = [
            {
              name: 'Product',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'product') ||
                ([2].includes(x.code) && x.name == 'sku')
            },
            {
              name: 'Location',
              filter: (x: GroupLabelI) =>
                ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
                ([2].includes(x.code) && x.name == 'store')
            },
            {
              name: 'Vendor',
              filter: (x: GroupLabelI) => [1].includes(x.code) && x.name == 'vendor'
            }
          ];
        }
        break;
      case 'default':
        formattedHierarchy = [
          {
            name: 'Product',
            filter: (x: GroupLabelI) =>
              ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'product') ||
              ([2].includes(x.code) && x.name == 'sku')
          },
          {
            name: 'Location',
            filter: (x: GroupLabelI) =>
              ([1, 2, 3, 4, 5].includes(x.code) && x.name == 'location') ||
              ([1].includes(x.code) && x.name == 'store')
          }
        ];
    }
    return formattedHierarchy;
  } catch (e) {
    console.error('filter hierarchy generator error ', e);
    return [];
  }
};

export const _updateCollapseTogglers = (state: ILayout, isOpeStatus: boolean) => {
  try {
    Object.keys(state.leftMenu).map((menu) => {
      if (state.leftMenu[menu].subMenu) {
        state.leftMenu[menu].subMenu!.isOpen = isOpeStatus;
        Object.keys(state.leftMenu[menu].subMenu!).map((menu2) => {
          if ((state.leftMenu[menu].subMenu![menu2] as MenuItem).subMenu) {
            (state.leftMenu[menu].subMenu![menu2] as MenuItem).subMenu.isOpen = isOpeStatus;
          }
        });
      }
    });
  } catch (error) {
    console.error('error on update collapse toggler ', error);
  }
};

const pathTitleMap: { [key: string]: string } = {
  '/app/maya': 'Maya',
  '/app/home': 'Home',
  '/app/predictive-alerts/definition': 'Predictive alerts > View Alerts',
  '/app/predictive-alerts/view-all': 'Predictive alerts > View Alerts > All SKU Locations',
  '/app/predictive-alerts/edit': 'Predictive alerts > Edit Alerts',
  '/app/demand-forecast/individual-forecast-analyser': 'Store Forecasts > Validate',
  '/app/demand-forecast/aggregated-forecast-analyser': 'Store Forecasts > Forecast Analyser',
  '/app/predictive-alerts/bulk-edit': 'Predictive alerts > Bulk Edit Alerts'
};

export const getPageTitle = (leftMenu: LeftMenu, pathName: string): string => {
  if (!leftMenu || !pathName) {
    return '';
  }

  if (pathTitleMap[pathName]) {
    return pathTitleMap[pathName];
  }

  let menu: any = null;
  Object.values(leftMenu).forEach((m) => {
    if (m.path && m.path == pathName) {
      menu = m;
      return;
    }
    if (m.subMenu) {
      Object.values(m.subMenu as Object).forEach((item) => {
        if (item.path && item.path == pathName) {
          menu = item;
          return;
        }
      });
      if (!menu) {
        Object.values(m.subMenu as Object).forEach((item) => {
          if (item.path && pathName.startsWith(item.path)) {
            menu = item;
            return;
          }
        });
      }
    }
  });
  return menu ? menu.displayName : '';
};

export const getPageNameByURL = (url: string) => {
  if (url.startsWith('/app/maya')) return 'Ask Maya';
  if (url.startsWith('/app/home')) return 'Home';
  if (url.startsWith('/app/predictive-alerts')) return 'Predictive Alert';
  if (url.startsWith('/app/operations-tracker')) return 'Operations Tracker';
  if (url.startsWith('/app/group-config')) return 'Group Configurations';
  if (url.startsWith('/app/config')) return 'Forecasting Configurations';
  if (url.startsWith('/app/replenishment-configs')) return 'Replenishment Configurations';
  if (url.startsWith('/app/demand-forecast')) return 'Product-Store Forecasting';
  if (url.startsWith('/app/wh-replenishment')) return 'Product-WH Replenishment';
  if (url.startsWith('/app/replenishment-planning')) return 'Product-Store Replenishment';
  if (url.startsWith('/app/overview')) return 'Overview';
  if (url.startsWith('/app/predictive-alerts/create')) return 'Create Alert';
  if (url.startsWith('/app/wh-forecast')) return 'Product-WH Forecasting';
  if (url.startsWith('/app/vl/po-repl-req')) return 'PO Replenishment Request';
  if (url.startsWith('/app/vl/task-board')) return 'TaskBoard';
  if (url.startsWith('/app/data-ingestion-summary')) return 'Data Ingestion Summary';
  if (url.startsWith('/app/promotion-summary')) return 'Promotion Summary';
  if (url.startsWith('/app/order-parameter')) return 'Replenishment Parameter Summary';
  if (url.startsWith('/app/unauthorized')) return 'Unauthorized Access';

  return url;
};
