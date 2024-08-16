import React, { ReactNode } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { blue_500, ocean_blue_200, ocean_blue_600 } from 'theme/colors';

interface AppConfirmationPromptProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  infoMessage: string | ReactNode;
  confirmationMessage: string;
  leftBtnName: string;
  rightBtnName: string;
  onConfirmHandler: () => void;
  onCloseHandler: () => void;
}

const AppConfirmationPrompt: React.FC<AppConfirmationPromptProps> = ({
  isOpen,
  onClose,
  title,
  infoMessage,
  confirmationMessage,
  leftBtnName,
  rightBtnName,
  onConfirmHandler,
  onCloseHandler
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor={ocean_blue_600}
        borderRadius="8px"
        border={'1px solid'}
        borderColor={ocean_blue_200}
        boxShadow={
          '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)'
        }
      >
        <ModalHeader>
          <AppText>{title}</AppText>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AppText size="usm">{infoMessage}</AppText>
          <AppText size="usm" mt={2}>
            {confirmationMessage}
          </AppText>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onConfirmHandler} variant="transparent">
            <AppText variant="btnLabel" size="xsm" color={blue_500}>
              {leftBtnName}
            </AppText>
          </Button>
          <Button variant="transparent" onClick={onCloseHandler}>
            <AppText variant="btnLabel" size="xsm" color={blue_500}>
              {rightBtnName}
            </AppText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppConfirmationPrompt;
