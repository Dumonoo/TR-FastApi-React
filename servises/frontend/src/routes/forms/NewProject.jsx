import { useEffect, useState } from "react";
import { api } from "../../api";
import ProjectForm from "../../Components/project/ProjectForm";

function NewProject() {
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        async function fetchApi() {
            await api.getMe().then((response) => {
                setUserId(response.data.UserId)
            })
        }
        fetchApi()
    },[])
    
    return ( 
        <div className="newProject">
            <ProjectForm userId={userId} editable={true}/>
        </div>
     );
}

export default NewProject;