import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api";
import MainLayout from "../layout/MainLayout";

function ProjectForm(props) {

    const navigate = useNavigate()
    const toast = useToast()

    const [subActivityName, setSubActivityName] = useState('')

    const handleSubActivityNameChange = (e) => {
        setSubActivityName(e.target.value)
    }

    let payload = {
        code: subActivityName
    }

    const handleSubmit = () => {
        api.createSubactivity(props.id, payload).then((response) => {
            if (response.status === 200) {
                toast({
                    title: `Subactivity ${subActivityName} created`,
                    status: 'success'
                })
                navigate(-1)
            }
        }).catch((error) => {
            toast({
                title: `Something went wrong ${error.response.data.detail}`,
                status: 'error'
            })
        })
    }

    return (
        <div className="projectForm">
            <MainLayout>
                <Box width={['100%', '100%', '100%', '60%']} >
                    <HStack pb='4'>
                        <Heading align='left' fontSize={'4xl'}>Create new subactivity</Heading>
                    </HStack>
                    <HStack pb='4'>
                        <FormControl isRequired>
                            <FormLabel htmlFor="subactivity-name">Subactivity name</FormLabel>
                            <Input id="subactivity-name" type="text" value={subActivityName} onChange={handleSubActivityNameChange} />
                        </FormControl>
                    </HStack>
                    <HStack justifyContent='flex-end' pb='4'>
                    <Button colorScheme='yellow' onClick={() => navigate(-1)}>Back</Button>
                    <Button colorScheme='green' onClick={() => {handleSubmit()}}>Submit</Button>
                    </HStack>
                </Box>


            </MainLayout>
        </div>
    );
}

export default ProjectForm;