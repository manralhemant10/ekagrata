require('dotenv').config();
const {google} = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly' ,
'https://www.googleapis.com/auth/classroom.profile.emails',
'https://www.googleapis.com/auth/classroom.profile.photos',
'https://www.googleapis.com/auth/classroom.rosters',
'https://www.googleapis.com/auth/classroom.coursework.me',
'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
'https://www.googleapis.com/auth/classroom.coursework.students',
'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
];
const credentials = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uris: process.env.REDIRECT_URIS
}

var oAuth2Client;
const setCred = (token)=>{   
    oAuth2Client.setCredentials(token)
    return oAuth2Client
}
const authUrlFun= ()=>{
     oAuth2Client =  new google.auth.OAuth2(
      credentials.client_id, credentials.client_secret, credentials.redirect_uris);
  
    const authUrl =  oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    return authUrl
  
}
const getTokenFun=async(code)=>{
  
  try{
    const res =  await oAuth2Client.getToken(code)
    return res
  }
  catch(err){
    console.log("hello hemant error", err)
    
  }
}

module.exports = {
  setCred,
  authUrlFun,
  getTokenFun
}

