
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, signOut} from "firebase/auth"
import toast from "react-hot-toast";
import {getFirestore} from "firebase/firestore"
import "firebase/database"
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};


export const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app)
export const db = getFirestore(app)
const storage = getStorage(app)
export {storage}





export const register = async (email, password) => {
    try{
    const {user} = await createUserWithEmailAndPassword (auth, email, password)
    return user
 }  catch (error){
  toast.error(error.message)
 }
}

export const login = async(email, password) => {
  try {
     const { user } = await signInWithEmailAndPassword(auth, email, password )
     return user
  }catch(error){ 
    toast.error(error.message)
  }
}
export const logout = async() => {
  try {
       await signOut(auth)
     return true
  }catch(error){ 
    toast.error(error.message)
  }
}

export const update = async data => {
  try {
  await updateProfile(auth.currentUser, data)
  toast.success('Profil güncellendi')
  return true
 } catch (error) {
     toast.error(error.message)

 }
}
export const emailVerification = async () => {
  try{
    await sendEmailVerification(auth.currentUser)
    toast.success(`Doğrulama maili ${auth.currentUser.email} adresine gönderildi, lütfen kontrol edin!`)
  } catch (error) {
    toast.error(error.message)
  }
}




export default app
