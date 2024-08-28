import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";



export default function CampainResponse({user, campainId}){
    const navigate = useNavigate();

    function goToDetails(){
        navigate(`/campain/${campainId}/response/${user.uid}`);
    }

    return(<div className="video-list" onClick={goToDetails}>
        <div className="video-author">
            <p>{user.data.name}</p>
            <img src={user.data.pic} alt={user.data.name} />
            <Rating value={user.data.rating} readOnly></Rating>
        </div>
    </div>)
}