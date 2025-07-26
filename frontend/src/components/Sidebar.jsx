// src/components/Sidebar.jsx
import React from "react";
import {
  Box,
  VStack,
  Link,
  Text
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

function decodeToken(token) {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export default function Sidebar() {
  const location = useLocation();
  const token = localStorage.getItem("adminToken");
  const { role = null, nome = "" } = token ? decodeToken(token) : {};

  // monta o menu conforme o role, seguindo o escopo
  let menuLinks = [];

  if (role === "super") {
    menuLinks = [
      { to: "/admin/dashboard", label: "Dashboard" },
      { to: "/admin/gestao-motoristas", label: "Gestão de Motoristas" },
      { to: "/admin/gestao-veiculos", label: "Gestão de Veículos" },
      { to: "/admin/solicitacoes", label: "Solicitações de Aluguel" },
      { to: "/admin/contratos", label: "Contratos" },
      { to: "/admin/devolucoes", label: "Devoluções" },
      { to: "/admin/relatorios", label: "Relatórios" },
    ];
  } else if (role === "admin") {
    menuLinks = [
      { to: "/admin/gestao-motoristas", label: "Gestão de Motoristas" },
      { to: "/admin/gestao-veiculos", label: "Gestão de Veículos" },
      { to: "/admin/solicitacoes", label: "Solicitações de Aluguel" },
      { to: "/admin/contratos", label: "Contratos" },
      { to: "/admin/devolucoes", label: "Devoluções" },
      { to: "/admin/relatorios", label: "Relatórios" },
    ];
  } else if (role === "motorista") {
    menuLinks = [
    ];
  }

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      w="220px"
      bg="#e8f4fc"
      px={4}
      py={6}
      boxShadow="lg"
      zIndex={100}
    >
      <Text mb={8} fontWeight="bold" fontSize="xl" color="#249ED9">
        LocPoços
      </Text>
      <VStack spacing={4} align="stretch">
        {menuLinks.map(item => (
          <Link
            key={item.to}
            as={RouterLink}
            to={item.to}
            color={location.pathname === item.to ? "#249ED9" : "gray.700"}
            fontWeight={location.pathname === item.to ? "bold" : "normal"}
          >
            {item.label}
          </Link>
        ))}
      </VStack>
      {nome && (
        <Text mt={12} color="gray.600" fontSize="sm">
          Logado como: {nome}
        </Text>
      )}
    </Box>
  );
}
