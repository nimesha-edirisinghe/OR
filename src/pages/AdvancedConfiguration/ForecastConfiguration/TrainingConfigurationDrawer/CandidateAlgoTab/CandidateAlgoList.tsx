import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { ConfigurationI, CandidateAlgoTreeDataI } from 'types/forecastConfig';

import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';

interface CandidateAlgoListProps {
  node: CandidateAlgoTreeDataI;
  onNodeSelect: (nodeId: string, isSelected: boolean, selectedKey: ConfigurationI) => void;
  disabled?: boolean;
}

const CandidateAlgoList: React.FC<CandidateAlgoListProps> = ({
  node,
  onNodeSelect,
  disabled = false
}) => {
  // Function definition for handle checkbox change
  const handleCheckboxChange = () => {
    const isSelected = !node.isSelected;
    onNodeSelect(node.id, isSelected, node.key);
  };

  // Function definition for handle child node selection
  const handleChildNodeSelect = (
    childNodeId: string,
    isSelected: boolean,
    selectedKey: ConfigurationI
  ) => {
    onNodeSelect(childNodeId, isSelected, selectedKey);
  };

  return (
    <Box pl="15px">
      <Flex align="center" pb={node.isParent ? '8px' : '0px'}>
        <AppCheckbox
          id={node.key}
          isChecked={node.isSelected}
          onChange={handleCheckboxChange}
          isDisabled={disabled}
          label={node.label}
        />
      </Flex>
      {node.children && node.children.length > 0 && (
        <Box gap="8px">
          {node.children.map((childNode) => (
            <CandidateAlgoList
              key={childNode.id}
              node={childNode}
              onNodeSelect={handleChildNodeSelect}
              disabled={disabled}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CandidateAlgoList;
