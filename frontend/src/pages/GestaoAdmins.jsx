// src/pages/GestaoAdmins.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@chakra-ui/react";

export default function GestaoAdmins() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box ml={{ base: 0, md: "220px" }} w="100%" p={4}>
        <h1>Gestão de Admins</h1>
        {/* Coloque aqui o CRUD de admins */}
      </Box>
    </Box>
  );
}
