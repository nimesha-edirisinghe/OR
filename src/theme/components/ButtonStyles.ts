export const ButtonStyles = {
  baseStyle: {
    color: 'fg-default',
    _focus: {},
    _hover: {}
  },
  sizes: {
    large: {
      h: '44px',
      fontSize: '16px',
      fontWeight: '400',
      px: '14px',
      borderRadius: '8px'
    },
    medium: {
      h: '36px',
      fontSize: '14px',
      fontWeight: '400',
      px: '14px',
      borderRadius: '8px'
    },
    iconLarge: {
      height: '44px',
      width: '44px',
      borderRadius: '8px'
    },
    iconMedium: {
      height: '36px',
      width: '36px',
      borderRadius: '8px'
    },
    iconSmall: {
      height: '28px',
      width: '28px',
      borderRadius: '8px'
    },
    // deprecated
    sm: {
      h: '30px',
      w: '90px',
      fontSize: '13px',
      fontWeight: '400'
    },
    md: {
      h: '25px',
      fontSize: '12px',
      fontWeight: '400'
    },
    lg: {
      h: '40px',
      fontSize: '30px',
      fontWeight: '500'
    }
  },
  variants: {
    primary: {
      bg: 'button.primary._default.bg',
      _hover: {
        bgGradient: 'linear-gradient(90deg, #0562B9 0%, #0AA3FD 100%)',
        _disabled: {
          bg: 'button.primary._disable.bg'
        }
      },
      _active: {
        bg: 'button.primary._active.bg'
      },
      _disabled: {
        bg: 'button.primary._disable.bg'
      }
    },
    secondary: {
      bg: 'button.secondary._default.bg',
      color: 'button.secondary._default.color',
      _hover: {
        bg: 'button.secondary._hover.bg',
        _disabled: {
          bg: 'button.secondary._disable.bg'
        }
      },
      _active: {
        bg: 'button.secondary._active.bg'
      },
      _disabled: {
        bg: 'button.secondary._disable.bg'
      }
    },
    iconPrimary: {
      bg: 'button.iconPrimary._default',
      _hover: {
        bg: 'button.iconPrimary._hover',
        _disabled: {
          bg: 'button.iconPrimary._disable'
        }
      },
      _active: {
        bg: 'button.iconPrimary._active'
      },
      _disabled: {
        bg: 'button.iconPrimary._disable'
      }
    },
    danger: {
      bg: 'button.danger._default.bg',
      _hover: {
        bg: 'button.danger._hover.bg',
        _disabled: {
          bg: 'button.danger._hover.bg'
        }
      },
      _active: {
        bg: 'button.danger._active.bg'
      },
      _disabled: {
        bg: 'button.danger._disable.bg'
      }
    },

    // deprecated
    solid: {
      backgroundColor: 'btn-bg-solid',
      borderRadius: '5px',
      _hover: {
        backgroundColor: 'btn-bg-solid'
      }
    },
    transparent: {
      backgroundColor: 'none'
    },
    bgTransparentIcon: {
      backgroundColor: 'none',
      _hover: {
        color: 'left-menu-icon-hover-color'
      }
    },
    outline: {
      backgroundColor: 'transparent',
      borderRadius: '100px',
      border: '1px solid',
      borderColor: 'btn-border-outline'
    },
    roundedSolid: {
      backgroundColor: '#ECF5FF',
      border: '1px solid transparent',
      borderRadius: '100px',
      _hover: {
        backgroundColor: 'btn-bg-solid'
      }
    },

    _secondary: {
      backgroundColor: 'transparent',
      borderRadius: '5px',
      _hover: {
        backgroundColor: 'rgba(247, 204, 69, 0.2)',
        color: '#ffffff'
      }
    }
  }
};
