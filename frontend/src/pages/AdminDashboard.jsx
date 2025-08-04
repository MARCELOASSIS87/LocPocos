import React, { useEffect, useState, useCallback, useMemo } from "react"; import {
  Box,
  Heading,
  Button,
  ButtonGroup,
  TableContainer,
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
  Select
} from "@chakra-ui/react";
import axios from "axios";
import PageLayout from '../components/PageLayout';
import API_BASE_URL from '../services/api';

const API = `${API_BASE_URL}/admin`;

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
    role: ""
  });

  const token = localStorage.getItem("token") || "";
  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  // carregar lista de admins
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/`, { headers });
      setAdmins(res.data);
    } catch {
      toast({ title: "Erro ao buscar admins", status: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  }, [headers, toast]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // abrir modal para criar
  const openCreate = () => {
    setCurrent({ id: null, nome: "", email: "", senha: "", role: "comum" });
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
          { nome: current.nome, email: current.email, senha: current.senha, role: current.role },
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

  // configuração das colunas e renderRow
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nome", accessor: "nome" },
    { header: "Email", accessor: "email" },
    { header: "Criado em", accessor: "criado_em" }
  ];
  const renderRow = (adm) => (
    <tr key={adm.id}>
      <td>{adm.id}</td>
      <td>{adm.nome}</td>
      <td>{adm.email}</td>
      <td>{new Date(adm.criado_em).toLocaleString()}</td>
      <Td>
        <ButtonGroup spacing="2">
          <Button colorScheme="blue" size="sm" onClick={() => openEdit(adm)}>
            Editar
          </Button>
          <Button colorScheme="red" size="sm" onClick={() => handleDelete(adm.id)}>
            Excluir
          </Button>
        </ButtonGroup>
      </Td>
    </tr>
  );

  // JSX do formulário dentro do modal
  const form = (
    <>
      <FormControl mb={3}>
        <FormLabel>Nome</FormLabel>
        <Input
          value={current.nome}
          onChange={e => setCurrent({ ...current, nome: e.target.value })}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={current.email}
          onChange={e => setCurrent({ ...current, email: e.target.value })}
        />
      </FormControl>
      {!current.id && (
        <FormControl mb={3}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={current.senha}
            onChange={e => setCurrent({ ...current, senha: e.target.value })}
          />
        </FormControl>
      )}
      <FormControl mb={4} isRequired>
        <FormLabel>Role</FormLabel>
        <Select
          value={current.role}
          onChange={e => setCurrent({ ...current, role: e.target.value })}
        >
          <option value="comum">Admin Comum</option>
          <option value="super">Super Admin</option>
        </Select>
      </FormControl>
    </>
  );

  return (
    <PageLayout
      title="Administradores"
      isOpen={isOpen}
      onOpen={openCreate}
      onClose={onClose}
      loading={loading}
      submitting={submitting}
      items={admins}
      columns={columns}
      renderRow={renderRow}
      childrenModal={form}
      handleSubmit={handleSubmit}
    />
  );
}
