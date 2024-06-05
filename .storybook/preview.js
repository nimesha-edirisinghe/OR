import {
  ChakraProvider,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue
  // theme
} from '@chakra-ui/react';
import * as React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import theme from '../src/theme';
import Fonts from '../src/theme/Fonts';
import { fonts } from '../src/theme/Fonts';
import { Provider } from 'react-redux';
import store from '../src/state/store';

export const parameters = {
  chakra: {
    theme,
    fonts
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#001019',
      },
      {
        name: 'light',
        value: '#fff',
      },
    ],
  },
};

export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL']
    }
  }
};

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue('dark', 'light');

  return (
    <Flex justify="flex-start" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  );
};

const withChakra = (StoryFn, context) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  React.useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
        <Provider store={store}>
          {/* <ColorModeToggleBar /> */}
          <StoryFn />
        </Provider>
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra];
