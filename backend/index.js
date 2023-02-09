// THIS IS WHERE THE ENTIRE BACKEND IS INTEGRATED INTO A SINGLE SERVER APPLICATION
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();


const express = require('express');
const app = express();
const port = 5000;

// TO USE req.body to send data body with req 
app.use(cors());
app.use(express.json());

// AVAILABLE ROUTES (APIs)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notesroute'));
app.get('/', (req, res) => {
  res.send("We are connected to localhost")
})

app.listen(port, () => {
  console.log(`Backend app started on port ${port}`)
})
