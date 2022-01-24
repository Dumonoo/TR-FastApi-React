import { Box, Button, Heading, HStack, Link, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useToast } from "@chakra-ui/react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api";

function LoginCard() {

    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const toast = useToast()

    useEffect(() => {
        api.getUsers().then((response) => {
            setUsers(response.data)
        })
    },[])

    const handleLogin = (id) => {
        api.login(id).then((response) => {
            if(response.status===200){
                toast({
                    title: "Succesfully logged in!"
                })
                navigate('/main')
            }
        })
    }

    return (
        <div className="loginCard">
            <Stack spacing={8} mx={'auto'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account !</Heading>
                </Stack>
                <HStack pt={6} justifyContent='space-evenly'>
                    <Text align={'center'}>
                        New user <Link as={ReachLink} color={'blue.400'} to="/register">Register</Link>
                    </Text>
                    <Button colorScheme='yellow' onClick={() => { navigate('/') }}>Back</Button>
                </HStack>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Table size='md' variant='striped'>
                        <Thead>
                            <Tr>
                                <Th>Username</Th>
                                <Th>Name</Th>
                                <Th>Surname</Th>
                                <Th textAlign='center'>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user) => (
                                <Tr key={user.id}>
                                    <Td>{user.userName}</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{user.surname}</Td>
                                    <Td>
                                        <Button colorScheme='blue' onClick={()=> {handleLogin(user.id)}}>LogIn</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Stack>
        </div>
    );
}

export default LoginCard;