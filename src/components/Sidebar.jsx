import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import NavItem from './NavItem';

import { MdHome } from 'react-icons/md';
import { BiPackage } from 'react-icons/bi';
function Sidebar(props) {
  return (
    <>
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          {/* <Logo /> */}
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue('brand.500', 'white')}
            fontWeight="semibold"
          >
            Rubi
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={MdHome} to="/dashboard">
            Home
          </NavItem>
          <NavItem icon={BiPackage} to="/products">
            Products
          </NavItem>
        </Flex>
      </Box>
    </>
  );
}

export default Sidebar;
