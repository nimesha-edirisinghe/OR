import { HStack, useDisclosure } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppConfirmationPrompt from 'components/AppConfirmationPrompt/AppConfirmationPrompt';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/AppText/AppText';
import AppToggle from 'components/AppToggle/AppToggle';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { FC, useCallback } from 'react';
import { blue_500, neutral_200, neutral_400, ocean_blue_100, yellow_500 } from 'theme/colors';

interface ActionSectionProps {
  onDeleteHandler: () => void;
  isEnabled: boolean;
  setIsEnabledHandler: (isChecked: boolean) => void;
}

const ActionSection: FC<ActionSectionProps> = ({
  onDeleteHandler,
  isEnabled,
  setIsEnabledHandler
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const handleToggleChange = (isChecked: boolean) => {
    setIsEnabledHandler(isChecked);
  };

  const onPressDeleteHandler = () => {
    onDeleteHandler();
    onClose();
  };

  const deleteConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpen}
        onClose={onClose}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Delete Schedule"
        infoMessage={
          <AppText>
            This action will permanently delete the schedule.
            <br />
            Are you sure you want to continue?
          </AppText>
        }
        onConfirmHandler={onClose}
        onCloseHandler={onPressDeleteHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpen]);
  return (
    <>
      {deleteConfirmationPrompt()}
      <HStack w="full" justify="start" spacing="20px">
        <HStack>
          <AppToggle
            isChecked={isEnabled}
            onChange={handleToggleChange}
            color={'black'}
            size="sm"
          />
          <AppText fontSize="13px" fontWeight={400} lineHeight="19.5px" color={neutral_400}>
            Enable
          </AppText>
        </HStack>
      </HStack>
    </>
  );
};

export default ActionSection;
