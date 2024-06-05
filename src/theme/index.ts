import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import semanticTokens from './semanticTokens';
import { globalStyles as styles } from './globalStyles';
import components from './components';
import { fonts } from './Fonts';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  cssVarPrefix: 'order-right'
};

const breakpoints = {
  base: '0px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1280px',
  '2xl': '1980px'
};

const theme = extendTheme({
  breakpoints,
  config,
  fonts,
  styles,
  semanticTokens,
  components
});

export default theme;
