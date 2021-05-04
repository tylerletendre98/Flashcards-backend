const connectDB = require('./startup/db');
const express = require('express');
const cors = require('cors');
const app = express();
const collections = require('./routes/collections');


connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/collections', collections);


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});