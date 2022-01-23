import { Flex, useColorModeValue } from "@chakra-ui/react";
import RegisterCard from "../../Components/user/RegisterCard";

function Register() {
    return (
        <div className="registerView">
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <RegisterCard />
            </Flex>
        </div>
    );
}

export default Register;