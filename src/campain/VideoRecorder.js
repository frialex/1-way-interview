import { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { Button, ButtonGroup } from "@mui/material";
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { saveVideo } from "../firebase/storage";
import { updateInterviewResponses } from "../firebase/firestore";

export default function VideoRecorder({onFinalize, campainId, questionId, user}){
    const stream = useRef(null);
    const recorder = useRef(null);
    const vidRef = useRef(null);
    const blobRef = useRef(null);
    const fileNameRef = useRef(null);
    const [initializing, setInitializing] = useState(true)
    const [isRecording, setIsRecording] = useState(false);
    const [isInReview, setIsInReview] = useState(false);
    const [isuploading, setIsUploading] = useState(false);

    useEffect( () => {
        startCamera();
        return () => { stream.current?.getTracks().forEach(track => track.stop()) }
    }, [])


    async function startCamera(){
        const str = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true })
        stream.current = str;
        setVideoToRecord();
        setInitializing(false);
        setIsInReview(false);

        recorder.current = new MediaRecorder(str);
        recorder.current.ondataavailable = recordingDone;
    }
    function setVideoToRecord(){
        vidRef.current.srcObject = stream.current;
        vidRef.current.muted = true;
        vidRef.current.autoplay = true;
        vidRef.current.controls = false;
    }
    function recordingDone(e){
        const { data } = e
        blobRef.current = data;
        console.log(`Recording of size = ${data.size}`);
        if(data.size === 0){
            // ERR_REQUEST_RANGE_NOT_SATISFIABLE
            alert('Browser error. Please use a different browser or update your browser to latest version');
        }
        const url = URL.createObjectURL(data)
        
        vidRef.current.srcObject = null;
        vidRef.current.src = url;
        vidRef.current.muted = false;
        vidRef.current.controls = true;

    }

    function startRecording(){
        if(recorder.current.state === 'recording') recorder.current.stop();
        setVideoToRecord();
        recorder.current.start();
        setIsRecording(true);
    }
    function stopRecording(){
        recorder.current.stop();
        setIsRecording(false);
        setIsInReview(true);
    }

    async function uploadRecording(){
        //1) upload video to storage
        setIsUploading(true);
        const data = blobRef.current;
        const fileName = `${campainId}/${user.uid}/${questionId}.webm`;
        fileNameRef.current = fileName;
        const task = saveVideo(data, data.type, fileName)
        const res = await task;

        await updateInterviewResponses(fileNameRef.current,questionId,campainId,user);

        onFinalize();
    }

    const recordButton = !isRecording && !initializing && !isInReview
         && <Button variant="contained" startIcon={<EmergencyRecordingIcon />} onClick={startRecording}>Start Recording</Button>

    return (
        <div className="video">
            
            { initializing && <FontAwesomeIcon icon={faSpinner} className="fa-spin"/> }
            { isuploading && <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> }            

            <video ref={vidRef} className={isRecording ? 'recording': ''}></video> 

            {recordButton}
            { isRecording && <Button variant="contained" startIcon={<StopCircleIcon />} onClick={stopRecording}>Stop Recording</Button>}
            { isInReview && <ButtonGroup>
                                <Button variant="contained" onClick={uploadRecording} startIcon={<CheckCircleIcon />}>Accept</Button> 
                                <Button onClick={startCamera}>Try Again</Button> 
                            </ButtonGroup>}
        </div>
    )
}