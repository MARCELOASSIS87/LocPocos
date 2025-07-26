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
  const [current, setCurrent] = useState({
    id: null,
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    renavam: '',
    cor: '',
    numero_seguro: '',
    foto_principal_url: '',
    fotos_urls: '',
    status: '',
    manutencao_proxima_data: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [, setError] = useState(null);
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
    setCurrent({
      id: null,
      marca: '',
      modelo: '',
      ano: '',
      placa: '',
      renavam: '',
      cor: '',
      numero_seguro: '',
      foto_principal_url: '',
      fotos_urls: '',
      status: '',
      manutencao_proxima_data: ''
    });
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
    { header: 'Modelo', accessor: 'modelo' },
    { header: 'Marca', accessor: 'marca' },
    { header: 'Ano', accessor: 'ano' },
    { header: 'Placa', accessor: 'placa' },
    { header: 'Renavam', accessor: 'renavam' },
    { header: 'Cor', accessor: 'cor' },
    { header: 'Número Seguro', accessor: 'numero_seguro' },
    { header: 'Foto Principal', accessor: 'foto_principal_url' },
    { header: 'Fotos', accessor: 'fotos_urls' },
    { header: 'Status', accessor: 'status' },
    { header: 'Próxima Manutenção', accessor: 'manutencao_proxima_data' },
    { header: 'Criado em', accessor: 'criado_em' }
  ];
  const renderRow = v => (
    <tr key={v.id}>
      <td>{v.id}</td>
      <td>{v.modelo}</td>
      <td>{v.marca}</td>
      <td>{v.ano}</td>
      <td>{v.placa}</td>
      <td>{v.renavam}</td>
      <td>{v.cor}</td>
      <td>{v.numero_seguro}</td>
      <td>{v.foto_principal_url}</td>
      <td>{v.fotos_urls}</td>
      <td>{v.status}</td>
      <td>{v.manutencao_proxima_data}</td>
      <td>{v.criado_em}</td>
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
      <FormControl mb={3}>
        <FormLabel>Placa</FormLabel>
        <Input
          value={current.placa}
          onChange={e => setCurrent({ ...current, placa: e.target.value })}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Renavam</FormLabel>
        <Input
          value={current.renavam}
          onChange={e => setCurrent({ ...current, renavam: e.target.value })}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Cor</FormLabel>
        <Input
          value={current.cor}
          onChange={e => setCurrent({ ...current, cor: e.target.value })}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Número do Seguro</FormLabel>
        <Input
          value={current.numero_seguro}
          onChange={e => setCurrent({ ...current, numero_seguro: e.target.value })}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Foto Principal URL</FormLabel>
        <Input
          value={current.foto_principal_url}
          onChange={e => setCurrent({ ...current, foto_principal_url: e.target.value })}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Fotos (URLs separadas por vírgula)</FormLabel>
        <Input
          value={current.fotos_urls}
          onChange={e => setCurrent({ ...current, fotos_urls: e.target.value })}
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
          <option value="inativo">Inativo</option>
        </Select>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Próxima Manutenção</FormLabel>
        <Input
          type="date"
          value={current.manutencao_proxima_data}
          onChange={e => setCurrent({ ...current, manutencao_proxima_data: e.target.value })}
        />
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
