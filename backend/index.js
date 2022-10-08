const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const hostname = '127.0.0.1';

app.use(cors());
app.use(express.json());

const connectToMongoose = require('./db');   // for connecting to the mongoDB
connectToMongoose();

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,hostname,()=>{
    console.log('listening to the port')
})