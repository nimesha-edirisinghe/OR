import { FC, useCallback } from 'react';
import { HStack, useDisclosure } from '@chakra-ui/react';
import { deleteAlertRequest } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { yellow_500 } from 'theme/colors';

interface Props {}

const EditAlertFooterSection: FC<Props> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    dispatch(deleteAlertRequest());
    onClose();
    navigate('/app/predictive-alerts');
  };

  const deleteConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpen}
        onClose={onClose}
        leftBtnName="YES"
        rightBtnName="NO"
        infoMessage="This action will permanently delete the configured alert. Are you sure you want to continue?"
        onConfirmHandler={onDeleteHandler}
        onCloseHandler={onClose}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpen]);

  return (
    <>
      {deleteConfirmationPrompt()}
      <HStack w="full">
        <AppButton variant="danger" size="medium" onClick={onOpen}>
          Delete
        </AppButton>
      </HStack>
    </>
  );
};

export default EditAlertFooterSection;
