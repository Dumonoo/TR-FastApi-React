import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../../api";
import ProjectForm from "../../Components/project/ProjectForm";

function EditProject() {
    const [userId, setUserId] = useState(0)
    const [project, setProject] = useState(undefined)
    const params = useParams()

    useEffect(() => {
        api.getMe().then((response) => {
            setUserId(response.data.UserId)
        })
        api.getProject(params.id).then((response) => {
            setProject(response.data)

        })
        
    },[params.id])

    return ( 
        <div className="editProject">
            <ProjectForm userId={userId} project={project} editable={true}/>
        </div>
     );
}

export default EditProject;