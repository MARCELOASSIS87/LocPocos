import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Spinner,
    useToast,
    useDisclosure,
    Modal,                   // componente modal
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Image,
    Link
} from '@chakra-ui/react';
import axios from 'axios';
import API_BASE_URL from '../services/api';

export default function MotoristasPage() {
    const [motoristas, setMotoristas] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedMotorista, setSelectedMotorista] = useState(null);

    const token = localStorage.getItem('token') || '';
    const headers = { Authorization: `Bearer ${token}` };

    const fetchMotoristas = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API_BASE_URL}/motoristas`, { headers });
            setMotoristas(data);
        } catch (err) {
            console.error('Erro ao carregar motoristas:', err);
            toast({ title: 'Erro ao carregar motoristas', status: 'error', duration: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMotoristas();
    }, []);

    const atualizarStatus = async (id, status) => {
        try {
            await axios.put(`${API_BASE_URL}/motoristas/${id}/status`, { status }, { headers });
            toast({ title: `Motorista ${status === 'aprovado' ? 'aprovado' : 'recusado'}`, status: 'success', duration: 3000 });
            fetchMotoristas();
        } catch (err) {
            console.error('Erro ao atualizar status:', err);
            toast({ title: 'Erro ao atualizar status', status: 'error', duration: 3000 });
        }
    };

    return (
        <Box p={6}>
            <Heading mb={4}>Gestão de Motoristas</Heading>
            {loading ? (
                <Spinner />
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Email</Th>
                            <Th>Telefone</Th>
                            <Th>Status</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {motoristas.map(m => (
                            <Tr key={m.id}>
                                <Td>{m.nome}</Td>
                                <Td>{m.email}</Td>
                                <Td>{m.telefone}</Td>
                                <Td>{m.status}</Td>
                                <Td>
                                    {m.status === 'pendente' ? (
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => {
                                                setSelectedMotorista(m);
                                                onOpen();
                                            }}
                                        >
                                            Ver detalhes
                                        </Button>
                                    ) : (
                                        '-'
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

            )}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalhes do Motorista</ModalHeader>
                    <ModalBody>
                        {selectedMotorista && (
                            <Box>
                                <p><strong>Nome:</strong> {selectedMotorista.nome}</p>
                                <p><strong>Email:</strong> {selectedMotorista.email}</p>
                                <p><strong>Telefone:</strong> {selectedMotorista.telefone}</p>
                                <p><strong>CPF:</strong> {selectedMotorista.cpf}</p>
                                {/* Datas e outros campos */}
                                <p><strong>Data de Nascimento:</strong> {selectedMotorista.data_nascimento}</p>
                                <p><strong>CNH:</strong> {selectedMotorista.cnh_numero} (categoria {selectedMotorista.cnh_categoria})</p>
                                {/* Imagens */}
                                <Box mt={4}>
                                    <Heading size="sm" mb={2}>Documentos</Heading>

                                    {selectedMotorista.cnh_foto_url && (
                                        <Link
                                            href={`${API_BASE_URL}${selectedMotorista.cnh_foto_url}`}
                                            isExternal
                                            mb={2}
                                            display="block"
                                        >
                                            <Image
                                                src={`${API_BASE_URL}${selectedMotorista.cnh_foto_url}`}
                                                alt="Foto CNH"
                                                maxH="200px"
                                                objectFit="cover"
                                                mb={2}
                                                cursor="pointer"
                                            />
                                            CNH Foto
                                        </Link>
                                    )}

                                    {selectedMotorista.foto_perfil_url && (
                                        <Link
                                            href={`${API_BASE_URL}${selectedMotorista.foto_perfil_url}`}
                                            isExternal
                                            mb={2}
                                            display="block"
                                        >
                                            <Image
                                                src={`${API_BASE_URL}${selectedMotorista.foto_perfil_url}`}
                                                alt="Foto Perfil"
                                                maxH="200px"
                                                objectFit="cover"
                                                mb={2}
                                                cursor="pointer"
                                            />
                                            Foto Perfil
                                        </Link>
                                    )}

                                    {selectedMotorista.selfie_cnh_url && (
                                        <Link
                                            href={`${API_BASE_URL}${selectedMotorista.selfie_cnh_url}`}
                                            isExternal
                                            mb={2}
                                            display="block"
                                        >
                                            <Image
                                                src={`${API_BASE_URL}${selectedMotorista.selfie_cnh_url}`}
                                                alt="Selfie CNH"
                                                maxH="200px"
                                                objectFit="cover"
                                                mb={2}
                                                cursor="pointer"
                                            />
                                            Selfie com CNH
                                        </Link>
                                    )}

                                    {selectedMotorista.comprovante_endereco_url && (
                                        <Link
                                            href={`${API_BASE_URL}${selectedMotorista.comprovante_endereco_url}`}
                                            isExternal
                                            mb={2}
                                            display="block"
                                        >
                                            <Image
                                                src={`${API_BASE_URL}${selectedMotorista.comprovante_endereco_url}`}
                                                alt="Comprovante Endereço"
                                                maxH="200px"
                                                objectFit="cover"
                                                mb={2}
                                                cursor="pointer"
                                            />
                                            Comprovante de Endereço
                                        </Link>
                                    )}

                                    {selectedMotorista.comprovante_vinculo_url && (
                                        <Link
                                            href={`${API_BASE_URL}${selectedMotorista.comprovante_vinculo_url}`}
                                            isExternal
                                            mb={2}
                                            display="block"
                                        >
                                            <Image
                                                src={`${API_BASE_URL}${selectedMotorista.comprovante_vinculo_url}`}
                                                alt="Documento Vínculo"
                                                maxH="200px"
                                                objectFit="cover"
                                                mb={2}
                                                cursor="pointer"
                                            />
                                            Comprovante De Vínculo com o Endereço
                                        </Link>
                                    )}

                                    {selectedMotorista.antecedentes_criminais_url && (
                                        <Link
                                            href={`${API_BASE_URL}${selectedMotorista.antecedentes_criminais_url}`}
                                            isExternal
                                            mb={2}
                                            display="block"
                                        >
                                            <Image
                                                src={`${API_BASE_URL}${selectedMotorista.antecedentes_criminais_url}`}
                                                alt="Antecedentes Criminais"
                                                maxH="200px"
                                                objectFit="cover"
                                                mb={2}
                                                cursor="pointer"
                                            />
                                            Antecendentes
                                        </Link>
                                    )}</Box>
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={() => atualizarStatus(selectedMotorista.id, 'aprovado')}>
                            Aprovar
                        </Button>
                        <Button colorScheme="red" onClick={() => atualizarStatus(selectedMotorista.id, 'recusado')}>
                            Recusar
                        </Button>
                        <Button variant="ghost" ml={2} onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>

    );

}