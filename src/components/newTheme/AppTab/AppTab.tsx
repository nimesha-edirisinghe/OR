import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useRef, useEffect, useState } from 'react';
import { ocean_blue_200 } from 'theme/colors';

type TabData = {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  tabs: TabData[];
  selectedTab: number;
  onSelectTab: (index: number) => void;
  variant?: 'primary';
  tabWidth?: string;
};

const AppTab: React.FC<TabsProps> = ({
  tabs,
  selectedTab,
  onSelectTab,
  variant = 'primary',
  tabWidth = '78px'
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const tabListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (tabListRef.current) {
      const tabList = tabListRef.current;
      const selectedTabElement = tabList.children[selectedTab] as HTMLElement;

      const style = {
        width: selectedTabElement.offsetWidth
      };

      setIndicatorStyle(style);
    }
  }, [selectedTab]);

  const handleTabChange = (index: number) => {
    if (!tabs[index].disabled) {
      onSelectTab(index);
    }
  };

  return (
    <Tabs variant={variant}>
      <TabList
        ref={tabListRef}
        style={{
          position: 'relative'
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            onClick={() => handleTabChange(index)}
            // @ts-ignore
            isSelected={index === selectedTab}
            isDisabled={tab.disabled}
            _disabled={{
              opacity: 0.6,
              fontWeight: 400,
              color: ocean_blue_200,
              cursor: 'not-allowed'
            }}
            width={tabWidth}
            px="0px"
          >
            <Box w="full" h="full" textAlign="left">
              {tab.label}
            </Box>
          </Tab>
        ))}
        <TabIndicator
          height="2px"
          mt={'34px'}
          bg="tab.primary._indicator"
          borderRadius="1px"
          transition="transform 0.25s ease-in"
          style={indicatorStyle}
        />
      </TabList>
      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={index} hidden={index !== selectedTab} px={0} pb={0}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default AppTab;
