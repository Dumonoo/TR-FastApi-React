import { Box, useColorModeValue } from "@chakra-ui/react";

function MainLayout(props) {
    return ( 
        <div className="mainLayout">
            <Box
                rounded={'lg'}
                w='100%'
                minW='400px'
                minH='600px'
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
            >
                {props.children}
            </Box>
        </div>
     );
}

export default MainLayout;