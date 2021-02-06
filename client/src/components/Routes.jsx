import React from 'react'
import { Route } from "react-router-dom";
import CallbackHandler from './CallbackHandler';
import Dashboard from './Dashboard';
import GoogleLogin from './GoogleLogin';
import Logout from './Logout';
import {useSelector} from 'react-redux'
import MachineLearning from './MachineLearing';
import Teacher from './Teacher';
import Home from './Home';
const Routes = ()=>{
    const states  = useSelector(state=>state)

    return(
        <>
        <Route exact path="/" component={Home}/>
        <Route exact path="/authcallback" component={CallbackHandler}/>
        {
            states.isLoggedIn?(
            <Route exact path="/dashboard" component={Dashboard}/>
            ):(
                <Route exact path="/dashboard" component={GoogleLogin}/>
            )
        
        }
        <Route exact path="/login" component={GoogleLogin}/>
        <Route exact path="/logout" component={Logout}/>
        {
            states.isLoggedIn?(
            <Route exact path="/student" component={MachineLearning}/>
            ):(<Route exact path="/student" component={GoogleLogin}/>)
        }  
         {
            states.isLoggedIn?(
            <Route exact path="/teacher" component={Teacher}/>
            ):(<Route exact path="/teacher" component={GoogleLogin}/>)
        }   
        </>
    )
}

export default Routes