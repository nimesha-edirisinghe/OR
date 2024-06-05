import {
  ocean_blue_300,
  ocean_blue_400,
  ocean_blue_500,
  ocean_blue_600,
  ocean_blue_700
} from 'theme/colors';

export const TableStyles = {
  parts: ['th', 'tr', 'td'],
  baseStyle: {
    th: {
      textTransform: 'capitalize',
      backgroundColor: ocean_blue_600
    },
    tr: {
      backgroundColor: '#252525'
    },
    td: {
      backgroundColor: ocean_blue_500
    }
  },
  variants: {
    default: {
      tr: {
        th: {
          border: '1.5px solid #1A1A1A',
          paddingLeft: '10px'
        },
        td: {
          transition: '0.8s',
          border: '1.5px solid',
          borderColor: ocean_blue_600,
          padding: '10px'
        },
        _hover: {
          td: {
            background: '#284B61',
            border: '1.5px solid #1A3445'
          }
        }
      }
    },
    simple: {
      tr: {
        backgroundColor: ocean_blue_400,
        th: {
          border: 'none',
          paddingLeft: '10px',
          backgroundColor: 'insights-section-bg-color',
          textAlign: 'center',
          minWidth: '150px'
        },
        td: {
          transition: '0.8s',
          border: '1.5px solid #1A1A1A',
          padding: '10px',
          minWidth: '150px'
        }
      }
    }
  }
};
