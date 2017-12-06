const express = require('express');
// const passportConfig = require('./services/passport');
require('./services/passport');
// const authRoutes = require('./routes/authRoutes');

const app = express();
require('./routes/authRoutes')(app); //requre returns a function
// //GET route handler\\\\
// app.get('/', (req, res) => {
//   res.send({ hi: 'there, Gerson' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
