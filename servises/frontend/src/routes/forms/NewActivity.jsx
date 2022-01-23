import { useEffect, useState } from "react"
import { api } from "../../api";
import ActivityForm from "../../Components/activity/ActivityForm"

function NewActivity() {

    const [userId, setUserId] = useState(0)
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        async function fetchApi() {
            await api.getMe().then((response) => {
                setUserId(response.data.UserId)
            })
        }
        api.getProjects().then((response) => {
            setProjects(response.data.filter((project) => {return project.isActive}))
        })
        fetchApi()
    }, [])
    
    return (
        
        <div className="newActivity">
            <ActivityForm userId={userId} editable={true} projects={projects}/>
        </div>
    );
}

export default NewActivity;