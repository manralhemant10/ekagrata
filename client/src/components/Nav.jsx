import React from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Nav =()=> {
    const states = useSelector(state=>state)
    return (
            <nav className=" d-flex align-items-center justify-content-center navbar navbar-expand-lg navbar-dark bg-primary " style={{height:"10vh"}}>
                <NavLink style={{color:"white"}} exact className="nav-link active" to="/">Home</NavLink> 
                <NavLink  style={{color:"white"}} className="nav-link" to="/dashboard">Dashboard</NavLink> 
                 {
                    states.isLoggedIn?
                    (<NavLink style={{color:"white"}}   className="nav-link" to="/logout">Logout</NavLink>) :
                    (<NavLink  style={{color:"white"}}   className="nav-link" to="/Login">Login</NavLink> )
                }
                
            </nav>
    );
  }
  
  export default Nav;