export const InputStyles = {
  baseStyle: {
    borderRadius: 'sm',
    color: 'fg-default',
    _focus: {},
    _hover: {}
  },
  sizes: {
    large: {
      field: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: '14px',
        height: '44px',
        width: '232px',
        borderRadius: '8px',
        px: '12px'
      }
    },
    small: {
      field: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: '13px',
        height: '36px',
        width: '232px',
        borderRadius: '8px',
        px: '12px'
      }
    },
    // deprecated
    sm: {
      field: {
        fontSize: 'sm',
        height: 8,
        paddingX: 4
      }
    },
    lg: {
      fontSize: 'lg',
      height: 8,
      paddingX: 6
    }
  },
  variants: {
    outline: {
      field: {
        _focus: {}
      }
    },
    filled: {
      field: {
        _focus: {}
      }
    },
    primary: {
      field: {
        bg: 'input.primary._default',
        border: '1px solid transparent',
        _focus: {
          border: '1px solid',
          borderColor: 'input.primary._focus'
        },
        _hover: {
          border: '1px solid',
          borderColor: 'input.primary._hover',
          _focus: {
            border: '1px solid',
            borderColor: 'input.primary._focus'
          }
        },
        _disabled: {
          bg: 'input.primary._disable',
          _hover: {
            bg: 'input.primary._disable'
          }
        }
      }
    },
    error: {
      field: {
        border: '2px solid',
        borderColor: 'input.error._default',
        bg: 'input.primary._default',
        _focus: {}
      }
    }
  }
};
