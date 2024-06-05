import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, HStack, Box } from '@chakra-ui/react';
import {
  neutral_200,
  ocean_blue_200,
  ocean_blue_300,
  ocean_blue_400,
  ocean_blue_600
} from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import AppText from '../AppText/AppText';
import AppRadio from '../AppRadio/AppRadio';
import { AppIcon } from 'components/AppIcon/AppIcon';

interface Option {
  label: string;
  value: string;
}

interface GroupedOption {
  groupName: string;
  options: Option[];
}

interface Props {
  selectedItem: string;
  handleItemClick: (item: string, index?: number, groupName?: string) => void;
  colorScheme: string;
  radioValue: string;
  isSelected: boolean;
  defaultValue?: string;
  options?: (Option | GroupedOption)[];
  variant?: 'primary' | 'secondary';
  buttonWidth?: string;
  isEnableAction?: boolean;
  isGroup?: boolean;
  selectedGroupIndex?: number;
  isDisabled?: boolean;
}

const AppCustomDropdown: React.FC<Props> = ({
  selectedItem,
  handleItemClick,
  colorScheme,
  radioValue,
  isSelected = false,
  defaultValue = '',
  options = [],
  variant = 'primary',
  buttonWidth,
  isEnableAction = false,
  isGroup = false,
  selectedGroupIndex,
  isDisabled = false
}) => {
  const isAvailableOptions = options.length > 0;

  const renderRadio = (value: string, isChecked: boolean, colorScheme: string) =>
    isEnableAction && (
      <AppRadio
        value={value}
        isChecked={isChecked}
        onChange={() => {}}
        colorScheme={colorScheme}
        size="sm"
      />
    );

  const renderMenuItem = (option: Option | GroupedOption, index: number) => (
    <React.Fragment key={index}>
      {'groupName' in option ? (
        <MenuItem
          isDisabled
          bg={ocean_blue_600}
          h="36px"
          px="16px"
          fontWeight="bold"
          _hover={{ bg: 'none' }}
        >
          <AppText size="caption">{option.groupName}</AppText>
        </MenuItem>
      ) : (
        <MenuItem bg={ocean_blue_600} h="36px" px="16px">
          <HStack
            align="start"
            spacing="4px"
            w="full"
            onClick={() => handleItemClick((option as Option).label)}
          >
            <Box pt="12px">
              {renderRadio(
                (option as Option).value,
                (option as Option).value === selectedItem,
                neutral_200
              )}
            </Box>
            <AppText size="body3" noOfLines={1} align="start" py="7.5px" color={ocean_blue_200}>
              <span>{(option as Option).value}</span>
            </AppText>
          </HStack>
        </MenuItem>
      )}
      {'options' in option && (
        <>
          {(option as GroupedOption).options.map((opt, idx) => (
            <MenuItem
              key={idx}
              onClick={() => handleItemClick(opt.label, index, option.groupName)}
              bg={ocean_blue_600}
              h="36px"
              px="16px"
            >
              <HStack align="start" spacing="4px">
                <Box pt="12px">
                  {renderRadio(
                    opt.value,
                    opt.value === selectedItem && selectedGroupIndex === index,
                    neutral_200
                  )}
                </Box>
                <AppText size="body3" noOfLines={1} align="start" py="7.5px" color={ocean_blue_200}>
                  <span>{opt.value}</span>
                </AppText>
              </HStack>
            </MenuItem>
          ))}
        </>
      )}
    </React.Fragment>
  );

  return (
    <Menu variant={variant}>
      {({ isOpen }) => (
        <>
          <MenuButton
            textAlign="left"
            px="16px"
            as={Button}
            h="36px"
            fontWeight={400}
            lineHeight="19.5px"
            bg={ocean_blue_600}
            color={ocean_blue_300}
            border="1px solid transparent"
            rightIcon={
              isAvailableOptions ? (
                <AppIcon
                  transition="all 0.25s ease-in"
                  name="dropdown"
                  width="24px"
                  height="24px"
                  fill={ocean_blue_200}
                  transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
                />
              ) : (
                <></>
              )
            }
            _expanded={{ bg: ocean_blue_600 }}
            _hover={{ bg: '' }}
            textColor={isSelected ? neutral_200 : ocean_blue_300}
            borderRadius="8px"
            transition="all 0.25s ease-in"
            w={buttonWidth}
            onClick={() => !isAvailableOptions && handleItemClick(radioValue)}
            isDisabled={isDisabled || (!isAvailableOptions && isGroup)}
          >
            <HStack spacing="4px">
              {isEnableAction && (
                <AppRadio
                  value={radioValue}
                  isChecked={isSelected}
                  onChange={() => {}}
                  colorScheme={colorScheme}
                  size="sm"
                />
              )}

              <span> {selectedItem || defaultValue}</span>
            </HStack>
          </MenuButton>
          {isAvailableOptions && (
            <MenuList
              mt="-6px"
              textAlign="left"
              minW={buttonWidth}
              pt="0px"
              maxH="250px"
              overflowY="auto"
              __css={scrollbarYStyles}
              bg={ocean_blue_600}
              borderRadius="8px"
              border="1px solid"
              borderColor={ocean_blue_400}
              zIndex={20}
            >
              {options.map((option, index) => renderMenuItem(option, index))}
            </MenuList>
          )}
        </>
      )}
    </Menu>
  );
};

export default AppCustomDropdown;
