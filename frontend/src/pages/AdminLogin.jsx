import { useState } from "react";
import {
    Flex, Box, Heading, Input, Button, FormControl, FormLabel, FormErrorMessage, useToast, Link, Image, Text, useColorModeValue
} from "@chakra-ui/react";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const toast = useToast();

    const cardBg = useColorModeValue("white", "gray.800");
    const btnColor = useColorModeValue("#249ED9", "teal.400"); // Azul da sua logo

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:3001/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Erro ao autenticar");
            } else {
                toast({
                    title: "Login realizado!",
                    description: `Bem-vindo(a), ${data.admin.nome}`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                localStorage.setItem("adminToken", data.token);
            }
        } catch {
            setError("Erro de conexão com o servidor");
        }
        setLoading(false);
    };

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bgImage="url('/backgroundlogin2.png')" // ajuste o nome se for PNG ou outro arquivo
            bgSize="cover"
            bgPosition="center"
        >
            <Box
                bg={cardBg}
                rounded="2xl"
                shadow="xl"
                maxW="sm"
                w="100%"
                border="1px solid #b5d7f6"
                overflow="hidden" // garante que nada vaze
            >
                <Box
                    w="100%"
                    h="110px"
                    bgImage="url('/banner.png')" // ou o nome do novo arquivo
                    bgRepeat="no-repeat"
                    bgSize="cover"
                    bgPosition="center"
                />

                <Box p={8}> {/* Padding só aqui dentro */}
                    <Heading mb={2} textAlign="center" fontSize="2xl" color="#249ED9">
                        Seja Bem vindo à LocPoços!
                    </Heading>
                    <Text color="gray.500" mb={2} textAlign="center">
                        Faça seu login
                    </Text>

                    <form onSubmit={handleSubmit}>
                        <FormControl mb={4} isInvalid={!!error && !email}>
                            <FormLabel color="gray.600">Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                isRequired
                                bg="#f4faff"
                                border="1px solid #b5d7f6"
                                _focus={{ borderColor: "#249ED9" }}
                            />
                        </FormControl>
                        <FormControl mb={4} isInvalid={!!error && !senha}>
                            <FormLabel color="gray.600">Senha</FormLabel>
                            <Input
                                type="password"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                isRequired
                                bg="#f4faff"
                                border="1px solid #b5d7f6"
                                _focus={{ borderColor: "#249ED9" }}
                            />
                            {error && (
                                <FormErrorMessage>{error}</FormErrorMessage>
                            )}
                        </FormControl>
                        <Button
                            bg={btnColor}
                            color="white"
                            w="100%"
                            mb={2}
                            _hover={{ bg: "#1873a0" }}
                            type="submit"
                            isLoading={loading}
                            fontWeight="bold"
                            fontSize="lg"
                            rounded="xl"
                            shadow="md"
                        >
                            Entrar
                        </Button>
                    </form>
                    <Box textAlign="center" mt={4}>
                        <Link color="#249ED9" fontSize="sm" href="#" display="block" mb={1}>
                            Ainda não tem cadastro? Cadastre-se
                        </Link>
                        <Link color="#249ED9" fontSize="sm" href="#" display="block">
                            Esqueci minha senha
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}

export default Login;
