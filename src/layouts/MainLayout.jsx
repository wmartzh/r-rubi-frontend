import React from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useUserValues } from '../components/UserContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
function MainLayout({ children }) {
  //eslint-disable-next-line
  const { user } = useUserValues();
  const sidebar = useDisclosure();

  return (
    <>
      <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
        <Sidebar display={{ base: 'none', md: 'unset' }} />
        <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Navbar sidebar={sidebar} useColorModeValue={useColorModeValue} />

          <Box as="main" p="4">
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;
