import { useLoaderData, Link, useParams, useNavigate  } from "react-router-dom";
import { campainDetails } from "../firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import VideoRecorder from './VideoRecorder'
import { getUser } from "../Context";

export async function QuestionLoader({params}){
    const user = await getUser();
    if(user){
        return await campainDetails(params.id);
    } else {
        return null;
    }
}

export default function Answer(){
    const [data, setData] = useState(useLoaderData())
    const { id, number } = useParams();
    const [ready, setReady] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { getUser().then((u) => {
        setUser(u)
    }); },[])

    let question = {}
    if(user && data) { question = data.questions[parseInt(number)]; }

    function onFinalize(){
        const num = parseInt(number);
        const next = num + 1;
        if(next < data.questions.length){
            navigate(`/answer/${id}/${next}`)
            setReady(false)
        } else {
            navigate('/done')
        }
    }

    return( <>

        { user && 
            <div className="answer">
                <p>{question.value}</p>
                { !ready && <Button variant="contained" onClick={() => setReady(true)}>Answer</Button> }
                { ready && <VideoRecorder onFinalize={onFinalize} campainId={id} questionId={number} user={user} />}
            </div>
        }

    </>
        
    )
}