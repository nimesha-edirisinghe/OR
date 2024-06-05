import { Box, Flex, HStack, Image, VStack } from "@chakra-ui/react";
import React from "react";
import Logo1 from "assets/svg/orderRightTextLogo.svg";
import Logo2 from "assets/svg/byAlgonomyTextLogo.svg";

type Props = {
  imageSrc: string;
};

export default function AppLogo({ imageSrc }: Props) {
  return (
    <HStack spacing={0}>
      <Box h={14} w={16}>
        <Image src={imageSrc} width={[14, 14, 14, 14]} alt="" />
      </Box>
      <Box h={14} w={"126px"} alignContent={"left"} pt={2}>
        <VStack spacing={0}>
          <Box display="flex" alignItems="flex-start">
            <Image src={Logo1} width={"50"} alt="" />
          </Box>
          <Flex justify="start">
            <Box>
              <Image src={Logo2} width={"30"} alt="" align={"left"} />
            </Box>
          </Flex>
        </VStack>
      </Box>
    </HStack>
  );
}
