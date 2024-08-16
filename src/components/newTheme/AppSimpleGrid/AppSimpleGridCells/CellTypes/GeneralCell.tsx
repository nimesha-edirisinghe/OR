import AppTooltip from 'components/AppTooltip/AppTooltip';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { numberWithCommaSeparator } from 'utils/utility';
import { CellTextAlignmentT } from '../../AppSimpleGrid';
import { Text } from '@chakra-ui/react';

interface Props {
  rowColorBg: string;
  displayValue: string;
  tableRoot?: any;
  textAlign?: CellTextAlignmentT;
  cellWidth?: number;
}

const GeneralCell: FC<Props> = ({ displayValue, tableRoot, textAlign, cellWidth = 0 }) => {
  const textRef: any = useRef();
  const formattedDisplayValue =
    typeof displayValue === 'number'
      ? numberWithCommaSeparator(Number(displayValue))
      : displayValue;
  const alignment = textAlign ? textAlign : typeof displayValue === 'number' ? 'right' : 'left';

  const [displayTootTip, setDisplayTooltip] = useState(true);
  useEffect(() => {
    const tableElement = tableRoot.current;
    tableElement.addEventListener('scroll', () => setDisplayTooltip(false));
    tableElement.addEventListener('scrollend', () => setDisplayTooltip(true));

    return () => {
      tableElement.removeEventListener('scroll', () => setDisplayTooltip(false));
      tableElement.removeEventListener('scrollend', () => setDisplayTooltip(true));
    };
  }, []);

  const shouldUseTooltip = textRef.current?.offsetWidth + 16 >= cellWidth;

  return (
    <Text
      ref={textRef}
      size="body2"
      noOfLines={1}
      textAlign={alignment}
      style={{ wordBreak: 'break-all', userSelect: 'text' }}
    >
      {shouldUseTooltip && displayTootTip ? (
        <AppTooltip label={formattedDisplayValue} placement="top-end">
          <span>{formattedDisplayValue}</span>
        </AppTooltip>
      ) : (
        <span>{formattedDisplayValue}</span>
      )}
    </Text>
  );
};

export default GeneralCell;
