import { auth,Storage } from "./Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  signOut
} from "firebase/auth";
// import { Storage} from "./Config";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
async function forget (email ){
  const forget = await sendPasswordResetEmail(auth, email )
 return forget;
}
async function logout() {
  await signOut(auth);
}
/**
 * 
 * @param {*} uri 
 * @param {*} name 
 * @param {*} onprogress 
 */
 const uploadToFirebase =async (uri,name,onprogress) =>{
  const fetchResp =await fetch(uri);
  const blob =await fetchResp.blob();
  console.log(blob);
  const imageRef = ref(Storage, `images/${name}`);
const uploadTask = uploadBytesResumable(imageRef, blob);
return new Promise((resolve,reject)=>{
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     onprogress && onprogress(progress);
  }, 
  (error) => {
    // Handle unsuccessful uploads
    reject(error);
  }, 
  async() => {
    const downloadUrl =await  getDownloadURL(uploadTask.snapshot.ref);
    // resolve({
    //   downloadUrl,
    //   metadata:uploadTask.snapshot.metadata
    // })
    });
  });
};
export { register, login, logout,forget ,uploadToFirebase};
