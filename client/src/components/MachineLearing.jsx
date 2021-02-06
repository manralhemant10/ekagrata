import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import Loader from 'react-loader-spinner';
import useInterval from '@use-it/interval';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios'

let classifier;

const MachineLearning = (props)=> {
  console.log("mlka", props.assgid)
  const videoRef = useRef();
  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modelloaded, setModelloaded] = useState(false);
  const token = localStorage.getItem('token')
  const loadModel = ()=>{
    const mobilenet = ml5.featureExtractor('MobileNet', ()=>{
      console.log('Model is ready!!!');
      classifier = mobilenet.classification(videoRef.current)
     // console.log("ram",classifier)
      classifier.load('/api/model.json', ()=>{
        console.log("loaded")
        setModelloaded(true)
      /*  classifier.classify(videoRef.current, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          setResult(results);
          console.log(results)
        });*/
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
       // setResult((prev)=>
         // [...prev,results]
        //);
        if(results[0].confidence>results[1].confidence){
          setResult((prev)=>[...prev,results[0].label])
        }
        else{
          setResult((prev)=>[...prev,results[1].label])
        }
      console.log(result)
      });
    }
  }, 1000);  

  const sendPredections = ()=>{
    const data = {
      pre_data: result,
      assignment_id: props.assgid
    }
    axios.post('/api/addpredection',data,{
      headers: {
        'Authorization':token
      }
    })
    .then((err,res)=>console.log(res))
  }
  const toggle = () => {
    if(start)sendPredections()
    setStart(!start)
    setResult([]);
  }

  return (
    <div className="container">
      <Loader
        type="Watch"
        color="#00BFFF"
        height={200}
        width={200}
        visible={!loaded}
        style={{display:'flex', justifyContent:'center', marginTop:'30px' }}
      />
      <div className="d-flex justify-content-center align-items-center mt-5">

      <video
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