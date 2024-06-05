import { neutral_200, ocean_blue_300, ocean_blue_400, ocean_blue_500 } from 'theme/colors';

export const MenuStyles = {
  baseStyle: {},
  variants: {
    primary: {
      button: {
        fontWeight: 'medium',
        bg: 'teal.500',
        color: ocean_blue_300,
        _hover: {
          bg: 'teal.600',
          color: 'white'
        }
      },
      list: {
        borderRadius: '8px',
        border: '1px solid',
        borderColor: ocean_blue_400,
        bg: ocean_blue_500
      },
      item: {
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '19.5px',
        color: neutral_200,
        bg: ocean_blue_500,
        _hover: {
          bg: ocean_blue_400
        },
        _focus: {
          bg: ocean_blue_500
        }
      }
    },
    secondary: {
      button: {
        fontWeight: 'medium',
        bg: 'teal.500',
        color: 'red',
        _hover: {
          bg: 'red',
          color: 'red'
        }
      },
      list: {
        borderRadius: '8px',
        border: '1px solid',
        borderColor: ocean_blue_400,
        bg: ocean_blue_500
      },
      item: {
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '19.5px',
        color: neutral_200,
        bg: ocean_blue_500,
        _hover: {
          bg: ocean_blue_400
        },
        _focus: {
          bg: ocean_blue_500
        }
      }
    }
  }
};
