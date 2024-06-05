import { Box, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { CSSProperties, ReactNode } from 'react';

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  content?: ReactNode;
  trigger?: 'hover' | 'click' | undefined;
  arrowPadding?: number;
  contentStyles?: CSSProperties;
  placement?: string;
};

export default function AppPopover({
  isOpen,
  onClose,
  children,
  content,
  trigger = 'hover',
  arrowPadding = 0,
  contentStyles = {},
  placement = 'bottom-end',
  ...rest
}: Props) {
  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
      arrowPadding={arrowPadding}
      placement={placement as any}
      {...rest}
      lazyBehavior="keepMounted"
      isLazy
    >
      <PopoverTrigger>
        <Box as="button">{children}</Box>
      </PopoverTrigger>
      <PopoverContent style={contentStyles}>{content}</PopoverContent>
    </Popover>
  );
}
