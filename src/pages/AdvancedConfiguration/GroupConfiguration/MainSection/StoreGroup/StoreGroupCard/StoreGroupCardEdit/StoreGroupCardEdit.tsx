import { HStack, VStack } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppInput from 'components/AppInput/AppInput';
import AppSkipper from 'components/AppSkipper/AppSkipper';
import AppText from 'components/AppText/AppText';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { FC, useState } from 'react';
import {
  neutral_100,
  neutral_200,
  ocean_blue_50,
  ocean_blue_500,
  ocean_blue_100,
  yellow_500_t20
} from 'theme/colors';
import { GroupTypes } from 'types/groupConfig';
import { StoreGroupI } from 'types/responses/groupConfigResponses';
import { GroupTypesEnum } from 'utils/enum';

interface StoreGroupCardEditProps {
  onCloseHandler: (groupKey: number) => void;
  activeStatus: boolean;
  groupKey: number;
  onChangeHandler: (groupKey: number) => void;
  storeGroup: StoreGroupI;
  onSaveHandler: (groupKey: number, forecastHorizon: number, groupName: string) => void;
  groupType: GroupTypes;
}

const StoreGroupCardEdit: FC<StoreGroupCardEditProps> = ({
  onCloseHandler,
  activeStatus,
  groupKey,
  onChangeHandler,
  storeGroup,
  onSaveHandler,
  groupType
}) => {
  const initialGroupName = storeGroup?.groupDesc?.split(/\s+\(WH\)/)[0];
  const [groupName, setGroupName] = useState<string>(initialGroupName);
  const [forecastHorizon, setForecastHorizon] = useState<string>(
    `${storeGroup.forecastingHorizon}`
  );

  const onClickSave = () => {
    const fh = parseInt(forecastHorizon);
    const formattedGroupName = groupType === GroupTypesEnum.STORE ? groupName : `${groupName} (WH)`;
    onSaveHandler(storeGroup.groupKey, fh, formattedGroupName);
  };

  return (
    <VStack
      bg={ocean_blue_500}
      w="full"
      justify="space-between"
      h="210px"
      maxW="350px"
      px="20px"
      py="20px"
      alignContent="center"
      borderRadius="7px"
      userSelect="none"
      border="1px solid"
      borderColor={yellow_500_t20}
    >
      <VStack w="full" align="start">
        <HStack justify="space-between" w="full">
          <AppInput
            textIndent="5px"
            h="32px"
            w="200px"
            fontSize="16px"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            maxLength={40}
            textColor={neutral_200}
          />
          <HStack>
            <AppCheckbox
              id={1}
              isChecked={activeStatus}
              onChange={() => onChangeHandler(groupKey)}
              isDisabled={false}
              label='Active'
            ></AppCheckbox>
          </HStack>
        </HStack>
        <HStack>
          <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={ocean_blue_50}>
            Anchor-locations :
          </AppText>
          <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={neutral_200}>
            {storeGroup.anchorCount}
          </AppText>
        </HStack>
        <HStack>
          <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={ocean_blue_50}>
            SKU-locations :
          </AppText>
          <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={neutral_200}>
            {storeGroup.skuCount}
          </AppText>
        </HStack>
      </VStack>
      <VStack w="full" align="start">
        <HStack>
          <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={ocean_blue_50}>
            Forecasting Freq :
          </AppText>
          <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={neutral_200}>
            {storeGroup.forecastingFrequency}
          </AppText>
        </HStack>
        <HStack justify="space-between" w="full">
          <HStack>
            <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={ocean_blue_50}>
              Horizon :
            </AppText>
            <AppText fontSize="14px" fontWeight={400} lineHeight="22px" color={neutral_200}>
              <AppSkipper
                onValueChange={(value) => setForecastHorizon(`${value}`)}
                value={storeGroup.forecastingHorizon}
                w="60px"
                minNumber={0}
                bg="transparent"
                border="1px solid"
                borderColor={ocean_blue_100}
                color={neutral_100}
                h="40px"
              />
            </AppText>
          </HStack>
          <VStack>
            <HStack>
              <AppIconChakra
                name="save"
                fill={ocean_blue_50}
                width="22px"
                height="22px"
                cursor="pointer"
                onClick={onClickSave}
              />
              <AppIconChakra
                name="close"
                fill={ocean_blue_50}
                width="18px"
                height="18px"
                cursor="pointer"
                onClick={() => onCloseHandler(groupKey)}
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default StoreGroupCardEdit;
