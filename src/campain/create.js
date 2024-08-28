import { Button, FormControl, TextField } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import { getUser } from "../Context";
import { createInterviews } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";


export function CreateCampain(){
    const [questions, setQuestions] = useState([ {id:0, value: ''} ])
    const [campainName, setCampainName] = useState('');
    const navigate = useNavigate();

    function addQuestion(){
        setQuestions([...questions, {id: questions.length}]);
    }
    function questionOrder(idx){
        const map = {
            0: "1st",
            1: "2nd",
            2: "3rd"
        }
        return map[idx] || `${idx + 1}th`
    }
 
    function updateTxtField(event){
        const q = questions.find(q => q.id === this);
        q.value = event.target.value;
        setQuestions([...questions]);
    }
    function setCampain(event){
        setCampainName(event.target.value);
    }
    async function submit() {
        const campain = { questions, name: campainName };
        const user = await getUser();
        const createdCampain = await createInterviews(campain, user);
        console.log('created', createdCampain);
        navigate(`/campain/${createdCampain.id}`);
    }

    return(<div className="add_question">
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={addQuestion}>Add Question</Button>
        <Button variant="contained" onClick={submit}>Create</Button>
        <TextField variant="outlined" label="Campain Name" onBlur={setCampain}></TextField>

        {questions.map( q =>  <FormControl fullWidth key={q.id}>
            <TextField variant="outlined" label={questionOrder(q.id) + ' question'} onBlur={updateTxtField.bind(q.id)}  />
        </FormControl> )}

    </div>);
}