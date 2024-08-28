
// import Button from "@mui/material/Button";
import { Outlet, Link, useNavigation, useNavigate } from "react-router-dom";
import './style.css';
import { useState } from "react";
import { getAuth } from 'firebase/auth';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { Avatar } from "@mui/material";
import { getUser } from "../Context";
import LoginScreen from "../campain/login";

export default function Root(){
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const navigation = useNavigation();
  // https://reactrouter.com/en/main/start/tutorial#global-pending-ui
  const loading = navigation.state === 'loading' ? <FontAwesomeIcon icon={faSpinner} className="fa-spin"/> : '';

  const rootScreen = window.location.pathname === '/' ? <div> <p>Welcome to the 1-way interview app</p> </div>
                                                      : '';

  setTimeout(()=> getUser().then(setUser), 0);

  async function logout(){
    await getUser();
    const auth = getAuth();
    await auth.signOut();
    navigate('/home') 
  }


  return (<>


    { user === null ? <LoginScreen onLoggedIn={() => window.location.reload() }/>
                    :
      <div>
        <div id="topbar">
          <Link to={`/home`}>Campains</Link>
          <Link to={`/create`}>Create New Campain</Link>
          <Link onClick={logout}>Logout</Link>

          <Avatar alt={user?.displayName} src={user?.photoURL}></Avatar>
        </div>

        {loading}
        {rootScreen}
        <Outlet></Outlet>
    </div>
    }

  </>);

}