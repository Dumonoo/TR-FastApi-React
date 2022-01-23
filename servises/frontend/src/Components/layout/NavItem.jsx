import { Flex, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function NavItem(props) {
    return (

        <NavLink to={props.path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group" 
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                >
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        color: 'white',
                    }} as={props.icon} />
                {props.children}
            </Flex>
        </NavLink>
    );
}

export default NavItem;