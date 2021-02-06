import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import GoogleButton from 'react-google-button'
import { Redirect,useHistory } from 'react-router-dom'



const GoogleLogin = ()=>{
    const history = useHistory()
    const state = useSelector(state=>state)
    const dispatch  = useDispatch()
    const [authUrl, setAuthUrl] = useState("")
    const [error,setError]  = useState("")
   useEffect(()=>{
    axios.get('/api/googleauthurl')
    .then(res=>{
        setAuthUrl(res.data)
    })
    .catch(err=>{
        setError(err)
    })

   },[])
   const redFun = ()=>{
    window.location.href=authUrl
   }
   return(
        <>
                <div className="d-flex align-items-center justify-content-center" style={{height:"90vh"}}> 
                    <GoogleButton onClick={redFun} >Login with google</GoogleButton>   
                </div>
        </> 
    )
}

export default GoogleLogin