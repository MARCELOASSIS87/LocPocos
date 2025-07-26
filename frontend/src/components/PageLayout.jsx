// src/components/PageLayout.jsx
import React from 'react';
import {
  Box,
  Heading,
  Button,
  Spinner,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  Select
} from '@chakra-ui/react';

export default function PageLayout({
  title,
  isOpen,
  onOpen,
  onClose,
  loading,
  submitting,
  items,
  columns,
  renderRow,
  childrenModal,
  handleSubmit
}) {
  return (
    <Box display="flex">
      <Box p={6}>
        <Heading mb={4}>{title}</Heading>

        <Button colorScheme="blue" mb={4} onClick={onOpen}>
          {childrenModal.props.id ? `Editar ${title}` : `Cadastrar ${title}`}
        </Button>

        {loading ? (
          <Spinner />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                {columns.map(col => (
                  <Th key={col.accessor}>{col.header}</Th>
                ))}
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map(item => renderRow(item))}
            </Tbody>
          </Table>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {childrenModal.props.id ? `Editar ${title}` : `Cadastrar ${title}`}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {childrenModal}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Cancelar
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit} isLoading={submitting}>
                {childrenModal.props.id ? 'Salvar' : 'Cadastrar'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
