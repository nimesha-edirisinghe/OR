export const CheckBoxStyles = {
  baseStyle: {},
  variants: {
    custom: {
      control: {
        _hover: {
          bg: 'none'
        },
        _checked: {
          color: 'left-menu-icon-color',
          bg: 'none'
        }
      }
    },
    primary: {
      control: {
        border: '2px solid',
        borderColor: 'checkBox.primary._default',
        _default: {
          border: '2px solid',
          borderColor: 'checkBox.primary._hover'
        },
        _hover: {
          color: 'checkBox.primary._hover',
          border: '2px solid',
          borderColor: 'checkBox.primary._hover'
        },
        _checked: {
          color: 'checkBox.primary._default',
          border: '2px solid',
          borderColor: 'checkBox.primary._default',
          bg: 'transparent',

          _hover: {
            color: 'checkBox.primary._default',
            border: '2px solid',
            borderColor: 'checkBox.primary._default',
            bg: 'transparent'
          }
        },
        _disabled: {
          color: 'checkBox.primary._disable',
          border: '2px solid',
          borderColor: 'checkBox.primary._disable',

          _hover: {
            color: 'checkBox.primary._disable',
            border: '2px solid',
            borderColor: 'checkBox.primary._disable',
            bg: 'transparent'
          },
          _checked: {
            color: 'checkBox.primary._default',
            border: '2px solid',
            borderColor: 'checkBox.primary._default',
            bg: 'transparent',

            _hover: {
              color: 'checkBox.primary._default',
              border: '2px solid',
              borderColor: 'checkBox.primary._default',
              bg: 'transparent'
            }
          }
        }
      },
      label: {
        color: 'checkBox.primary._default',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '21px',
        _default: {
          color: 'checkBox.primary._hover'
        },
        _hover: {
          color: 'checkBox.primary._hover'
        },
        _checked: {
          color: 'checkBox.primary._default',
          _hover: {
            color: 'checkBox.primary._default'
          }
        },
        _disabled: {
          color: 'checkBox.primary._disable',
          _hover: {
            color: 'checkBox.primary._disable'
          }
        }
      }
    }
  }
};
