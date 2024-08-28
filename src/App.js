import { React} from 'react';
import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import { initializeApp } from 'firebase/app';

import routes from './routes';


const firebaseConfig = {
  apiKey: "AIzaSyDHRt8QjJnMMQ-jal5Xrj-QD5Y2WFj9XoM",
  authDomain: "right-hire-solutions.firebaseapp.com",
  databaseURL: "https://right-hire-solutions-default-rtdb.firebaseio.com",
  projectId: "right-hire-solutions",
  storageBucket: "right-hire-solutions.appspot.com",
  messagingSenderId: "1091405334747",
  appId: "1:1091405334747:web:33d69a1eded2eb343464fe",
  measurementId: "G-5L85N5DKCJ"
};


//This has to be done here (not in index.js) and before createBrowserRouter is executed
//so that page refresh doesn't thrown [default] app error from firebase
const app = initializeApp(firebaseConfig);



const router = createBrowserRouter(routes)




function App() {

  return <>
      <RouterProvider router={router}></RouterProvider>
  </>

}

export default App;
