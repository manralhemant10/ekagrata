import React, { useEffect } from 'react'
import URLSearchParams from '@ungap/url-search-params'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const CallbackHandler  =(props)=>{
    const states = useSelector(state => state)

    const dispatch = useDispatch()
    const location = props.location.search

    const params = new URLSearchParams(location);

    const code = params.get('code'); 
 
    const gettokenFun = async()=>{
        try {
            const resp = await axios.get('/api/gettoken',{
                params: {
                    code: code
                }
            });
                localStorage.setItem("token",JSON.stringify(resp.data.tokens))
                
                dispatch({
                    type: "AUTHENTICATED",
                    payload:true
                })
        } catch (err) {
            console.error(err);
        }
    
    }
    useEffect(()=>{
        gettokenFun()
    },[])
    
    return(
        <>
        {
            states.isLoggedIn?
            (<Redirect to='/dashboard'/>):
            (<h1>Sorry, something went wrong,restart the page and login again</h1>)

        }
        
        </>
    )
}

export default CallbackHandler