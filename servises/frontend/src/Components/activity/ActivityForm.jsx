import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Select, Text, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate , } from "react-router-dom";
import { api } from "../../api";
import MainLayout from "../layout/MainLayout";

function ActivityForm(props) {

    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()

    const editable = props.editable

    const projects = props.projects

    const [formHeader, setFromHeader] = useState("Submit your activity")

    const today = new Date()
    const date = today.getFullYear() + '-' + ((today.getMonth() + 1)<10? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + today.getDate();

    const [entry, setEntry] = useState()
    const [projectCode, setProjectCode] = useState()
    const [subActivityName, setSubActivityName] = useState()
    const [activityDate, setActivityDate] = useState(date)
    const [activityTime, setActivityTime] = useState(0)
    const [activityDescription, setActivityDescription] = useState('')

    const [possibleSubactivities, setPossibleSubactivities] = useState([])


    const [ivalidProjectCode, setIvalidProjectCode] = useState(false)
    const [ivalidActivityDate, setIvalidActivityDate] = useState(false)

    useEffect(() => {
        if(location.pathname === "/newActivity"){
            setFromHeader("Submit your activity")
        }
        else if(editable){
            setFromHeader("Edit your activity")
        }
        else{
            setFromHeader("Activity details")
        }
        if (props.entry !== undefined) {
            let entry = props.entry
            setEntry(entry)
            setProjectCode(entry.project_id)
            setSubActivityName(entry.subactivity_id)
            setActivityDate(entry.date)
            setActivityDescription(entry.description)
            setActivityTime(parseInt(entry.timeSubmitted))

        }
    },[props.entry, location, editable])

    const handleProjectCodeChange = (e) => {
        setProjectCode(e.target.value)
        if(e.target.value !== '')
        setPossibleSubactivities(projects.filter((project) => { return  parseInt(project.id) === parseInt(e.target.value)})[0].subactivities)
        else
        setPossibleSubactivities([])
    }

    const handleSubActivityNameChange = (e) => {
        setSubActivityName(e.target.value)
    }

    const handleActivityDateChange = (e) => {
        setActivityDate(e.target.value)
    }

    const handleActivityTimeChange = (e) => {
        setActivityTime(e.target.value)
    }
    const handleActivityDescriptionChange = (e) => {
        setActivityDescription(e.target.value)
    }
    const hasLeadingZero = (n) => {
        return /^0[0-9].*$/.test(n.toString())
    }

    const checkValidation = async () => {
        var isCorrect = true
        if (projectCode === undefined || projectCode === '') {
            isCorrect = false
            toast({
                title: `Choose project`,
                status: 'error'
            })
        }
        if (activityDate === undefined || activityDate === ''){
            isCorrect = false
            toast({
                title: `Enter proper date`,
                status: 'error'
            })
        }
        if (hasLeadingZero(activityTime)) {
            isCorrect = false
            toast({
                title: `Delete leading 0 form time`,
                status: 'error'
            })
        }
        if (parseInt(activityTime) > 900000) {
            isCorrect = false
            toast({
                title: `To big time man`,
                status: 'error'
            })
        }
        return isCorrect
    }
    const handleSubmit = async () => {
        let action
        if (location.pathname === '/newActivity') {
            action = 'create'
        }
        else if(props.editable===true){
            action = 'edit'
        }

        if(await checkValidation()){
            let payload = {
                date: activityDate,
                timeSubmitted: parseInt(activityTime),
                description: activityDescription,
                project_id: projectCode,
                subactivity_id: subActivityName
            }
            if(action === 'edit'){
                payload.id = entry.id
                payload.version = entry.version 
            }
            if(action === 'create'){
                api.createActivity(props.userId, payload).then((response) => {
                    if (response.status === 200) {
                        toast({
                            title: `Activity added`,
                            status: 'success'
                        })
                        navigate(-1)
                    }
                }).catch((error) => {
                    toast({
                        title: `Something gone wrong ${error.response.data.detail}`,
                        status: 'error'
                    })
                })
            }
            if (action === 'edit'){
                api.updateActivity(props.userId, payload).then((response) => {
                    if (response.status === 200) {
                        toast({
                            title: `Activity updated`,
                            status: 'success'
                        })
                        navigate(-1)
                    }
                }).catch((error) => {
                    toast({
                        title: `Something gone wrong ${error.response.data.detail}`,
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
                        <FormControl isInvalid={ivalidProjectCode} isRequired>
                            <FormLabel htmlFor="project-code">Project code</FormLabel>
                            <Select value={projectCode} onChange={handleProjectCodeChange} disabled={!editable}>
                                <option value={null}></option>
                                {projects && projects.map((project) => (
                                    <option value={project.id}>{project.code}</option>
                                ))}
                            </Select>

                            {!ivalidProjectCode ? (
                                <FormHelperText>
                                    Choose project code
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Project name is required.</FormErrorMessage>
                            )}

                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="subactivity-name">Subactivity name</FormLabel>
                            <Select id="subactivity-name" value={subActivityName} onChange={handleSubActivityNameChange} disabled={!editable}>
                                <option value={null}></option>
                                {possibleSubactivities && possibleSubactivities.map((sub) => (
                                    <option value={sub.id}>{sub.code}</option>
                                ))}
                            </Select>
                            <FormHelperText>
                                Choose subactivity code
                            </FormHelperText>
                        </FormControl>
                    </HStack>
                    <HStack pb='4'>

                        <FormControl isInvalid={ivalidActivityDate}>
                            <FormLabel htmlFor="activity-date">Activity date</FormLabel>
                            <Input id="activity-date" type="date" value={activityDate} onChange={handleActivityDateChange} disabled={!editable}/>

                        </FormControl>
                        <FormControl>
                        <FormLabel htmlFor="activity-time">Activity time (min)</FormLabel>
                            <Input id="activity-time" type='number' min='0' max='90000000' value={activityTime} onChange={handleActivityTimeChange} disabled={!editable}/>
                        </FormControl>
                    </HStack>
                    <HStack pb='4'>

                        <FormControl>
                            <FormLabel htmlFor="activity-description">Activity description</FormLabel>
                            <Textarea rows={8} id="activity-description" value={activityDescription} onChange={handleActivityDescriptionChange} placeholder="Activity description..." disabled={!editable}/>
                        </FormControl>
                    </HStack>
                    <HStack justifyContent='flex-end' pb='4'>
                        <Button colorScheme='yellow' onClick={() => navigate(-1)}>Back</Button>
                        {editable && (
                            <Button colorScheme='green' onClick={handleSubmit}>Submit</Button>
                        )}
                    </HStack>
                </Box>
            </MainLayout>
        </div>
    );
}

export default ActivityForm;