import { Button, ButtonGroup, Heading, HStack, Select, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api";
import MainLayout from "../layout/MainLayout";

function ActivityCard(props) {
    var today = new Date()
    // const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const location = useLocation()
    const navigate = useNavigate()
    const toast = useToast()

    const months = useMemo(() => ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ], [])
    const years = Array(25).fill(today.getFullYear()).map((v, i) => v - i);

    const [userId, setUserId] = useState(0)
    const [sumOfMinutes, setSumOfMinutes] = useState(0)
    const [myRaports, setMyRaports] = useState([])
    const [raport, setRaport] = useState(0)
    const [selectedEntries, setSelectedEntries] = useState([])

    const [selectedDay, setSelectedDay] = useState(1)
    const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()])
    const [selectedYear, setSelectedYear] = useState(today.getFullYear())
    const [selectedPeriod, setSelectedPeriod] = useState(selectedMonth + " " + selectedYear.toString())
    const [possibleDays, setPossibleDays] = useState([])

    const [refresh, setRefresh] = useState(false)

    const handleChangeDay = (e) => {
        setSelectedDay(e.target.value)
    }
    const handleChangeMonth = (e) => {
        setSelectedMonth(e.target.value)
        setSelectedPeriod(e.target.value + " " + selectedYear.toString())
    }
    const handleChangeYear = (e) => {
        setSelectedYear(e.target.value)
        setSelectedPeriod(selectedMonth + " " + e.target.value)
    }


    useEffect(() => {
        var t = new Date(selectedYear, months.findIndex((label) => selectedMonth === label) + 1, 0)
        setPossibleDays(Array(t.getDate()).fill(0).map((v, i) => i + 1))
        api.getMe().then((response) => {
            setUserId(response.data.UserId)
        })
        api.getUserRaports(userId).then((response) => {
            setMyRaports(response.data)
            var raport = response.data.filter((raport) => { return raport.year == selectedYear && raport.month == monthNumber(selectedMonth) })[0]
            if (raport) {
                setRaport(raport)
                calculateSumOfMinutes(raport.entries)
                setSelectedEntries(raport.entries)
            }
            else {
                setRaport(null)
                setSumOfMinutes(0)
                setSelectedEntries([])
            }
        })
    }, [selectedMonth, selectedYear, months, userId, refresh])

    const monthNumber = (month) => {
        return months.findIndex((label) => month === label) + 1
    }

    const calculateSumOfMinutes = (raport_e) => {
        var sum = 0
        raport_e.forEach(element => {
            sum += parseInt(element.timeSubmitted)
        });
        setSumOfMinutes(sum)
    }

    const handleSelectDay = () => {
        setSelectedPeriod(selectedDay + " " + selectedMonth + " " + selectedYear.toString())
        var raport = myRaports.filter((raport) => { return raport.year == selectedYear && raport.month == monthNumber(selectedMonth) })[0]
        if (raport) {
            let raport_entries = raport.entries.filter((entry) => { return parseInt(entry.date.slice(8, 10)) == selectedDay })
            calculateSumOfMinutes(raport_entries)
            setSelectedEntries(raport_entries)
        }
        else {
            setSumOfMinutes(0)
            setSelectedEntries([])
        }
    }
    const handleCreateActivity = () => {
        navigate('/newActivity')
    }
    const handleSubmitPeriod = () => {
        if (raport) {
            api.submitRaport(raport.id).then((response) => {
                if (response.status === 200) {
                    toast({
                        title: `Raport submited`,
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
        else {
            toast({
                title: `Something gone wrong: `,
                status: 'error'
            })
        }
    }

    const handleDisplay = (id) => {
        navigate(`/displayActivity/${id}`)
    }

    const handleEdit = (id) => {
        navigate(`/editActivity/${id}`)
    }

    const handleDelete = (id) => {
        api.deleteActivity(id).then((response) => {
            if (response.status === 200) {
                toast({
                    title: `Activity deleted`,
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
    return (
        <div className="activityCard">
            <MainLayout>
                <HStack justifyContent='space-between' pb='2'>
                    <Heading align='left' fontSize={'4xl'}>Your activities for: {selectedPeriod}</Heading>
                    <HStack spacing={4} alignItems='flex-end'>
                        <Select width='120px' onChange={handleChangeMonth}>
                            {months.map((label) => (
                                <option>{label}</option>
                            ))}
                        </Select>
                        <Select width='100px' onChange={handleChangeYear}>
                            {years.map((label) => (
                                <option>{label}</option>
                            ))}
                        </Select>
                        <Button width='120px' onClick={handleSubmitPeriod}>Submit Period</Button>

                    </HStack>
                </HStack>
                <HStack justifyContent='space-between'>
                    {((raport && !(raport.isSubmitted))|| (!raport)) &&  (
                        <Button onClick={handleCreateActivity}>Add new</Button>
                    )}
                    <Text>Sum of minutes: {sumOfMinutes}</Text>
                    <HStack spacing={4}>
                        <Select width='100px' onChange={handleChangeDay}>
                            {possibleDays.map((label) => (
                                <option>{label}</option>
                            ))}
                        </Select>
                        <Button width='120px' onClick={handleSelectDay}>Show day</Button>
                    </HStack>
                </HStack>
                <Table size='md' variant='striped'>
                    <TableCaption>Your activities</TableCaption>

                    <Thead>
                        <Tr>
                            <Th>Project code</Th>
                            <Th>Date</Th>
                            <Th>Subactivity code</Th>
                            <Th isNumeric>Submited time</Th>
                            <Th textAlign='center'>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {selectedEntries && selectedEntries.map((entry) =>
                        (
                            <Tr key={entry.id}>
                                <Td>{entry.project.code}</Td>
                                <Td>{entry.date}</Td>
                                <Td>{entry.subactivity_id && entry.project.subactivities.filter((sub) => { return sub.id == entry.subactivity_id })[0].code}</Td>
                                <Td isNumeric>{entry.timeSubmitted}</Td>
                                <Td textAlign='center'>
                                    <ButtonGroup size='sm'>
                                        <Button colorScheme='blue' onClick={() => { handleDisplay(entry.id) }}>Details</Button>
                                        {raport && !(raport.isSubmitted || !entry.project.isActive) && (
                                            <React.Fragment>
                                                <Button colorScheme='green' onClick={() => { handleEdit(entry.id) }}>Edit</Button>
                                                <Button colorScheme='red' onClick={() => { handleDelete(entry.id) }}>Delete</Button>
                                            </React.Fragment>
                                        )}

                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        )
                        )}
                    </Tbody>
                </Table>
                {/* <HStack>
                    <Button>Submit month</Button>
                </HStack> */}
            </MainLayout>
        </div>
    );
}

export default ActivityCard;