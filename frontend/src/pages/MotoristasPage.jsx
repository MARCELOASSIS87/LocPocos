import React, { useState } from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Checkbox,
    useToast
} from '@chakra-ui/react';

export default function MotoristasPage() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        data_nascimento: '',
        cnh_numero: '',
        cnh_validade: '',
        cnh_data_emissao: '',
        cnh_categoria: '',
        cnh_ear: false
    });

    const [files, setFiles] = useState({
        foto_cnh: null,
        foto_perfil: null,
        selfie_cnh: null,
        comprovante_endereco: null,
        documento_vinculo: null,
        antecedentes_criminais: null
    });

    const toast = useToast();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleCheck = e => setForm({ ...form, [e.target.name]: e.target.checked });
    const handleFile = e => setFiles({ ...files, [e.target.name]: e.target.files[0] });

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(form).forEach(k => data.append(k, form[k]));
        Object.keys(files).forEach(k => {
            if (files[k]) data.append(k, files[k]);
        });
        try {
            await fetch('http://localhost:3001/motoristas', { method: 'POST', body: data });
            toast({ title: 'Motorista cadastrado', status: 'success', duration: 3000 });
            setForm({
                nome: '',
                email: '',
                telefone: '',
                cpf: '',
                data_nascimento: '',
                cnh_numero: '',
                cnh_validade: '',
                cnh_data_emissao: '',
                cnh_categoria: '',
                cnh_ear: false
            });
            setFiles({
                foto_cnh: null,
                foto_perfil: null,
                selfie_cnh: null,
                comprovante_endereco: null,
                documento_vinculo: null,
                antecedentes_criminais: null
            });
        } catch (err) {
            console.error(err);
            toast({ title: 'Erro ao cadastrar motorista', status: 'error', duration: 3000 });
        }
    };

    return (
        <Box p={6}>
            <Heading mb={4}>Cadastro de Motorista</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={3} isRequired>
                    <FormLabel>Nome completo</FormLabel>
                    <Input name="nome" value={form.nome} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" value={form.email} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Telefone</FormLabel>
                    <Input name="telefone" value={form.telefone} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>CPF</FormLabel>
                    <Input name="cpf" value={form.cpf} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <Input type="date" name="data_nascimento" value={form.data_nascimento} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Número da CNH</FormLabel>
                    <Input name="cnh_numero" value={form.cnh_numero} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Validade da CNH</FormLabel>
                    <Input type="date" name="cnh_validade" value={form.cnh_validade} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Data de Emissão da CNH</FormLabel>
                    <Input type="date" name="cnh_data_emissao" value={form.cnh_data_emissao} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Categoria da CNH</FormLabel>
                    <Input name="cnh_categoria" value={form.cnh_categoria} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3}>
                    <Checkbox name="cnh_ear" isChecked={form.cnh_ear} onChange={handleCheck}>EAR</Checkbox>
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Foto da CNH</FormLabel>
                    <Input type="file" name="foto_cnh" onChange={handleFile} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <Input type="file" name="foto_perfil" onChange={handleFile} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Selfie segurando a CNH</FormLabel>
                    <Input type="file" name="selfie_cnh" onChange={handleFile} />
                </FormControl>
                <FormControl mb={3} isRequired>
                    <FormLabel>Comprovante de Endereço</FormLabel>
                    <Input type="file" name="comprovante_endereco" onChange={handleFile} />
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel>Documento de Vínculo</FormLabel>
                    <Input type="file" name="documento_vinculo" onChange={handleFile} />
                </FormControl>
                <FormControl mb={4} isRequired>
                    <FormLabel>Antecedentes Criminais</FormLabel>
                    <Input type="file" name="antecedentes_criminais" onChange={handleFile} />
                </FormControl>
                <Button type="submit" colorScheme="blue">Cadastrar</Button>
            </form>
        </Box>
    );
}