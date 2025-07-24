import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:3001/admin";

export default function AdminDashboard() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // estado do formulário (create/edit)
  const [current, setCurrent] = useState({
    id: null,
    nome: "",
    email: "",
    senha: "",
  });

  const token = localStorage.getItem("adminToken") || "";
  const headers = { Authorization: `Bearer ${token}` };

  // carregar lista de admins
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/`, { headers });
      setAdmins(res.data);
    } catch {
      toast({ title: "Erro ao buscar admins", status: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // abrir modal para criar
  const openCreate = () => {
    setCurrent({ id: null, nome: "", email: "", senha: "" });
    onOpen();
  };

  // abrir modal para editar
  const openEdit = (admin) => {
    setCurrent({ id: admin.id, nome: admin.nome, email: admin.email, senha: "" });
    onOpen();
  };

  // submit create/edit
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (current.id) {
        // editar
        await axios.put(
          `${API}/${current.id}`,
          { nome: current.nome, email: current.email },
          { headers }
        );
        toast({ title: "Admin atualizado", status: "success", duration: 3000 });
      } else {
        // criar
        await axios.post(
          `${API}/`,
          { nome: current.nome, email: current.email, senha: current.senha },
          { headers }
        );
        toast({ title: "Admin criado", status: "success", duration: 3000 });
      }
      fetchAdmins();
      onClose();
    } catch {
      toast({ title: "Erro ao salvar admin", status: "error", duration: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  // exclusão lógica
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, { headers });
      toast({ title: "Admin desativado", status: "info", duration: 3000 });
      fetchAdmins();
    } catch {
      toast({ title: "Erro ao desativar admin", status: "error", duration: 3000 });
    }
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box ml={{ base: 0, md: "220px" }} w="100%" p={4}></Box>
      <Box p={6}>
        <Heading mb={4}>Dashboard de Administradores</Heading>

        <Button colorScheme="blue" mb={4} onClick={openCreate}>
          Cadastrar Novo Admin
        </Button>

        {loading ? (
          <Spinner />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Criado em</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {admins.map((adm) => (
                <Tr key={adm.id}>
                  <Td>{adm.id}</Td>
                  <Td>{adm.nome}</Td>
                  <Td>{adm.email}</Td>
                  <Td>{new Date(adm.criado_em).toLocaleString()}</Td>
                  <Td>
                    <Button size="sm" mr={2} onClick={() => openEdit(adm)}>
                      Editar
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(adm.id)}>
                      Excluir
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {current.id ? "Editar Administrador" : "Cadastrar Administrador"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Nome</FormLabel>
                <Input
                  value={current.nome}
                  onChange={(e) => setCurrent({ ...current, nome: e.target.value })}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={current.email}
                  onChange={(e) => setCurrent({ ...current, email: e.target.value })}
                />
              </FormControl>
              {!current.id && (
                <FormControl mb={3}>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    value={current.senha}
                    onChange={(e) => setCurrent({ ...current, senha: e.target.value })}
                  />
                </FormControl>
              )}
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={submitting}
              >
                {current.id ? "Salvar" : "Cadastrar"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}