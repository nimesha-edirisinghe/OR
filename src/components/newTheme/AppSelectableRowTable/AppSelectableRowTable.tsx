import { FC, useRef, useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { DemandForecastSkuHeaders, DemandForecastSkuListItem } from 'types/responses/viewResponses';
import { scrollbarXStyles, scrollbarXYStyles, scrollbarYStyles } from 'theme/styles';
import AppSelectableHeader from './AppSelectableHeader';
import AppSelectableRow from './AppSelectableRow';
import { useDispatch } from 'react-redux';

interface Props {
  headers: DemandForecastSkuHeaders;
  dataList: DemandForecastSkuListItem[];
}

const AppSelectableRowTable: FC<Props> = ({ headers, dataList }: Props) => {
  const dispatch = useDispatch();
  const [onTableHover, setOnTableHover] = useState<boolean>(false);
  const [scroll, setScroll] = useState('hidden');
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollTarget: string) => {
    const targetRef = scrollTarget === 'header' ? headerRef : bodyRef;
    const otherRef = scrollTarget === 'header' ? bodyRef : headerRef;
    if (targetRef.current && otherRef.current) {
      otherRef.current.scrollLeft = targetRef.current.scrollLeft;
    }
  };

  const handleHeaderScroll = () => {
    handleScroll('header');
  };

  const handleBodyScroll = () => {
    handleScroll('body');
  };

  const onChangeHandler = (isSelected: boolean, id: number) => {
    // const selectedSkuList = dataList?.find((skuObj) => skuObj.anchorProdKey === id);
    // dispatch(
    //   setSelectedSku({
    //     isSelected: isSelected,
    //     id: id
    //   })
    // );
    // dispatch(
    //   addSelectedSkuList({
    //     data: selectedSkuList!,
    //     selectedType: ''
    //   })
    // );
  };
  const headerKeys = headers && Object.keys(headers);
  return (
    <VStack
      overflow={scroll}
      overflowY="hidden"
      __css={scrollbarXStyles}
      height="full"
      align="start"
      spacing="1px"
      onMouseEnter={() => setScroll('auto')}
      onMouseLeave={() => setScroll('hidden')}
    >
      <Box
        position="relative"
        onMouseEnter={() => setOnTableHover(true)}
        onMouseLeave={() => setOnTableHover(false)}
        borderRadius="8px"
      >
        <Box
          overflowY={'clip'}
          maxH={'calc(100vh - 245px)'}
          transition="all .2s ease-in"
          ref={headerRef}
          onScroll={handleHeaderScroll}
          __css={scrollbarYStyles}
        >
          <AppSelectableHeader headers={headers} />
        </Box>
        <Box
          overflow={onTableHover ? 'auto' : 'hidden'}
          maxH={'calc(100vh - 245px)'}
          transition="all .2s ease-in"
          __css={scrollbarXYStyles}
          ref={bodyRef}
          onScroll={handleBodyScroll}
        >
          {dataList?.map((item, rowIndex) => (
            <AppSelectableRow
              dataRow={item}
              headerKeys={headerKeys}
              key={rowIndex}
              onChangeHandler={onChangeHandler}
            />
          ))}
        </Box>
      </Box>
    </VStack>
  );
};

export default AppSelectableRowTable;
