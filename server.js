const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route untuk endpoint '/'
app.get('/', (req, res) => {
  res.send('Rodex-Capstone');
});

// Route untuk register user
app.post('/register', (req, res) => {
  // Proses pendaftaran user di sini
  const { username, email, password, confirm_password } = req.body;
  // Contoh sederhana untuk menanggapi
  res.send(`Registered user: ${username}`);
});

// Route untuk login user
app.post('/login', (req, res) => {
  // Proses login user di sini
  const { username, password } = req.body;
  // Contoh sederhana untuk menanggapi
  res.send(`Logged in user: ${username}`);
});

// Route untuk memulai inspeksi baru
app.post('/inspection/new', (req, res) => {
  // Proses memulai inspeksi baru di sini
  const { name_of_officer, name_of_road, length_of_road, type_of_road_surface, location_start } = req.body;
  // Contoh sederhana untuk menanggapi
  res.send(`New inspection started at ${name_of_road}`);
});

// Route untuk deteksi jalan menggunakan model
app.post('/inspection/detect', (req, res) => {
  // Proses deteksi jalan di sini
  // Contoh sederhana untuk menanggapi
  res.send('Road detected');
});

// Route untuk menyimpan kerusakan
app.post('/inspection/detected', (req, res) => {
  // Proses menyimpan kerusakan di sini
  const { image, count_damages, count_damages_type_0, count_damages_type_1, count_damages_type_2, count_damages_type_3, location, detected } = req.body;
  // Contoh sederhana untuk menanggapi
  res.send('Damages saved');
});

// Route untuk mengakhiri inspeksi
app.post('/inspection/end', (req, res) => {
  // Proses mengakhiri inspeksi di sini
  const { location_end } = req.body;
  // Contoh sederhana untuk menanggapi
  res.send('Inspection ended');
});

// Mulai server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
