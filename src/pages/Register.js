import { useState } from "react"
import {register} from "../firebase"
import {useNavigate} from "react-router-dom"
import { login as loginHandle} from "../store/auth"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"



export default function Register(){
     
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async e => {
       e.preventDefault()
       const user = await register(email, password)
       if (user) {
       dispatch(loginHandle(user))
       navigate('/login',{
        replace:true
       })
    }
    }
    return(
        <div className = "max-w-md mx-auto py-12">
        <h1 className = "text-2xl">Create your account
        <form  onSubmit = {handleSubmit} className = "max-w-xl mx-auto grid gap-y-6 py-4" >
            <div>
                <label htmlFor = "email" className ="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <div className = "mt-1">
                    <input
                     type="text"
                     name = "email"
                     id = "email"
                     className ="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     placeholder = "Enter your email"
                     value = {email} onChange = {(e) => setEmail(e.target.value)} />

                </div>
           </div>
            <div>
                <label htmlFor = "password" className ="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className = "mt-1">
                    <input
                     type="password"
                     name = "password"
                     id = "password"
                     className ="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                     placeholder = "Enter your password"
                     value = {password} onChange = {(e) => setPassword(e.target.value)} />

                </div>
             </div>
       <div>
        <button disabled = {!email || !password} className = " cursor-pointer disabled:opacity-20 text-white  inline-flex items-center px-4 py-2 border  text-sm  font-medium rounded-md shadow-sm border-transparent bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"  type = "submit">Register</button>
        <Link className = "text-base p-8"to ="/login">Already have an account? Sign in</Link>
        </div>
      </form>
      </h1>
      </div>
    )
}