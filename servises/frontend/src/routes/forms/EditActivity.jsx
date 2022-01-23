import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { api } from "../../api";
import ActivityForm from "../../Components/activity/ActivityForm"

function EditActivity() {

    const [userId, setUserId] = useState(0)
    const [projects, setProjects] = useState(null)
    const [entry, setEntry] = useState()
    const params = useParams()

    useEffect(() => {
        async function fetchApi() {
            await api.getMe().then((response) => {
                setUserId(response.data.UserId)
            })
        }
        api.getProjects().then((response) => {
            setProjects(response.data.filter((project) => {return project.isActive}))
        })
        api.getEntry(params.id).then((response) => {
            setEntry(response.data)
        })
        fetchApi()
    }, [])
    
    return (
        
        <div className="newActivity">
            <ActivityForm userId={userId} editable={true} projects={projects} entry={entry}/>
        </div>
    );
}

export default EditActivity;