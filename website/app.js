/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const appId = '&units=metric&appid=a4c5d45de02ec913ef1ea6bd58ba91e1';

const zCode = document.querySelector('#zip');
const gBtn = document.getElementById('generate');
const feeling = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Perform action upon click event
gBtn.addEventListener('click', execute);

function execute(e) {
  const zipcode = zCode.value;
  if (!zipcode) {
    alert('Enter a Valid Zip Code !!')
  } else {
    getData(baseURL, zipcode, appId)
      .then(data => {
        //console.log(data)
        postData('/add', { date: newDate, temp: data.main.temp, city: data.name, feel: feeling.value })
      })
      .then(() => {
        updateUI();
      })
      .catch(err => {
        console.log('Error Found: ', err)
      })
  }
}



// Get Data from API endpoint
const getData = async (baseURL, zipcode, appId) => {
  const result = await fetch(baseURL + zipcode + appId)
  try {
    const data = await result.json();
    return data
  } catch (err) {
    console.log('GET Request Error: ', err)
  }
}

// POST data to the server-side
const postData = async (url = '', data = {}) => {
  //console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  } catch (err) {
    console.log("POST Request Error: ", err);
  }
}


// Update the user interface
const updateUI = async () => {
  const result = await fetch('/sendData')
  try {
    const allData = await result.json();
    document.querySelector('#date').innerHTML = `Today is: ${allData.date}`;
    document.querySelector('#temp').innerHTML = `Temperature Today: ${allData.temp}°C at ${allData.city}`;
    document.querySelector('#content').innerHTML = `I Feel Like: ${allData.feel}`;
    zCode.value = '';
    feeling.value = '';
  } catch (err) {
    console.log("Error From UI: ", err);
  }
}





