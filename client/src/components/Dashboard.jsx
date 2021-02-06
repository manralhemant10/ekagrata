import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Dashboard = ()=>{
    
    const token = localStorage.getItem('token')
    const [courseList, setCourseList] = useState([])
    const [assignmentList, setAssignmentList] = useState([])
    const [assgid,setAssgid]=useState("")
    const [assignmentwait, setAssignmentWait]=useState(true)
    const [coursewait, setCoursewait] = useState(true)

    const listCourses = async()=>{
      
      try{
        const res = await axios.get('/api/listcourses',{
          headers: { 
            'Authorization': token
          }
        })
      setCourseList(res.data)
      setCoursewait(false)
      listAssignments(res.data[0].id)  
      }
      catch(err){
        console.log("error", err)
      }
      
    }
    const listAssignments = async(courseid)=>{
      try{
        let url = "/api/listassignment/"+courseid.toString()
        const res = await axios.get(url,{
          params:{
            id: courseid
          },
          headers: { 
            'Authorization': token
          }
        })
        var size = Object.keys(res.data).length;
        if(size>0)
        {      
          setAssignmentList(res.data.courseWork)  
          let temp=(res.data.courseWork[0].id).toString()
          setAssgid(temp.toString())
          setAssignmentWait(false)
        }
        else
        {
          setAssignmentList([{
            id:-1,title:"sorry nothing found"
          }])
          setAssignmentWait(false)
        }
        

      }catch(err){

      }
    }
    const courseChange = (e)=>{
      setAssignmentWait(true)
      let index = e.target.selectedIndex;
      let optionElement = e.target.childNodes[index]
      let option =  optionElement.getAttribute('data-id');
      listAssignments(option)  
   }
   const assignmentChange=(e)=>{
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index]
    let option =  optionElement.getAttribute('data-id');
    setAssgid(option.toString())
   }
  
      useEffect(()=>{
        listCourses()
      },[])


    return(
      <>
      <div>
        <h3 className="text-center mt-3 pt-2 pb-2 bg-light">Concentraion is the secret of strength!</h3>
        <div className="d-flex flex-column container w-25 justify-content-center mt-3 bg-light ">
          <div className="d-flex flex-column">
            <label className="mt-3">Select your course: </label>
            <select  onChange={courseChange}>
              {
                coursewait?(
                  <option>Loading....</option>
                ):(
                courseList.map((data)=>{
                  return(
                  <option key={data.id} value={data.name} data-id={data.id}>{data.name}</option>
                  )
                })
                )
              }
            </select>
          </div>
          <br/>
          <div className="d-flex flex-column">
            <label>Select your assignment: </label>
            <select  onChange={assignmentChange}>
          {
            assignmentwait?(  <option>Loading....</option>):(
              assignmentList.map((data)=>{
                return(
                <option key={data.id} value={data.title} data-id={data.id}>{data.title}</option>
                )
              })
            )
          }
           
          </select>
          </div>
          <div className="mt-4 mb-4 text-center">
            <Link className=" btn btn-danger mt-2 mr-2 px-3" to={{
              pathname: '/teacher',
              assgid:assgid }}>
              Teacher
          </Link>
            <Link className=" btn btn-success mt-2 mr-2 px-3" to={{
              pathname: '/student',
              assgid:assgid }}>Student</Link>
          </div>
        </div>
        
       
        
       </div>  
    
        
        
</>

    )
}

export default Dashboard