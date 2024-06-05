import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack
} from '@chakra-ui/react';
import { blue_500, ocean_blue_600 } from 'theme/colors';
import AppText from 'components/newTheme/AppText/AppText';
import AppButton from 'components/newTheme/AppButton/AppButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  leftBtnName: string;
  rightBtnName: string;
  onConfirmHandler: () => void;
  onCloseHandler: () => void;
  children: ReactNode;
  minWidth?: string;
}

const AppUserInputPrompt: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  leftBtnName,
  rightBtnName,
  onConfirmHandler,
  onCloseHandler,
  children,
  minWidth
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor={ocean_blue_600}
        borderRadius="8px"
        p={'8px'}
        w="600px"
        minWidth={minWidth!}
      >
        <ModalHeader>
          <AppText size="h3Semibold">{title}</AppText>
        </ModalHeader>
        <ModalCloseButton color={blue_500} size={'sm'} mt="12px" mr="12px" />
        <ModalBody w="600px">{children}</ModalBody>
        <ModalFooter>
          <HStack spacing="12px">
            <AppButton onClick={onCloseHandler} variant="secondary" px="14px" size="medium">
              {leftBtnName}
            </AppButton>
            <AppButton variant="primary" size="medium" px="14px" onClick={onConfirmHandler}>
              {rightBtnName}
            </AppButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppUserInputPrompt;
