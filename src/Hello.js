const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Word')
  console.log('Server Running');
})

app.listen(3000)