import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import NavItem from "./NavItem";

import {
    FiHome,
    FiStar,
    FiBookmark,
    FiArchive,
} from 'react-icons/fi';

const LinkItems = [
    { name: "Main Page", path: "/", icon: FiHome, key: 1 },
    { name: "My activities", path: "/activities", icon: FiBookmark, key: 2 },
    { name: "My projects", path: "/myProjects", icon: FiArchive, key: 3 },
    { name: "Projects", path: "/projects", icon: FiStar, key: 4 }
]


function Navbar(props) {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ md: 60 }}
            pos="fixed"
            h="full">
            <Flex h="20" alignItems="center" mx="5" justifyContent="space-between">
                <Text fontSize="lg" fontFamily="monospace" fontWeight="bold">
                    TimeReportingSystem
                </Text>
            </Flex>

            {!props.userStat ? (
                LinkItems.filter((link) => link.key === 1).map((link) => (
                    <NavItem icon={link.icon} path={link.path} key={link.key}>
                        {link.name}
                    </NavItem>
                ))
            ) :
                (
                    LinkItems.map((link) => (
                        <NavItem icon={link.icon} path={link.path} key={link.key}>
                            {link.name}
                        </NavItem>
                    ))
                )}
        </Box>
    );
}

export default Navbar;