require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const queryString = require('query-string');
const {google} = require('googleapis');
const path = require('path')
const {authUrlFun, getTokenFun, setCred} = require('./auth')
const {createDocument, getAll} = require('./model')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/api/model.json',(req,res)=>{
  res.sendFile('model.json', { root: path.join(__dirname, '/mlmodel') })
})
app.get('/api/model.weights.bin',(req,res)=>{
  res.sendFile('model.weights.bin', { root: path.join(__dirname, '/mlmodel') })
})

app.get('/api/googleauthurl',(req,res)=>{
    res.send(authUrlFun())
})
app.get('/api/gettoken',async (req,res)=>{
    const code = req.query.code
    const token = await getTokenFun(code)
    res.send(token)  
})

app.get('/api/listcourses',async (req,res)=>{
    const authvar = JSON.parse(req.headers.authorization)
    const oAuth2Client =  await setCred(authvar)
    const classroom = google.classroom({version: 'v1', auth:oAuth2Client});
    classroom.courses.list({
        pageSize: 10,
      }, (err, r) => {
        if (err) return console.error('The API returned an error: ' + err);
        const courses = r.data.courses;
        if (courses && courses.length) {
          res.send(courses)
        } else {
          console.log('No courses found.');
        }
      });
      
  })

app.get('/api/listassignment/:id',async(req,res)=>{
  const courseid = req.params.id
  const authvar = JSON.parse(req.headers.authorization)
  const oAuth2Client =  await setCred(authvar)
  const classroom = google.classroom({version: 'v1', auth:oAuth2Client});
  try{
    const r = await classroom.courses.courseWork.list({
      courseId: courseid
    })
    res.send(r.data)
  }
  catch(err){
    console.log("gadbad zhala")
  }
  
})

app.post('/api/addpredection',async(req,res)=>{
  //console.log(req.headers.authorization)
  let pre_data = req.body.pre_data
  let assignment_id = req.body.assignment_id
  //console.log(pre_data)
  //console.log(assignment_id)
  let front=0,turned=0;
  for(var i=0;i<pre_data.length;i++){
    if(pre_data[i]==="front")front++;
    else
      turned++;
  }
  
  const authvar = JSON.parse(req.headers.authorization)
  //console.log(authvar)
  const oAuth2Client =  await setCred(authvar)
  //console.log(oAuth2Client)
  const classroom = google.classroom({version: 'v1', auth:oAuth2Client});
  classroom.userProfiles.get({
    userId: "me"
  },(err,res)=>{
    //console.log(res.data)
    createDocument(assignment_id,res.data.id,res.data.name.fullName,front,turned)
  })

  
 // res.send("done")
  //console.log(req.body.pre_data)
  
})

app.get('/api/alldocuments/:id',(req,res)=>{
  getAll(req.params.id)
  .then((r)=>res.send(r))

})

//connect to MongoDb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI,{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDb');
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

//Listen Server
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('server is running on port', PORT);
});