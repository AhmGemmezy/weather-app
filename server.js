// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


app.get('/all', (req, res) => {
  console.log(req);
  res.send(projectData);
});


// App Data endpoint
// let appData = {};

// POST method route
app.post('/add', (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    city: req.body.city,
    feel: req.body.feel
  }
  // appData.push(newEntry)
  console.log(projectData)
})

// GET Route for app Data
app.get('/sendData', (req, res) => {
  res.send(projectData);
})

// Setup Server
const port = 8000;

app.listen(port, listening);

function listening() {
  console.log(`Server runing on port: ${port}`);
};




