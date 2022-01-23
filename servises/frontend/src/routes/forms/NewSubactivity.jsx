import { useParams } from "react-router-dom";
import SubActivityForm from "../../Components/project/SubActivityForm";

function NewSubactivity() {
    const params = useParams()
    return ( 
        <div className="newSubactivity">
            <SubActivityForm id={params.id}/>
        </div>
     );
}

export default NewSubactivity;