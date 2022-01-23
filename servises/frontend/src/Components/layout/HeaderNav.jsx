import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";

function HeaderNav(props) {

    return (
        <div className="headerNav">
            <Flex
                ml={{ base: 0, md: 60 }}
                px={{ base: 4, md: 4 }}
                height="20"
                alignItems="center"
                bg={useColorModeValue('white', 'gray.900')}
                borderBottomWidth="1px"
                borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                justifyContent={{ base: 'space-between', md: 'flex-end' }}
            >
                <Flex alignItems={'center'}>
                    <Icon as={FiUser} fontSize="25"></Icon>{'  '}
                    {props.userName}
                    {props.userStat ? (
                        <Icon as={FiLogOut} onClick={props.logout} fontSize="25"></Icon>
                    ) : (
                        <Icon as={FiLogIn} onClick={props.login} fontSize="25"></Icon>
                    )}
                </Flex>
            </Flex>
        </div>
    );
}

export default HeaderNav;