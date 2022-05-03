const express = require('express')
const app = express()
const port = 3000

app.post('/register', (req, res) => {
  const registerEmail = req.body.email;
  const registerPassword = req.body.password;
})

app.listen(port, () => {
  console.log('Serwer na porcie' + port);
});