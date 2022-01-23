import { Heading, HStack, ListItem, Table, TableCaption, Tbody, Td, Th, Thead, Tr, UnorderedList } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../api";

import MainLayout from "../layout/MainLayout";

function AllProjectCard() {
    const [allProjects, setAllProjects] = useState([])
    useEffect(() => {
        api.getProjects().then((response) => {
            setAllProjects(response.data)
        })
    }, [])

    const round = (v) => {
        return Math.round(v / 60 * 100) / 100
    }
    return (
        <div className="allProjectCard">
            <MainLayout>
                <HStack justifyContent='space-between' pb='2'>
                    <Heading align='left' fontSize={'4xl'}>Open projects</Heading>
                </HStack>

                <Table size='md' variant='striped'>
                    <TableCaption>Open Projects</TableCaption>

                    <Thead>
                        <Tr>
                            <Th>Project name</Th>
                            <Th>Project code</Th>
                            <Th>Manager</Th>
                            <Th isNumeric>Budget</Th>
                            <Th>Subactivities codes</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {allProjects.map((project) => (
                            <Tr key={project.id}>
                                <Td>{project.name}</Td>
                                <Td>{project.code}</Td>
                                <Td>{project.owner.name + ' ' + project.owner.surname}</Td>
                                <Td isNumeric>{round(project.budget) }</Td>
                                <Td>
                                    <UnorderedList>
                                        {project.subactivities.map((sub) => (
                                            <ListItem key={sub.id}>{sub.code}</ListItem>
                                        ))}

                                    </UnorderedList>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </MainLayout>
        </div>
    );
}

export default AllProjectCard;