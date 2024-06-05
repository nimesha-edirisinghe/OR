import { Box, Image } from "@chakra-ui/react";
import AlgonomyLogo from "assets/svg/algonomyLogo.svg";
import React from "react";

type Props = {};

export default function AppFooter({}: Props) {
  return (
    <Box position={"fixed"} bottom={8} right={8} p={"8px"}>
      <Image src={AlgonomyLogo} width={"50"} alt="" />
    </Box>
  );
}
