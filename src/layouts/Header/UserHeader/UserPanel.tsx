import React from 'react';
import { HStack, VStack } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { REACT_APP_WORKBENCH_BASE_URL } from 'config/constants';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userSliceSelector } from 'state/user/userState';
import { neutral_200, ocean_blue_200, ocean_blue_400, ocean_blue_600 } from 'theme/colors';
import { useORAuth } from 'utils/auth';
import { shouldUseTooltip } from 'utils/utility';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface UserPanelProps {
  userName: string;
  email: string;
  isOpen: boolean;
}

const UserPanel: React.FC<UserPanelProps> = ({ userName, email, isOpen }) => {
  const navigate = useNavigate();
  const { keycloak } = useORAuth();
  const user = useSelector(userSliceSelector).user;
  const isAdminButtonEnabled = user['base_modules'] && user['base_modules']!['ADMIN'];
  const isEnableUsernameTooltip = userName && shouldUseTooltip(userName, 21);
  const isEnableEmailTooltip = email && shouldUseTooltip(email, 25);
  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <VStack
          h="auto"
          w="213px"
          bg={ocean_blue_600}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          pos="absolute"
          right="20px"
          top="62px"
          spacing={0}
          userSelect={'none'}
          zIndex={10}
          borderRadius="8px"
          border="1px solid"
          borderColor={ocean_blue_400}
        >
          <HStack
            h="57px"
            w="full"
            px="12px"
            py="10px"
            borderBottom="1px solid"
            borderColor={ocean_blue_400}
            spacing="4px"
            align="center"
          >
            <AppIcon
              transition="transform 0.25s ease"
              name="avatar"
              width="24px"
              height="24px"
              fill={ocean_blue_200}
            />
            <VStack justify="start" spacing="0px" align="start">
              <AppText
                size="h4Semibold"
                color={ocean_blue_200}
                noOfLines={1}
                style={{ wordBreak: 'break-all' }}
              >
                {isEnableUsernameTooltip ? (
                  <AppTooltip label={userName} placement="auto-start">
                    <span>{userName}</span>
                  </AppTooltip>
                ) : (
                  <span>{userName}</span>
                )}
              </AppText>
              <AppText
                size="caption"
                color={ocean_blue_200}
                noOfLines={1}
                style={{ wordBreak: 'break-all' }}
              >
                {isEnableEmailTooltip ? (
                  <AppTooltip label={email} placement="auto-start">
                    <span>{email}</span>
                  </AppTooltip>
                ) : (
                  <span>{email}</span>
                )}
              </AppText>
            </VStack>
          </HStack>

          {isAdminButtonEnabled && (
            <HStack
              as="a"
              href={`${REACT_APP_WORKBENCH_BASE_URL}/admin-portal/organization`}
              h="36px"
              w="full"
              px="12px"
              py="9px"
              role="group"
              _hover={{
                bg: ocean_blue_400,
                color: 'left-menu-icon-hover-color'
              }}
              cursor="pointer"
              spacing="4px"
            >
              <AppIcon
                transition="transform 0.25s ease"
                name="adminPortal"
                width="24px"
                height="24px"
                fill={ocean_blue_200}
              />
              <AppText size="body3" color={ocean_blue_200}>
                Admin Portal
              </AppText>
            </HStack>
          )}
          <HStack
            h="36px"
            w="full"
            px="12px"
            py="9px"
            _hover={{
              bg: ocean_blue_400,
              color: neutral_200,
              borderBottomRadius: '8px'
            }}
            cursor="pointer"
            onClick={async () => {
              await keycloak.logout();
              navigate('/');
            }}
            spacing="4px"
          >
            <AppIcon
              transition="transform 0.25s ease"
              name="signOut"
              width="24px"
              height="24px"
              stroke={ocean_blue_200}
              fill="none"
            />
            <AppText size="body3" color={ocean_blue_200}>
              Log Out
            </AppText>
          </HStack>
        </VStack>
      </Collapse>
    </>
  );
};

export default UserPanel;
