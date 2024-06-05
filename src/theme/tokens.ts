import {
  black,
  black_300,
  black_600,
  black_700,
  black_800,
  gray_100,
  gray_200,
  white,
  yellow_100,
  white_100,
  black_200,
  purple_100,
  gray_300,
  gray_400,
  blue_300,
  purple_200,
  black_900,
  gray_500,
  gray_700,
  gray_600,
  blue_400,
  yellow_200,
  ocean_blue_500,
  ocean_blue_200,
  blue_500
} from './colors';

const tokens = {
  colors: {
    light: {
      // deprecated
      'bg-default': white,
      'fg-default': black,
      'btn-bg-solid': gray_100,
      'btn-border-outline': gray_100,
      'txt-border-outline': gray_100,
      'icon-bg': black,
      'left-menu-item-font-color': white,
      'left-menu-icon-color': white,
      'left-menu-icon-hover-color': blue_500,
      'prompt-bg-color': ocean_blue_500,
      'prompt-border': ocean_blue_200,
      'overlay-bg': black_800,
      'gray-text': gray_200,
      'menu-text-color': white_100,
      'insights-section-bg-color': white_100,
      'light-text': purple_100,
      'light-gray-text': gray_300,
      'primary-radio-box': blue_300,
      'card-header-bg': purple_200,
      'card-body-bg': gray_500,
      'card-text-color': gray_700,
      'rounded-btn-bg-color': blue_400
    },
    dark: {
      // deprecated
      'bg-default': '#1A1A1A',
      'fg-default': white,
      'btn-bg-solid': yellow_100,
      'btn-border-outline': yellow_100,
      'txt-border-outline': yellow_100,
      'icon-bg': white,
      'left-menu-bg-color': black_300,
      'left-menu-item-font-color': '#A6A6A6',
      'left-menu-icon-color': gray_100,
      'left-menu-icon-hover-color': blue_500,
      'prompt-bg-color': ocean_blue_500,
      'prompt-border': ocean_blue_200,
      'overlay-bg': black_800,
      'gray-text': gray_200,
      'menu-text-color': white_100,
      'insights-section-bg-color': black_200,
      'light-gray-text': gray_400,
      'primary-radio-box': yellow_100,
      'card-header-bg': black_900,
      'card-body-bg': black_300,
      'card-text-color': gray_600,
      'rounded-btn-bg-color': yellow_200
    }
  }
};

export default tokens;
