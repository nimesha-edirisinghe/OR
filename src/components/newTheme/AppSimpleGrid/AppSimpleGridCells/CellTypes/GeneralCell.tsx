import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useEffect, useState } from 'react';
import { numberWithCommaSeparator } from 'utils/utility';
import { CellTextAlignmentT } from '../../AppSimpleGrid';

interface Props {
  rowColorBg: string;
  displayValue: string;
  tableRoot?: any;
  textAlign?: CellTextAlignmentT;
}

const GeneralCell: FC<Props> = ({ displayValue, tableRoot, textAlign }) => {
  const formattedDisplayValue =
    typeof displayValue === 'number'
      ? numberWithCommaSeparator(Number(displayValue))
      : displayValue;
  const alignment = textAlign ? textAlign : typeof displayValue === 'number' ? 'right' : 'left';

  const shouldUseTooltip = displayValue && displayValue.toString().length > 18;
  const [displayTootTip, setDisplayTooltip] = useState(false);
  useEffect(() => {
    const tableElement = tableRoot.current;
    tableElement.addEventListener('scroll', () => setDisplayTooltip(false));
    tableElement.addEventListener('scrollend', () => setDisplayTooltip(true));
  }, []);

  return (
    <AppText size="body2" noOfLines={1} textAlign={alignment} style={{ wordBreak: 'break-all' }}>
      {shouldUseTooltip && displayTootTip ? (
        <AppTooltip label={formattedDisplayValue} placement="auto-start">
          <span>{formattedDisplayValue}</span>
        </AppTooltip>
      ) : (
        <span>{formattedDisplayValue}</span>
      )}
    </AppText>
  );
};

export default GeneralCell;
