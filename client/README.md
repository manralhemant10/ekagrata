## Ekagrata

No matter how much an individual swear that he/she won’t be “that person,” it seems every smartphone user eventually becomes chained to their phone.
Studies show most smartphone users keep their devices within arm’s reach all day, every day.
Every few minutes, even if the phone didn’t vibrate or sound an alert,
he/she feel obligated to check for updates on the tiny computers we keep close.
Smartphones are increasingly addictive and distracting, and as a result it’s getting 
harder for people to pay attention to what they’re doing.<br/>
**Ekagrata** is the web app which helps students to increase their level of concentration while 
solving assignments assigned by the teacher using Google Classroom and generates the report containing the
total amount of time the student was disracted.

## How It Works

First, students/teachers sign into Attentive using their Google account. Then, through the use of Google Classroom API, they are automatically shown their classes and assignments. The model is a build on top of Mobilenet model (transfer learning) which determines if a student is doing his work without being distracted or not. Users simply select the course and assignment they would like to work on and choose wheter they are student or teacher, if selected student hit the start button wait for a while, This begins a process that takes an image of the student every second. Once they click stope, the custom ML model analyzes the images taken during the session and writes the info gathered from the images (amount of time spent on an assignment, the average attention span of the student, and times when the student was distracted) into a MongoDB database. This info is then displayed inside the teacher portal.

## How to Run
* Clone this repo
* Set up Google Classroom API credentials,set Redirect url to http://example.com/authcallback
* Create .env file in root directory, add CLIENT_ID,CLIENT_SECRET,REDIRECT_URIS,MONGODB_URL
* Do npm install in root directory and client directory
* run server using "node server.js" in root directory
* In client directory do npm start

## Challenges We Ran Into

Before this hackathon, we had no idea that a project like this could even be created. It took countless hours of reading blogs, and trial and error to get everything working. <br/>
Some key problems I faced: <br/>
* Google Classroom API integration
* Using Machine learning in javascript

## Built With 

* React.js
* Express.js
* Node.js
* MongoDB
* Google classroom API
* ml5.js

## Inspiration
Due to COVID-19, everything went online including college and school. Student distraction while studying started 
increasing. So we came up with this idea. 

## Future Work
* Improving the model with more data set.
* Will be adding features to allow any one to add students and assign assignments (for teachers) and any individual to assign himself a task and checck his own report.

## Author

* **Hemant Singh Manral** - [Github](https://github.com/manralhemant10)
* **Lalit Mohan Reddy** - [Github]()


