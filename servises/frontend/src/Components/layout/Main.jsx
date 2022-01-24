import { Box, Text } from "@chakra-ui/react";
import MainLayout from "./MainLayout";

function Main() {
    return ( 
        <div className="main">
            <MainLayout>
                <Box>
                    <Text fontSize='5xl'>Time reporting system is simple forms to raport what projects you took part recently</Text>
                </Box>
            </MainLayout>
        </div>
     );
}

export default Main;