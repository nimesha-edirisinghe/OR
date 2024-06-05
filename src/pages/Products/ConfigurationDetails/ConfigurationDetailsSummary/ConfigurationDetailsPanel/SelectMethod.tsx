import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppRadio from 'components/newTheme/AppRadio/AppRadio';
import React, { FC, useEffect, useState } from 'react';
import { neutral_200, neutral_400, ocean_blue_200 } from 'theme/colors';
import { IMethod, METHOD_LIST } from '../Common/constant';
import { useDispatch, useSelector } from 'react-redux';

import Percentage from './Percentage';
import Mimic from './Mimic';
import ManuallyForecast from './ManuallyForecast';
import {
  IProductNewActivationView,
  configDetailsInputType,
  newProductActivationSliceSelector,
  updateConfigUpdateInput
} from 'state/pages/product/newActivation/productNewActivationState';

interface IProps {}

const SelectMethod: FC<IProps> = () => {
  const dispatch = useDispatch();
  const [methodList, setMethodList] = useState<IMethod[]>(METHOD_LIST);
  const viewState: IProductNewActivationView = useSelector(newProductActivationSliceSelector);
  const inputState = viewState.configDetailView.configDetailsInput;

  const inputHandler = (key: configDetailsInputType, value: string) => {
    setMethodList((prevData) =>
      prevData.map((method) => {
        return {
          ...method,
          selected: method.value === value ? true : false
        };
      })
    );
    dispatch(updateConfigUpdateInput({ key: key, value: value }));
  };

  useEffect(() => {
    if (inputState.selectedMethod) {
      setMethodList((prevData) =>
        prevData.map((method) => {
          return {
            ...method,
            selected: method.value === inputState.selectedMethod ? true : false
          };
        })
      );
    }
  }, [inputState.selectedMethod]);

  const renderSelectedMethodDetails = (activeMethod: number) => {
    switch (activeMethod) {
      case 2:
        return <Percentage percentage={inputState.percentage} />;
      case 3:
        return <Mimic baseValue={inputState.baseValue} />;
      case 4:
        return <ManuallyForecast />;
      case 5:
        return <ManuallyForecast />;
      default:
        break;
    }
  };

  return (
    <VStack w="full">
      <HStack h="full" w="full" spacing="20px">
      <AppText size="body2" color={neutral_200} lineHeight="18px">
          Select a method to create a forecast until sufficient data points (18) are collected
        </AppText>
      </HStack>
      {methodList.map((data: IMethod, ind: number) => (
        <>
          <HStack w="full">
            <AppRadio
              value={data.value}
              isChecked={data.selected}
              onChange={(value) => inputHandler('selectedMethod', value)}
              colorScheme={neutral_200}
              size="sm"
            />
            <AppText fontSize="13px" fontWeight={400} color={ocean_blue_200}>
              {data.value}
            </AppText>
          </HStack>
          {data.selected && renderSelectedMethodDetails(data.id)}
        </>
      ))}
    </VStack>
  );
};
export default SelectMethod;
