export const FormLabelStyles = {
  baseStyle: {
    _focus: {},
    _hover: {}
  },
  sizes: {
    default: {
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '18px'
    }
  },
  variants: {
    primary: {
      color: 'formLabel.primary._default',
      fontSize: '14px',
      fontWeight: 400,
      _focus: {},
      _hover: {},
      _disabled: {}
    },
    error: {
      color: 'formLabel.error._default',
      _focus: {}
    }
  }
};
