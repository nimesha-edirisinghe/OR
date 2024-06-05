import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { neutral_200, neutral_400, ocean_blue_600 } from 'theme/colors';

type ToggleTypes = 'sm' | 'md' | 'lg';

interface AppToggleProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  size?: ToggleTypes;
  color?: string;
}

const AppToggle: FC<AppToggleProps> = ({
  isChecked,
  onChange,
  size = 'md',
  color = ocean_blue_600
}) => {
  const handleChange = () => {
    onChange(!isChecked);
  };

  const sizes: Record<string, BoxProps> = {
    sm: {
      w: '18px',
      h: '12px'
    },
    md: {
      w: '36px',
      h: '21px'
    },
    lg: {
      w: '40px',
      h: '22px'
    }
  };

  const circleSizes: Record<string, BoxProps> = {
    sm: {
      w: '4px',
      h: '4px'
    },
    md: {
      w: '14px',
      h: '14px'
    },
    lg: {
      w: '16px',
      h: '16px'
    }
  };

  const toggleSize = sizes[size];
  const circleSize = circleSizes[size];

  return (
    <Flex
      as="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleChange}
      borderWidth={1}
      borderRadius="full"
      w="60px"
      align="center"
      // h={8}
      // p="2px"
      cursor="pointer"
      bg={isChecked ? neutral_200 : neutral_400}
      borderColor={'#504E4E'}
      transition="background-color 0.3s, border-color 0.3s"
      {...toggleSize}
    >
      <Box
        bg={isChecked ? color : '#666666'}
        borderRadius="full"
        transform={`translateX(${isChecked ? '10px' : '2px'})`}
        transition="transform 0.3s"
        {...circleSize}
      />
    </Flex>
  );
};

export default AppToggle;
