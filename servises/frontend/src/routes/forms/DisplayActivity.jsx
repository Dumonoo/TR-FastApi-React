import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { api } from "../../api";
import ActivityForm from "../../Components/activity/ActivityForm"

function DisplayActivity() {

    const params = useParams()
    const [userId, setUserId] = useState(0)
    const [projects, setProjects] = useState(null)
    const [entry, setEntry] = useState()

    useEffect(() => {
        async function fetchApi() {
            await api.getMe().then((response) => {
                setUserId(response.data.UserId)
            })
        }
        api.getProjects().then((response) => {
            setProjects(response.data)
        })
        api.getEntry(params.id).then((response) => {
            setEntry(response.data)
        })
        fetchApi()
    }, [])
    
    return (
        
        <div className="newActivity">
            <ActivityForm userId={userId} editable={false} projects={projects} entry={entry}/>
        </div>
    );
}

export default DisplayActivity;