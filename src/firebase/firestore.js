import { doc, getDoc, getDocs, getFirestore, collection, setDoc } from 'firebase/firestore';


export async function getUserCampains(uid){
  const db = getFirestore();
  const cRef = collection(db, "Users", uid, "Interviews" );
  const qres = await getDocs(cRef);
  const res = qres?.docs.map( d => d.data());
  return res;
}

export async function campainDetails(campainId){
    const db = getFirestore();
    const interview = (await getDoc(doc(db, 'Interviews', campainId))).data();
    const responses = await campainResponses(campainId)

    return {...interview, responses }
}
export async function getCampainQuestions(campainId){
    const db = getFirestore();
    const ref = doc(db, "Interviews", campainId);
    const qdoc = await getDoc(ref);
    return qdoc.data().questions;
}

export async function campainResponses(campainId){
    const db = getFirestore();
    const cref = collection(db, "Interviews", campainId, "Responses");
    const qres = await getDocs(cref);
    return qres?.docs.map(d => { return { uid: d.id, data: d.data() }})

}
export async function campainResponseDetail(campainId, userId){
    const db = getFirestore();
    const ref = doc(db, "Interviews", campainId, "Responses", userId);
    const qres = await getDoc(ref);
    return qres.data();
}
export async function setCampainResponseStars(campainId, userId, value){
    const db = getFirestore();
    const ref = doc(db, "Interviews", campainId, "Responses", userId)
    const docObj = await getDoc(ref);
    const data = docObj.data();
    data.rating = value;
    await setDoc(ref, data);
}

export async function updateInterviewResponses(storagePath, num, campainId, user){
    let videoData = {};
    const db = getFirestore();
    const refpath = doc(db, "Interviews", campainId, "Responses", user.uid);
    const videoDoc = await getDoc(refpath);

    if(videoDoc.exists()){
        videoData = videoDoc.data();
    } else {
        videoData.name = user.displayName;
        videoData.pic = user.photoURL;
        videoData.storageFileNames = { };
    }

    videoData.storageFileNames[num] = storagePath;

    await setDoc(refpath, videoData);

}

export async function createInterviews(data, user){
    const campain = { ...data, id: generateRandomId(user.uid), ownerId: user.uid }

    const db = getFirestore();
    const path = doc(db, "Users", user.uid, "Interviews", campain.id);
    await setDoc(path, campain);

    const ipath = doc(db, "Interviews", campain.id);
    await setDoc(ipath, campain);

    return campain;
}

function generateRandomId(seed){
    const first = Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join(''); 
    const rndId = Date.now().toString();
    return `${first}${seed}${rndId}`
  }
