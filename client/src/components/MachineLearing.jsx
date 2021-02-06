import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import Loader from 'react-loader-spinner';
import useInterval from '@use-it/interval';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios'

let classifier;

const MachineLearning = (props)=> {
  const videoRef = useRef();
  const [start, setStart] = useState(false);
  const [messageLoading, setMessageLoading]=useState("Setting up things...wait for 2-3 minutes")
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modelloaded, setModelloaded] = useState(false);
  const [slowload, setSlowload] = useState(false)
  const token = localStorage.getItem('token')
  const loadModel = ()=>{
    const mobilenet = ml5.featureExtractor('MobileNet', ()=>{
      console.log('Model is ready!!!');
      classifier = mobilenet.classification(videoRef.current)
      classifier.load('/api/model.json', ()=>{
        console.log("loaded")
     setModelloaded(true)
      });
      
    });
  }
  const videoon = ()=>{
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setLoaded(true);
      loadModel()
    })
  }
  useEffect(() => {
    videoon()
  }, []);

  useInterval(() => {
    if (classifier && start && modelloaded) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
      
        if(results[0].confidence>results[1].confidence){
          setResult((prev)=>[...prev,results[0].label])
        }
        else{
          setResult((prev)=>[...prev,results[1].label])
        }
      });
    }
  }, 1000);  

  const sendPredections = ()=>{
    const data = {
      pre_data: result,
      assignment_id: props.location.assgid
    }
    axios.post('/api/addpredection',data,{
      headers: {
        'Authorization':token
      }
    })
    .then((err,res)=>{
      if(!err)alert("Report generated..!")
    })
    setResult([]);
  }
  const toggle = () => {
    if(start){
      sendPredections()
      setStart(!start)
    }
    else{
      setTimeout(()=>
      { 
        alert("You will be monitored now...")
        setSlowload(true)
        setMessageLoading("")
      }, 60000
      )
      setStart(!start)
    
    }

    
    
  }

  return (
    <div className="container">
      {!start?(
        <Loader
        type="Watch"
        color="#00BFFF"
        height={200}
        width={200}
        visible={!loaded}
        className="d-flex justify-content-center mt-3"
      />
      ):(
        <>
        <div className="d-flex justify-content-center "> 
        <div className="text-center mt-4">
          <h3 className="text-center">{messageLoading}</h3>
          <Loader
          type="Bars"
          color="#00BFFF"
          height={30}
          width={30}
          visible={!slowload}
          
        />
      </div>

        </div>
      </>
      )
    }
      
      
      <div className="d-flex justify-content-center align-items-center">
           <video
           className="mt-4"
           ref={videoRef}
           width="700"
           height="400"
         />
     
  
          {loaded && (
            <button className="btn btn-primary ml-3 " onClick={() =>{ 
              toggle()}}>
              {start ? "Stop" : "Start"}
            </button>
          )}
        
      </div>
    </div>  
  )
  
}
export default MachineLearning