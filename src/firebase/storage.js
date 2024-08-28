import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export function saveVideo(blob, contentType, fileName){
    const storage = getStorage();
    const fileref = ref(storage, fileName);
    const metadata = { contentType }
    const uploadTask = uploadBytesResumable(fileref, blob, metadata);
    //https://firebase.google.com/docs/storage/web/upload-files#monitor_upload_progress
    return uploadTask;
}

export async function getVideoUrl(path){
    const storage = getStorage();
    const fileRef = ref(storage, path);
    const fileUrl = await getDownloadURL(fileRef);
    return fileUrl;
}