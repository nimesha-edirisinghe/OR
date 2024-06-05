export const RadioStyles = {
  baseStyle: {},
  variants: {
    custom: {
      control: {
        borderColor: 'red',
        _checked: {
          bg: 'red'
        }
      }
    },
    primary: {
      control: {
        border: '3.5px solid',
        borderColor: 'radio.primary._default',
        bg: 'transparent',
        _default: {
          border: '3.5px solid',
          borderColor: 'radio.primary._hover'
        },
        _hover: {
          color: 'radio.primary._hover',
          border: '3.5px solid',
          borderColor: 'radio.primary._hover'
        },

        _checked: {
          color: 'radio.primary._default',
          border: '3.5px solid',
          borderColor: 'radio.primary._default',
          bg: 'transparent',

          _hover: {
            color: 'radio.primary._default',
            border: '3.5px solid',
            borderColor: 'radio.primary._default',
            bg: 'transparent'
          }
        },
        _disabled: {
          color: 'radio.primary._disable',
          border: '3.5px solid',
          borderColor: 'radio.primary._disable',
          bg: 'transparent',

          _hover: {},
          _checked: {
            color: 'radio.primary._disable',
            border: '3.5px solid',
            borderColor: 'radio.primary._disable',
            bg: 'transparent',

            _hover: {
              color: 'radio.primary._disable',
              border: '3.5px solid',
              borderColor: 'radio.primary._disable',
              bg: 'transparent'
            }
          }
        }
      },
      label: {
        color: 'radio.primary._default',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '21px',

        _hover: {
          color: 'radio.primary._hover'
        },
        _checked: {
          color: 'radio.primary._default',
          _hover: {
            color: 'radio.primary._default'
          }
        },
        _disabled: {
          color: 'radio.primary._disable',
          opacity: '1',
          _hover: {
            color: 'radio.primary._disable'
          },
          _checked: {
            color: 'radio.primary._disable',
            opacity: '1',
            _hover: {
              color: 'radio.primary._disable'
            }
          }
        }
      }
    }
  }
};
