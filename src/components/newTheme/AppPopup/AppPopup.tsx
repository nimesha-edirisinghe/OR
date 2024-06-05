import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  VStack,
  Center,
  HStack
} from '@chakra-ui/react';
import AppButton from '../AppButton/AppButton';
import AppText from '../AppText/AppText';
import { neutral_100 } from 'theme/colors';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?:string;
  infoMessage: string | ReactNode;
  leftBtnName: string;
  rightBtnName: string;
  onConfirmHandler: () => void;
  onCloseHandler: () => void;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
}

const AppPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  title="Warning",
  infoMessage,
  leftBtnName,
  rightBtnName,
  onConfirmHandler,
  onCloseHandler,
  icon
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent borderRadius="8px" bg="popup.primary.container.bg" w="440px" h="268px">
        <ModalBody p="28px">
          <VStack spacing={0}>
            <Center h="50px" w="80px" mb="16px">
              {icon}
            </Center>
            <AppText size="h3Semibold">{title}</AppText>
            <Center h="50px" w="392px" pt="20px">
              <AppText size="body2" color={neutral_100} align="center">
                {infoMessage}
              </AppText>
            </Center>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center" pb="24px">
          <HStack spacing="12px">
            <AppButton variant="secondary" size="medium" onClick={onConfirmHandler} px="14px">
              {leftBtnName}
            </AppButton>
            <AppButton variant="primary" size="medium" onClick={onCloseHandler} px="14px">
              {rightBtnName}
            </AppButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppPopup;
