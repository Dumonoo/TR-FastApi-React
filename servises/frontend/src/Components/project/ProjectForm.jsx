import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api";
import MainLayout from "../layout/MainLayout";

function ProjectForm(props) {
    const location = useLocation()
    const navigate = useNavigate()

    const editable = props.editable
    const toast = useToast()

    const [projectName, setProjectName] = useState('')
    const [projectCode, setProjectCode] = useState('')
    const [projectBudget, setProjectBudget] = useState(0)
    const [projectDescription, setProjectDescription] = useState('')

    const [formHeader, setFromHeader] = useState('Create new project')


    const [invalidProjectName, setInvalidProjectName] = useState(false)
    const [invalidProjectCode, setInvalidProjectCode] = useState(false)
    const [invalidProjectBudget, setInvalidProjectBudget] = useState(false)

    const [nameError, setNameError] = useState('')
    const [codeError, setCodeError] = useState('')
    const [budgetError, setBudgetError] = useState('')


    useEffect(() => {
        if(location.pathname === "/newProject"){
            setFromHeader("Create new project")
        }
        else if(editable){
            setFromHeader("Edit project")
        }
        else{
            setFromHeader("Project details")
        }
        if (props.project !== undefined) {
            let project = props.project
            setProjectName(project.name)
            setProjectCode(project.code)
            setProjectBudget(project.budget/60)
            setProjectDescription(project.description)
        }
    }, [props.project, location.pathname, editable])

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value)
    }

    const handleProjectCodeChange = (e) => {
        setProjectCode(e.target.value)
    }

    const handleProjectBudgetChange = (e) => {
        setProjectBudget(e.target.value)
    }

    const handleProjectDescriptionChange = (e) => {
        setProjectDescription(e.target.value)
    }

    const hasWhiteSpace = (s) => {
        return /\s/g.test(s)
    }

    const hasLeadingZero = (n) => {
        return /^0[0-9].*$/.test(n.toString())
    }

    const checkValidation = async () => {
        var isCorrect = true
        setInvalidProjectName(false)
        setInvalidProjectCode(false)
        setInvalidProjectBudget(false)
        setNameError("")
        setCodeError("")
        setBudgetError("")


        if (projectName === '') {
            isCorrect = false
            setInvalidProjectName(true)
            setNameError("Project name is required.")
        }
        if (projectCode === '') {
            isCorrect = false
            setInvalidProjectCode(true)
            setCodeError("Project code is required.")
        }
        if (hasWhiteSpace(projectCode)) {
            isCorrect = false
            setInvalidProjectCode(true)
            setCodeError("Project code cannot have white spaces")
        }
        if (hasLeadingZero(projectBudget)) {
            isCorrect = false
            setInvalidProjectBudget(true)
            setBudgetError("Delete leading zeroes")
        }
        if (projectBudget === '') {
            isCorrect = false
            setInvalidProjectBudget(true)
            setBudgetError("Dont leave budget empty")
        }
        if (parseInt(projectBudget) <= 0){
            isCorrect = false
            setInvalidProjectBudget(true)
            setBudgetError("Wrong budget man")
        }
        if (parseInt(projectBudget) > 100000){
            isCorrect = false
            setInvalidProjectBudget(true)
            setBudgetError("Buget too big")
        }

        return isCorrect

    }

    const handleSubmit = async () => {

        let action
        if (location.pathname === '/newProject') {
            action = 'create'
        }
        else if(props.editable===true){
            action = 'edit'
        }

        if (await checkValidation()) {
            let payload = {
                code: projectCode,
                name: projectName,
                budget: projectBudget * 60,
                description: projectDescription
            }
            if(action === 'edit'){
                   payload.version = props.project.version 
            }

            if (action === 'create') {
                api.createProject(props.userId, payload).then((response) => {
                    if (response.status === 200) {
                        toast({
                            title: `Project: ${projectName} created`,
                            status: 'success'
                        })
                        navigate(-1)
                    }
                }).catch((error) => {
                    setInvalidProjectCode(true)
                    setCodeError(error.response.data.detail)
                })
            }
            if (action === 'edit'){
                api.updateProject(props.project.id, payload).then((response) => {
                    if (response.status === 200) {
                        toast({
                            title: `Project: ${projectName} edited`,
                            status: 'success'
                        })
                        navigate(-1)
                    }
                }).catch((error) => {
                    toast({
                        title: `${error.response.data.detail}`,
                        status: 'error'
                    })
                })
            }


        }

    }
    return (
        <div className="projectForm">
            <MainLayout>
                <Box width={['100%', '100%', '100%', '60%']} >
                    <HStack pb='4'>
                        <Heading align='left' fontSize={'4xl'}>{formHeader}</Heading>
                    </HStack>
                    <HStack pb='4'>
                        <FormControl isInvalid={invalidProjectName} isRequired>
                            <FormLabel htmlFor="project-name">Project name</FormLabel>
                            <Input id="project-name" type="text" value={projectName} onChange={handleProjectNameChange} placeholder="Project name" disabled={!editable} />
                            {!invalidProjectName ? (
                                <FormHelperText>
                                    Enter the project name.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>{nameError}</FormErrorMessage>
                            )}

                        </FormControl>

                        <FormControl isInvalid={invalidProjectCode} isRequired>
                            <FormLabel htmlFor="project-code">Project code</FormLabel>
                            <Input id="project-name" type="text" value={projectCode} onChange={handleProjectCodeChange} placeholder="Project name" disabled={!editable} />
                            {!invalidProjectCode ? (
                                <FormHelperText>
                                    Enter proper project code
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>{codeError}</FormErrorMessage>
                            )}

                        </FormControl>
                    </HStack>
                    <HStack pb='4'>
                        <FormControl isInvalid={invalidProjectBudget} isRequired>
                            <FormLabel htmlFor="project-budget">Project budget in hours</FormLabel>
                            <Input id="project-budget" type="number" value={projectBudget} onChange={handleProjectBudgetChange} min={0} max={900000} disabled={!editable} />
                            {!invalidProjectBudget ? (
                                <FormHelperText>
                                    Enter buget for projects in hours
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>{budgetError}</FormErrorMessage>
                            )}
                        </FormControl>
                    </HStack>
                    <HStack pb='4'>

                        <FormControl>
                            <FormLabel htmlFor="project-description">Project description</FormLabel>
                            <Textarea rows={8} id="project-description" value={projectDescription} onChange={handleProjectDescriptionChange} placeholder="Project description..." disabled={!editable} />
                        </FormControl>
                    </HStack>
                    <HStack justifyContent='flex-end' pb='4'>
                        <Button colorScheme='yellow' onClick={() => navigate(-1)}>Back</Button>
                        {editable && (<Button colorScheme='green' onClick={() => {
                            checkValidation()
                            handleSubmit()
                        }}>Submit</Button>)}

                    </HStack>
                </Box>


            </MainLayout>
        </div>
    );
}

export default ProjectForm;