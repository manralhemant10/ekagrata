import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Teacher = (props)=>{
    const ass = props.location.assgid
    const [report,setReport ] = useState([])
    useEffect(()=>{
        let url = "/api/alldocuments/"+ass
        axios.get(url)
        .then((res)=>{
            setReport(res.data)
    })
    },[])
    return(
        <>
        <div className="container mt-5">
        <h2>Result: </h2>
            <table className="table mt-2">
            <thead>
                <tr className="bg-light ">
                <th scope="col " >#</th>
                <th scope="col">Name</th>
                <th scope="col">Focused</th>
                <th scope="col">Not Focused</th>
                </tr>
            </thead>
            <tbody>

                {
                    report.map((data,id)=>{
                        return(
                        <tr key={id}>
                            <th scope="row">{id+1}</th>
                            <td>{data.full_name}</td>
                            <td>{data.front} sec</td>
                            <td>{data.turned} sec </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        </>
    )
}

export default Teacher