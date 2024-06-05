import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';

interface Props {
  title: string;
  subTitle?: string;
}

const CardTitle: FC<Props> = ({ title, subTitle }) => {
  return (
    <HStack h="47px" w="full" bg="card-header-bg" borderTopRadius="5px" justifyContent="center">
      <AppText fontSize={{ base: '15px', md: '15px', lg: '20px' }} fontWeight={500}>
        {title}
      </AppText>
      {subTitle && (
        <AppText fontSize="13px" fontWeight={400} color="card-text-color">
          ({subTitle})
        </AppText>
      )}
    </HStack>
  );
};

export default CardTitle;
