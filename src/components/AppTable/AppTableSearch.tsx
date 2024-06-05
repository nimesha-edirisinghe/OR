import { Box, HStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppInput from 'components/AppInput/AppInput';
import { debounce } from 'lodash';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ocean_blue_100 } from 'theme/colors';

export interface Props {
  onTableSearch: (searchKey: string) => void;
}

const AppTableSearch: FC<Props> = ({ onTableSearch, ...rest }) => {
  const [inputValue, setInputValue] = useState('');
  const [isVisibleInput, setIsVisibleInput] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>();

  const sendRequest = useCallback((searchKey: string) => {
    onTableSearch(searchKey);
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  useEffect(() => {
    isVisibleInput && searchInputRef.current && searchInputRef.current.focus();
  }, [isVisibleInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSendRequest(value);
  };

  const onCloseHandler = () => {
    setIsVisibleInput(false);
    setInputValue('');
    onTableSearch('');
  };

  return (
    <HStack {...rest} w="full" justify="end" px="5px">
      {isVisibleInput ? (
        <InputGroup w="80%">
          <AppInput
            w="full"
            h="25px"
            fontSize="12px"
            color="left-menu-icon-color"
            pl="6px"
            onChange={handleInputChange}
            value={inputValue}
            ref={searchInputRef}
          />
          <InputRightElement>
            <AppIconChakra
              name={'close'}
              fill={ocean_blue_100}
              width="10px"
              height="10px"
              cursor={'pointer'}
              onClick={onCloseHandler}
              mb="15px"
            />
          </InputRightElement>
        </InputGroup>
      ) : (
        <Box>
          <AppIconChakra
            name="search"
            fill={ocean_blue_100}
            _hover={{ fill: ocean_blue_100 }}
            width="14px"
            height="14px"
            cursor="pointer"
            onClick={() => {
              setIsVisibleInput(true);
            }}
          />
        </Box>
      )}
    </HStack>
  );
};

export default AppTableSearch;
