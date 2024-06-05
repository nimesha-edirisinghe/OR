import { Center, HStack } from '@chakra-ui/layout';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import React, { useRef } from 'react';
import UserPanel from './UserPanel';
import { useDisclosure, useOutsideClick } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';

interface UserHeaderProps {
  userName: string;
  email: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ userName, email }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: ref,
    handler: (event) => {
      if (event.target === ref.current) {
        return;
      }
      onClose();
    }
  });
  return (
    <>
      <Box ref={ref}>
        <AppIconButton
          aria-label="next"
          icon={<AppIcon name="profile" width="24px" height="24px" fill="header.icon._default" />}
          variant="iconPrimary"
          size="iconLarge"
          transition="fill 0.3s ease, transform 0.3s ease"
          onClick={() => onToggle()}
          bg="header.panelBg._default"
        />
        {/* <HStack>
          <AppIconChakra
            name="user"
            fill={
              isOpen ? 'left-menu-icon-hover-color' : 'left-menu-icon-color'
            }
            width="20px"
            height="19px"
            cursor="pointer"
            _groupHover={{
              fill: 'left-menu-icon-hover-color',
            }}
            transition="fill 0.3s"
          />
          <Box>
            <AppIconChakra
              name="chevronDown"
              fill={
                isOpen ? 'left-menu-icon-hover-color' : 'left-menu-icon-color'
              }
              width="12px"
              height="12px"
              cursor="pointer"
              _groupHover={{
                fill: 'left-menu-icon-hover-color',
              }}
              transform={isOpen ? 'rotate(180deg)' : ''}
              transition="fill 0.3s ease, transform 0.3s ease"
              onClick={() => onToggle()}
            />
          </Box>
        </HStack> */}
        <UserPanel isOpen={isOpen} email={email} userName={userName} />
      </Box>
    </>
  );
};

export default UserHeader;
