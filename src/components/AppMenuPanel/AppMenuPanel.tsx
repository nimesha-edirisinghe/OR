import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  VStack
} from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  menuItems?: any;
};

export default function AppMenuPanel({ isOpen, onClose, children, menuItems }: Props) {
  const navigate = useNavigate();

  const getPopOverMenuKeys = (obj: any) => {
    if (Object.prototype.hasOwnProperty.call(obj, 'isOpen')) {
      const { isOpen, ...newObj } = obj;
      return Object.keys(newObj);
    }
    return Object.keys(obj);
  };
  return (
    <Popover
      placement="right-start"
      trigger="hover"
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      closeOnBlur={true}
      openDelay={3000}
      closeDelay={25}
      isLazy
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent bg="#0078d4" w={'300px'} border="none">
        <PopoverHeader pt={3} borderBottom="1px solid #595959">
          <AppText color="menu-text-color" fontSize="14px" fontWeight={600}>
            {menuItems?.displayName}
          </AppText>
        </PopoverHeader>
        <PopoverBody pl={0} pr={0}>
          <Box w={'100%'} h={'auto'}>
            <VStack spacing={1}>
              <Accordion
                w={'100%'}
                borderColor="transparent"
                allowMultiple
                defaultIndex={[0, 1, 2, 3, 4, 5, 6]}
              >
                {menuItems?.subMenu &&
                  getPopOverMenuKeys(menuItems?.subMenu).map((firstLevel, index) => (
                    <AccordionItem key={index}>
                      <h2>
                        <AccordionButton
                          onClick={() => {}}
                          _hover={{
                            backgroundColor: '#1A1A1A',
                            borderLeft: '3px solid #F7CC45',
                            color: '#F7CC45'
                          }}
                          role="group"
                          borderLeft="3px solid transparent"
                        >
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            onClick={() => navigate(menuItems?.subMenu[firstLevel].path)}
                          >
                            <AppText
                              fontSize="14px"
                              fontWeight={400}
                              lineHeight="22px"
                              _groupHover={{
                                color: '#F7CC45'
                              }}
                              color="left-menu-item-font-color"
                            >
                              {menuItems.subMenu[firstLevel].displayName}
                            </AppText>
                          </Box>
                          {menuItems?.subMenu[firstLevel].subMenu && <AccordionIcon />}
                        </AccordionButton>
                      </h2>
                      {menuItems?.subMenu[firstLevel].subMenu && (
                        <AccordionPanel pb={0} pl={0} pr={0}>
                          {getPopOverMenuKeys(menuItems?.subMenu[firstLevel]?.subMenu).map(
                            (secondLevel, index2) => (
                              <AccordionItem
                                borderColor="transparent"
                                _hover={{
                                  color: '#F7CC45'
                                }}
                                role="group"
                                key={index2}
                              >
                                <h2>
                                  <AccordionButton
                                    _hover={{
                                      backgroundColor: '#1A1A1A',
                                      borderLeft: '3px solid #F7CC45',
                                      color: '#F7CC45'
                                    }}
                                    borderLeft="3px solid transparent"
                                  >
                                    <Box as="span" flex="1" textAlign="left" pl={4}>
                                      <AppText
                                        _groupHover={{
                                          color: '#F7CC45'
                                        }}
                                        color="left-menu-item-font-color"
                                      >
                                        {
                                          menuItems?.subMenu[firstLevel]?.subMenu[secondLevel]
                                            .displayName
                                        }
                                      </AppText>
                                    </Box>
                                  </AccordionButton>
                                </h2>
                              </AccordionItem>
                            )
                          )}
                        </AccordionPanel>
                      )}
                    </AccordionItem>
                  ))}
              </Accordion>
            </VStack>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
