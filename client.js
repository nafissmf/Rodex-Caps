const baseUrl = 'http://localhost:8000'; // Ganti dengan URL server Anda

// API user register
fetch(`${baseUrl}/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)'
  },
  body: JSON.stringify({
    username: 'yanto',
    email: 'yanto@gmail.com',
    password: '12345678',
    confirm_password: '12345678'
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('Error:', error));

// API user login
fetch(`${baseUrl}/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)'
  },
  body: JSON.stringify({
    username: 'yanto',
    password: '12345678'
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('Error:', error));

// API start inspection
fetch(`${baseUrl}/inspection/new`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)'
  },
  body: new URLSearchParams({
    name_of_officer: 'Officer Name',
    name_of_road: 'Road Name',
    length_of_road: '100 km',
    type_of_road_surface: 'Asphalt',
    location_start: 'Starting Location'
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('Error:', error));

// API road detection model interface
const fileInput = document.querySelector('#fileInput'); // Ganti dengan elemen input file Anda
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('location', 'Location');

fetch(`${baseUrl}/inspection/detect`, {
  method: 'POST',
  headers: {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)'
  },
  body: formData
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('Error:', error));

// API save damages
fetch(`${baseUrl}/inspection/detected`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)'
  },
  body: JSON.stringify({
    image: 'image_string',
    count_damages: 0,
    count_damages_type_0: 0,
    count_damages_type_1: 0,
    count_damages_type_2: 0,
    count_damages_type_3: 0,
    location: [0, 0],
    detected: [{
      class: 0,
      conf_score: 0,
      boxes: [0, 0, 0, 0]
    }]
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('Error:', error));

// API finish inspection
fetch(`${baseUrl}/inspection/end`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)'
  },
  body: new URLSearchParams({
    location_end: 'Ending Location'
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('Error:', error));
