import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  Select,
  Grid,
  GridItem,
  Spinner,
  Center,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import API_BASE_URL from '../services/api';

export default function MotoristaDashboard() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marcaFilter, setMarcaFilter] = useState('');
  const [modeloFilter, setModeloFilter] = useState('');
  const [anoFilter, setAnoFilter] = useState('');
  const token = localStorage.getItem('token') || '';
  const headers = { Authorization: `Bearer ${token}` };
  useEffect(() => {
    const fetchVeiculos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/veiculos`,
          { headers }
        );
        setVeiculos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVeiculos();
  }, []);

  const marcas = useMemo(
    () => Array.from(new Set(veiculos.map(v => v.marca))).filter(Boolean),
    [veiculos]
  );
  const modelos = useMemo(
    () => Array.from(new Set(veiculos.map(v => v.modelo))).filter(Boolean),
    [veiculos]
  );
  const anos = useMemo(
    () => Array.from(new Set(veiculos.map(v => v.ano))).filter(Boolean),
    [veiculos]
  );

  const filteredVeiculos = veiculos.filter(v =>
    v.status === 'disponivel' &&
    (!marcaFilter || v.marca === marcaFilter) &&
    (!modeloFilter || v.modelo === modeloFilter) &&
    (!anoFilter || String(v.ano) === String(anoFilter))
  );

  return (
    <Box p={4}>
      <Heading mb={4}>Veículos Disponíveis</Heading>

      <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4} mb={6}>
        <GridItem>
          <Select
            placeholder="Marca"
            value={marcaFilter}
            onChange={e => setMarcaFilter(e.target.value)}
          >
            {marcas.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select
            placeholder="Modelo"
            value={modeloFilter}
            onChange={e => setModeloFilter(e.target.value)}
          >
            {modelos.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select
            placeholder="Ano"
            value={anoFilter}
            onChange={e => setAnoFilter(e.target.value)}
          >
            {anos.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </Select>
        </GridItem>
      </Grid>

      {loading ? (
        <Center><Spinner /></Center>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6}>
          {filteredVeiculos.map(v => (
            <GridItem key={v.id} borderWidth="1px" borderRadius="md" p={4}>
              {v.foto_principal_url && (
                <Image
                  src={`${API_BASE_URL}${v.foto_principal_url}`}
                  alt={v.modelo}
                  w="100%"
                  h="150px"
                  objectFit="cover"
                  mb={2}
                />
              )}
              <VStack align="start" spacing={1} mb={2}>
                <Text fontWeight="bold">
                  {v.marca} {v.modelo}
                </Text>
                <Text>Ano: {v.ano}</Text>
                <Text>Status: {v.status}</Text>
              </VStack>
              <Button colorScheme="blue" w="100%">Solicitar aluguel</Button>
            </GridItem>
          ))}
          {filteredVeiculos.length === 0 && (
            <GridItem colSpan={3} textAlign="center">Nenhum veículo encontrado.</GridItem>
          )}
        </Grid>
      )}
    </Box>
  );
}