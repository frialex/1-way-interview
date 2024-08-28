import { useState, useEffect } from "react"
import { Link, useLoaderData } from 'react-router-dom';
import { getUser } from "../Context";
import { getUserCampains } from '../firebase/firestore'
import { Card, CardContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


export async function HomeLoader(){
  const user = await getUser();
  return user;
}

export default function Home(){
  const user = useLoaderData();
  const [campains, setCampains] = useState([])
  const [isLoading, setIsLoading ] = useState(true);

  useEffect(()=> { if(user) getUserCampains(user.uid).then((campain) => {
      setCampains(campain)
      setIsLoading(false); 
    }) 
  }, []);


  return (<>

    {isLoading && <FontAwesomeIcon icon={faSpinner} className="fa-spin"/>}
    {campains.length === 0 && !isLoading && <p>You have no campains yet.</p>}
    {campains.map(c => 
      <Card key={c.name} variant="outlined">
        <CardContent>
          <Link to={`/campain/${c.id}`}> {c.name} </Link> 
        </CardContent>
       </Card>
    )}

  </>);

}