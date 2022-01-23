import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, HStack, Input, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { useState } from "react";
import { api } from "../../api";


function RegisterCard() {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSurnameChange = (e) => {
        setSurname(e.target.value)
    }
    const hasWhiteSpace = (s) => {
        return /\s/g.test(s)
    }

    const handleSubmit = () => {
        setSuccess(false)
        let errorInForm = true
        if (username === '' || name === '' || surname === '') {
            setErrorMessage("")
            setErrorMessage("Dont leave empty fields!")
            errorInForm = true
        }
        else if (hasWhiteSpace(username) || hasWhiteSpace(name) || hasWhiteSpace(surname)) {
            setErrorMessage("Dont use spaces!")
            errorInForm = true
        }
        else {
            setErrorMessage("")
            errorInForm = false
        }
        let payload = {
            userName: username,
            name: name,
            surname: surname
        }
        if (!errorInForm) {
            api.createUser(payload).then((response) => {
                if (response.status === 200) {
                    setSuccess(true)
                }
                return response.data
            }).then((data) => {

            }).catch((error) => {
                if (error.response.status === 400) {
                    setErrorMessage(error.response.data.detail)
                }
            })
        }
    }
    return (
        <div className="registerCard">
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    {success && (<Alert status='success'>
                        <AlertIcon />
                        Successfuly registred
                    </Alert>)}
                    <Text color='red'>{errorMessage}</Text>
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" value={username} onChange={handleUsernameChange} />
                        </FormControl>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" value={name} onChange={handleNameChange} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="surname" isRequired>
                                    <FormLabel>Surname</FormLabel>
                                    <Input type="text" value={surname} onChange={handleSurnameChange} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link as={ReachLink} color={'blue.400'} to="/login">Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </div>
    );
}

export default RegisterCard;