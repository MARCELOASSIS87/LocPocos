import {
  Box,
  VStack,
  Link,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  useBreakpointValue
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const token = localStorage.getItem("adminToken");
  let role = null;
  let nome = "";

  if (token) {
    try {
      const payload = jwtDecode(token);
      role = payload.role;
      nome = payload.nome;
    } catch {
        //
    }
  }

  const location = useLocation();

  const menuLinks = [
    role === "super" && {
      to: "/admin/gestao-admins",
      label: "Gestão de Admins"
    },
    {
      to: "/admin/dashboard",
      label: "Dashboard"
    },
    (role === "admin" || role === "super") && {
      to: "/admin/home",
      label: "Home Admin"
    }
    // Adicione outros menus conforme role
  ].filter(Boolean);

  // Sidebar conteúdo (reutilizável para Drawer e fixo)
  const sidebarContent = (
    <Box
      h="100vh"
      w="220px"
      bg="#e8f4fc"
      px={4}
      py={6}
      boxShadow="lg"
      position="relative"
    >
      <Text mb={8} fontWeight="bold" fontSize="xl" color="#249ED9">
        LocPoços
      </Text>
      <VStack spacing={4} align="stretch">
        {menuLinks.map((item) => (
          <Link
            key={item.to}
            as={RouterLink}
            to={item.to}
            color={
              location.pathname === item.to ? "#249ED9" : "gray.700"
            }
            fontWeight={
              location.pathname === item.to ? "bold" : "normal"
            }
            onClick={isMobile ? onClose : undefined}
          >
            {item.label}
          </Link>
        ))}
      </VStack>
      <Text mt={12} color="gray.600" fontSize="sm">
        {nome && `Logado como: ${nome}`}
      </Text>
    </Box>
  );

  // Mobile: menu hamburguer
  if (isMobile) {
    return (
      <>
        <IconButton
          icon={<FiMenu />}
          aria-label="Abrir menu"
          position="fixed"
          top={4}
          left={4}
          zIndex={200}
          onClick={onOpen}
          size="lg"
          colorScheme="blue"
          bg="white"
          borderRadius="full"
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent maxW="220px">
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody p={0}>{sidebarContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop: sidebar fixa
  return (
    <Box
      as="nav"
      h="100vh"
      w="220px"
      bg="#e8f4fc"
      px={4}
      py={6}
      boxShadow="lg"
      position="fixed"
      left={0}
      top={0}
      zIndex={100}
    >
      {sidebarContent}
    </Box>
  );
}
