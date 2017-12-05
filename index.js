const express = require('express');
const app = express();

//GET route handler\\\\
app.get('/', (req, res) => {
  res.send({ hi: 'there, Gerson' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
