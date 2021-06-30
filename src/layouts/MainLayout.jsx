import React from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouteMatch } from 'react-router';
import { useUserValues } from '../components/UserContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Switch } from 'react-router';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { managerRoutes } from '../routes/products';
function MainLayout({ children }) {
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
