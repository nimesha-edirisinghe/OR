import { ocean_blue_350, ocean_blue_400 } from './colors';

export const scrollbarYStyles = {
  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-track': {
    width: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: ocean_blue_350
  },
  scrollbarGutter: 'stable'
};

export const scrollbarXStyles = {
  '&::-webkit-scrollbar': {
    height: '4px'
  },
  '&::-webkit-scrollbar-track': {
    height: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: ocean_blue_350
  }
};

export const scrollbarXYStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px'
  },
  '&::-webkit-scrollbar-track': {
    width: '4px',
    height: '4px',
    backgroundColor: ocean_blue_400
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: ocean_blue_350
  },
  ' &::-webkit-scrollbar-track-piece': {
    display: 'none'
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: ocean_blue_400
  }
};

export const tableScrollbarXYStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px'
  },
  '&::-webkit-scrollbar-track': {
    width: '4px',
    height: '4px',
    backgroundColor: ocean_blue_400
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: ocean_blue_350
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: ocean_blue_400
  },
  '&::-webkit-scrollbar-track-piece:start': {
    background: 'transparent'
  },
  scrollbarGutter: 'stable'
};
