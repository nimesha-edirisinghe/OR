import React, { CSSProperties } from 'react';
import { Box } from '@chakra-ui/react';

const TypingDots: React.FC = () => {
  const dotWidth = '8px';
  const dotColor = '#3E637B';
  const speed = '1.5s';

  const typingStyles: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const dotStyles = (delay: string, marginLeft: string): CSSProperties => ({
    content: '""',
    height: dotWidth,
    width: dotWidth,
    background: dotColor,
    position: 'absolute',
    borderRadius: '50%',
    animation: `blink ${speed} infinite`,
    animationDelay: delay,
    marginLeft: marginLeft
  });

  return (
    <Box style={typingStyles}>
      <style>
        {`
          @keyframes blink {
            0% {
              opacity: 0.1;
            }
            20% {
              opacity: 1;
            }
            100% {
              opacity: 0.1;
            }
          }
        `}
      </style>
      <Box as="span" style={dotStyles('0s', '0')} />
      <Box as="span" style={dotStyles('.2s', `calc(${dotWidth} * 1.5)`)} />
      <Box as="span" style={dotStyles('.4s', `calc(${dotWidth} * 3)`)} />
    </Box>
  );
};

export default TypingDots;
