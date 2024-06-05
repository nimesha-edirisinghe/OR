import { ocean_blue_200 } from 'theme/colors';

export const TabStyles = {
  baseStyle: {
    tab: {
      _selected: {}
    },
    _focus: {},
    _hover: {}
  },
  sizes: {},
  variants: {
    primary: {
      tab: {
        color: ocean_blue_200,
        fontSize: '12px',
        fontWeight: '400',
        _selected: {
          color: 'tab.primary._default',
          fontSize: '12px',
          fontWeight: '600'
        },
        _disabled: {
          color: 'red',
          bg: 'red'
        }
      },
      root: {
        color: 'tab.primary._default',
        _selected: {
          color: 'tab.primary._default'
        }
      },
      tablist: {
        borderBottom: '2px solid',
        borderColor: 'tab.primary._line'
      }
    }
  }
};
