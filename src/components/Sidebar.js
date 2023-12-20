import React from 'react'
import { FaUser } from "react-icons/fa";

import { Link, NavLink } from 'react-router-dom';
import { FaUserDoctor } from "react-icons/fa6";


const Sidebar = ({children}) => {
    const menuItem = [
        {
            path:"/doctor",
            name:"Doktor",
            icon:<FaUserDoctor />
        },
        {
            path:"/users",
            name:"Hastalarım",
            icon:<FaUser />
        },

        

    ]
  return (
    <div className ="container">
        <div  className = "sidebar">
            <div className = "top_section">
                <Link to = "/">
                <img className =""src = "/images/logo.png" alt = "logo"/>
                </Link>
            </div>
            
            {
                menuItem.map((item,index) => (
                    <NavLink to = {item.path} key = {index} className = "link" activeclassname = "active">
                        <div className = "icon">{item.icon}</div>
                        <div className = "link_text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main>{children}</main>
      
    </div>
  )
}

export default Sidebar
