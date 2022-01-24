import { Box, useColorModeValue, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api";
import HeaderNav from "./HeaderNav";
import Navbar from "./Navbar";

function Layout(props) {
    const navigate = useNavigate()

    const [userStatus, setUserStatus] = useState(false)
    const [username, setUsername] = useState('')

    const toast = useToast()

    const handleLogin = () => {
        navigate('/login')
    }
    const handleLogout = () => {
        api.logout()
        setUserStatus(false)
        setUsername('')
        navigate('/')
        toast({
            title: "Log out",
            status: "success",
        })
    }
    useEffect(() => {
        api.getMe().then((response) => {
            setUserStatus(response.data.Logged)
            setUsername(response.data.User)
        })
        if(!userStatus){
            navigate("/main")
        }
    }, [userStatus, navigate])
    return (
        <div className="layout">
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <Navbar userStat={userStatus} userName={username}/>
                <HeaderNav login={handleLogin} logout={handleLogout} userStat={userStatus} userName={username}/>
                <Box ml={{ base: 0, md: 60 }} p="4" minW='30%'>
                    {props.children}
                </Box>
            </Box>
        </div>
    );
}

export default Layout;