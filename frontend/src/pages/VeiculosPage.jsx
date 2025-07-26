// src/pages/VeiculosPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure
} from '@chakra-ui/react';

import PageLayout from '../components/PageLayout';

export default function VeiculosPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [veiculos, setVeiculos] = useState([]);
  const [current, setCurrent] = useState({ id: null, marca: '', modelo: '', ano: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [,setError] = useState(null);
  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchVeiculos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:3001/veiculos', { headers });
      setVeiculos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // função async interna
    const fetchData = async () => {
      setLoading(true);
      try {
        // pegamos o token aqui dentro para não precisar declarar 'headers' fora
        const token = localStorage.getItem('adminToken');
        const { data } = await axios.get('http://localhost:3001/veiculos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVeiculos(data);
      } catch (err) {
        console.error('Erro ao listar veículos:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Erro interno ao carregar veículos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openCreate = () => {
    setCurrent({ id: null, marca: '', modelo: '', ano: '', status: '' });
    onOpen();
  };
  const openEdit = v => {
    setCurrent(v);
    onOpen();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (current.id) {
        await axios.put(`http://localhost:3001/veiculos/${current.id}`, current, { headers });
      } else {
        await axios.post('http://localhost:3001/veiculos', current, { headers });
      }
      fetchVeiculos();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:3001/veiculos/${id}`, { headers });
    fetchVeiculos();
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Marca', accessor: 'marca' },
    { header: 'Modelo', accessor: 'modelo' },
    { header: 'Ano', accessor: 'ano' },
    { header: 'Status', accessor: 'status' }
  ];
  const renderRow = v => (
    <tr key={v.id}>
      <td>{v.id}</td>
      <td>{v.marca}</td>
      <td>{v.modelo}</td>
      <td>{v.ano}</td>
      <td>{v.status}</td>
      <td>
        <button onClick={() => openEdit(v)}>Editar</button>
        <button onClick={() => handleDelete(v.id)}>Excluir</button>
      </td>
    </tr>
  );

  const form = (
    <>
      <FormControl mb={3}>
        <FormLabel>Marca</FormLabel>
        <Input
          value={current.marca}
          onChange={e => setCurrent({ ...current, marca: e.target.value })}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Modelo</FormLabel>
        <Input
          value={current.modelo}
          onChange={e => setCurrent({ ...current, modelo: e.target.value })}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Ano</FormLabel>
        <Input
          type="number"
          value={current.ano}
          onChange={e => setCurrent({ ...current, ano: e.target.value })}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Status</FormLabel>
        <Select
          value={current.status}
          onChange={e => setCurrent({ ...current, status: e.target.value })}
        >
          <option value="disponível">Disponível</option>
          <option value="alugado">Alugado</option>
          <option value="manutenção">Manutenção</option>
        </Select>
      </FormControl>
    </>
  );

  return (
    <PageLayout
      title="Veículos"
      isOpen={isOpen}
      onOpen={openCreate}
      onClose={onClose}
      loading={loading}
      submitting={submitting}
      items={veiculos}
      columns={columns}
      renderRow={renderRow}
      childrenModal={form}
      handleSubmit={handleSubmit}
    />
  );
}
