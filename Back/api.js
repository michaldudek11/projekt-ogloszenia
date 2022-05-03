const express = require('express')
const app = express()
const port = 3000

app.post('/register', (req, res) => {
  const registerEmail = req.body.email;
  const registerPassword = req.body.password;
})

app.post('/login', (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
})

app.listen(port, () => {
  console.log('Serwer na porcie' + port);
});