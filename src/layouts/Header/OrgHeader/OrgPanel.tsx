import { Box } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import AppText from 'components/newTheme/AppText/AppText';
import React from 'react';
import {
  neutral_200,
  ocean_blue_200,
  ocean_blue_350,
  ocean_blue_400,
  ocean_blue_600
} from 'theme/colors';
import { orgDetailsI } from 'types/responses/userResponses';

interface OrgPanelProps {
  isOpen: boolean;
  orgList: orgDetailsI[];
  onClickHandler: (orgDetails: orgDetailsI) => void;
}

const OrgPanel: React.FC<OrgPanelProps> = ({ isOpen, orgList, onClickHandler }) => {
  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <Box
          w="auto"
          minW="172px"
          bg={ocean_blue_600}
          overflowX="hidden"
          overflowY="auto"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          pos="absolute"
          right="0px"
          userSelect={'none'}
          zIndex={100}
          borderRadius="8px"
          border="1px solid"
          borderColor={ocean_blue_400}
          top="46px"
          position="absolute"
          __css={{
            '&::-webkit-scrollbar': {
              w: '1'
            },
            '&::-webkit-scrollbar-track': {
              w: '1'
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '10',
              bg: ocean_blue_350
            }
          }}
          transition="1s"
        >
          {orgList &&
            orgList.map((org) => (
              <Box
                key={org.orgKey}
                w="full"
                h="36px"
                py="9px"
                px="14px"
                role="group1"
                _hover={{
                  bg: ocean_blue_400,
                  color: neutral_200
                }}
                cursor="pointer"
                transition="1s"
                css={{
                  '&[role="group1"]:hover > *': {
                    color: neutral_200
                  }
                }}
                onClick={() => onClickHandler(org)}
              >
                <AppText
                  size="body3"
                  role="group1"
                  color={ocean_blue_200}
                  transition="1s"
                  noOfLines={1}
                >
                  {org.name}
                </AppText>
              </Box>
            ))}
        </Box>
      </Collapse>
    </>
  );
};

export default OrgPanel;
