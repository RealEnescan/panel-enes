import { useState } from "react"
import {update, auth} from "../firebase"
import { useDispatch } from "react-redux"
import { login } from "../store/auth"
import { useSelector } from "react-redux"


export default function UpdateProfile() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [displayName, setDisplayName]  = useState(user.displayName || '')
 
    const handleSubmit = async e =>{
        e.preventDefault()
        await update ({
          displayName
        })
        dispatch(login(auth.currentUser))
       
    }

    return (
        <form onSubmit = {handleSubmit}className = "grid gap-y-4">
            <h1 className = "text-xl font-bold mb-4">Profili Güncelle</h1>
            <div>
                <label htmlFor = "email" className ="block text-sm font-medium text-gray-700">
                    Ad-soyad
                </label>
                <div className = "mt-1">
                    <input
                     type="text"
                     
                     className ="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     placeholder = "Ad-Soyad"
                     value = {displayName} onChange = {e => setDisplayName(e.target.value)} />

                </div>
                <div>
               <button  className = " cursor-pointer disabled:opacity-20 text-white  inline-flex items-center px-4 py-2 border  text-sm  font-medium rounded-md shadow-sm border-transparent bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               type = "submit">Güncelle</button>
             </div>
           </div>
        </form>
    )
}