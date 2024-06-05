import { Tooltip, TooltipProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends TooltipProps {
  children: ReactNode;
}

const AppTooltip: React.FC<Props & TooltipProps> = ({
  children,
  ...rest
}: Props) => {
  return <Tooltip {...rest}>{children}</Tooltip>;
};

export default AppTooltip;
