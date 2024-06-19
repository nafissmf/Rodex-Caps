const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Rodex-Capstone')
})

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})