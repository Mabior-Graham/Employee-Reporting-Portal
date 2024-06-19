'use client'
import {useRouter} from "next/navigation";
import axios from "axios";
import { Providers } from '../providers';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
  Button
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown
} from 'react-icons/fi'
import NextLink from 'next/link'
import { IconType } from 'react-icons'
import { useEffect, useState } from "react";

interface LinkItemProps {
  name: string
  icon: IconType
  path: string
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, path: "/dashboard" },
  

]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [user, setUser] = useState({})

  const getUserDetails = async () => {
      const res = await axios.get('/api/users/me')
      setUser(res.data.data)

      
  }
  useEffect(() => {
    //Runs only on the first render
    getUserDetails()
  }, []);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link as={NextLink} href="/">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          <Link href={link.path}>{link.name} </Link>
        </NavItem>
      ))}
      {
                      (user.isAdmin == false) &&
                      <>
                      <NavItem key="myreports" icon='FiStar'>
                      <Link href="/dashboard/myreports">My Reports </Link>
                        </NavItem>
                        <NavItem key="leads" icon='FiStar'>
                        <Link href="/dashboard/leads">Leads </Link>
                      </NavItem>
                      <NavItem key="sales" icon='FiStar'>
                        <Link href="/dashboard/sales">Sales </Link>
                      </NavItem>

                      </>
                    }

                    {
                      (user.isAdmin) &&
                      <>
                      <NavItem key="reports" icon='FiStar'>
                      <Link href="/dashboard/reports">Reports </Link>
                        </NavItem>
                        <NavItem key="users" icon='FiStar'>
                        <Link href="/dashboard/users">Users </Link>
                      </NavItem>
                      <NavItem key="departments" icon='FiStar'>
                        <Link href="/dashboard/departments">Departments </Link>
                      </NavItem>

                      </>
                    }
      
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}


const MobileNav = ({ onOpen, ...rest }: MobileProps) => {

  const router = useRouter();

  const logout = async () => {
    try {
        await axios.get('/api/users/logout');
        router.push('/account/login')
    } catch (error: any) {
        console.log(error.message)
        
    }

}

const [user, setUser] = useState({})

  const getUserDetails = async () => {
      const res = await axios.get('/api/users/me')
      setUser(res.data.data)

      
  }

  useEffect(() => {
      //Runs only on the first render
      getUserDetails()
    }, []);


  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user.username}</Text>
                  
                    {
                      user.isAdmin &&
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
                    }
                  
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem as={Link} href="/account/profile">Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              {/* <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem><Button onClick={logout}>Sign out</Button></MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  
  return (
    <html>
      <body>
        
      
    <Box minH="100vh" bg={useColorModeValue('white.100', 'white.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      
      
      <Box ml={{ base: 0, md: 60 }} p="4">


        {children}


      </Box>


    </Box>
    </body>
    </html>
  )
}