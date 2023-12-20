import React from 'react'
import './styles.css'



const Navbar = () => {

  
  return (
    <nav className = "nav">
      <ul>
        <li className ="active">
            <a href = "/contact us">Contact us</a>
            </li>
        <li className = "active">
            <a href = "/about">About</a>
        </li>
        <a href = "/login">
              <button>Login</button>
        </a>
        <a href = "/register">
              <button>Register</button>
        </a>
      </ul>
      
    </nav>
  )
}

export default Navbar
