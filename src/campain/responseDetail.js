import { useLoaderData, useParams } from "react-router-dom";
import { campainResponseDetail, getCampainQuestions, setCampainResponseStars } from "../firebase/firestore";
import { getVideoUrl } from "../firebase/storage";
import { getUser } from "../Context";
import { Rating } from "@mui/material";
import { useRef, useState } from "react";

export async function ResponseDetailLoader({params}){
    const {id, uid} = params;
    await getUser(); //page refresh bug fix
    const user = await campainResponseDetail(id, uid);
    const fileNames = Object.keys(user.storageFileNames).map(k => user.storageFileNames[k]);
    const urlPromises = fileNames.map(async (fn) => await getVideoUrl(fn));
    const urls = await Promise.all(urlPromises);

    const questions = await getCampainQuestions(id);

    return { user, urls, questions};
}

export default function ResponseDetail(){
    const data = useLoaderData();
    const {id, uid} = useParams();
    const [rating, setRating ] = useState(data.user.rating)


    async function ratingChanged(value){
        await setCampainResponseStars(id, uid, value);
        setRating(value)
    }

    async function videoHover(ev){
        try{
            await ev.currentTarget.play();
        }catch(error){console.log(error)}
    }
    async function videoHoverOut(ev){
        try{
            await ev.currentTarget.pause();
        }catch(error){console.log(error);}
    }
    
    return(<div className="video-list" >
        <div className="video-author">
            <p>{data.user.name}</p>
            <img src={data.user.pic} alt={data.user.name} />
            <Rating value={rating} onChange={(ev, value) => ratingChanged(value) }></Rating>
        </div>
        { data.urls.map((src, idx) => <div className="video-list_detail">
            <p>{data.questions[idx].value}</p>
            <video src={src} controls onMouseLeave={videoHoverOut} onMouseEnter={videoHover}></video>
        </div>)}

        </div>)
}