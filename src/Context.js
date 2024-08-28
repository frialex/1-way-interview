import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';


// export function getUser() { return JSON.parse(localStorage.getItem('user')); }

export async function getUser(){
    const auth = getAuth();
    //https://firebase.google.com/docs/auth/web/auth-state-persistence
    await setPersistence(auth, browserLocalPersistence);
    const cu = auth.currentUser;
    // debugger;
    return cu;
}
