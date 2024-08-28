import { Button } from "@mui/material";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

export default function LoginScreen({ onLoggedIn }) {
  async function loginToFireBase() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    onLoggedIn(user);
  }

  return (
    <>
      <div id="login">
        <div className="login_provider">
          <img src="/glogo.png" alt="Google logo"></img>
          <Button variant="text" onClick={loginToFireBase}> Login with Google </Button>
        </div>
        <p>Please login to use this app</p>

        <h2>Why Login?</h2>
        <p>With this app user is able to <a href="/create">create</a> interview campains</p>
        <p>and at a later time view responses to those campains.</p>
      </div>
    </>
  );
}
