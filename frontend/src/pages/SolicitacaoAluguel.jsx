import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Image,
  Text,
  Spinner,
  Center,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack
} from '@chakra-ui/react';
import axios from 'axios';
import API_BASE_URL from '../services/api';

export default function SolicitacaoAluguel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [veiculo, setVeiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const token = localStorage.getItem('token') || '';
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/veiculos/${id}`, { headers });
        setVeiculo(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVeiculo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async () => {
    // TODO: ajustar endpoint quando backend estiver pronto
    try {
      await axios.post(
        `${API_BASE_URL}/solicitacoes`,
        {
          veiculo_id: id,
          data_inicio: dataInicio,
          data_fim_prevista: dataFim
        },
        { headers }
      );
      navigate('/dashboard-motorista');
    } catch (err) {
      console.error('Erro ao solicitar aluguel:', err);
    }
  };

  if (loading) {
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    );
  }

  if (!veiculo) {
    return <Text>Veículo não encontrado.</Text>;
  }

  return (
    <Box p={4} maxW="500px" mx="auto">
      <Heading mb={4}>Solicitar Aluguel</Heading>
      <Stack direction="row" spacing={4} mb={6} align="flex-start">
        {veiculo.foto_principal_url && (
          <Image
            src={`${API_BASE_URL}${veiculo.foto_principal_url}`}
            alt={veiculo.modelo}
            boxSize="150px"
            objectFit="cover"
            borderRadius="md"
          />
        )}
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">{veiculo.marca} {veiculo.modelo}</Text>
          <Text>Ano: {veiculo.ano}</Text>
          <Text>Placa: {veiculo.placa}</Text>
        </VStack>
      </Stack>

      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Data de início</FormLabel>
          <Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Data fim prevista</FormLabel>
          <Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!dataInicio || !dataFim}>
          Confirmar solicitação
        </Button>
      </VStack>
    </Box>
  );
}