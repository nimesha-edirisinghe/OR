import React from 'react';
import { Checkbox, Box, Flex } from '@chakra-ui/react';
import { ConfigurationI, CandidateAlgoTreeDataI } from 'types/forecastConfig';
import AppText from 'components/AppText/AppText';

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
      <Flex align="center" pb={node.isParent ? '4px' : '0px'}>
        <Checkbox
          isChecked={node.isSelected}
          onChange={handleCheckboxChange}
          isDisabled={disabled}
          colorScheme="#8C8C8C"
          size="lg"
          border="none"
          borderColor="#555"
          variant={'custom'}
        >
          <AppText
            pl={node.isParent ? '8px' : '2px'}
            fontSize={'13px'}
            fontWeight={node.isParent ? 600 : 400}
            lineHeight={node.isParent ? '26px' : '30px'}
          >
            {node.label}
          </AppText>
        </Checkbox>
      </Flex>
      {node.children && node.children.length > 0 && (
        <Box>
          {node.children.map(childNode => (
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
