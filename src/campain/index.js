import { useLoaderData, Link, useParams  } from "react-router-dom";
import { campainDetails } from "../firebase/firestore";
import CampainResponse from "./response";
import { getUser } from "../Context";
import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";


export async function CampainIndexLoader({params}){
    await getUser();
    const res = await campainDetails(params.id)
    return res;
}

export default function CampainIndex (){
    const data = useLoaderData();
    const { id } = useParams();
    
    function copyToClipBoard(){
        const path = `${window.location.origin}/answer/${id}/0`
        navigator.clipboard.writeText(path);
    }
    
    return (<>

        <Link to={`/answer/${id}/0`}>Take the interview</Link>
        <Tooltip title="Copy to clip board the link to take this assessment.">
            <IconButton onClick={copyToClipBoard}>
                <ContentCopy className="copy-to-clipboard" aria-label="Copy to clip board" ></ContentCopy>
            </IconButton>
        </Tooltip>

        <p>{data.responses.length} Response{data.responses.length>1 ? 's': '' }</p>
        {data.responses.map( d => <CampainResponse user={d} campainId={id} key={d.uid} />)}

    </>
    );
}