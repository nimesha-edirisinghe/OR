import { Box, Center, HStack } from '@chakra-ui/layout';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import React, { useRef } from 'react';
import OrgPanel from './OrgPanel';
import { useDispatch, useSelector } from 'react-redux';
import { orgDetailsI } from 'types/responses/userResponses';
import { userSliceSelector, setUserSelectedOrg } from 'state/user/userState';
import { useDisclosure, useOutsideClick } from '@chakra-ui/react';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface OrgHeaderProps {}

const OrgHeader: React.FC<OrgHeaderProps> = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const userState = useSelector(userSliceSelector);
  const dispatch = useDispatch();
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

  const onOrgClickHandler = (orgDetails: orgDetailsI) => {
    dispatch(setUserSelectedOrg(orgDetails));
    onClose();
  };

  const getShortOrgName = (orgName: string): string => {
    const MAX_LENGTH: number = 17;
    return orgName && orgName.length <= MAX_LENGTH ? orgName : orgName?.slice(0, MAX_LENGTH);
  };

  return (
    <>
      <Center
        w="176px"
        h="44px"
        role="group"
        borderRadius="8px"
        _hover={{
          bg: 'header.panelBg._default'
        }}
        bg={'header.panelBg._default'}
        transition="background-color 0.6s, color 0.6s"
        userSelect={'none'}
        ref={ref}
        position="relative"
        onClick={() => onToggle()}
        cursor="pointer"
      >
        <HStack justifyContent="space-between" w="full" px="15px">
          <Box>
            <AppText
              _groupHover={{
                color: '#fff'
              }}
              fontSize="12px"
              fontWeight={500}
              color={isOpen ? '#fff' : 'left-menu-icon-color'}
              transition="color 0.6s"
              noOfLines={1}
            >
              {userState.selectedOrg && (
                <AppTooltip label={userState.selectedOrg.name} placement="right-start">
                  <span>{getShortOrgName(userState.selectedOrg.name)}</span>
                </AppTooltip>
              )}
            </AppText>
          </Box>
          <Box>
            <AppIconChakra
              name="chevronDown"
              fill={isOpen ? '#fff' : 'left-menu-icon-color'}
              width="12px"
              height="12px"
              _groupHover={{
                fill: '#fff'
              }}
              transform={isOpen ? 'rotate(180deg)' : ''}
              transition="fill 0.6s ease, transform 0.6s ease"
            />
          </Box>
        </HStack>
        <OrgPanel
          isOpen={isOpen}
          orgList={userState.userOrgs.orgDetails}
          onClickHandler={onOrgClickHandler}
        />
      </Center>
    </>
  );
};

export default OrgHeader;
