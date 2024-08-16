import { Menu, MenuButton, MenuList, MenuItem, Button, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useState } from 'react';
import {
  blue_500,
  neutral_100,
  ocean_blue_200,
  ocean_blue_300,
  ocean_blue_500
} from 'theme/colors';
import AppInputGroup from '../AppInputGroup/AppInputGroup';
import { scrollbarYStyles } from 'theme/styles';
import AppText from '../AppText/AppText';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface Props {
  options: string[];
  selectedItem: string;
  handleItemClick: (item: string) => void;
  variant?: 'primary';
  buttonWidth?: string;
  isEnableSearch?: boolean;
  height?: string;
  isDisabled?: boolean;
  lineMaxLength?: number;
  onToggle?: (isOpen: boolean) => void;
}

const AppDropdown: React.FC<Props> = ({
  options,
  selectedItem,
  handleItemClick,
  variant = 'primary',
  buttonWidth,
  isEnableSearch = false,
  height = '36px',
  isDisabled = false,
  lineMaxLength = 18,
  onToggle
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Menu
      variant={variant}
      onOpen={() => !isDisabled && onToggle?.(true)}
      onClose={() => !isDisabled && onToggle?.(false)}
    >
      {({ isOpen }) => (
        <>
          <MenuButton
            isDisabled={isDisabled}
            textAlign="left"
            as={Button}
            h={height}
            fontWeight={400}
            lineHeight="19.5px"
            bg={ocean_blue_500}
            color={ocean_blue_300}
            border="1px solid transparent"
            rightIcon={
              <AppIcon
                transition="all 0.25s ease-in"
                name="dropdown"
                width="24px"
                height="24px"
                fill={ocean_blue_300}
                stroke={ocean_blue_300}
                transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
                mr="-10px"
              />
            }
            _expanded={{ border: '1px solid', borderColor: blue_500, bg: { ocean_blue_500 } }}
            _hover={{ bg: ocean_blue_500 }}
            _focus={{ color: neutral_100 }}
            borderRadius="8px"
            transition="all 0.25s ease-in"
            w={buttonWidth}
            cursor={isDisabled ? 'not-allowed' : ''}
          >
            {selectedItem?.length > lineMaxLength ? (
              <AppTooltip label={selectedItem} placement="auto-start">
                <AppText noOfLines={1}>{selectedItem}</AppText>
              </AppTooltip>
            ) : (
              <HStack spacing="4px" mr="4px" w="auto">
                <AppText size="body3"> {selectedItem || 'Select an option'}</AppText>
              </HStack>
            )}
          </MenuButton>

          <MenuList
            mt="-6px"
            textAlign="left"
            minW={buttonWidth}
            pt="0px"
            maxH="200px"
            overflowY="auto"
            __css={scrollbarYStyles}
            zIndex={100}
            bg={ocean_blue_500}
            boxShadow="0px 12px 20px 0px #001019"
          >
            {isEnableSearch && (
              <AppInputGroup
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
                fontSize="14px"
                variant="primary"
                inputSize="large"
                width="full"
                isDisabled={isDisabled}
              />
            )}
            {filteredOptions?.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => !isDisabled && handleItemClick(option)}
                transition="all 0.25s ease-in"
              >
                <AppText size="body3" noOfLines={1} align="start" py="7.5px" color={ocean_blue_200}>
                  {option?.length > lineMaxLength ? (
                    <AppTooltip label={option} placement="auto-start">
                      <span>{option}</span>
                    </AppTooltip>
                  ) : (
                    <span>{option}</span>
                  )}
                </AppText>
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default AppDropdown;
