// connect to database
const connectToMongo = require('./db');
connectToMongo();

// connect to localhost 
const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.get('/', (req, res)=>{
    res.send('Welcome to rNotebook by Rashid Rafi')
});
app.listen(port, ()=>{
    console.log(`iNotebook backend listening on localhost:${port}`);
});
