import {useSelector, useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom'

const Logout = ()=>{
    const states = useSelector(state=>state)
    const dispatch  = useDispatch()

    const logoutFun = ()=>{
        localStorage.clear()
        dispatch({
            type: "AUTHENTICATED",
            payload: false
         })
    }
    logoutFun()
    return(
        <Redirect to="/"/>
    )
}

export default Logout