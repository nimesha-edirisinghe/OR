import tokens from './tokens';
import {
  blue_500,
  blue_500_t28,
  blue_500_t30,
  blue_600,
  linear_blue,
  linear_blue_400,
  neutral_100,
  neutral_200,
  neutral_300,
  neutral_400,
  neutral_600,
  ocean_blue_100,
  ocean_blue_200,
  ocean_blue_300,
  ocean_blue_400,
  ocean_blue_500,
  ocean_blue_600,
  red_400,
  red_500,
  yellow_500
} from './colors';

const semanticTokens = {
  colors: {
    button: {
      primary: {
        _default: {
          bg: {
            _light: blue_600,
            _dark: blue_600
          },
          color: {
            _light: '',
            _dark: ''
          }
        },
        _hover: {
          bg: {
            _light: linear_blue,
            _dark: linear_blue
          },
          color: {}
        },
        _active: {
          bg: {
            _light: linear_blue_400,
            _dark: linear_blue_400
          },
          color: {}
        },
        _disable: {
          bg: {
            _light: neutral_600,
            _dark: neutral_600
          },
          color: {}
        }
      },
      secondary: {
        _default: {
          color: {
            _light: blue_500,
            _dark: blue_500
          },
          bg: {
            _light: ocean_blue_600,
            _dark: ocean_blue_600
          }
        },
        _hover: {
          bg: {
            _light: ocean_blue_500,
            _dark: ocean_blue_500
          }
        },
        _active: {
          bg: {
            _light: ocean_blue_400,
            _dark: ocean_blue_400
          }
        },
        _disable: {
          bg: {
            _light: neutral_600,
            _dark: neutral_600
          }
        }
      },
      iconPrimary: {
        _default: {
          _light: ocean_blue_600,
          _dark: ocean_blue_600
        },
        _hover: {
          _light: ocean_blue_500,
          _dark: ocean_blue_500
        },
        _active: {
          _light: ocean_blue_400,
          _dark: ocean_blue_400
        },
        _disable: {
          _light: neutral_600,
          _dark: neutral_600
        }
      },
      danger: {
        _default: {
          bg: {
            _light: red_500,
            _dark: red_500
          },
          color: {
            _light: '',
            _dark: ''
          }
        },
        _hover: {
          bg: {
            _light: red_400,
            _dark: red_400
          },
          color: {}
        },
        _active: {
          bg: {
            _light: red_400,
            _dark: red_400
          },
          color: {}
        },
        _disable: {
          bg: {
            _light: neutral_600,
            _dark: neutral_600
          },
          color: {}
        }
      }
    },
    input: {
      primary: {
        _default: {
          _light: ocean_blue_500,
          _dark: ocean_blue_500
        },
        _hover: {
          _light: ocean_blue_400,
          _dark: ocean_blue_400
        },
        _focus: {
          _light: blue_500,
          _dark: blue_500
        },
        _disable: {
          _light: neutral_600,
          _dark: neutral_600
        }
      },
      error: {
        _default: {
          _light: red_500,
          _dark: red_500
        }
      }
    },
    formLabel: {
      primary: {
        _default: {
          _light: neutral_400,
          _dark: neutral_400
        }
      },
      error: {
        _default: {
          _light: red_500,
          _dark: red_500
        }
      }
    },
    formErrorMessage: {
      error: {
        _default: {
          _light: red_500,
          _dark: red_500
        }
      }
    },
    checkBox: {
      primary: {
        _default: {
          _light: neutral_200,
          _dark: neutral_200
        },
        _hover: {
          _light: ocean_blue_100,
          _dark: ocean_blue_100
        },
        _focus: {
          _light: ocean_blue_200,
          _dark: ocean_blue_200
        },
        _disable: {
          _light: ocean_blue_400,
          _dark: ocean_blue_400
        }
      },
      error: {
        _default: {
          _light: red_500,
          _dark: red_500
        }
      }
    },
    radio: {
      primary: {
        _default: {
          _light: neutral_200,
          _dark: neutral_200
        },
        _hover: {
          _light: ocean_blue_100,
          _dark: ocean_blue_100
        },
        _focus: {
          _light: ocean_blue_200,
          _dark: ocean_blue_200
        },
        _disable: {
          _light: ocean_blue_400,
          _dark: ocean_blue_400
        }
      }
    },
    tab: {
      primary: {
        _default: {
          _light: neutral_100,
          _dark: neutral_100
        },
        _line: {
          _light: ocean_blue_400,
          _dark: ocean_blue_400
        },
        _indicator: {
          _light: yellow_500,
          _dark: yellow_500
        }
      }
    },
    stepper: {
      primary: {
        default: {
          completed: {
            backgroundColor: {
              _light: blue_500_t30,
              _dark: blue_500_t30
            },
            borderColor: {
              _light: ocean_blue_400,
              _dark: ocean_blue_400
            },
            textColor: {
              _light: neutral_200,
              _dark: neutral_200
            },
            labelColor: {
              _light: neutral_200,
              _dark: neutral_200
            }
          },
          inprogress: {
            backgroundColor: {
              _light: blue_600,
              _dark: blue_600
            },
            borderColor: {
              _light: ocean_blue_400,
              _dark: ocean_blue_400
            },
            textColor: {
              _light: neutral_100,
              _dark: neutral_100
            },
            labelColor: {
              _light: neutral_100,
              _dark: neutral_100
            }
          },
          upcoming: {
            backgroundColor: {
              _light: ocean_blue_500,
              _dark: ocean_blue_500
            },
            borderColor: {
              _light: ocean_blue_400,
              _dark: ocean_blue_400
            },
            textColor: {
              _light: ocean_blue_300,
              _dark: ocean_blue_300
            },
            labelColor: {
              _light: ocean_blue_300,
              _dark: ocean_blue_300
            }
          },
          icon: {
            _light: neutral_200,
            _dark: neutral_200
          },
          track: {
            completed: {
              _light: blue_500_t30,
              _dark: blue_500_t30
            },
            upcoming: {
              _light: ocean_blue_500,
              _dark: ocean_blue_500
            }
          }
        },
        hovered: {
          completed: {
            backgroundColor: {
              _light: blue_500_t28,
              _dark: blue_500_t28
            },
            borderColor: {
              _light: ocean_blue_400,
              _dark: ocean_blue_400
            },
            textColor: {
              _light: neutral_200,
              _dark: neutral_200
            },
            labelColor: {
              _light: neutral_200,
              _dark: neutral_200
            }
          },
          inprogress: {
            backgroundColor: {
              _light: blue_500,
              _dark: blue_500
            },
            borderColor: {
              _light: ocean_blue_400,
              _dark: ocean_blue_400
            },
            textColor: {
              _light: neutral_100,
              _dark: neutral_100
            },
            labelColor: {
              _light: neutral_100,
              _dark: neutral_100
            }
          }
        }
      }
    },
    pagination: {
      primary: {
        _default: {
          nav: {
            btn: {
              _light: ocean_blue_600,
              _dark: ocean_blue_600
            },
            icon: {
              _light: blue_500,
              _dark: blue_500
            }
          },
          pageBtn: {
            btn: {
              _light: ocean_blue_600,
              _dark: ocean_blue_600
            },
            text: {
              _light: neutral_300,
              _dark: neutral_300
            }
          }
        },
        _selected: {
          pageBtn: {
            btn: {
              _light: ocean_blue_400,
              _dark: ocean_blue_400
            },
            text: {
              _light: neutral_100,
              _dark: neutral_100
            }
          }
        }
      }
    },
    header: {
      icon: {
        _default: {
          _light: neutral_300,
          _dark: neutral_300
        }
      },
      panelBg: {
        _default: {
          _light: ocean_blue_500,
          _dark: ocean_blue_500
        }
      }
    },
    filterMultiSelector: {
      textColor: {
        _default: {
          _light: ocean_blue_200,
          _dark: ocean_blue_200
        },
        _hovered: {
          _light: ocean_blue_100,
          _dark: ocean_blue_100
        },
        _filled: {
          _light: neutral_200,
          _dark: neutral_200
        },
        _filledHover: {
          _light: neutral_100,
          _dark: neutral_100
        }
      }
    },
    popup: {
      primary: {
        container: {
          bg: {
            _light: ocean_blue_600,
            _dark: ocean_blue_600
          }
        }
      }
    },

    // deprecated
    'bg-default': {
      _light: tokens.colors.light['bg-default'],
      _dark: tokens.colors.dark['bg-default']
    },
    'fg-default': {
      _light: tokens.colors.light['fg-default'],
      _dark: tokens.colors.dark['fg-default']
    },
    'btn-bg-solid': {
      _light: tokens.colors.light['btn-bg-solid'],
      _dark: tokens.colors.dark['btn-bg-solid']
    },
    'btn-border-outline': {
      _light: tokens.colors.light['btn-border-outline'],
      _dark: tokens.colors.dark['btn-border-outline']
    },
    'txt-border-outline': {
      _light: tokens.colors.light['txt-border-outline'],
      _dark: tokens.colors.dark['txt-border-outline']
    },
    'icon-bg': {
      _light: tokens.colors.light['icon-bg'],
      _dark: tokens.colors.dark['icon-bg']
    },
    'left-menu-item-font-color': {
      _light: tokens.colors.light['left-menu-item-font-color'],
      _dark: tokens.colors.dark['left-menu-item-font-color']
    },
    'left-menu-icon-color': {
      _light: tokens.colors.light['left-menu-icon-color'],
      _dark: tokens.colors.dark['left-menu-icon-color']
    },
    'left-menu-icon-hover-color': {
      _light: tokens.colors.light['left-menu-icon-hover-color'],
      _dark: tokens.colors.dark['left-menu-icon-hover-color']
    },
    'prompt-bg-color': {
      _light: tokens.colors.light['prompt-bg-color'],
      _dark: tokens.colors.dark['prompt-bg-color']
    },
    'prompt-border': {
      _light: tokens.colors.light['prompt-border'],
      _dark: tokens.colors.dark['prompt-border']
    },
    'overlay-bg': {
      _light: tokens.colors.light['overlay-bg'],
      _dark: tokens.colors.dark['overlay-bg']
    },
    'gray-text': {
      _light: tokens.colors.light['gray-text'],
      _dark: tokens.colors.dark['gray-text']
    },
    'menu-text-color': {
      _light: tokens.colors.light['menu-text-color'],
      _dark: tokens.colors.dark['menu-text-color']
    },
    'insights-section-bg-color': {
      _light: tokens.colors.light['insights-section-bg-color'],
      _dark: tokens.colors.dark['insights-section-bg-color']
    },
    'light-gray-text': {
      _light: tokens.colors.light['light-gray-text'],
      _dark: tokens.colors.dark['light-gray-text']
    },
    'primary-radio-box': {
      _light: tokens.colors.light['primary-radio-box'],
      _dark: tokens.colors.dark['primary-radio-box']
    },
    'card-header-bg': {
      _light: tokens.colors.light['card-header-bg'],
      _dark: tokens.colors.dark['card-header-bg']
    },
    'card-body-bg': {
      _light: tokens.colors.light['card-body-bg'],
      _dark: tokens.colors.dark['card-body-bg']
    },
    'card-text-color': {
      _light: tokens.colors.light['card-text-color'],
      _dark: tokens.colors.dark['card-text-color']
    },
    'rounded-btn-bg-color': {
      _light: tokens.colors.light['rounded-btn-bg-color'],
      _dark: tokens.colors.dark['rounded-btn-bg-color']
    }
  }
};

export default semanticTokens;
