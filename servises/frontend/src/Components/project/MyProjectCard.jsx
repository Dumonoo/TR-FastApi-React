import { Badge, Button, ButtonGroup, Heading, HStack, ListItem, Table, TableCaption, Tbody, Td, Th, Thead, Tr, UnorderedList, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../api";
import MainLayout from "../layout/MainLayout";

function MyProjectCard() {

    const navigate = useNavigate()
    const toast = useToast()

    const [myProjects, setMyProjects] = useState([])

    const [userId, setUserId] = useState(0)

    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        api.getMe().then((response) => {
            setUserId(response.data.UserId)
        })
        api.getUserProjects(userId).then((response) => {
            setMyProjects(response.data)
        })
    }, [userId, refresh])

    const handleCreateProject = () => {
        navigate("/newProject")
    }
    const handleDetailsProject = (id) => {
        navigate(`/displayProject/${id}`)
    }
    const handleEditProject = (id) => {
        navigate(`/editProject/${id}`)
    }
    const handleAddSubactivity = (id) =>{
        navigate(`/newSubactivity/${id}`)
    }
    const handleCloseProject = (id) => {
        api.closeProject(id).then((response) => {
            if (response.status === 200) {
                toast({
                    title: `Project closed`,
                    status: 'success'
                })
                setRefresh(!refresh)
            }
        }).catch((error) => {
            toast({
                title: `Something gone wrong: ${error.response.data.detail}`,
                status: 'error'
            })
        })
    }

    const round = (v) => {
        return Math.round(v / 60 * 100) / 100
    }

    return (
        <div className="myProjectCard">
            <MainLayout>
                <HStack justifyContent='space-between' pb='2'>
                    <Heading align='left' fontSize={'4xl'}>My projects</Heading>
                </HStack>
                <HStack justifyContent='space-between'>
                    <Button onClick={handleCreateProject}>Create project</Button>
                </HStack>
                <Table size='md' variant='striped'>
                    <TableCaption>My projects</TableCaption>

                    <Thead>
                        <Tr>
                            <Th>Project name</Th>
                            <Th>Project code</Th>
                            <Th>Status</Th>
                            <Th isNumeric>Budget</Th>
                            <Th>Subactivities codes</Th>
                            <Th textAlign='center'>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {myProjects.map((project) => (
                            <Tr key={project.id}>
                                <Td>{project.name}</Td>
                                <Td>{project.code}</Td>
                                <Td>
                                    {project.isActive? (
                                        <Badge variant='outline' colorScheme='green'>
                                        Active
                                        </Badge>
                                    ): (
                                        <Badge variant='outline' colorScheme='blackAlpha'>
                                        Closed
                                        </Badge>
                                    )}
                                </Td>
                                <Td isNumeric>{round(project.budget)}</Td>
                                <Td>
                                    <UnorderedList>
                                        {project.subactivities.map((sub) => (
                                            <ListItem key={sub.id}>{sub.code}</ListItem>
                                        ))}

                                    </UnorderedList>
                                </Td>
                                <Td textAlign='center'>
                                <ButtonGroup size='sm'>
                                    <Button colorScheme='blue' onClick={()=>{handleDetailsProject(project.id)}}>Details</Button>
                                    {project.isActive}
                                    {project.isActive && (
                                        <React.Fragment>
                                            <Button colorScheme='green' onClick={()=> {handleEditProject(project.id)}}>Edit</Button>
                                            <Button colorScheme='yellow' onClick={() => {handleAddSubactivity(project.id)}}>Add subactivity</Button>
                                            <Button colorScheme='blackAlpha' onClick={()=>{handleCloseProject(project.id)}}>Close project</Button>
                                        </React.Fragment>
                                    )}

                                </ButtonGroup>
                            </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </MainLayout>
        </div>
    );
}

export default MyProjectCard;