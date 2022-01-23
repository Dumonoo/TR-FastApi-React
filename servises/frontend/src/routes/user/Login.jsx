import { Flex, useColorModeValue } from "@chakra-ui/react";
import LoginCard from "../../Components/user/LoginCard";

function Login() {
    return (
        <div className="loginView">

            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                    <LoginCard/>
            </Flex>
        </div>
    );
}

export default Login;